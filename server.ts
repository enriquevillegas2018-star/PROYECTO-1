import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy init Gemini clients so the app doesn't crash on boot if the key is missing.
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Please set the GEMINI_API_KEY environment variable in your Secrets panel under Settings.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set payload limits for base64 image uploading
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Route: Edit Image
  app.post("/api/edit-photo", async (req, res) => {
    try {
      const { image, instruction, modelName = "gemini-2.5-flash-image" } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Missing image data" });
      }
      if (!instruction) {
        return res.status(400).json({ error: "Missing instruction prompt" });
      }

      // Check if image is an absolute base64 string and extract raw parts
      let mimeType = "image/png";
      let base64Data = image;

      if (image.includes(";base64,")) {
        const parts = image.split(";base64,");
        const match = parts[0].match(/data:(.*)/);
        if (match) mimeType = match[1];
        base64Data = parts[1];
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: instruction,
            },
          ],
        },
      });

      if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No response candidates returned from the Gemini image editing model.");
      }

      let editedImageBase64: string | null = null;
      let textFeedback: string | null = null;

      const candidates = response.candidates[0];
      if (candidates.content && candidates.content.parts) {
        for (const part of candidates.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            editedImageBase64 = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          } else if (part.text) {
            textFeedback = part.text;
          }
        }
      }

      if (!editedImageBase64) {
        throw new Error("Failure editing image: The model did not return an updated image. Try adjusting your prompt (e.g., be specific about what background to add/remove).");
      }

      res.json({
        success: true,
        image: editedImageBase64,
        feedback: textFeedback,
      });

    } catch (error: any) {
      console.error("Error editing photo via Gemini:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Verify Gemini API Key configuration status
  app.get("/api/key-status", (req, res) => {
    res.json({
      hasKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // API Route: AI Flavor Suggestion Matcher
  app.post("/api/recommend-flavor", async (req, res) => {
    try {
      const { mood, preference } = req.body;
      const ai = getGeminiClient();

      const systemPrompt = `Eres un asesor experto de granizados y refrescos artesanales fríos para la tienda premium 'Paraíso Bajo 0' de Lenni Tacuri.
Tu labor es responder de manera entusiasta, amigable, divertida y corta (máximo 3 oraciones en español).
Basándote en el estado de ánimo (mood: "${mood || 'caluroso'}") y la preferencia de sabor o intensidad (preference: "${preference || 'equilibrado'}"),
recomienda una mezcla fantástica de sabores para su granizado (pueden ser Fresa Natural, Limón Helado, Mango Tropical, Frambuesa Azul, Arcoíris o mezclas personalizadas con extras como Leche Condensada).
Inventa un nombre divertido y refrescante para la mezcla propuesta.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
      });

      const recommendation = response.text || "¡Recomendamos mezclar Frambuesa Azul con Limón Helado para un contraste cósmico inigualable! 🧊";

      res.json({
        success: true,
        recommendation,
      });
    } catch (error: any) {
      console.error("Error recommending flavor:", error);
      res.json({
        success: false,
        recommendation: "¡Te sugerimos probar nuestro sabor 'Arcoíris Cósmico' mezclando Fresa, Limón y un toque de crema! 🌈 Un clásico indestructible para combatir el calor.",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
