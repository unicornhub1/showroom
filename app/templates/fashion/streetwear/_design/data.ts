/* ── VLTG Streetwear Mock Data ──────────────────────────────────────────── */

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  collection: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  gradient: string;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
};

export type Collection = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  gradient: string;
  image: string;
  productCount: number;
};

/* ── Products ──────────────────────────────────────────────────────────── */

export const products: Product[] = [
  {
    id: "air-phantom-x1",
    name: "Air Phantom X1",
    price: 219,
    category: "sneakers",
    collection: "drops",
    description:
      "Der Air Phantom X1 vereint aggressive Linienführung mit ultraleichter Dämpfung. Die zweigeteilte Sohle bietet maximale Flexibilität, während das atmungsaktive Mesh-Upper für ganztägigen Komfort sorgt. Ein Schuh, der auf der Straße genauso gut performt wie er aussieht.",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Weiß/Schwarz", hex: "#FFFFFF" },
      { name: "Volt/Schwarz", hex: "#CDFF00" },
    ],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
    image: "/templates/fashion/streetwear/images/products/air-phantom-x1.jpg",
  },
  {
    id: "urban-runner-pro",
    name: "Urban Runner Pro",
    price: 189,
    category: "sneakers",
    collection: "drops",
    description:
      "Triple Black trifft auf urbane Performance. Der Urban Runner Pro wurde für die Straße entwickelt — mit verstärkter Ferse, wasserdichter Membran und einer Sohle, die auf nassem Asphalt genauso greift wie auf trockenem. Dein täglicher Begleiter.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Triple Black", hex: "#0A0A0A" },
      { name: "Grau/Neon", hex: "#888888" },
    ],
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%)",
    image: "/templates/fashion/streetwear/images/products/urban-runner-pro.jpg",
    isNew: true,
  },
  {
    id: "cloud-walker-3",
    name: "Cloud Walker 3.0",
    price: 249,
    category: "sneakers",
    collection: "essentials",
    description:
      "Die dritte Generation unseres meistverkauften Lifestyle-Sneakers. Premium-Leder trifft auf cloudbasierte Zwischensohle für ein Laufgefühl wie auf Wolken. Das minimalistische Design macht ihn zum perfekten Begleiter für jedes Outfit.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Cream/Tan", hex: "#F5E6D3" },
      { name: "All White", hex: "#FFFFFF" },
    ],
    gradient: "linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)",
    image: "/templates/fashion/streetwear/images/products/cloud-walker-3.jpg",
  },
  {
    id: "street-bomber-jacket",
    name: "Street Bomber Jacket",
    price: 345,
    category: "jackets",
    collection: "essentials",
    description:
      "Schwere Baumwolle trifft auf taktischen Look. Die Street Bomber Jacket hat eine wasserabweisende Außenschicht, RiRi-Reißverschlüsse und eine isolierende Füllung für die kalten Monate. Oversized Fit mit versteckten Innentaschen. Built for the streets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Olive", hex: "#556B2F" },
    ],
    gradient: "linear-gradient(135deg, #2d2d2d 0%, #556B2F 100%)",
    image: "/templates/fashion/streetwear/images/products/street-bomber-jacket.jpg",
    isNew: true,
  },
  {
    id: "oversized-hoodie-vltg",
    name: 'Oversized Hoodie "VLTG"',
    price: 129,
    category: "hoodies",
    collection: "basics",
    description:
      "450gsm schwerer French Terry. Der VLTG Oversized Hoodie ist kein normaler Hoodie — er ist ein Statement. Doppelte Kapuzenschicht, Känguru-Tasche mit verstecktem Reißverschluss und gerippte Bündchen. Relaxed Fit, der trotzdem clean aussieht.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Graumeliert", hex: "#9E9E9E" },
      { name: "Sage", hex: "#87AE73" },
    ],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    image: "/templates/fashion/streetwear/images/products/oversized-hoodie-vltg.jpg",
  },
  {
    id: "cargo-tech-pants",
    name: "Cargo Tech Pants",
    price: 165,
    category: "pants",
    collection: "essentials",
    description:
      "Technisches Ripstop-Material mit 4-Way-Stretch. Sechs taktische Taschen, verstellbare Knöchelbündchen und ein lockerer Schnitt, der Bewegungsfreiheit garantiert. Die Cargo Tech Pants sind für Leute, die Style und Funktion nicht trennen wollen.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Stone", hex: "#A69F95" },
      { name: "Olive", hex: "#556B2F" },
    ],
    gradient: "linear-gradient(135deg, #3d3d3d 0%, #556B2F 100%)",
    image: "/templates/fashion/streetwear/images/products/cargo-tech-pants.jpg",
  },
  {
    id: "logo-snapback-cap",
    name: "Logo Snapback Cap",
    price: 49,
    category: "accessories",
    collection: "basics",
    description:
      "Klassische 6-Panel-Konstruktion mit flachem Schirm und gesticktem VLTG-Logo. Snapback-Verschluss für universelle Passform. Aus robuster Baumwolle mit verstärkten Nähten — ein Accessoire, das Haltung zeigt.",
    sizes: ["One Size"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Weiß", hex: "#FFFFFF" },
    ],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
    image: "/templates/fashion/streetwear/images/products/logo-snapback-cap.jpg",
  },
  {
    id: "retro-high-top",
    name: "Retro High-Top",
    price: 199,
    originalPrice: 259,
    category: "sneakers",
    collection: "sale",
    description:
      "Old-School-Silhouette trifft auf moderne Materialien. Der Retro High-Top kombiniert klassisches Design mit aktueller Technologie — vulkanisierte Sohle, gepolsterter Schaftrand und Premium-Leder in auffälligen Colorways. Ein Klassiker, neu interpretiert.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Rot/Weiß", hex: "#FF3B30" },
      { name: "Blau/Weiß", hex: "#0066CC" },
    ],
    gradient: "linear-gradient(135deg, #FF3B30 0%, #cc0000 100%)",
    image: "/templates/fashion/streetwear/images/products/retro-high-top.jpg",
    isSale: true,
  },
  {
    id: "mesh-performance-tee",
    name: "Mesh Performance Tee",
    price: 69,
    category: "tshirts",
    collection: "basics",
    description:
      "Leichtes, atmungsaktives Mesh-Material mit schnelltrocknenden Eigenschaften. Der Performance Tee wurde für Bewegung gebaut — ob beim Training, auf dem Board oder im Club. Oversized Cut mit Mesh-Einsätzen an den Seiten.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Weiß", hex: "#FFFFFF" },
      { name: "Neon", hex: "#CDFF00" },
    ],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #CDFF00 100%)",
    image: "/templates/fashion/streetwear/images/products/mesh-performance-tee.jpg",
    isNew: true,
  },
  {
    id: "heavyweight-crewneck",
    name: "Heavyweight Crewneck",
    price: 159,
    category: "hoodies",
    collection: "essentials",
    description:
      "500gsm schwerer Baumwoll-Fleece. Kein Logo, kein Branding — nur pure Qualität. Der Heavyweight Crewneck ist für Leute, die wissen, was sie tragen. Boxy Fit, gerippte Bündchen und eine Verarbeitung, die Jahre hält.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Cream", hex: "#F5E6D3" },
    ],
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #f5e6d3 100%)",
    image: "/templates/fashion/streetwear/images/products/heavyweight-crewneck.jpg",
  },
  {
    id: "utility-crossbody-bag",
    name: "Utility Crossbody Bag",
    price: 89,
    category: "accessories",
    collection: "essentials",
    description:
      "Kompakt, funktional und urban. Die Utility Crossbody Bag hat ein wasserabweisendes Cordura-Außenmaterial, mehrere Fächer und einen verstellbaren Gurt mit Schnellverschluss. Perfekt für alles, was du unterwegs brauchst — nicht mehr, nicht weniger.",
    sizes: ["One Size"],
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Olive", hex: "#556B2F" },
    ],
    gradient: "linear-gradient(135deg, #2d2d2d 0%, #556B2F 100%)",
    image: "/templates/fashion/streetwear/images/products/utility-crossbody-bag.jpg",
  },
  {
    id: "platform-runner",
    name: "Platform Runner",
    price: 279,
    category: "sneakers",
    collection: "drops",
    description:
      "Statement-Sneaker mit überhoher Plattformsohle. Der Platform Runner ist pure Provokation — 5cm Sohlenhöhe, asymmetrisches Schnürsystem und reflektierende Details. Für alle, die nicht nur gesehen, sondern angestarrt werden wollen.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Schwarz/Neon", hex: "#CDFF00" },
      { name: "Weiß/Grau", hex: "#E0E0E0" },
    ],
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #CDFF00 100%)",
    image: "/templates/fashion/streetwear/images/products/platform-runner.jpg",
    isNew: true,
  },
];

/* ── Collections ───────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "drops",
    name: "Neue Drops",
    subtitle: "Gerade gelandet",
    description:
      "Die neuesten Releases — limitiert und exklusiv. Wer zuerst kommt, mahlt zuerst.",
    gradient: "linear-gradient(135deg, #CDFF00 0%, #0a0a0a 100%)",
    image: "/templates/fashion/streetwear/images/collections/drops.jpg",
    productCount: 3,
  },
  {
    id: "essentials",
    name: "Essentials",
    subtitle: "Unverzichtbar",
    description:
      "Die Grundpfeiler deines Streetwear-Looks. Qualität, die du jeden Tag tragen willst.",
    gradient: "linear-gradient(135deg, #333 0%, #0a0a0a 100%)",
    image: "/templates/fashion/streetwear/images/collections/essentials.jpg",
    productCount: 5,
  },
  {
    id: "basics",
    name: "Basics",
    subtitle: "Everyday Staples",
    description:
      "Minimalistische Basics für jeden Tag. Kein Schnickschnack, nur Substanz.",
    gradient: "linear-gradient(135deg, #555 0%, #1a1a1a 100%)",
    image: "/templates/fashion/streetwear/images/collections/basics.jpg",
    productCount: 3,
  },
  {
    id: "sale",
    name: "Sale",
    subtitle: "Reduziert",
    description:
      "Ausgewählte Styles zu reduzierten Preisen. Schnell sein lohnt sich.",
    gradient: "linear-gradient(135deg, #FF3B30 0%, #0a0a0a 100%)",
    image: "/templates/fashion/streetwear/images/collections/sale.jpg",
    productCount: 1,
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collection === collectionId);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.isSale);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
