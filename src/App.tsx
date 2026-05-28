import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Check,
  ChevronRight,
  Info,
  HelpCircle,
  MessageCircle,
  Smartphone,
  Shield,
  ThumbsUp,
  Flame,
  Droplet,
  ArrowRight,
  Star,
  Users,
  Grid,
  TrendingUp,
  RotateCcw,
  Compass
} from "lucide-react";
import { CustomGranizado, FAQItem, Testimonial, GranizadoPreset } from "./types";
import granizado1 from "./assets/images/granizado_con_toppings_1_1779924897804.png";
import granizado2 from "./assets/images/granizado_con_toppings_2_1779924914810.png";
import granizado3 from "./assets/images/granizado_con_toppings_3_1779924932470.png";

// Dynamic references for filterable dessert assets (fully loaded Ecuador style with candies and syringes!)
const GALLERY_ITEMS = [
  {
    name: "Jeringuilla Loca de Fresa 🍓💉",
    category: "fresa",
    price: 3.00,
    image: granizado1
  },
  {
    name: "Tentación Tropical de Mango 🥭🔥",
    category: "tropical",
    price: 3.00,
    image: granizado2
  },
  {
    name: "Arcoíris Explosivo con Gomitas 🌈✨",
    category: "especial",
    price: 3.00,
    image: granizado3
  },
  {
    name: "Limonada Loca Helada 🍋🍭",
    category: "limon",
    price: 2.50,
    image: granizado2
  },
  {
    name: "Fusión Cósmica Frambuesa 💙🍬",
    category: "especial",
    price: 3.00,
    image: granizado1
  },
  {
    name: "Fresa Extrema con Toppings 🍓🍒",
    category: "fresa",
    price: 3.00,
    image: granizado3
  }
];

// Interactive FAQ Lists
const FAQ_DATA: FAQItem[] = [
  {
    question: "¿Qué sabores tienen disponibles?",
    answer: "Nuestros clásicos estelares incluyen Fresa Natural, Limón Helado, Mango de la Costa y Frambuesa Azul. También contamos con el solicitado sabor 'Arcoíris', el cual mezcla todas nuestras esencias frutales en una espectacular combinación tricolor preparada al momento por Lenni."
  },
  {
    question: "¿El granizado se prepara al momento o está hecho de antemano?",
    answer: "Siempre al instante. Jamás reciclamos hielo ni servimos jarabes almacenados. Raspamos el bloque de hielo de alta pureza en el segundo que realizas tu pedido para asegurar esa textura esponjosa única de 'Paraíso Bajo 0'."
  },
  {
    question: "¿Puedo personalizar mi combinación de sabores y agregados?",
    answer: "¡Absolutamente! Con nuestro Mezclador Interactivo puedes simular y calcular tu precio exacto. Puedes combinar hasta 3 jarabes de fruta diferentes y culminarlo con agregados premium como Leche Condensada, Sirope de Chocolate de alta pureza o lluvia de chispas dulces."
  },
  {
    question: "¿Tienen servicio de entrega / delivery?",
    answer: "Para pedidos locales en Machala y zonas coordinadas con Lenni Tacuri, puedes enviarle un mensaje de WhatsApp directo. Te preparamos los granizados al instante y los enviamos en un empaque térmico especial para que lleguen intactos."
  },
  {
    question: "¿Cuál es la diferencia entre el tamaño Grande y el Premium?",
    answer: "El vaso Premium de $3.00 es nuestro buque insignia: incluye una doble capa de jarabe concentrado, un tamaño XL y te obsequia un topping gratis a tu elección para que tu refresco sea majestuoso de principio a fin."
  },
  {
    question: "¿En qué consiste la Garantía Paraíso Bajo 0?",
    answer: "Estamos tan convencidos de nuestra calidad que si al probar tu granizado sientes que no te refresca o no cumple con el nivel de dulzura prometido, te devolvemos el dinero o te lo volvemos a preparar de inmediato. ¡Sin discusiones ni trámites!"
  }
];

// High-quality testimonials
const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "María G.",
    role: "Cliente Habitual · 28 años",
    text: "Pasé casi sin querer y decidí probar. Pedí el Premium de $3.00 y fue como si alguien le bajara la temperatura al mundo entero. El jarabe de fresa es natural, no artificial. ¡Ahora paso todas las tardes!",
    rating: 5,
    avatarChar: "M"
  },
  {
    name: "Carlos M.",
    role: "Cliente Frecuente · 35 años",
    text: "Soy de los que cuida cada centavo. Por solo un dólar tienes algo delicioso en la mano que de verdad quita el calor sofocante. La atención de Lenni es fenomenal, siempre sonriente.",
    rating: 5,
    avatarChar: "C"
  },
  {
    name: "Patricia R.",
    role: "Grupo de Oficina · 31 años",
    text: "Empezamos viniendo solas los martes. Le conté a mis compañeras de oficina y ahora somos seis las que venimos en grupo. Es nuestro ritual de desconexión. Rico, helado y super económico.",
    rating: 5,
    avatarChar: "P"
  },
  {
    name: "Sofía L.",
    role: "Mamá Feliz · 38 años",
    text: "Pedimos el pequeño de $1.00 para mi hijo pequeño y un mediano de mango para mí. El hielo es tan fino que no lastima, parece nieve. Realmente artesanal e higiénico.",
    rating: 5,
    avatarChar: "S"
  },
  {
    name: "Diego F.",
    role: "Estudiante · 22 años",
    text: "Vengo con el presupuesto justo después de clases y el de $2.00 es mi salvación. El sabor arcoíris es de otro planeta. Recomiendo al 100% Paraíso Bajo 0.",
    rating: 5,
    avatarChar: "D"
  }
];

export default function App() {
  // Mobile Floating Bar Visible State
  const [scrollY, setScrollY] = useState(0);

  // Custom Granizado Mixer States
  const [selectedSize, setSelectedSize] = useState<"pequeno" | "mediano" | "grande" | "premium">("premium");
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(["fresa"]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["leche_condensada"]);
  
  // AI Suggestion Mode States
  const [userMood, setUserMood] = useState<string>("caluroso");
  const [userPreference, setUserPreference] = useState<string>("dulce");
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // General navigation or gallery state filters
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive mood compare slider positioning
  const [moodSliderValue, setMoodSliderValue] = useState<number>(50);

  // Floating Background Ice Particles
  const [crystals, setCrystals] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate static random physical variables for ice crystals to prevent state refresh hydration issues
    const tempCrystals = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      left: Math.random() * 95,
      delay: Math.random() * 8,
      size: Math.random() * 32 + 8
    }));
    setCrystals(tempCrystals);

    // Track scroll details to show/hide bottom floating trigger
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Price Calculation Logic
  const getPriceForSize = (size: string) => {
    switch (size) {
      case "pequeno": return 1.00;
      case "mediano": return 2.00;
      case "grande": return 2.50;
      case "premium": return 3.00;
      default: return 1.00;
    }
  };

  const calculateTotalPrice = () => {
    let price = getPriceForSize(selectedSize);
    // Extras are $0.50 each, but XL gets first extra free
    const extrasCost = selectedExtras.length * 0.50;
    const finalPrice = price + (selectedSize === "premium" ? Math.max(0, extrasCost - 0.50) : extrasCost);
    return finalPrice.toFixed(2);
  };

  // Toggle checklist utilities
  const toggleFlavor = (id: string) => {
    if (selectedFlavors.includes(id)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(prev => prev.filter(f => f !== id));
      }
    } else {
      if (selectedFlavors.length < 3) {
        setSelectedFlavors(prev => [...prev, id]);
      }
    }
  };

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(prev => prev.filter(e => e !== id));
    } else {
      setSelectedExtras(prev => [...prev, id]);
    }
  };

  // Call the server Gemini API endpoint to analyze mood & make a professional recommendation!
  const getAISuggestion = async () => {
    setIsAiLoading(true);
    setAiSuggestion("");
    try {
      const response = await fetch("/api/recommend-flavor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: userMood, preference: userPreference })
      });
      const data = await response.json();
      if (data.success && data.recommendation) {
        setAiSuggestion(data.recommendation);
        
        // Auto-configure appropriate flavors in the mixer according to Gemini text suggestions
        const suggestionText = data.recommendation.toLowerCase();
        let matchedFlavors: string[] = [];
        if (suggestionText.includes("fresa")) matchedFlavors.push("fresa");
        if (suggestionText.includes("mango")) matchedFlavors.push("mango");
        if (suggestionText.includes("limón") || suggestionText.includes("limon")) matchedFlavors.push("limon");
        if (suggestionText.includes("frambuesa") || suggestionText.includes("azul")) matchedFlavors.push("frambuesa");
        if (suggestionText.includes("arcoiris") || suggestionText.includes("arcoíris")) matchedFlavors.push("arcoiris");
        
        if (matchedFlavors.length > 0) {
          setSelectedFlavors(matchedFlavors.slice(0, 3));
        }

        // Check extras matching
        let matchedExtras: string[] = [];
        if (suggestionText.includes("leche") || suggestionText.includes("condensada")) matchedExtras.push("leche_condensada");
        if (suggestionText.includes("cereza")) matchedExtras.push("cereza");
        if (suggestionText.includes("chispas")) matchedExtras.push("chispas");
        if (suggestionText.includes("chocolate")) matchedExtras.push("chocolate");
        
        if (matchedExtras.length > 0) {
          setSelectedExtras(matchedExtras);
        }
      }
    } catch (err) {
      console.error(err);
      setAiSuggestion("¡Te sugerimos la legendaria mezcla 'Doble Fantasía': Fresa, Mango y un toque de Leche Condensada! 🍓🥭 Combate el calor al instante.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Build the live contextual WhatsApp redirect link for checkout orders
  const triggerWhatsAppOrder = () => {
    const sizeNames = {
      pequeno: "Pequeño ($1.00)",
      mediano: "Mediano ($2.00)",
      grande: "Grande ($2.50)",
      premium: "Premium XL ($3.00)"
    };

    const flavorNames: Record<string, string> = {
      fresa: "🍓 Fresa Natural",
      mango: "🥭 Mango de la Costa",
      limon: "🍋 Limón Andino",
      frambuesa: "💙 Frambuesa Azul",
      arcoiris: "🌈 Arcoíris Multicolor"
    };

    const extraNames: Record<string, string> = {
      leche_condensada: "🥛 Leche Condensada",
      cereza: "🍒 Cerezas al Almíbar",
      chispas: "🍭 Chispas de Colores",
      chocolate: "🍫 Baño de Chocolate"
    };

    const sizeStr = sizeNames[selectedSize];
    const flavorsStr = selectedFlavors.map(f => flavorNames[f] || f).join(", ");
    const extrasStr = selectedExtras.length > 0 ? selectedExtras.map(e => extraNames[e] || e).join(", ") : "Ninguno";
    const total = calculateTotalPrice();

    const genericMessage = `Hola Lenni! Deseo ordenar un granizado personalizado para combatir el calor de Machala:
• *Tamaño:* ${sizeStr}
• *Sabores:* ${flavorsStr}
• *Toppings:* ${extrasStr}
• *Total estimado:* $${total}

¡Por favor prepáralo bien helado! 🧊⚡`;

    const encodedMessage = encodeURIComponent(genericMessage);
    window.open(`https://wa.me/593993260464?text=${encodedMessage}`, "_blank");
  };

  // Filter gallery items list
  const filteredGallery = activeGalleryFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeGalleryFilter);

  // Dynamic visual preview cup gradient depending on the current selections
  const getLiquidGradientStyle = () => {
    const flavorColors: Record<string, string> = {
      fresa: "#ef4444", // red
      mango: "#f59e0b", // yellow orange
      limon: "#84cc16", // lime green
      frambuesa: "#06b6d4", // cyan
      arcoiris: "linear-gradient(to top, #3b82f6, #f59e0b, #ef4444)" // tricolor gradient
    };

    if (selectedFlavors.includes("arcoiris")) {
      return { background: "linear-gradient(to top, #3b82f6, #f43f5e, #eab308)" };
    }

    if (selectedFlavors.length === 1) {
      return { backgroundColor: flavorColors[selectedFlavors[0]] || "#3b82f6" };
    }

    if (selectedFlavors.length === 2) {
      const col1 = flavorColors[selectedFlavors[0]] || "#06b6d4";
      const col2 = flavorColors[selectedFlavors[1]] || "#ef4444";
      return { background: `linear-gradient(to top, ${col1}, ${col2})` };
    }

    if (selectedFlavors.length === 3) {
      const col1 = flavorColors[selectedFlavors[0]] || "#06b6d4";
      const col2 = flavorColors[selectedFlavors[1]] || "#f59e0b";
      const col3 = flavorColors[selectedFlavors[2]] || "#ef4444";
      return { background: `linear-gradient(to top, ${col1}, ${col2}, ${col3})` };
    }

    return { backgroundColor: "#3b82f6" };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden relative flex flex-col selection:bg-cyan-500 selection:text-white">
      
      {/* Dynamic Animated Ice Floating background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
        {crystals.map((crystal) => (
          <div
            key={crystal.id}
            className="absolute rounded bg-sky-200/10 rotate-45 animate-pulse"
            style={{
              width: `${crystal.size}px`,
              height: `${crystal.size}px`,
              left: `${crystal.left}%`,
              bottom: `-50px`,
              animation: `driftUp ${10 + crystal.delay}s linear infinite`,
              animationDelay: `${crystal.delay}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes driftUp {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* MOBILE PERSISTENT FLOATING BAR (Appears on scroll) */}
      <AnimatePresence>
        {scrollY > 300 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-4 z-50 flex items-center justify-between pointer-events-auto shadow-2xl md:px-12"
          >
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Paraíso Bajo 0</span>
              <span className="text-white text-sm font-bold flex items-center gap-1">
                Refrescos Artesanales <span className="text-cyan-400 font-mono">Desde $1.00</span>
              </span>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById("builder-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-cyan-300 shadow-md shadow-cyan-400/20 active:scale-95 cursor-pointer"
            >
              ¡Armar mi Granizado!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/75 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-lg font-bold text-slate-950">B0</span>
          </div>
          <div>
            <span className="font-display text-md font-extrabold tracking-wider text-white uppercase block">
              Paraíso Bajo 0
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00C8E0] font-semibold">
              Por Lenni Tacuri
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#builder-section" className="text-xs font-medium text-slate-300 hover:text-white transition-colors">La Máquina</a>
          <a href="#prices-section" className="text-xs font-medium text-slate-300 hover:text-white transition-colors">Vasos & Precios</a>
          <a href="#gallery-section" className="text-xs font-medium text-slate-300 hover:text-white transition-colors">Catálogo</a>
          <a href="#faq-section" className="text-xs font-medium text-slate-300 hover:text-white transition-colors">Tus Preguntas</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="https://www.tiktok.com/@paraiso.bajo.0.gra?_r=1&_t=ZS-96iquNbC4KS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-100 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            title="Síguenos en TikTok"
          >
            <span className="text-cyan-400 drop-shadow-[0_0_2px_rgba(239,68,68,0.8)] font-sans">🎵</span>
            <span className="hidden sm:inline text-xs font-mono">TikTok</span>
          </a>
          <a
            href="https://wa.me/593993260464?text=Hola%20Lenni!%20Deseo%20hacer%20un%20pedido%20de%20granizados%20para%20refrescarme!%20🧊"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl transition-all shadow-md shadow-green-500/20 active:scale-95 cursor-pointer"
            title="WhatsApp: +593 993260464"
          >
            <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
            <span className="hidden lg:inline text-xs">WhatsApp +593 993260464</span>
            <span className="inline lg:hidden text-xs">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 py-12 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-900 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Glowing aura */}
        <div className="absolute top-10 w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 text-xs font-semibold tracking-wide">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Preparado al Instante · 100% Artesanal natural
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            El granizado más refrescante está a solo <span className="text-[#FFD166]">$3.00</span> — <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">y tu primer sorbo cambia el día.</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Granizados artesanales preparados con nieve fina de hielo purificado, jarabes elaborados a base de pura fruta y un toque de Lenni Tacuri que rescata instantáneamente tu tarde calurosa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => {
                const element = document.getElementById("builder-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#00C8E0] hover:bg-[#00DDF5] text-slate-950 text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4.5 w-4.5" />
              Diseñar Mi Propio Granizado
            </button>
            <a
              href="#prices-section"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              Ver Vasos y Precios
            </a>
          </div>

          {/* Core prices quick tags */}
          <div className="flex flex-wrap gap-2.5 justify-center pt-8">
            <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/80 text-xs text-slate-400">
              Chico <strong className="text-white ml-1">$1.00</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/80 text-xs text-slate-400">
              Mediano <strong className="text-white ml-1">$2.00</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/80 text-xs text-slate-400">
              Grande <strong className="text-white ml-1">$2.50</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-950/20 border border-amber-900/40 text-xs text-[#FFD166] font-bold">
              🔥 Premium XL con Topping <strong className="text-[#FFD166] ml-1">$3.00</strong>
            </span>
          </div>
        </div>
      </section>

      {/* CORE FEATURED COMPONENT: INTERACTIVE GRANIZADO BUILDER */}
      <section id="builder-section" className="px-6 py-16 bg-slate-900/40 border-b border-slate-900 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono inline-block">
              La Máquina Mezcladora
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              Diseña tu Refresco Perfecto
            </h2>
            <p className="text-slate-400 text-sm sm:text-md max-w-xl mx-auto">
              Elige el tamaño, selecciona jarabes frutales premium a tu gusto y decóralo con toppings inolvidables. ¡Te preparamos el pedido real al instante!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customized Controls Selection (Column spacing: 7) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-8 shadow-xl">
              
              {/* Size Select */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Paso 1: Elige el Tamaño de tu Vaso
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "pequeno", name: "Chico", vol: "7 oz", price: "$1.00" },
                    { id: "mediano", name: "Mediano", vol: "10 oz", price: "$2.00" },
                    { id: "grande", name: "Grande", vol: "12 oz", price: "$2.50" },
                    { id: "premium", name: "Premium XL", vol: "16 oz", price: "$3.00", badge: "Más Vendido" }
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz.id as any)}
                      className={`relative p-3.5 rounded-xl border text-center flex flex-col items-center justify-between transition-all cursor-pointer ${
                        selectedSize === sz.id
                          ? "bg-cyan-950/30 border-[#00C8E0] text-white shadow-lg"
                          : "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {sz.badge && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                          {sz.badge}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-mono tracking-widest">{sz.vol}</span>
                      <span className="text-sm font-bold mt-1">{sz.name}</span>
                      <span className="text-xs font-mono font-bold text-cyan-400 mt-2">{sz.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Syrups / Flavors Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Paso 2: Elige hasta 3 Jarabes Frutales
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans">Puedes combinar sabores</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: "fresa", name: "Fresa Natural", emo: "🍓", cat: "Frutal dulce" },
                    { id: "mango", name: "Mango Costa", emo: "🥭", cat: "Tropical tropical" },
                    { id: "limon", name: "Limón Andino", emo: "🍋", cat: "Ácido cítrico" },
                    { id: "frambuesa", name: "Frambuesa Azul", emo: "💙", cat: "Frescura ácida" },
                    { id: "arcoiris", name: "Arcoíris", emo: "🌈", cat: "Mezcla secreta" }
                  ].map((flavor) => {
                    const active = selectedFlavors.includes(flavor.id);
                    return (
                      <button
                        key={flavor.id}
                        onClick={() => toggleFlavor(flavor.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          active
                            ? "bg-cyan-950/30 border-[#00C8E0] text-white shadow-md"
                            : "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-2xl">{flavor.emo}</span>
                        <div className="mt-2 overflow-hidden">
                          <span className="text-xs font-bold leading-tight block truncate">{flavor.name}</span>
                          <span className="text-[9px] text-slate-500 font-sans truncate block">{flavor.cat}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extras Toppings Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Paso 3: Añade Toppings Premium
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {selectedSize === "premium" ? "¡1er Topping Gratis!" : "+$0.50 cada uno"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "leche_condensada", name: "Leche Condensada", emo: "🥛" },
                    { id: "cereza", name: "Cereza Almíbar", emo: "🍒" },
                    { id: "chispas", name: "Chispas de Colores", emo: "🍭" },
                    { id: "chocolate", name: "Choco Drizzle", emo: "🍫" }
                  ].map((extra) => {
                    const active = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                          active
                            ? "bg-cyan-950/30 border-[#00C8E0] text-white shadow-md"
                            : "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-xl">{extra.emo}</span>
                        <span className="text-xs font-medium mt-1 inline-block text-center leading-tight">
                          {extra.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INTEGRATED GEMINI FLAVOR SUGGESTION WIDGET */}
              <div className="pt-4 border-t border-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Recomendador Inteligente de Mezclas
                    </span>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/30">
                    Gemini 2.5 Server-Side
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-500 font-bold uppercase block">Tu Estado de Ánimo o Clima</label>
                    <select
                      value={userMood}
                      onChange={(e) => setUserMood(e.target.value)}
                      className="w-full text-xs rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-slate-200 outline-none focus:border-cyan-500"
                    >
                      <option value="caluroso">🥵 Muero de calor sofocante</option>
                      <option value="estresado">🤯 Estresado del trabajo/clases</option>
                      <option value="cansado">😴 Fatiga generalizada de tarde</option>
                      <option value="alegre">🥳 Alegre y quiero festejar algo dulce</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-500 font-bold uppercase block">Intensidad Preferida</label>
                    <select
                      value={userPreference}
                      onChange={(e) => setUserPreference(e.target.value)}
                      className="w-full text-xs rounded-lg bg-slate-900 border border-slate-800 p-2.5 text-slate-200 outline-none focus:border-cyan-500"
                    >
                      <option value="muy dulce con crema">🥛 Bien dulce con crema</option>
                      <option value="acido refrescante">🍋 Acidito y refrescante</option>
                      <option value="frutal tropical">🥭 Tropical exótico</option>
                      <option value="explosión de colores">🌈 Mezclas tricolor divertidas</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={getAISuggestion}
                    disabled={isAiLoading}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-850/80 border border-slate-800 hover:border-slate-705 rounded-xl text-xs font-semibold tracking-wide text-cyan-400 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Compass className="h-4 w-4 text-cyan-400" />
                    {isAiLoading ? "Analizando jarabes de frutas..." : "Consultar Consultora AI de Combinación"}
                  </button>

                  <AnimatePresence>
                    {aiSuggestion && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-cyan-950/20 border border-cyan-900/40 rounded-xl"
                      >
                        <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest block mb-1">
                          Propuesta del Gurú Bajo 0:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{aiSuggestion}</p>
                        <span className="text-[9px] text-slate-500 font-mono mt-1 block">
                          * Los sabores e ingredientes recomendados fueron configurados en el panel de arriba de inmediato.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* Right Column: Live Granizado Cup Preview Screen (Column spacing: 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden text-center">
              
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cyan-950/10 to-transparent pointer-events-none" />

              <div>
                <span className="text-xs font-bold tracking-widest text-[#00C8E0] uppercase">Vista de Preparación</span>
                <p className="text-slate-400 text-xs mt-0.5">La combinación de tu vaso en tiempo real</p>
              </div>

              {/* Graphic Cup preview representation */}
              <div className="flex-1 flex items-center justify-center py-4 min-h-[300px]">
                <div className="relative w-52 h-64 flex items-center justify-center">
                  
                  {/* Straw representation */}
                  <div className="absolute top-0 right-16 w-3 h-48 bg-cyan-400 border border-slate-950 rounded-full rotate-12 z-15 shadow-md shadow-cyan-400/20" />
                  
                  {/* Dome representation limit */}
                  <div className="absolute top-14 w-36 h-20 rounded-t-full bg-white/10 border-t border-x border-white/20 backdrop-blur-sm z-10" />

                  {/* Shaved ice mountain representation */}
                  <div 
                    style={getLiquidGradientStyle()}
                    className="absolute top-16 w-34 h-22 rounded-t-full z-12 animate-pulse overflow-hidden shadow-inner flex items-center justify-center transition-all duration-500"
                  >
                    {/* Ice texture effects inside mountain */}
                    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_#ffffff_10%,_transparent_55%)]" />
                    <span className="text-3xl select-none relative z-25 z-0">❄️</span>
                  </div>

                  {/* Glass Body container */}
                  <div className="absolute top-26 w-32 h-40 bg-white/5 border border-white/10 rounded-b-3xl backdrop-blur-xs z-10 flex flex-col justify-end p-3 overflow-hidden">
                    
                    {/* Floating Liquid Level inside glass */}
                    <div 
                      style={getLiquidGradientStyle()}
                      className="w-full h-4/5 rounded-b-2xl opacity-85 transition-all duration-500 relative flex items-center justify-center h-full"
                    >
                      {/* Bubble effects */}
                      <div className="absolute bottom-2 left-4 w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" />
                      <div className="absolute bottom-6 right-6 w-1 h-1 rounded-full bg-white/45 animate-bounce" />
                    </div>

                    {/* Shaved ice logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-slate-950/70 border border-slate-700/50 flex items-center justify-center z-20">
                        <span className="text-xs font-bold text-cyan-400 font-mono">B0</span>
                      </div>
                    </div>
                  </div>

                  {/* Toppings visual stickers overlays */}
                  {selectedExtras.map((ex, exIdx) => (
                    <div
                      key={ex}
                      className="absolute z-20"
                      style={{
                        top: `${40 + exIdx * 20}px`,
                        left: `${45 + exIdx * 35}px`
                      }}
                    >
                      <span className="text-2xl animate-bounce" style={{ animationDelay: `${exIdx * 0.4}s` }}>
                        {ex === "leche_condensada" ? "🥛" : ex === "cereza" ? "🍒" : ex === "chispas" ? "🍭" : "🍫"}
                      </span>
                    </div>
                  ))}

                  {/* Under cup shadow */}
                  <div className="absolute bottom-0 w-36 h-3 bg-slate-950/80 rounded-full blur-md" />
                </div>
              </div>

              {/* Dynamic Price Receipt */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Vaso:</span>
                  <span className="text-slate-200 font-semibold uppercase">{selectedSize}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Sirope de Selección ({selectedFlavors.length}):</span>
                  <span className="text-slate-200 font-semibold truncate max-w-[150px]">{selectedFlavors.join(", ")}</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Toppings:</span>
                    <span className="text-slate-200 font-semibold truncate max-w-[150px]">{selectedExtras.join(", ")}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#00C8E0]">Precio Total:</span>
                  <span className="text-lg font-mono font-black text-white">${calculateTotalPrice()}</span>
                </div>
              </div>

              {/* Checkout CTA button (Sends direct WhatsApp parameters) */}
              <button
                onClick={triggerWhatsAppOrder}
                className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md shadow-cyan-400/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 fill-slate-950 text-slate-950" />
                ¡Enviar Pedido Directo a Lenni por WhatsApp! 🧊
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* CORE STATS GRID / BENEFITS SECTION */}
      <section className="px-6 py-16 bg-slate-950 border-b border-slate-900 leading-normal">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
              Insuperable Calidad
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ¿Por qué Paraíso Bajo 0 es Diferente?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              No dejes tu refresco diario al azar de productos artificiales de fábrica. Conoce nuestros pilares.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Alivio Instantáneo", desc: "Reduce tu temperatura corporal y recupera tu enfoque en segundos. Ideal para las tardes calurosas de Machala." },
              { icon: "🍧", title: "Nieve Ultra Fina", desc: "El hielo se tritura con un espesor esponjoso y fino que absorbe el sirope perfectamente. No mueras masticando bloques duros." },
              { icon: "🍓", title: "Pura Pulpa de Fruta", desc: "Nuestros almíbares se elaboran cocinando frutas frescas seleccionadas para asegurar sabores genuinos y sanos." },
              { icon: "🛡️", title: "Garantía de Satisfacción", desc: "¿No quedaste verdaderamente refrescado? Lenni te lo vuelve a preparar gratis de inmediato. Sin letra pequeña." }
            ].map((f, i) => (
              <div key={i} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <span className="text-3xl block mb-3">{f.icon}</span>
                  <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-normal">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STATIC PRICING MATRIX TABLES */}
      <section id="prices-section" className="px-6 py-16 bg-slate-900/20 border-b border-slate-900 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-widest font-mono">
              La Carta Oficial
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Precios Sencillos y Claros
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Sin aumentos sorpresa de precio. Escoge el tamaño que mejor se adapte a tu antojo del momento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Paso Chico", vol: "7 oz / Pequeño", price: "1.00", dec: "Para cuando el antojo es rápido y el presupuesto es justo. Chico en tamaño, gigante en sabor.", action: "Chico de $1.00" },
              { name: "Mediano Clásico", vol: "10 oz / Mediano", price: "2.00", dec: "El balance ideal para refrescarte a media tarde sin preocuparte por el gasto. El comodín favorito.", action: "Mediano de $2.00" },
              { name: "Vaso Grande", vol: "12 oz / Grande", price: "2.50", dec: "Para esos días calurosos en los que necesitas un extra de jarabe y hielo para rendir el resto del día.", action: "Grande de $2.50" },
              { name: "Premium XL Signature", vol: "16 oz / XL", price: "3.00", dec: "La experiencia gourmet definitiva. Vaso XL premium de 16 onzas con jarabe doble y topping a elección incluido.", action: "Premium XL de $3.00", featured: true }
            ].map((p, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between text-left relative transition-all ${
                  p.featured
                    ? "bg-slate-900 border-[#00C8E0] shadow-xl shadow-cyan-400/5 ring-1 ring-[#00C8E0]"
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C8E0] text-slate-950 text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full whitespace-nowrap">
                    Recomendado por Lenni
                  </span>
                )}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">{p.vol}</span>
                  <h3 className="text-md font-bold text-white">{p.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-white font-mono">${p.price}</span>
                    <span className="text-xs text-slate-500 ml-1">USD</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.dec}</p>
                </div>

                <a
                  href={`https://wa.me/593993260464?text=Hola%20Lenni!%20Deseo%20pedir%20el%20vaso%20${encodeURIComponent(p.action)}%20fresquito!%20🧊`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full mt-6 py-3 text-xs font-bold uppercase tracking-wider text-center rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    p.featured
                      ? "bg-cyan-400 hover:bg-cyan-300 text-slate-950"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  Lo Quiero
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FILTERABLE ALBUM / GALLERY IMAGE SYSTEM */}
      <section id="gallery-section" className="px-6 py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono block">La Galería</span>
              <h2 className="font-display text-3xl font-extrabold text-white mt-1">Nuestros Granizados Clásicos</h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", name: "Todos" },
                { id: "fresa", name: "Fresas 🍓" },
                { id: "limon", name: "Cítricos 🍋" },
                { id: "tropical", name: "Tropicales 🥭" },
                { id: "especial", name: "Especiales 🌈" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveGalleryFilter(filter.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    activeGalleryFilter === filter.id
                      ? "bg-cyan-950 border-cyan-400 text-cyan-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden border border-slate-900 hover:border-slate-800 bg-slate-900 shadow-xl aspect-video sm:aspect-square flex flex-col justify-end">
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85" />
                </div>
                <div className="relative p-5 z-10 space-y-1">
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">{item.category} Receta</span>
                    <span className="text-sm font-mono font-black text-cyan-400">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEEDBACK & REVIEWS TESTIMONIALS SECTION */}
      <section className="px-6 py-16 bg-slate-900/10 border-b border-slate-900">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
              Comunidad Feliz
            </span>
            <h2 className="font-display text-3xl font-black text-white">
              Opiniones de Clientes Refrescados
            </h2>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Lee lo que opinan los vecinos y visitantes tras probar Paraíso Bajo 0.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.slice(0, 3).map((t, idx) => (
              <div key={idx} className="p-6 bg-slate-950 border border-slate-900 rounded-2xl space-y-4 shadow-lg text-left relative flex flex-col justify-between">
                <span className="text-5xl font-serif text-cyan-500/10 absolute top-4 right-4">“</span>
                <div className="space-y-2">
                  <div className="flex gap-1 text-[#FFD166]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-900">
                  <div className="h-9 w-9 rounded-full bg-cyan-950 border border-cyan-800/40 flex items-center justify-center font-bold text-xs text-cyan-400">
                    {t.avatarChar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DETAILED FAQ ACCORDION SECTION */}
      <section id="faq-section" className="px-6 py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#00C8E0] uppercase tracking-widest font-mono">
              Tus Preguntas
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 text-xs">
              ¿Tienes dudas sobre los jarabes de frutas o cómo hacer tus pedidos? Resuélvelas aquí mismo.
            </p>
          </div>

          <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-900/20">
            {FAQ_DATA.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="border-b border-slate-900 last:border-0 text-left">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex justify-between items-center bg-slate-950 hover:bg-slate-900/30 transition-colors uppercase outline-none"
                  >
                    <span className="text-xs font-bold text-slate-200 tracking-wide font-display">
                      {faq.question}
                    </span>
                    <span className="h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center font-light text-cyan-400 font-mono">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900/50 bg-slate-950/20">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* LENNI'S GUARANTEE FLAG BRAND CARD */}
      <section className="px-6 py-12 bg-gradient-to-r from-cyan-950/20 via-slate-950 to-cyan-950/20 border-b border-slate-900">
        <div className="max-w-4xl mx-auto p-8 rounded-3xl border border-cyan-500/20 bg-slate-950 text-left flex flex-col sm:flex-row gap-6 items-center shadow-2xl relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-cyan-400/5 blur-2xl rounded-full" />
          
          <div className="h-20 w-20 rounded-2xl bg-cyan-400 flex items-center justify-center text-slate-950 text-4xl shrink-0 shadow-lg shadow-cyan-400/10">
            🛡️
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-xl font-extrabold text-white">
              Garantía Paraíso Bajo 0: Si no te refresca, no pagas.
            </h3>
            <p className="text-slate-450 text-xs leading-relaxed">
              Lenni Tacuri está convencido de la frescura perfecta de sus granizados. Si el sabor no es el idóneo o la nieve no calma tu tarde de sofoco, háznoslo saber de inmediato y solucionamos tu descontento devolviéndote el importe íntegro o preparándote uno nuevo con topping extra.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              <span className="flex items-center gap-1">✓ Cero complicaciones</span>
              <span className="flex items-center gap-1">✓ Sin letras pequeñas</span>
              <span className="flex items-center gap-1">✓ Producto 100% verificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA ENHANCEMENT */}
      <section className="px-6 py-16 md:py-24 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,200,224,0.06)_0%,_transparent_65%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-950/30 px-3.5 py-1.5 rounded-full border border-amber-900/40 inline-block font-mono">
            ⏳ El calor de Machala no da tregua
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
            ¿Listo para tu momento de nieve exótica?
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Por solo $1.00 o $3.00, pon en tu mano una copa de frescura increíble elaborada al momento.
          </p>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                const element = document.getElementById("builder-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-[#00C8E0] hover:bg-[#00DDF5] text-slate-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-cyan-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="h-4.5 w-4.5" />
              ¡Diseñar mi Granizado en la Mezcladora!
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6 text-center text-slate-500 space-y-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="font-display text-sm font-black text-white uppercase tracking-wider block">
              🧊 Paraíso Bajo 0
            </span>
            <p className="text-xs text-slate-500 leading-normal">
              "Donde el calor de Machala se rinde ante el sabor artesanal más puro."
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-end">
            <a
              href="https://wa.me/593993260464"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-green-950/20 border border-green-900/40 text-[#25D366] hover:bg-green-900/10 hover:border-green-500/50 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>📱</span>
              <span>WhatsApp: +593 993260464</span>
            </a>
            <a
              href="https://www.tiktok.com/@paraiso.bajo.0.gra?_r=1&_t=ZS-96iquNbC4KS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-705 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-cyan-400 font-sans">🎵</span>
              <span>TikTok: @paraiso.bajo.0.gra</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
          <span>&copy; {new Date().getFullYear()} Paraíso Bajo 0. Hecho para Lenni Tacuri con orgullo artesanal.</span>
          <span className="text-slate-600 font-mono text-[10px]">Machala, Ecuador · Disfruta con moderación helada</span>
        </div>
      </footer>

      {/* FLUTTER-STYLE GLOWING CORNER FLOATING ACTION BUTTONS */}
      <div className={`fixed right-6 z-50 flex flex-col gap-3.5 items-end transition-all duration-300 ${scrollY > 300 ? "bottom-24 md:bottom-8" : "bottom-8"}`}>
        
        {/* TikTok FAB */}
        <motion.a
          href="https://www.tiktok.com/@paraiso.bajo.0.gra?_r=1&_t=ZS-96iquNbC4KS"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white border border-zinc-800 shadow-[0_0_15px_rgba(239,68,68,0.25),_0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4),_0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          title="Síguenos en TikTok"
        >
          {/* Action label tooltips (slides in gracefully on desktop hover) */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-right transition-all duration-200 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-850 text-xs font-bold text-slate-100 whitespace-nowrap shadow-xl pointer-events-none">
            🎵 Síguenos en TikTok
          </span>
          {/* Sleek glitch outline rings */}
          <span className="absolute inset-0 rounded-full border border-cyan-400/25 group-hover:border-cyan-400/50 scale-105 pointer-events-none transition-colors" />
          <span className="absolute inset-0 rounded-full border border-rose-500/25 group-hover:border-rose-500/50 scale-110 pointer-events-none transition-colors" />
          <svg className="h-6 w-6 fill-white text-white filter drop-shadow-[0_0_1px_rgba(14,165,233,0.5)]" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.94.1 1.89.04 2.83.02v3.74c-1.28-.05-2.52-.51-3.57-1.25-.09 1.95-.02 3.91-.03 5.86 0 3.32-2.12 6.43-5.32 7.02-3.11.75-6.52-1.12-7.42-4.14-.99-3.1 1-6.66 4.14-7.46.73-.18 1.48-.19 2.22-.09v3.83c-.8-.23-1.68-.05-2.3.52-.63.63-.82 1.63-.44 2.45.39.86 1.34 1.36 2.26 1.15.89-.15 1.55-.94 1.58-1.85V0h-.02z"/>
          </svg>
        </motion.a>

        {/* WhatsApp FAB */}
        <motion.a
          href="https://wa.me/593993260464?text=Hola%20Lenni!%20Deseo%20hacer%20un%20pedido%20de%20granizados%20para%20refrescarme!%20🧊"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#25D366] to-[#128C7E] text-white shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-all cursor-pointer"
          title="WhatsApp +593 993260464"
        >
          {/* Action label Tooltip */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-right transition-all duration-200 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-850 text-xs font-bold text-slate-100 whitespace-nowrap shadow-xl pointer-events-none">
            💬 ¡Pedir por WhatsApp!
          </span>
          {/* Pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 group-hover:opacity-30 animate-ping group-hover:animate-none scale-100" />
          <MessageCircle className="h-6 w-6 fill-white text-[#25D366]" />
        </motion.a>

      </div>

    </div>
  );
}
