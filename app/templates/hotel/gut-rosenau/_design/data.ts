/* ── GUT ROSENAU — Mock-Daten ───────────────────────────────────────────────
   Fiktives Landgut mit Hotel, Restaurant und Hochzeits-/Eventlocation.
   Alle Inhalte sind Platzhalter (Designvorlage der Unicorn Factory).
─────────────────────────────────────────────────────────────────────────── */

export const BASE = "/templates/hotel/gut-rosenau";
const IMG = `${BASE}/images`;

export const BRAND = {
  name: "GUT ROSENAU",
  tagline: "Landgut · Hotel · Restaurant · Hochzeiten",
  claim: "Geschichte trifft Moderne",
  founded: 1788,
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
  { value: "1788", label: "Gegründet" },
  { value: "24", label: "Zimmer & Suiten" },
  { value: "120", label: "Hochzeitsgäste" },
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
    id: "kaminzimmer",
    name: "Kaminzimmer",
    description:
      "Behagliches Doppelzimmer im historischen Gutshaus mit knisterndem Kaminfeuer, originalen Dielenböden und moderner Wohlfühlausstattung. Tradition, die man spürt.",
    size: 28,
    maxGuests: 2,
    price: 165,
    amenities: ["Kaminofen", "Regendusche", "Boxspringbett", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/kaminzimmer.jpg`,
    gradient: "linear-gradient(135deg, #EADFD0 0%, #D7DCCE 60%, #9C7B3F 100%)",
  },
  {
    id: "turmzimmer",
    name: "Turmzimmer",
    description:
      "Charaktervolles Zimmer im alten Gutsturm mit Rundblick über Felder und Weinberge. Sichtbares Eichengebälk trifft auf klare, moderne Linienführung.",
    size: 32,
    maxGuests: 2,
    price: 195,
    amenities: ["Panoramablick", "Eichengebälk", "Regendusche", "Minibar", "WLAN", "Safe"],
    image: `${IMG}/rooms/turmzimmer.jpg`,
    gradient: "linear-gradient(135deg, #F2EADD 0%, #EADFD0 50%, #D7DCCE 100%)",
  },
  {
    id: "gartensuite",
    name: "Gartensuite",
    description:
      "Lichtdurchflutete Suite mit eigenem Zugang zum Rosengarten, separatem Wohnbereich und freistehender Badewanne. Wo Tag und Ruhe ineinanderfließen.",
    size: 46,
    maxGuests: 2,
    price: 245,
    amenities: ["Gartenzugang", "Freistehende Wanne", "Wohnbereich", "Minibar", "Nespresso", "WLAN", "Safe"],
    image: `${IMG}/rooms/gartensuite.jpg`,
    gradient: "linear-gradient(135deg, #D7DCCE 0%, #FBF8F2 45%, #EADFD0 100%)",
  },
  {
    id: "scheunenloft",
    name: "Scheunen-Loft",
    description:
      "Großzügiges Loft in der ehemaligen Zehntscheune: offener Grundriss, raumhohe Fenster und ein Hauch Industriecharme über zwei Ebenen. Ideal für Familien und lange Wochenenden.",
    size: 55,
    maxGuests: 4,
    price: 295,
    amenities: ["Zwei Ebenen", "Raumhohe Fenster", "Wohnküche", "Regendusche", "WLAN", "Safe", "Familienfreundlich"],
    image: `${IMG}/rooms/scheunenloft.jpg`,
    gradient: "linear-gradient(135deg, #EADFD0 0%, #9C7B3F 55%, #34302A 100%)",
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
    name: "Reh aus eigener Jagd",
    description: "Rücken & Praline vom Reh, Sellerie, Wacholderjus, Preiselbeere",
    price: 38,
    image: `${IMG}/restaurant/dish-1.jpg`,
    gradient: "linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)",
  },
  {
    id: "dish-2",
    name: "Gut Rosenau Gartenteller",
    description: "Gemüse & Kräuter aus dem Klostergarten, Buttermilch, Saaten",
    price: 26,
    image: `${IMG}/restaurant/dish-2.jpg`,
    gradient: "linear-gradient(135deg, #5E6F52 0%, #D7DCCE 100%)",
  },
  {
    id: "dish-3",
    name: "Rosenau Honig & Birne",
    description: "Honig-Parfait vom eigenen Bienenstand, pochierte Birne, Walnuss",
    price: 16,
    image: `${IMG}/restaurant/dish-3.jpg`,
    gradient: "linear-gradient(135deg, #9C7B3F 0%, #EADFD0 100%)",
  },
];

export type MenuItem = { name: string; description: string; price: number };
export type MenuCategory = { title: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    title: "Vorspeisen",
    items: [
      { name: "Geräucherte Forelle", description: "Forelle aus dem Mühlbach, Apfel, Meerrettich, Dill", price: 18 },
      { name: "Kürbis & Ziegenkäse", description: "Ofenkürbis, Ziegenfrischkäse vom Nachbarhof, Kürbiskern", price: 16 },
      { name: "Rindertatar", description: "Vom Weiderind, Eigelb, Kapern, geröstetes Landbrot", price: 21 },
    ],
  },
  {
    title: "Hauptgänge",
    items: [
      { name: "Reh aus eigener Jagd", description: "Rücken & Praline, Sellerie, Wacholderjus, Preiselbeere", price: 38 },
      { name: "Saibling", description: "Gebratener Saibling, Belugalinsen, Lauch, Beurre blanc", price: 32 },
      { name: "Gartenteller", description: "Gemüse & Kräuter aus dem Klostergarten, Buttermilch, Saaten", price: 26 },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Rosenau Honig & Birne", description: "Honig-Parfait, pochierte Birne, Walnuss", price: 16 },
      { name: "Schokolade & Sauerkirsche", description: "Warmer Schokoladenkuchen, Sauerkirsche, Crème fraîche", price: 15 },
      { name: "Käse vom Brett", description: "Drei regionale Käse, Feigensenf, Früchtebrot", price: 18 },
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
    id: "scheune",
    name: "Die Zehntscheune",
    description:
      "Unsere restaurierte Scheune von 1788 mit freiliegendem Eichengebälk, langen Tafeln und stimmungsvollem Lichterhimmel — der große Rahmen für Ihre Feier.",
    capacity: "bis 120 Gäste",
    best: "Hochzeitsdinner & Party",
    image: `${IMG}/wedding/scheune.jpg`,
    gradient: "linear-gradient(135deg, #EADFD0 0%, #9C7B3F 60%, #34302A 100%)",
  },
  {
    id: "rosengarten",
    name: "Der Rosengarten",
    description:
      "Freie Trauung unter alten Linden, umrahmt von hunderten Rosen. Ein blühender Ort für das Ja-Wort und den Sektempfang im Freien.",
    capacity: "bis 80 Gäste",
    best: "Freie Trauung & Empfang",
    image: `${IMG}/wedding/garten.jpg`,
    gradient: "linear-gradient(135deg, #D7DCCE 0%, #5E6F52 70%, #FBF8F2 100%)",
  },
  {
    id: "gewoelbesaal",
    name: "Der Gewölbesaal",
    description:
      "Im historischen Gewölbekeller speisen Ihre Gäste bei Kerzenschein zwischen alten Mauern — intim, warm und unvergesslich.",
    capacity: "bis 60 Gäste",
    best: "Dinner im kleinen Kreis",
    image: `${IMG}/wedding/saal.jpg`,
    gradient: "linear-gradient(135deg, #34302A 0%, #9C7B3F 50%, #EADFD0 100%)",
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
    name: "Standesamtlich Intim",
    priceLabel: "ab 1.900 €",
    note: "bis 20 Personen",
    includes: [
      "Freie oder standesamtliche Trauung im Rosengarten",
      "Sektempfang mit Canapés",
      "3-Gang-Menü im Gewölbesaal",
      "Blumenschmuck der Tafel",
      "Eine Hochzeitssuite inklusive",
    ],
  },
  {
    id: "landhochzeit",
    name: "Die Landhochzeit",
    priceLabel: "ab 89 € / Person",
    note: "beliebtestes Paket",
    includes: [
      "Trauung im Rosengarten",
      "Sektempfang & Flying Buffet",
      "4-Gang-Hochzeitsmenü in der Zehntscheune",
      "Lichterhimmel & Tischdekoration",
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
      "Exklusive Anmietung des gesamten Guts",
      "Anreise-Dinner für die engsten Gäste",
      "Trauung, Feier & Brunch am Folgetag",
      "Alle 24 Zimmer für Ihre Gäste",
      "Persönliche Eventleitung über das ganze Wochenende",
    ],
  },
];

/* ── Galerie ────────────────────────────────────────────────────────────── */

export type GalleryItem = {
  id: string;
  title: string;
  category: "Hotel" | "Restaurant" | "Hochzeit" | "Natur";
  image: string;
  gradient: string;
  aspect: "portrait" | "landscape" | "square";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Der Rosengarten im Sommer", category: "Natur", image: `${IMG}/gallery/g1.jpg`, gradient: "linear-gradient(135deg, #D7DCCE 0%, #5E6F52 100%)", aspect: "portrait" },
  { id: "g2", title: "Weinberge bei Sonnenuntergang", category: "Natur", image: `${IMG}/gallery/g2.jpg`, gradient: "linear-gradient(135deg, #9C7B3F 0%, #EADFD0 100%)", aspect: "landscape" },
  { id: "g3", title: "Gedeckte Tafel bei Kerzenschein", category: "Restaurant", image: `${IMG}/gallery/g3.jpg`, gradient: "linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)", aspect: "portrait" },
  { id: "g4", title: "Brautstrauß aus dem Garten", category: "Hochzeit", image: `${IMG}/gallery/g4.jpg`, gradient: "linear-gradient(135deg, #EADFD0 0%, #D7DCCE 100%)", aspect: "square" },
  { id: "g5", title: "Morgennebel über den Feldern", category: "Natur", image: `${IMG}/gallery/g5.jpg`, gradient: "linear-gradient(135deg, #D7DCCE 0%, #FBF8F2 100%)", aspect: "landscape" },
  { id: "g6", title: "Der Weg zum Gutshaus", category: "Hotel", image: `${IMG}/gallery/g6.jpg`, gradient: "linear-gradient(135deg, #5E6F52 0%, #EADFD0 100%)", aspect: "portrait" },
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
      "Unsere Hochzeit in der Zehntscheune war wie aus einem Traum. Dieser Ort hat eine Seele — Geschichte, Wärme und ein Team, das jeden Wunsch von den Augen abliest.",
    author: "Lena & Jonas",
    context: "Hochzeit · September 2025",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Ein Wochenende auf Gut Rosenau ist wie eine Reise in eine ruhigere Zeit. Das Kaminzimmer, das Frühstück aus der Region, die Stille im Garten — wir kommen wieder.",
    author: "Familie Brandt",
    context: "Hotelgast · Oktober 2025",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Die Küche verbindet Bodenständigkeit mit echter Finesse. Das Reh aus eigener Jagd war eines der besten Gerichte, das wir seit Langem gegessen haben.",
    author: "Dr. Petra V.",
    context: "Restaurantgast · November 2025",
    rating: 5,
  },
];

/* ── Kontakt-Platzhalter (Designvorlage) ────────────────────────────────── */

export const CONTACT = {
  phone: "+49 (0) 30 123 456 78",
  email: "info@beispiel.de",
  address: ["Gut Rosenau", "Musterstraße 1", "10115 Berlin"],
  hours: [
    { label: "Rezeption", value: "Täglich 7:00 – 22:00 Uhr" },
    { label: "Restaurant", value: "Mi – So, 18:00 – 22:00 Uhr" },
    { label: "Hochzeitsbüro", value: "Nach Vereinbarung" },
  ],
};
