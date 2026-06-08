/* ── VILLA AURELIA — Mock-Daten ─────────────────────────────────────────────
   Fiktive Gründerzeit-Stadtvilla mit Hotel, Restaurant und Event-/Hochzeitssälen.
   Alle Inhalte sind Platzhalter (Designvorlage der Unicorn Factory).
─────────────────────────────────────────────────────────────────────────── */

export const BASE = "/templates/hotel/villa-aurelia";
const IMG = `${BASE}/images`;

export const BRAND = {
  name: "VILLA AURELIA",
  tagline: "Stadtvilla · Hotel · Restaurant · Events",
  claim: "Geschichte trifft Moderne",
  founded: 1897,
};

/* ── Navigation ─────────────────────────────────────────────────────────── */

export const NAV_ITEMS = [
  { label: "Hotel", href: `${BASE}/hotel` },
  { label: "Restaurant", href: `${BASE}/restaurant` },
  { label: "Hochzeiten", href: `${BASE}/hochzeiten` },
  { label: "Galerie", href: `${BASE}/galerie` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

/* ── Helper ─────────────────────────────────────────────────────────────── */

export function formatPrice(value: number, decimals = 0): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/* ── Stats ──────────────────────────────────────────────────────────────── */

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "1897", label: "Gegründet" },
  { value: "26", label: "Zimmer & Suiten" },
  { value: "140", label: "Eventgäste" },
  { value: "4,9", label: "Gästebewertung" },
];

/* ── Zimmer ─────────────────────────────────────────────────────────────── */

export type Room = {
  id: string;
  name: string;
  description: string;
  size: number;
  maxGuests: number;
  price: number;
  amenities: string[];
  image: string;
  gradient: string;
};

export const rooms: Room[] = [
  {
    id: "beletage-suite",
    name: "Beletage-Suite",
    description:
      "Großzügige Suite in der ersten Etage mit originaler Stuckdecke, hohen Sprossenfenstern und Fischgrät-Parkett. Gründerzeit-Eleganz, modern und ruhig interpretiert.",
    size: 52,
    maxGuests: 2,
    price: 245,
    amenities: ["Stuckdecke", "Regendusche", "Boxspringbett", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/beletage.jpg`,
    gradient: "linear-gradient(135deg, #DDE3DC 0%, #EEE9E1 60%, #1F4D3A 100%)",
  },
  {
    id: "salon-zimmer",
    name: "Salon-Zimmer",
    description:
      "Klassisches Zimmer im Salonstil mit samtenen Tönen, gerahmten Kunstdrucken und einer behutsam modernen Ergänzung. Städtische Ruhe hinter dicken Villenmauern.",
    size: 34,
    maxGuests: 2,
    price: 185,
    amenities: ["Samtdetails", "Regendusche", "Minibar", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/salon.jpg`,
    gradient: "linear-gradient(135deg, #EEE9E1 0%, #DDE3DC 50%, #B79257 100%)",
  },
  {
    id: "atelier-unterm-dach",
    name: "Atelier unterm Dach",
    description:
      "Helles Mansarden-Atelier mit charaktervollen Dachschrägen und einem Oberlicht, durch das der Stadthimmel hereinscheint. Licht, Weite und ein Hauch Bohème.",
    size: 38,
    maxGuests: 2,
    price: 205,
    amenities: ["Oberlicht", "Dachschräge", "Freistehende Wanne", "Minibar", "WLAN", "Safe"],
    image: `${IMG}/rooms/atelier.jpg`,
    gradient: "linear-gradient(135deg, #DDE3DC 0%, #FAF8F4 45%, #EEE9E1 100%)",
  },
  {
    id: "gartenfluegel",
    name: "Gartenflügel",
    description:
      "Ruhiges Zimmer im rückwärtigen Gartenflügel mit Blick in den alten Stadtpark. Abseits des Trubels, mit eigenem Zugang zur grünen Terrasse — ein urbaner Rückzugsort.",
    size: 30,
    maxGuests: 2,
    price: 165,
    amenities: ["Parkblick", "Terrassenzugang", "Regendusche", "Nespresso", "WLAN", "Safe", "Ruhelage"],
    image: `${IMG}/rooms/gartenfluegel.jpg`,
    gradient: "linear-gradient(135deg, #EEE9E1 0%, #1F4D3A 55%, #1C2620 100%)",
  },
];

/* ── Restaurant ─────────────────────────────────────────────────────────── */

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gradient: string;
};

export const featuredDishes: Dish[] = [
  {
    id: "dish-1",
    name: "Reh aus dem Umland",
    description: "Rücken & Praline vom Reh, Sellerie, Rotweinjus, Holunder",
    price: 39,
    image: `${IMG}/restaurant/dish-1.jpg`,
    gradient: "linear-gradient(135deg, #1C2620 0%, #B79257 100%)",
  },
  {
    id: "dish-2",
    name: "Aurelia Gartenteller",
    description: "Gemüse & Kräuter aus dem Villengarten, Buttermilch, Saaten",
    price: 27,
    image: `${IMG}/restaurant/dish-2.jpg`,
    gradient: "linear-gradient(135deg, #1F4D3A 0%, #DDE3DC 100%)",
  },
  {
    id: "dish-3",
    name: "Gold & Birne",
    description: "Honig-Parfait, pochierte Birne, geröstete Walnuss, Karamell",
    price: 16,
    image: `${IMG}/restaurant/dish-3.jpg`,
    gradient: "linear-gradient(135deg, #B79257 0%, #EEE9E1 100%)",
  },
];

export type MenuItem = { name: string; description: string; price: number };
export type MenuCategory = { title: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    title: "Vorspeisen",
    items: [
      { name: "Geräucherte Forelle", description: "Forelle aus dem Umland, Apfel, Meerrettich, Dill", price: 18 },
      { name: "Kürbis & Ziegenkäse", description: "Ofenkürbis, Ziegenfrischkäse, geröstete Kürbiskerne", price: 16 },
      { name: "Rindertatar", description: "Vom Weiderind, Eigelb, Kapern, geröstetes Sauerteigbrot", price: 22 },
    ],
  },
  {
    title: "Hauptgänge",
    items: [
      { name: "Reh aus dem Umland", description: "Rücken & Praline, Sellerie, Rotweinjus, Holunder", price: 39 },
      { name: "Saibling", description: "Gebratener Saibling, Belugalinsen, Lauch, Beurre blanc", price: 33 },
      { name: "Aurelia Gartenteller", description: "Gemüse & Kräuter aus dem Villengarten, Buttermilch, Saaten", price: 27 },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Gold & Birne", description: "Honig-Parfait, pochierte Birne, Walnuss, Karamell", price: 16 },
      { name: "Schokolade & Sauerkirsche", description: "Warmer Schokoladenkuchen, Sauerkirsche, Crème fraîche", price: 15 },
      { name: "Käse vom Brett", description: "Drei gereifte Käse, Feigensenf, Früchtebrot", price: 18 },
    ],
  },
];

/* ── Event- & Hochzeitslocations ────────────────────────────────────────── */

export type EventSpace = {
  id: string;
  name: string;
  description: string;
  capacity: string;
  best: string;
  image: string;
  gradient: string;
};

export const eventSpaces: EventSpace[] = [
  {
    id: "spiegelsaal",
    name: "Der Spiegelsaal",
    description:
      "Unser prächtiger Festsaal mit hohen Spiegeln, vergoldeten Stuckleisten und Kristalllüstern — der große, festliche Rahmen für Bankett und Ball mit Ihren Gästen.",
    capacity: "bis 140 Gäste",
    best: "Festbankett & Ball",
    image: `${IMG}/wedding/spiegelsaal.jpg`,
    gradient: "linear-gradient(135deg, #EEE9E1 0%, #B79257 60%, #1C2620 100%)",
  },
  {
    id: "wintergarten",
    name: "Der Wintergarten",
    description:
      "Lichtdurchfluteter Wintergarten mit gusseisernen Säulen und Blick ins Grüne. Eine stimmungsvolle Kulisse für die freie Trauung und den Sektempfang.",
    capacity: "bis 70 Gäste",
    best: "Freie Trauung & Empfang",
    image: `${IMG}/wedding/wintergarten.jpg`,
    gradient: "linear-gradient(135deg, #DDE3DC 0%, #1F4D3A 70%, #FAF8F4 100%)",
  },
  {
    id: "park-terrasse",
    name: "Die Park-Terrasse",
    description:
      "Die weitläufige Terrasse zum alten Stadtpark — geschützt von hohen Bäumen, ideal für die Sommerfeier im Freien, Empfang und das Dinner unter offenem Himmel.",
    capacity: "bis 90 Gäste",
    best: "Sommerfeier im Freien",
    image: `${IMG}/wedding/terrasse.jpg`,
    gradient: "linear-gradient(135deg, #1C2620 0%, #1F4D3A 50%, #EEE9E1 100%)",
  },
];

export type WeddingPackage = {
  id: string;
  name: string;
  priceLabel: string;
  note: string;
  includes: string[];
  featured?: boolean;
};

export const weddingPackages: WeddingPackage[] = [
  {
    id: "intim",
    name: "Trauung Intim",
    priceLabel: "ab 1.900 €",
    note: "bis 20 Personen",
    includes: [
      "Freie oder standesamtliche Trauung im Wintergarten",
      "Sektempfang mit Canapés",
      "3-Gang-Menü im Salon",
      "Florale Tischgestaltung",
      "Eine Beletage-Suite inklusive",
    ],
  },
  {
    id: "villenhochzeit",
    name: "Die Villenhochzeit",
    priceLabel: "ab 99 € / Person",
    note: "beliebtestes Paket",
    includes: [
      "Trauung im Wintergarten oder auf der Park-Terrasse",
      "Sektempfang & Flying Buffet",
      "4-Gang-Hochzeitsmenü im Spiegelsaal",
      "Kristalllüster & festliche Tischdekoration",
      "Persönliche Hochzeitsplanung",
      "Mitternachtssnack",
    ],
    featured: true,
  },
  {
    id: "wochenende",
    name: "Hochzeitswochenende",
    priceLabel: "auf Anfrage",
    note: "exklusive Anmietung",
    includes: [
      "Exklusive Anmietung der gesamten Villa",
      "Anreise-Dinner für die engsten Gäste",
      "Trauung, Fest & Brunch am Folgetag",
      "Alle 26 Zimmer für Ihre Gäste",
      "Persönliche Eventleitung über das ganze Wochenende",
    ],
  },
];

/* ── Galerie ────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  id: string;
  title: string;
  category: "Hotel" | "Restaurant" | "Hochzeit" | "Villa";
  image: string;
  gradient: string;
  aspect: "portrait" | "landscape" | "square";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Die Stadtvilla im Abendlicht", category: "Villa", image: `${IMG}/gallery/g1.jpg`, gradient: "linear-gradient(135deg, #DDE3DC 0%, #1F4D3A 100%)", aspect: "portrait" },
  { id: "g2", title: "Stuckdecke & Kronleuchter", category: "Villa", image: `${IMG}/gallery/g2.jpg`, gradient: "linear-gradient(135deg, #B79257 0%, #EEE9E1 100%)", aspect: "landscape" },
  { id: "g3", title: "Gedeckte Tafel im Spiegelsaal", category: "Restaurant", image: `${IMG}/gallery/g3.jpg`, gradient: "linear-gradient(135deg, #1C2620 0%, #B79257 100%)", aspect: "portrait" },
  { id: "g4", title: "Brautstrauß im Wintergarten", category: "Hochzeit", image: `${IMG}/gallery/g4.jpg`, gradient: "linear-gradient(135deg, #EEE9E1 0%, #DDE3DC 100%)", aspect: "square" },
  { id: "g5", title: "Morgenlicht im Treppenhaus", category: "Villa", image: `${IMG}/gallery/g5.jpg`, gradient: "linear-gradient(135deg, #DDE3DC 0%, #FAF8F4 100%)", aspect: "landscape" },
  { id: "g6", title: "Der Weg zur Villa", category: "Hotel", image: `${IMG}/gallery/g6.jpg`, gradient: "linear-gradient(135deg, #1F4D3A 0%, #EEE9E1 100%)", aspect: "portrait" },
];

/* ── Testimonials ───────────────────────────────────────────────────────── */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Unsere Hochzeit im Spiegelsaal war wie aus einer anderen Zeit — und doch ganz wir. Diese Villa hat Stil und Seele, und ein Team, das jeden Wunsch von den Augen abliest.",
    author: "Carlotta & Henri",
    context: "Hochzeit · September 2025",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Mitten in der Stadt und trotzdem so ruhig. Das Atelier unterm Dach, das Frühstück, der Blick in den Park — die Villa Aurelia ist unser kleines Refugium geworden.",
    author: "Familie Reinhardt",
    context: "Hotelgast · Oktober 2025",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Die Küche verbindet klassische Eleganz mit echter Finesse. Das Reh aus dem Umland war eines der besten Gerichte, das wir seit Langem in der Stadt gegessen haben.",
    author: "Dr. Marlene S.",
    context: "Restaurantgast · November 2025",
    rating: 5,
  },
];

/* ── Kontakt-Platzhalter (Designvorlage) ────────────────────────────────── */

export const CONTACT = {
  phone: "+49 (0) 30 123 456 78",
  email: "info@beispiel.de",
  address: ["VILLA AURELIA", "Musterstraße 1", "10115 Berlin"],
  hours: [
    { label: "Rezeption", value: "Täglich 7:00 – 22:00 Uhr" },
    { label: "Restaurant", value: "Di – So, 18:00 – 23:00 Uhr" },
    { label: "Eventbüro", value: "Nach Vereinbarung" },
  ],
};
