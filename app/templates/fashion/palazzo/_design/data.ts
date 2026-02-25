/* ── PALAZZO Mock Data ──────────────────────────────────────────────────── */

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
    id: "firenze-lederjacke",
    name: "Firenze Lederjacke",
    price: 2890,
    category: "jackets",
    collection: "notte-italiana",
    description:
      "Meisterhaft gefertigt aus butterweichem toskanischem Lammleder mit handpolierten Messingbeschlägen. Die schmale Silhouette und der Stehkragen verkörpern italienische Eleganz in ihrer reinsten Form. Seidengewebtes Innenfutter mit Palazzo-Monogramm.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Cognac", hex: "#8B5E3C" },
      { name: "Bordeaux", hex: "#6B2D3E" },
    ],
    gradient:
      "linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 40%, #6B2D3E 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "seta-seidenbluse",
    name: "Seta Seidenbluse",
    price: 785,
    category: "shirts",
    collection: "primavera-dorata",
    description:
      "Feinste Como-Seide, handgewebt in der Tradition lombardischer Seidenmanufakturen. Der fließende Fall und die verdeckte Knopfleiste mit Perlmuttknöpfen verleihen diesem Stück mühelose Raffinesse. Jede Bluse wird einzeln nummeriert.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Avorio", hex: "#FFFEF7" },
      { name: "Oro Antico", hex: "#C9A55C" },
      { name: "Grigio", hex: "#7A7267" },
    ],
    gradient:
      "linear-gradient(160deg, #FFFEF7 0%, #C9A55C 40%, #7A7267 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "roma-abendkleid",
    name: "Roma Abendkleid",
    price: 3450,
    category: "dresses",
    collection: "notte-italiana",
    description:
      "Ein bodenlanges Meisterwerk aus schwerer Duchesse-Seide mit handapplizierten Goldstickereien am Mieder. Der dramatisch geschlitzte Rock und der asymmetrische Ausschnitt verbinden antike römische Opulenz mit zeitgenössischer Haute Couture.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Oro", hex: "#C9A55C" },
    ],
    gradient:
      "radial-gradient(ellipse at 30% 20%, #C9A55C 0%, #0A0A0A 60%, #2A2A2A 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "milano-wollhose",
    name: "Milano Wollhose",
    price: 695,
    originalPrice: 950,
    category: "pants",
    collection: "sartoria",
    description:
      "Hochgeschnittene Palazzo-Hose aus Super-150s-Merinowolle der Weberei Loro Piana. Die weite Beinsilhouette mit messerscharfer Bügelfalte und der Seidensatinbund sind eine Hommage an die goldene Ära der Mailänder Schneiderkunst.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Antracite", hex: "#2A2A2A" },
      { name: "Avorio", hex: "#FFFEF7" },
    ],
    gradient:
      "linear-gradient(180deg, #0A0A0A 0%, #2A2A2A 50%, #7A7267 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "venezia-kaschmirmantel",
    name: "Venezia Kaschmirmantel",
    price: 4200,
    category: "jackets",
    collection: "sartoria",
    description:
      "Gehüllt in reinstes mongolisches Kaschmir, gefertigt in den Werkstätten von Biella. Der bodenlange Schnitt mit verdecktem Knopfverschluss und handgestepptem Fischgrätmuster am Kragen definiert winterliche Grandezza neu.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Cammello", hex: "#B8956A" },
    ],
    gradient:
      "linear-gradient(145deg, #0A0A0A 0%, #2A2A2A 35%, #B8956A 100%)",
    image: "",
  },
  {
    id: "amalfi-leinenhemd",
    name: "Amalfi Leinenhemd",
    price: 485,
    originalPrice: 650,
    category: "shirts",
    collection: "primavera-dorata",
    description:
      "Handgewebtes irisches Leinen, gewaschen und sonnengebleicht nach alter amalfitanischer Tradition. Der lässige Reverskragen und die Brusttasche mit Goldknopf machen dieses Hemd zum unverzichtbaren Begleiter an der Riviera.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sabbia", hex: "#D4C5A9" },
      { name: "Bianco", hex: "#FFFEF7" },
      { name: "Azzurro", hex: "#6B8BA4" },
    ],
    gradient:
      "linear-gradient(120deg, #D4C5A9 0%, #FFFEF7 40%, #6B8BA4 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "toscana-wickelkleid",
    name: "Toscana Wickelkleid",
    price: 1120,
    category: "dresses",
    collection: "primavera-dorata",
    description:
      "Eine Ode an die toskanische Landschaft: Dieses Wickelkleid aus strukturiertem Crêpe Georgette schmiegt sich mit fließender Eleganz an die Silhouette. Die vergoldeten Wickelschnallen und das Midi-Format sorgen für einen Auftritt voller Anmut.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Terracotta", hex: "#C17C74" },
      { name: "Oliva", hex: "#6B7B5E" },
      { name: "Avorio", hex: "#FFFEF7" },
    ],
    gradient:
      "linear-gradient(135deg, #C17C74 0%, #D4A49E 40%, #FFFEF7 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "napoli-chelsea-boots",
    name: "Napoli Chelsea Boots",
    price: 945,
    category: "shoes",
    collection: "sartoria",
    description:
      "Handgefertigt in einer neapolitanischen Bottega aus vollnarbigem Kalbsleder mit Blake-Rapid-Konstruktion. Die schlanke, kantige Silhouette und die veredelten elastischen Einsätze vereinen süditalienische Schuhmacherkunst mit urbaner Modernität.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Cuoio", hex: "#8B5E3C" },
    ],
    gradient:
      "linear-gradient(150deg, #8B5E3C 0%, #5C3D28 50%, #0A0A0A 100%)",
    image: "",
  },
  {
    id: "medici-goldkette",
    name: "Medici Goldkette",
    price: 680,
    category: "accessories",
    collection: "notte-italiana",
    description:
      "Eine 18-Karat-Gold-Vermeil-Kette, inspiriert von den Schmiedekunstwerken der Medici-Ära. Das charakteristische Gliederdesign mit dem Palazzo-Wappen als Verschluss verleiht jedem Ensemble eine Note florentinischer Opulenz.",
    sizes: ["One Size"],
    colors: [{ name: "Oro", hex: "#C9A55C" }],
    gradient:
      "radial-gradient(circle at 40% 40%, #C9A55C 0%, #A88B50 40%, #0A0A0A 100%)",
    image: "",
  },
  {
    id: "sicilia-strickpolo",
    name: "Sicilia Strickpolo",
    price: 395,
    originalPrice: 540,
    category: "shirts",
    collection: "primavera-dorata",
    description:
      "Feinstes Merinostrickpolo mit Perlmuttknöpfen und kontrastierendem Goldstreifen am Kragen. Die leichte Strickstruktur und der Regular Fit machen es zum perfekten Übergang zwischen informellem Anlass und gehobenem Ambiente.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Avorio", hex: "#FFFEF7" },
      { name: "Bordeaux", hex: "#6B2D3E" },
    ],
    gradient:
      "linear-gradient(135deg, #0A0A0A 0%, #6B2D3E 50%, #FFFEF7 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "capri-seidenhose",
    name: "Capri Seidenhose",
    price: 880,
    category: "pants",
    collection: "notte-italiana",
    description:
      "Fließende Palazzo-Hose aus schwerer Seiden-Twill mit goldfarbenem Seitenstreifen. Der hohe Bund und das weite Bein fangen das Licht dramatisch ein und machen sie zum ultimativen Statement für den Abend oder das gehobene Tagesoutfit.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Oro Antico", hex: "#C9A55C" },
    ],
    gradient:
      "linear-gradient(170deg, #0A0A0A 0%, #2A2A2A 35%, #C9A55C 100%)",
    image: "",
  },
  {
    id: "portofino-ledertasche",
    name: "Portofino Ledertasche",
    price: 1650,
    category: "accessories",
    collection: "sartoria",
    description:
      "Strukturierte Tote aus pflanzlich gegerbtem Vacchetta-Leder, das mit der Zeit eine edle Patina entwickelt. Handbemalte Kanten, Innentaschen mit Wildlederfutter und vergoldete Beschläge zeugen von kompromissloser florentinischer Handwerkskunst.",
    sizes: ["One Size"],
    colors: [
      { name: "Cuoio", hex: "#B8956A" },
      { name: "Nero", hex: "#0A0A0A" },
      { name: "Bordeaux", hex: "#6B2D3E" },
    ],
    gradient:
      "linear-gradient(140deg, #B8956A 0%, #8B5E3C 40%, #6B2D3E 100%)",
    image: "",
  },
];

/* ── Collections ───────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "notte-italiana",
    name: "Notte Italiana",
    subtitle: "Die italienische Nacht",
    description:
      "Dramatische Abendmode, inspiriert von den glamourösen Nächten Roms und Mailands. Tiefes Schwarz trifft auf antikes Gold in einer Kollektion, die für große Auftritte und unvergessliche Momente geschaffen wurde.",
    gradient:
      "linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 30%, #C9A55C 70%, #FFFEF7 100%)",
    image: "",
    productCount: 4,
  },
  {
    id: "primavera-dorata",
    name: "Primavera Dorata",
    subtitle: "Der goldene Frühling",
    description:
      "Leichte, fließende Stücke für sonnendurchflutete Tage an der Riviera. Feinste Seiden, gewaschene Leinen und eine warme, von der Mittelmeerküste inspirierte Farbpalette definieren entspannte italienische Eleganz neu.",
    gradient:
      "linear-gradient(160deg, #FFFEF7 0%, #D4C5A9 25%, #C9A55C 60%, #C17C74 100%)",
    image: "",
    productCount: 4,
  },
  {
    id: "sartoria",
    name: "Sartoria",
    subtitle: "Meisterhafte Schneiderkunst",
    description:
      "Die Essenz der Sartoria Napoletana und Mailänder Schneiderkunst in zeitlosen Stücken vereint. Jedes Kleidungsstück wird in begrenzter Auflage gefertigt und trägt das Handzeichen seines Schneiders.",
    gradient:
      "radial-gradient(ellipse at 25% 30%, #B8956A 0%, #2A2A2A 50%, #0A0A0A 100%)",
    image: "",
    productCount: 4,
  },
  {
    id: "arte-vivere",
    name: "Arte di Vivere",
    subtitle: "Die Kunst des Lebens",
    description:
      "Eine Hommage an das Dolce Vita: Stücke, die den Alltag in ein Kunstwerk verwandeln. Von der Morgenpromenade bis zum Aperitivo bei Sonnenuntergang -- Kleidung für ein Leben voller Schönheit und Stil.",
    gradient:
      "linear-gradient(135deg, #6B2D3E 0%, #C17C74 40%, #FFFEF7 80%, #C9A55C 100%)",
    image: "",
    productCount: 0,
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
