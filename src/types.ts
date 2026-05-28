export interface CustomGranizado {
  size: "pequeno" | "mediano" | "grande" | "premium";
  flavors: string[]; // e.g. ["fresa", "mango"]
  extras: string[];  // e.g. ["leche_condensada", "cereza"]
  totalPrice: number;
}

export interface GranizadoPreset {
  name: string;
  size: "pequeno" | "mediano" | "grande" | "premium";
  flavors: string[];
  extras: string[];
  price: number;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarChar: string;
}
