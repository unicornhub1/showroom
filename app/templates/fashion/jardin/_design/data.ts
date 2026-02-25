/* ── JARDIN Mock Data ─────────────────────────────────────────────────── */

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

/* ── Products ────────────────────────────────────────────────────────── */

export const products: Product[] = [
  {
    id: "robe-lin-provencale",
    name: "Provenzalisches Leinenkleid",
    price: 289,
    category: "kleider",
    collection: "ete-parisien",
    description:
      "Aus gewaschenem französischem Leinen gefertigt, fällt dieses Midi-Kleid mit entspannter Eleganz. Die zarte Raffung an der Taille und die luftigen Ärmel erinnern an sonnige Nachmittage in der Provence. Ein Stück, das mit jedem Tragen schöner wird.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Naturweiß", hex: "#F5F0E8" },
      { name: "Salbei", hex: "#7A8B6F" },
      { name: "Terrakotta", hex: "#C17C5F" },
    ],
    gradient:
      "linear-gradient(135deg, #F5F0E8 0%, #E8EDE5 40%, #7A8B6F 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "pull-cachemire-essentiel",
    name: "Kaschmir-Pullover Essentiel",
    price: 345,
    category: "strick",
    collection: "les-essentiels",
    description:
      "Reines mongolisches Kaschmir, das sich wie eine sanfte Umarmung anfühlt. Der entspannte Rundhalsausschnitt und die leicht überschnittenen Schultern machen diesen Pullover zum perfekten Begleiter für kühle Morgen und gemütliche Abende.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Crème", hex: "#FAF7F2" },
      { name: "Altrosa", hex: "#C4A08A" },
      { name: "Graumeliert", hex: "#8B8680" },
    ],
    gradient:
      "linear-gradient(160deg, #FAF7F2 0%, #E8E3DA 30%, #C4A08A 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "sac-artisan-cuir",
    name: "Artisan Ledertasche",
    price: 485,
    category: "accessoires",
    collection: "atelier",
    description:
      "Von Hand in einer kleinen Manufaktur im Süden Frankreichs gefertigt. Das pflanzlich gegerbte Leder entwickelt mit der Zeit eine wunderschöne Patina. Innen mit Baumwollfutter und einer Reißverschlusstasche für Ihre Essentials.",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", hex: "#A0724E" },
      { name: "Naturel", hex: "#D4C5B2" },
    ],
    gradient:
      "linear-gradient(145deg, #A0724E 0%, #D4C5B2 50%, #C17C5F 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "blouse-soie-jardin",
    name: "Seidenbluse Jardin",
    price: 229,
    originalPrice: 315,
    category: "blusen",
    collection: "ete-parisien",
    description:
      "Aus fließender Maulbeerseide mit zartem botanischem Print. Der feminine V-Ausschnitt und die leicht puffigen Ärmel verleihen dieser Bluse eine romantische Note. Perfekt zum Kombinieren mit Denim oder einem eleganten Rock.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blütenrosa", hex: "#E8D5C8" },
      { name: "Elfenbein", hex: "#FFFDF9" },
    ],
    gradient:
      "linear-gradient(120deg, #E8D5C8 0%, #FFFDF9 40%, #C4A08A 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "pantalon-large-lin",
    name: "Weite Leinenhose",
    price: 195,
    originalPrice: 265,
    category: "hosen",
    collection: "ete-parisien",
    description:
      "Fließende Silhouette aus gewaschenem Leinen für heiße Sommertage. Der hohe Bund mit Gürtelschlaufen und die weiten Beine sorgen für mühelose Eleganz. Ein Grundelement der französischen Sommergarderobe.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#D4C5B2" },
      { name: "Weiß", hex: "#FFFDF9" },
      { name: "Olive", hex: "#6B7B5E" },
    ],
    gradient:
      "linear-gradient(180deg, #D4C5B2 0%, #E8E3DA 40%, #6B7B5E 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "cardigan-mohair-doux",
    name: "Mohair-Cardigan Doux",
    price: 275,
    category: "strick",
    collection: "maison",
    description:
      "Zarter Mohair-Mix mit einem Hauch von Seide für subtilen Glanz. Die übergroße Passform und die handgefertigten Knöpfe aus Perlmutt machen diesen Cardigan zu einem Lieblingsstück für gemütliche Stunden zu Hause.",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Nebel", hex: "#C8C0B5" },
      { name: "Lavendel", hex: "#B5A8B0" },
      { name: "Crème", hex: "#FAF7F2" },
    ],
    gradient:
      "linear-gradient(135deg, #C8C0B5 0%, #B5A8B0 40%, #FAF7F2 100%)",
    image: "",
  },
  {
    id: "robe-midi-atelier",
    name: "Midi-Kleid Atelier",
    price: 365,
    category: "kleider",
    collection: "atelier",
    description:
      "Aus strukturiertem Bio-Baumwollgewebe in einer figurschmeichelnden Midi-Silhouette. Der Wickelschnitt mit Bindegürtel und die seitliche Knopfleiste erzeugen eine wunderschön fließende Linie. Handgefertigt mit Liebe zum Detail.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Terrakotta", hex: "#C17C5F" },
      { name: "Dunkelgrün", hex: "#4A5D42" },
    ],
    gradient:
      "radial-gradient(ellipse at 30% 20%, #C17C5F 0%, #8B5E3C 50%, #4A5D42 100%)",
    image: "",
    isNew: true,
  },
  {
    id: "foulard-soie-botanique",
    name: "Botanisches Seidentuch",
    price: 125,
    category: "accessoires",
    collection: "ete-parisien",
    description:
      "Handbedrucktes Seidentuch mit botanischem Motiv aus einem traditionellen Atelier in Lyon. Vielseitig tragbar als Halstuch, Haarband oder Taschenakzent. Ein kleines Kunstwerk für jeden Tag.",
    sizes: ["One Size"],
    colors: [
      { name: "Gartengrün", hex: "#7A8B6F" },
      { name: "Sonnengelb", hex: "#D4B87A" },
    ],
    gradient:
      "linear-gradient(135deg, #7A8B6F 0%, #A8B89A 30%, #D4B87A 100%)",
    image: "",
  },
  {
    id: "sandales-cuir-tresse",
    name: "Geflochtene Ledersandalen",
    price: 215,
    originalPrice: 285,
    category: "schuhe",
    collection: "ete-parisien",
    description:
      "Handgeflochtenes vegetabil gegerbtes Leder auf einer bequemen Ledersohle. Das traditionelle Flechtmuster ist eine Hommage an südfranzösische Handwerkskunst. Werden mit der Zeit immer schöner und bequemer.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: [
      { name: "Naturel", hex: "#C4A08A" },
      { name: "Braun", hex: "#8B6F4E" },
    ],
    gradient:
      "linear-gradient(150deg, #C4A08A 0%, #8B6F4E 50%, #D4C5B2 100%)",
    image: "",
    isSale: true,
  },
  {
    id: "chemise-coton-rayee",
    name: "Gestreifte Baumwollbluse",
    price: 155,
    category: "blusen",
    collection: "les-essentiels",
    description:
      "Knackige Bio-Baumwolle mit feinen Streifen im entspannten Boyfriend-Schnitt. Aufrollbare Ärmel und eine leicht verlängerte Rückseite machen diese Bluse zu einem vielseitigen Klassiker für jede Gelegenheit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blau-Weiß", hex: "#B0C4DE" },
      { name: "Terrakotta-Weiß", hex: "#D4A088" },
    ],
    gradient:
      "linear-gradient(135deg, #FFFDF9 0%, #B0C4DE 50%, #F5F0E8 100%)",
    image: "",
  },
  {
    id: "jupe-portefeuille-lin",
    name: "Leinen-Wickelrock",
    price: 175,
    category: "roecke",
    collection: "les-essentiels",
    description:
      "Ein zeitloser Wickelrock aus gewaschenem Leinen mit Kokosnussknopf-Detail. Die Midi-Länge und der fließende Fall machen ihn zum perfekten Sommerstück. Kombinierbar mit allem, von Sneakers bis Sandalen.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Salbei", hex: "#7A8B6F" },
      { name: "Sand", hex: "#D4C5B2" },
      { name: "Terrakotta", hex: "#C17C5F" },
    ],
    gradient:
      "linear-gradient(160deg, #7A8B6F 0%, #D4C5B2 50%, #C17C5F 100%)",
    image: "",
  },
  {
    id: "bougie-maison-jardin",
    name: "Duftkerze Maison",
    price: 58,
    category: "maison",
    collection: "maison",
    description:
      "Handgegossene Duftkerze aus Sojawachs mit Noten von Feigenblatt, Zedernholz und wildem Thymian. Im wiederverwertbaren Keramikgefäß, das von einer Töpferin aus der Drôme gefertigt wird. Brenndauer circa 50 Stunden.",
    sizes: ["One Size"],
    colors: [
      { name: "Naturel", hex: "#E8E3DA" },
    ],
    gradient:
      "radial-gradient(circle at 40% 40%, #E8E3DA 0%, #D4C5B2 40%, #7A8B6F 100%)",
    image: "",
  },
];

/* ── Collections ─────────────────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "ete-parisien",
    name: "Été Parisien",
    subtitle: "Pariser Sommer",
    description:
      "Luftige Stücke für sonnige Tage in der Stadt. Leinen, Seide und Baumwolle in einer Farbpalette, die an laue Abende an der Seine erinnert. Mühelose Eleganz für den schönsten Sommer.",
    gradient:
      "linear-gradient(135deg, #FAF7F2 0%, #E8EDE5 25%, #C17C5F 60%, #7A8B6F 100%)",
    image: "",
    productCount: 5,
  },
  {
    id: "atelier",
    name: "Atelier",
    subtitle: "Handwerkskunst",
    description:
      "Jedes Stück erzählt die Geschichte seiner Entstehung. Handgefertigte Lederwaren, strukturierte Stoffe und durchdachte Details zeugen von traditioneller französischer Handwerkskunst, neu interpretiert für das moderne Leben.",
    gradient:
      "linear-gradient(160deg, #C17C5F 0%, #A0724E 30%, #4A5D42 70%, #3D3D3D 100%)",
    image: "",
    productCount: 2,
  },
  {
    id: "les-essentiels",
    name: "Les Essentiels",
    subtitle: "Die Grundlagen",
    description:
      "Zeitlose Basics, die das Rückgrat jeder Garderobe bilden. Hochwertige Materialien, perfekte Passformen und neutrale Farbtöne, die sich mühelos kombinieren lassen. Weniger, aber besser.",
    gradient:
      "linear-gradient(135deg, #FFFDF9 0%, #D4C5B2 35%, #C4A08A 70%, #8B8680 100%)",
    image: "",
    productCount: 3,
  },
  {
    id: "maison",
    name: "Maison",
    subtitle: "Zuhause",
    description:
      "Erweitern Sie den Jardin-Stil in Ihr Zuhause. Duftkerzen, kuschelige Strickwaren und liebevoll ausgewählte Objekte für gemütliche Momente. Weil Stil nicht an der Haustür endet.",
    gradient:
      "radial-gradient(ellipse at 30% 40%, #FAF7F2 0%, #C8C0B5 35%, #7A8B6F 70%, #4A5D42 100%)",
    image: "",
    productCount: 2,
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

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
