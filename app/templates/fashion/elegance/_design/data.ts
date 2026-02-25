/* ── Maison Elegance Mock Data ──────────────────────────────────────────── */

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
    id: "heritage-wool-blazer",
    name: "Heritage Woll-Blazer",
    price: 1250,
    category: "jackets",
    collection: "heritage",
    description:
      "Makellos geschneidert aus italienischer Schurwolle, verkörpert dieser zweireihige Blazer zeitlose Eleganz. Goldfarbene Knöpfe und eine strukturierte Silhouette würdigen die klassische Herrenmode und bleiben dabei unverkennbar modern.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Marine", hex: "#041E3C" },
      { name: "Anthrazit", hex: "#3D3D3D" },
      { name: "Kamel", hex: "#B8A070" },
    ],
    gradient:
      "linear-gradient(135deg, #041E3C 0%, #0A3260 40%, #B8A070 100%)",
    image: "/templates/fashion/elegance/images/products/heritage-wool-blazer.jpg",
    isNew: true,
  },
  {
    id: "silk-drape-blouse",
    name: "Seiden-Drapé-Bluse",
    price: 685,
    category: "shirts",
    collection: "summer-essentials",
    description:
      "Gefertigt aus Maulbeerseide mit einem fließenden Fall, der sich mit müheloser Anmut bewegt. Die legere Passform und die Perlmuttknöpfe zeugen von dezenter Opulenz – perfekt zum Kombinieren oder als Solitär.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Elfenbein", hex: "#F5F0E8" },
      { name: "Rosé", hex: "#C17C74" },
      { name: "Schiefer", hex: "#8B8680" },
    ],
    gradient:
      "linear-gradient(160deg, #F5F0E8 0%, #E8E3DA 30%, #C17C74 100%)",
    image: "/templates/fashion/elegance/images/products/silk-drape-blouse.jpg",
    isNew: true,
  },
  {
    id: "palazzo-evening-gown",
    name: "Palazzo Abendkleid",
    price: 2450,
    category: "dresses",
    collection: "evening-edit",
    description:
      "Ein bodenlanges Säulenkleid aus Duchesse-Satin mit einem dramatisch drapierten Rückenausschnitt. Handgefertigte Nähte und ein verborgenes Korsettmieder garantieren eine makellose Silhouette, die jeden Raum beherrscht.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Mitternacht", hex: "#041E3C" },
      { name: "Champagner", hex: "#B8A070" },
    ],
    gradient:
      "radial-gradient(ellipse at 30% 20%, #B8A070 0%, #041E3C 60%, #0F1B33 100%)",
    image: "/templates/fashion/elegance/images/products/palazzo-evening-gown.jpg",
    isNew: true,
  },
  {
    id: "tailored-wool-trousers",
    name: "Maßgeschneiderte Wollhose",
    price: 595,
    originalPrice: 850,
    category: "pants",
    collection: "heritage",
    description:
      "Hochgeschnittene Hose mit weitem Bein aus saisonloser Super-120s-Wolle. Eine gebügelte Mittelfalte und ein Detail am Satinbund erheben das alltägliche Ankleiden zur Kunstform.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Schwarz", hex: "#1A1A1A" },
      { name: "Marine", hex: "#041E3C" },
      { name: "Creme", hex: "#F5F0E8" },
    ],
    gradient:
      "linear-gradient(180deg, #1A1A1A 0%, #2C2C2C 40%, #041E3C 100%)",
    image: "/templates/fashion/elegance/images/products/tailored-wool-trousers.jpg",
    isSale: true,
  },
  {
    id: "cashmere-wrap-coat",
    name: "Kaschmir-Wickelmantel",
    price: 1890,
    category: "jackets",
    collection: "heritage",
    description:
      "Hüllen Sie sich in reinen Kaschmir mit diesem Wickelmantel mit Gürtel. Der großzügige Schalkragen und die bodenlange Silhouette erzeugen eine Aura stiller Erhabenheit, während die handgesteppten Kanten meisterhafte Handwerkskunst widerspiegeln.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Kamel", hex: "#B8A070" },
      { name: "Graumeliert", hex: "#8B8680" },
    ],
    gradient:
      "linear-gradient(145deg, #B8A070 0%, #A88B50 35%, #8B8680 100%)",
    image: "/templates/fashion/elegance/images/products/cashmere-wrap-coat.jpg",
  },
  {
    id: "linen-resort-shirt",
    name: "Leinen-Resort-Hemd",
    price: 385,
    originalPrice: 520,
    category: "shirts",
    collection: "summer-essentials",
    description:
      "Gewaschenes belgisches Leinen in einer lässigen Reverskragen-Silhouette. Entworfen für sonnenüberflutete Tage und laue Abende, wird dieses Hemd mit jedem Tragen schöner und entwickelt einen Charakter, der ganz der Ihre ist.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#E8E3DA" },
      { name: "Himmelblau", hex: "#7A9BB5" },
      { name: "Weiß", hex: "#FAFAF7" },
    ],
    gradient:
      "linear-gradient(120deg, #E8E3DA 0%, #FAFAF7 40%, #7A9BB5 100%)",
    image: "/templates/fashion/elegance/images/products/linen-resort-shirt.jpg",
    isSale: true,
  },
  {
    id: "midi-wrap-dress",
    name: "Midi-Wickelkleid",
    price: 920,
    category: "dresses",
    collection: "summer-essentials",
    description:
      "Eine universell schmeichelhafte Wickelsilhouette aus fließendem Crêpe de Chine. Die Midilänge und die Flatterärmel bieten einen mühelos femininen Look – vom Morgenbesorgungen bis zum Abendessen bei Kerzenschein.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Terrakotta", hex: "#C17C74" },
      { name: "Olive", hex: "#6B7B5E" },
      { name: "Elfenbein", hex: "#F5F0E8" },
    ],
    gradient:
      "linear-gradient(135deg, #C17C74 0%, #D4A49E 40%, #F5F0E8 100%)",
    image: "/templates/fashion/elegance/images/products/midi-wrap-dress.jpg",
    isNew: true,
  },
  {
    id: "leather-chelsea-boots",
    name: "Leder-Chelsea-Boots",
    price: 745,
    category: "shoes",
    collection: "heritage",
    description:
      "Handgefertigt über dem Leisten aus vollnarbigem italienischem Kalbsleder mit rahmengenähter Goodyear-Welt-Konstruktion. Die schlanke Silhouette und die elastischen Einsätze vereinen zeitlosen Stil mit modernem Komfort.",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: [
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Schwarz", hex: "#1A1A1A" },
    ],
    gradient:
      "linear-gradient(150deg, #8B5E3C 0%, #5C3D28 50%, #1A1A1A 100%)",
    image: "/templates/fashion/elegance/images/products/leather-chelsea-boots.jpg",
  },
  {
    id: "gold-chain-necklace",
    name: "Signature Kettencollier",
    price: 480,
    category: "accessories",
    collection: "evening-edit",
    description:
      "Eine 18-Karat-Gold-Vermeil-Kette mit ineinandergreifendem Monogramm-Verschluss. Dieses vielseitige Schmuckstück lässt sich wunderbar kombinieren und verleiht jedem Ensemble eine Note raffinierter Opulenz.",
    sizes: ["One Size"],
    colors: [{ name: "Gold", hex: "#B8A070" }],
    gradient:
      "radial-gradient(circle at 40% 40%, #B8A070 0%, #A88B50 40%, #041E3C 100%)",
    image: "/templates/fashion/elegance/images/products/gold-chain-necklace.jpg",
  },
  {
    id: "performance-knit-polo",
    name: "Performance Strick-Polo",
    price: 295,
    originalPrice: 420,
    category: "shirts",
    collection: "active-luxe",
    description:
      "Technische Merinowolle, veredelt mit Stretchfasern, für ein Polo, das mühelos vom Yachtdeck zur Galerieeröffnung wechselt. Feuchtigkeitsableitend mit einem edlen Rippkragen.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Marine", hex: "#041E3C" },
      { name: "Weiß", hex: "#FAFAF7" },
      { name: "Waldgrün", hex: "#3D5A45" },
    ],
    gradient:
      "linear-gradient(135deg, #041E3C 0%, #3D5A45 50%, #FAFAF7 100%)",
    image: "/templates/fashion/elegance/images/products/performance-knit-polo.jpg",
    isSale: true,
  },
  {
    id: "wide-leg-silk-pants",
    name: "Weite Seidenhose",
    price: 780,
    category: "pants",
    collection: "evening-edit",
    description:
      "Fließende Seiden-Twill-Hose mit übertrieben weitem Bein und hohem Bund. Der glänzende Fall fängt das Licht wunderschön ein und macht sie zum Statementstück für den Abend oder gehobenes Tagesoutfit.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagner", hex: "#B8A070" },
      { name: "Schwarz", hex: "#1A1A1A" },
    ],
    gradient:
      "linear-gradient(170deg, #1A1A1A 0%, #3D3040 35%, #B8A070 100%)",
    image: "/templates/fashion/elegance/images/products/wide-leg-silk-pants.jpg",
  },
  {
    id: "leather-tote-bag",
    name: "Atelier Leder-Tote",
    price: 1150,
    category: "accessories",
    collection: "heritage",
    description:
      "Strukturiert und doch geschmeidig – diese Tote-Bag ist aus pflanzlich gegerbtem Leder gefertigt, das mit der Zeit eine edle Patina entwickelt. Innentaschen mit Wildlederfutter und handbemalte Kanten zeugen von höchster handwerklicher Qualität.",
    sizes: ["One Size"],
    colors: [
      { name: "Hellbraun", hex: "#B8956A" },
      { name: "Schwarz", hex: "#1A1A1A" },
      { name: "Burgunder", hex: "#6B2D3E" },
    ],
    gradient:
      "linear-gradient(140deg, #B8956A 0%, #8B5E3C 40%, #6B2D3E 100%)",
    image: "/templates/fashion/elegance/images/products/leather-tote-bag.jpg",
  },
];

/* ── Collections ───────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "heritage",
    name: "Heritage Kollektion",
    subtitle: "Zeitlose Grundlagen",
    description:
      "Eine kuratierte Auswahl beständiger Garderobe-Essentials. Jedes Stück schöpft aus Jahrzehnten sartorialer Tradition, neu interpretiert mit modernen Proportionen und den edelsten Naturstoffen aus den renommiertesten Webereien der Welt.",
    gradient:
      "linear-gradient(135deg, #041E3C 0%, #2C3E6B 30%, #B8A070 70%, #F5F0E8 100%)",
    image: "/templates/fashion/elegance/images/collections/heritage.jpg",
    productCount: 5,
  },
  {
    id: "summer-essentials",
    name: "Sommer-Essentials",
    subtitle: "Leicht und Leuchtend",
    description:
      "Mühelose Stücke, entworfen für sonnenerfüllte Tage und warme Abende. Atmungsaktive Leinen, fließende Seiden und eine von mediterranen Küsten inspirierte Farbpalette definieren diese Kollektion entspannter Raffinesse.",
    gradient:
      "linear-gradient(160deg, #F5F0E8 0%, #E8E3DA 25%, #C17C74 60%, #7A9BB5 100%)",
    image: "/templates/fashion/elegance/images/collections/summer-essentials.jpg",
    productCount: 3,
  },
  {
    id: "evening-edit",
    name: "Abend-Edition",
    subtitle: "Nächtliche Verführung",
    description:
      "Statementstücke für Anlässe, die nach dem Außergewöhnlichen verlangen. Edle Satins, schimmernde Metallics und dramatische Silhouetten sorgen dafür, dass Sie vom ersten Auftritt bis zum letzten Abschied alle Blicke auf sich ziehen.",
    gradient:
      "radial-gradient(ellipse at 25% 30%, #B8A070 0%, #041E3C 50%, #0F1B33 100%)",
    image: "/templates/fashion/elegance/images/collections/evening-edit.jpg",
    productCount: 3,
  },
  {
    id: "active-luxe",
    name: "Active Luxe",
    subtitle: "Edle Performance",
    description:
      "Wo technische Innovation auf sartoriale Eleganz trifft. Premium-Funktionsstoffe, durchdachte Verarbeitung und eine edle Ästhetik sorgen dafür, dass Sie makellos aussehen – ob auf dem Platz, im Club oder überall dazwischen.",
    gradient:
      "linear-gradient(135deg, #3D5A45 0%, #041E3C 40%, #F5F0E8 80%, #B8A070 100%)",
    image: "/templates/fashion/elegance/images/collections/active-luxe.jpg",
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
