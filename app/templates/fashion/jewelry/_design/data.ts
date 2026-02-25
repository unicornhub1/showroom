/* ── AURUM Jewelry Mock Data ────────────────────────────────────────────── */

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
    id: "eternity-solitaire-ring",
    name: "Eternity Solitär Ring",
    price: 890,
    category: "rings",
    collection: "signature",
    description:
      "Ein Solitär von zeitloser Reinheit. Gefasst in 18 Karat Gold, ruht ein einzelner, ethisch gewonnener Brillant auf einer hauchfeinen Bandschiene. Die minimalistische Fassung lässt den Stein in seinem vollen Feuer erstrahlen — ein Stück, das Generationen überdauert.",
    sizes: ["48", "50", "52", "54", "56", "58"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Roségold", hex: "#B76E79" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #f5ead6 0%, #e8dcc8 40%, #d4c4a8 100%)",
    image: "/templates/fashion/jewelry/images/products/eternity-solitaire-ring.jpg",
  },
  {
    id: "petite-chain-necklace",
    name: "Petite Chain Kette",
    price: 420,
    category: "necklaces",
    collection: "everyday",
    description:
      "Eine Kette von erlesener Zartheit. Jedes Glied der handgefertigten Kette aus 14 Karat Gold wird einzeln geschmiedet und poliert. Die federleichte Konstruktion schmiegt sich nahtlos an die Haut — ein täglicher Begleiter von diskreter Eleganz.",
    sizes: ["40cm", "42cm", "45cm"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Silber", hex: "#C0C0C0" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #faf6f0 0%, #e8e0d4 100%)",
    image: "/templates/fashion/jewelry/images/products/petite-chain-necklace.jpg",
    isNew: true,
  },
  {
    id: "baroque-pearl-ohrringe",
    name: "Baroque Pearl Ohrringe",
    price: 580,
    category: "earrings",
    collection: "signature",
    description:
      "Jedes Paar ein Unikat. Barocke Süßwasserperlen in ihrer natürlichen, organischen Form, gefasst in handgearbeiteten 18-Karat-Gold-Bügeln. Die Unvollkommenheit der Natur wird zum Designmerkmal — modern, kühn und zutiefst poetisch.",
    sizes: ["One Size"],
    colors: [{ name: "Gold/Pearl", hex: "#F5E6D3" }],
    gradient:
      "radial-gradient(circle at 50% 40%, #fff8f0 0%, #f0e4d4 100%)",
    image: "/templates/fashion/jewelry/images/products/baroque-pearl-ohrringe.jpg",
    isNew: true,
  },
  {
    id: "minimal-cuff-armband",
    name: "Minimal Cuff Armband",
    price: 340,
    category: "bracelets",
    collection: "everyday",
    description:
      "Reduziert auf das Wesentliche. Ein offener Armreif aus massivem, recyceltem Gold, von Hand in eine sanfte Kurve geformt. Die satinierte Oberfläche fängt das Licht in einem weichen Schimmer — ein Statement der Zurückhaltung.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Silber", hex: "#C0C0C0" },
      { name: "Roségold", hex: "#B76E79" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #f8f0e6 0%, #e6dace 100%)",
    image: "/templates/fashion/jewelry/images/products/minimal-cuff-armband.jpg",
  },
  {
    id: "signet-ring-heritage",
    name: "Signet Ring „Héritage“",
    price: 720,
    category: "rings",
    collection: "heritage",
    description:
      "Inspiriert von Siegelringen des 18. Jahrhunderts, neu interpretiert mit modernem Minimalismus. Massives 18-Karat-Gold mit einer polierten Siegelfläche, die zur Gravur einlädt. Ein Erbstück ab dem ersten Tragen.",
    sizes: ["50", "52", "54", "56", "58", "60"],
    colors: [{ name: "Gold", hex: "#C9A96E" }],
    gradient:
      "radial-gradient(circle at 50% 40%, #e8d8c0 0%, #c9a96e 50%, #b8986a 100%)",
    image: "/templates/fashion/jewelry/images/products/signet-ring-heritage.jpg",
  },
  {
    id: "layering-set-ketten",
    name: "Layering Set Ketten",
    price: 650,
    category: "necklaces",
    collection: "signature",
    description:
      "Drei Ketten, perfekt aufeinander abgestimmt. Ein Choker, eine Prinzess- und eine Matinée-Länge — einzeln raffiniert, zusammen ein Kunstwerk. Jede Kette aus 14 Karat Gold mit unterschiedlichen Gliederstärken für ein lebendiges Spiel aus Licht und Textur.",
    sizes: ["Set (38cm/42cm/50cm)"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Mixed", hex: "#D4B896" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #faf4ea 0%, #e0d4c4 100%)",
    image: "/templates/fashion/jewelry/images/products/layering-set-ketten.jpg",
  },
  {
    id: "pave-diamond-studs",
    name: "Pavé Diamond Studs",
    price: 1250,
    category: "earrings",
    collection: "heritage",
    description:
      "Mikroskopisch präzise gefasst. Jeder Ohrring trägt ein Cluster aus 19 Diamanten in Pavé-Fassung, die ein nahtloses Meer aus Brillanz erzeugen. Weißgold oder Gelbgold — der zeitlose Glanz bleibt derselbe.",
    sizes: ["One Size"],
    colors: [
      { name: "Weißgold", hex: "#E8E8E8" },
      { name: "Gold", hex: "#C9A96E" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #fafafa 0%, #e8e8e8 60%, #d0d0d0 100%)",
    image: "/templates/fashion/jewelry/images/products/pave-diamond-studs.jpg",
  },
  {
    id: "tennis-armband",
    name: "Tennis Armband",
    price: 1890,
    originalPrice: 2200,
    category: "bracelets",
    collection: "heritage",
    description:
      "Das ultimative Statement diskreter Opulenz. 42 einzeln gefasste Brillanten auf einem flexiblen Band aus 18-Karat-Gold. Das patentierte Sicherheitsschloss gewährt sorgenfreien Tragekomfort — Luxus, der sich leicht anfühlt.",
    sizes: ["16cm", "17cm", "18cm", "19cm"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Silber", hex: "#C0C0C0" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #faf6f0 0%, #c9a96e 100%)",
    image: "/templates/fashion/jewelry/images/products/tennis-armband.jpg",
    isSale: true,
  },
  {
    id: "twist-hoop-ohrringe",
    name: "Twist Hoop Ohrringe",
    price: 290,
    category: "earrings",
    collection: "everyday",
    description:
      "Klassische Creolen, neu erdacht. Die sanfte Torsion des 14-Karat-Gold-Drahtes erzeugt ein faszinierendes Lichtspiel bei jeder Bewegung. Leicht genug für den ganzen Tag, ausdrucksstark genug für den Abend.",
    sizes: ["One Size"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Silber", hex: "#C0C0C0" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #f5ead6 0%, #e0d0b8 100%)",
    image: "/templates/fashion/jewelry/images/products/twist-hoop-ohrringe.jpg",
    isNew: true,
  },
  {
    id: "medaillon-anhaenger",
    name: "Médaillon Anhänger",
    price: 560,
    category: "necklaces",
    collection: "signature",
    description:
      "Ein modernes Medaillon, das Erinnerungen bewahrt. Die handgravierte Oberfläche aus 18-Karat-Gold öffnet sich zu einem polierten Inneren für zwei Miniaturfotos. Ein zutiefst persönliches Schmuckstück mit zeitloser Ausstrahlung.",
    sizes: ["45cm", "50cm", "60cm"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Roségold", hex: "#B76E79" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #f0e4d4 0%, #d4c0a0 100%)",
    image: "/templates/fashion/jewelry/images/products/medaillon-anhaenger.jpg",
  },
  {
    id: "perlen-choker",
    name: "Perlen Choker",
    price: 480,
    category: "necklaces",
    collection: "everyday",
    description:
      "Perlen, modern interpretiert. Handverlesene Süßwasserperlen auf einem unsichtbaren Seidenfaden, verbunden durch ein minimalistisches 14-Karat-Gold-Schloss. Die Perlen liegen wie von selbst — ein Hauch von Klassik mit zeitgenössischer Leichtigkeit.",
    sizes: ["36cm", "38cm", "40cm"],
    colors: [
      { name: "Gold/Pearl", hex: "#F5E6D3" },
      { name: "Silber/Pearl", hex: "#F0F0F0" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #fff8f0 0%, #f0e8dc 100%)",
    image: "/templates/fashion/jewelry/images/products/perlen-choker.jpg",
  },
  {
    id: "stapelring-set",
    name: "Stapelring Set (3er)",
    price: 390,
    category: "rings",
    collection: "everyday",
    description:
      "Drei Ringe, unendliche Möglichkeiten. Ein glatter, ein gedrehter und ein gehämmerter Ring — jeweils aus unterschiedlichen Edelmetallen gefertigt. Einzeln subtil, gestapelt ein Statement. Recyceltes Gold und Silber für ein gutes Gewissen.",
    sizes: ["48", "50", "52", "54", "56"],
    colors: [
      { name: "Gold", hex: "#C9A96E" },
      { name: "Mixed Metals", hex: "#D4B896" },
    ],
    gradient:
      "radial-gradient(circle at 50% 40%, #f5ead6 0%, #e8d8c0 100%)",
    image: "/templates/fashion/jewelry/images/products/stapelring-set.jpg",
    isNew: true,
  },
];

/* ── Collections ───────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "signature",
    name: "Signature",
    subtitle: "Unsere Ikonen",
    description:
      "Zeitlose Stücke, die Generationen überdauern. Jedes Design wurde über Monate perfektioniert und verkörpert die Essenz von AURUM — Reduktion auf das Schöne.",
    gradient:
      "linear-gradient(135deg, #C9A96E 0%, #1A1A1A 100%)",
    image: "/templates/fashion/jewelry/images/collections/signature.jpg",
    productCount: 4,
  },
  {
    id: "everyday",
    name: "Everyday",
    subtitle: "Tägliche Begleiter",
    description:
      "Feiner Schmuck für jeden Moment. Leicht, anmutig und entworfen, um nie abgelegt zu werden. Von morgens bis abends, vom Büro bis zum Dinner.",
    gradient:
      "linear-gradient(135deg, #F3F0EB 0%, #C9A96E 100%)",
    image: "/templates/fashion/jewelry/images/collections/everyday.jpg",
    productCount: 5,
  },
  {
    id: "heritage",
    name: "Héritage",
    subtitle: "Erbstücke",
    description:
      "Außergewöhnliche Stücke mit edlen Steinen. Gefertigt für die bedeutendsten Momente des Lebens — Verlobungen, Jubiläen, Meilensteine.",
    gradient:
      "linear-gradient(135deg, #1A1A1A 0%, #C9A96E 100%)",
    image: "/templates/fashion/jewelry/images/collections/heritage.jpg",
    productCount: 3,
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
