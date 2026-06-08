/* ── SPEICHER No.7 — Mock-Daten ─────────────────────────────────────────────
   Fiktiver Hafen-Speicher von 1911 mit Loft-Hotel, Open-Kitchen-Restaurant
   und Eventhalle für Lofthochzeiten.
   Alle Inhalte sind Platzhalter (Designvorlage der Unicorn Factory).
─────────────────────────────────────────────────────────────────────────── */

export const BASE = "/templates/hotel/speicher-no7";
const IMG = `${BASE}/images`;

export const BRAND = {
  name: "SPEICHER No.7",
  tagline: "Speicher · Hotel · Restaurant · Events",
  claim: "Geschichte trifft Moderne",
  founded: 1911,
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
  { value: "1911", label: "Erbaut" },
  { value: "32", label: "Lofts & Studios" },
  { value: "150", label: "Eventgäste" },
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
    id: "loft-am-wasser",
    name: "Loft am Wasser",
    description:
      "Lichtdurchflutetes Loft mit raumhohen Fenstern direkt zum Hafenbecken. Blondes Eichenparkett, freistehende Wanne und Tageslicht von früh bis spät — Wohnen am Wasser, modern interpretiert.",
    size: 38,
    maxGuests: 2,
    price: 189,
    amenities: ["Hafenblick", "Raumhohe Fenster", "Freistehende Wanne", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/loft-wasser.jpg`,
    gradient: "linear-gradient(135deg, #DCD6CC 0%, #ECE8E1 60%, #B5603A 100%)",
  },
  {
    id: "backstein-studio",
    name: "Backstein-Studio",
    description:
      "Kompaktes Studio mit originaler Sichtbacksteinwand und klarem, modernem Interieur. Das industrielle Erbe des Speichers, hell und luftig in unsere Zeit geholt.",
    size: 28,
    maxGuests: 2,
    price: 159,
    amenities: ["Sichtbackstein", "Regendusche", "Boxspringbett", "Minibar", "WLAN", "Safe"],
    image: `${IMG}/rooms/backstein.jpg`,
    gradient: "linear-gradient(135deg, #ECE8E1 0%, #DCD6CC 50%, #C08A52 100%)",
  },
  {
    id: "penthouse-speicher",
    name: "Penthouse-Speicher",
    description:
      "Helles Penthouse unter dem alten Dachstuhl: sichtbare Holzbalken, Lichtkuppel und ein weiter Blick über Kaikante und Stadt. Großzügig, ruhig, ganz oben.",
    size: 52,
    maxGuests: 2,
    price: 269,
    amenities: ["Dachstuhl-Balken", "Lichtkuppel", "Wohnbereich", "Freistehende Wanne", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/penthouse.jpg`,
    gradient: "linear-gradient(135deg, #DCD6CC 0%, #F7F5F1 45%, #ECE8E1 100%)",
  },
  {
    id: "atelier-loft",
    name: "Atelier-Loft",
    description:
      "Offenes Atelier-Loft über zwei Ebenen: minimalistisch, viel Tageslicht und Platz zum Arbeiten und Leben. Ideal für längere Aufenthalte und kleine Familien.",
    size: 58,
    maxGuests: 4,
    price: 299,
    amenities: ["Zwei Ebenen", "Arbeitsplatz", "Wohnküche", "Regendusche", "WLAN", "Safe", "Familienfreundlich"],
    image: `${IMG}/rooms/atelier-loft.jpg`,
    gradient: "linear-gradient(135deg, #ECE8E1 0%, #B5603A 55%, #2A2826 100%)",
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
    name: "Saibling vom Kai",
    description: "Gebratener Saibling, Fenchel, Beurre blanc, Schnittlauchöl",
    price: 32,
    image: `${IMG}/restaurant/dish-1.jpg`,
    gradient: "linear-gradient(135deg, #2A2826 0%, #B5603A 100%)",
  },
  {
    id: "dish-2",
    name: "Speicher-Gartenteller",
    description: "Geröstetes Saisongemüse aus der Region, Buttermilch, Saaten",
    price: 24,
    image: `${IMG}/restaurant/dish-2.jpg`,
    gradient: "linear-gradient(135deg, #C08A52 0%, #DCD6CC 100%)",
  },
  {
    id: "dish-3",
    name: "Birne, Honig & Walnuss",
    description: "Honig-Parfait, pochierte Birne, geröstete Walnuss",
    price: 14,
    image: `${IMG}/restaurant/dish-3.jpg`,
    gradient: "linear-gradient(135deg, #B5603A 0%, #ECE8E1 100%)",
  },
];

export type MenuItem = { name: string; description: string; price: number };
export type MenuCategory = { title: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    title: "Vorspeisen",
    items: [
      { name: "Geräucherte Forelle", description: "Forelle, Apfel, Meerrettich, Dill, geröstetes Brot", price: 16 },
      { name: "Burrata & Tomate", description: "Cremige Burrata, marinierte Tomaten, Basilikumöl", price: 15 },
      { name: "Rindertatar", description: "Vom Weiderind, Eigelb, Kapern, Sauerteig-Crostini", price: 20 },
    ],
  },
  {
    title: "Hauptgänge",
    items: [
      { name: "Saibling vom Kai", description: "Gebratener Saibling, Fenchel, Belugalinsen, Beurre blanc", price: 32 },
      { name: "Schmorbraten vom Weiderind", description: "Langsam geschmort, Wurzelgemüse, Kartoffelstampf", price: 29 },
      { name: "Speicher-Gartenteller", description: "Geröstetes Saisongemüse, Buttermilch, Kräuter, Saaten", price: 24 },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Birne, Honig & Walnuss", description: "Honig-Parfait, pochierte Birne, geröstete Walnuss", price: 14 },
      { name: "Schokolade & Sauerkirsche", description: "Warmer Schokoladenkuchen, Sauerkirsche, Crème fraîche", price: 13 },
      { name: "Käse vom Brett", description: "Drei Käse, Feigensenf, Früchtebrot", price: 16 },
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
    id: "halle",
    name: "Die Halle",
    description:
      "Das luftige Herzstück des Speichers: gusseiserne Stützen, raumhohe Industriefenster und ein heller Loft-Charakter. Der große Rahmen für Lofthochzeit, Dinner und Party.",
    capacity: "bis 150 Gäste",
    best: "Lofthochzeit & Party",
    image: `${IMG}/wedding/halle.jpg`,
    gradient: "linear-gradient(135deg, #ECE8E1 0%, #B5603A 60%, #2A2826 100%)",
  },
  {
    id: "dachterrasse",
    name: "Die Dachterrasse",
    description:
      "Sektempfang über den Dächern der Hafenstadt: weite Aussicht, Abendsonne und urbaner Charme. Ein luftiger Ort für den Empfang und das erste Anstoßen.",
    capacity: "bis 80 Gäste",
    best: "Empfang über den Dächern",
    image: `${IMG}/wedding/dachterrasse.jpg`,
    gradient: "linear-gradient(135deg, #DCD6CC 0%, #C08A52 70%, #F7F5F1 100%)",
  },
  {
    id: "kaikante",
    name: "Die Kaikante",
    description:
      "Freie Trauung direkt am Wasser, mit dem Hafenbecken als Kulisse. Intim, hell und ganz nah am Element — der stimmungsvolle Ort für das Ja-Wort.",
    capacity: "bis 60 Gäste",
    best: "Trauung am Wasser",
    image: `${IMG}/wedding/kai.jpg`,
    gradient: "linear-gradient(135deg, #2A2826 0%, #B5603A 50%, #ECE8E1 100%)",
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
      "Freie Trauung an der Kaikante",
      "Sektempfang mit Canapés",
      "3-Gang-Menü aus der Open Kitchen",
      "Florale Tischgestaltung",
      "Ein Loft am Wasser inklusive",
    ],
  },
  {
    id: "lofthochzeit",
    name: "Die Lofthochzeit",
    priceLabel: "ab 95 € / Person",
    note: "beliebtestes Paket",
    includes: [
      "Trauung an der Kaikante",
      "Sektempfang auf der Dachterrasse",
      "4-Gang-Hochzeitsmenü in der Halle",
      "Industrie-Loft mit Lichtinstallation",
      "Persönliche Hochzeitsplanung",
      "Mitternachtssnack",
    ],
    featured: true,
  },
  {
    id: "wochenende",
    name: "Speicher-Wochenende",
    priceLabel: "auf Anfrage",
    note: "exklusive Anmietung",
    includes: [
      "Exklusive Anmietung des gesamten Speichers",
      "Anreise-Dinner für die engsten Gäste",
      "Trauung, Feier & Brunch am Folgetag",
      "Alle 32 Lofts & Studios für Ihre Gäste",
      "Persönliche Eventleitung über das ganze Wochenende",
    ],
  },
];

/* ── Galerie ────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  id: string;
  title: string;
  category: "Hotel" | "Restaurant" | "Hochzeit" | "Speicher";
  image: string;
  gradient: string;
  aspect: "portrait" | "landscape" | "square";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Die Halle im Morgenlicht", category: "Speicher", image: `${IMG}/gallery/g1.jpg`, gradient: "linear-gradient(135deg, #DCD6CC 0%, #C08A52 100%)", aspect: "portrait" },
  { id: "g2", title: "Hafenbecken bei Sonnenuntergang", category: "Speicher", image: `${IMG}/gallery/g2.jpg`, gradient: "linear-gradient(135deg, #B5603A 0%, #ECE8E1 100%)", aspect: "landscape" },
  { id: "g3", title: "Gedeckte Tafel in der Halle", category: "Restaurant", image: `${IMG}/gallery/g3.jpg`, gradient: "linear-gradient(135deg, #2A2826 0%, #B5603A 100%)", aspect: "portrait" },
  { id: "g4", title: "Brautstrauß am Wasser", category: "Hochzeit", image: `${IMG}/gallery/g4.jpg`, gradient: "linear-gradient(135deg, #ECE8E1 0%, #DCD6CC 100%)", aspect: "square" },
  { id: "g5", title: "Backstein & Tageslicht", category: "Speicher", image: `${IMG}/gallery/g5.jpg`, gradient: "linear-gradient(135deg, #DCD6CC 0%, #F7F5F1 100%)", aspect: "landscape" },
  { id: "g6", title: "Blick auf die Kaikante", category: "Hotel", image: `${IMG}/gallery/g6.jpg`, gradient: "linear-gradient(135deg, #C08A52 0%, #ECE8E1 100%)", aspect: "portrait" },
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
      "Unsere Hochzeit in der Halle war genau das, was wir uns erträumt hatten: hell, urban, am Wasser. Der alte Speicher hat eine Seele — und das Team liest jeden Wunsch von den Augen ab.",
    author: "Marie & Tobias",
    context: "Hochzeit · September 2025",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Das Loft am Wasser ist ein Traum aus Licht und Ruhe. Morgens das Hafenbecken, abends die Stadt — wir sind angekommen und wollten kaum wieder weg.",
    author: "Familie Wegener",
    context: "Hotelgast · Oktober 2025",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Die offene Küche verbindet ehrliches Handwerk mit echter Finesse. Der Saibling vom Kai war eines der besten Gerichte, die wir seit Langem gegessen haben.",
    author: "Dr. Petra V.",
    context: "Restaurantgast · November 2025",
    rating: 5,
  },
];

/* ── Kontakt-Platzhalter (Designvorlage) ────────────────────────────────── */

export const CONTACT = {
  phone: "+49 (0) 30 123 456 78",
  email: "info@beispiel.de",
  address: ["SPEICHER No.7", "Musterstraße 1", "10115 Berlin"],
  hours: [
    { label: "Rezeption", value: "Täglich 7:00 – 22:00 Uhr" },
    { label: "Restaurant", value: "Mi – So, 18:00 – 22:00 Uhr" },
    { label: "Eventbüro", value: "Nach Vereinbarung" },
  ],
};
