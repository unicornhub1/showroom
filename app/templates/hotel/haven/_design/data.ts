/* ── HAVEN Hotel Mock Data ──────────────────────────────────────────────── */

/* ── Types ────────────────────────────────────────────────────────────── */

export type Room = {
  id: string;
  name: string;
  description: string;
  size: number;
  maxGuests: number;
  price: number;
  amenities: string[];
  gradient: string;
};

export type Experience = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  gradient: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "Hotel" | "Zimmer" | "Restaurant" | "Natur" | "Events";
  gradient: string;
  aspect: "portrait" | "landscape" | "square";
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  date: string;
  rating: number;
};

/* ── Rooms ────────────────────────────────────────────────────────────── */

export const rooms: Room[] = [
  {
    id: "suite-deluxe",
    name: "Suite Deluxe",
    description:
      "Unsere weitläufige Suite Deluxe vereint zeitlosen Luxus mit alpinem Charme. Ein separater Wohnbereich, freistehende Badewanne mit Bergblick und eine private Terrasse schaffen ein unvergleichliches Refugium der Ruhe.",
    size: 68,
    maxGuests: 3,
    price: 289,
    amenities: [
      "Freistehende Badewanne",
      "Private Terrasse",
      "Bergpanorama",
      "Minibar",
      "Nespresso-Maschine",
      "WLAN",
      "Safe",
      "Bademantel & Pantoffeln",
    ],
    gradient:
      "linear-gradient(135deg, #E8DDD3 0%, #D4DACE 40%, #B8965A 100%)",
  },
  {
    id: "zimmer-komfort",
    name: "Zimmer Komfort",
    description:
      "Das Zimmer Komfort besticht durch seine warme Eleganz und durchdachte Details. Naturmaterialien, gedämpftes Licht und ein luxuriöses Boxspringbett laden zum Verweilen ein. Der Blick auf den hoteleigenen Garten rundet das Erlebnis ab.",
    size: 34,
    maxGuests: 2,
    price: 159,
    amenities: [
      "Gartenblick",
      "Regendusche",
      "Boxspringbett",
      "Minibar",
      "WLAN",
      "Safe",
      "Flat-TV",
    ],
    gradient:
      "linear-gradient(135deg, #FAF8F5 0%, #E8DDD3 50%, #D4DACE 100%)",
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    description:
      "Die Junior Suite bietet großzügigen Raum mit einem offenen Wohn- und Schlafbereich. Edle Stoffe, ein komfortabler Lesesessel am Fenster und ein luxuriöses Badezimmer mit Regendusche machen jeden Aufenthalt besonders.",
    size: 48,
    maxGuests: 2,
    price: 219,
    amenities: [
      "Balkon",
      "Regendusche",
      "Lesesessel",
      "Minibar",
      "Nespresso-Maschine",
      "WLAN",
      "Safe",
      "Bademantel",
    ],
    gradient:
      "linear-gradient(135deg, #D4DACE 0%, #FAF8F5 40%, #E8DDD3 100%)",
  },
  {
    id: "einzelzimmer-superior",
    name: "Einzelzimmer Superior",
    description:
      "Kompakt und dennoch raffiniert bietet unser Einzelzimmer Superior alles, was Alleinreisende sich wünschen. Hochwertige Materialien, ein ergonomischer Arbeitsplatz und ein spa-inspiriertes Badezimmer sorgen für Wohlbefinden.",
    size: 24,
    maxGuests: 1,
    price: 129,
    amenities: [
      "Arbeitsplatz",
      "Regendusche",
      "WLAN",
      "Minibar",
      "Safe",
      "Flat-TV",
    ],
    gradient:
      "linear-gradient(135deg, #F5F1EC 0%, #E8DDD3 60%, #D4DACE 100%)",
  },
];

/* ── Experiences ──────────────────────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description:
      "Tauchen Sie ein in unseren 800m\u00B2 großen Wellnessbereich mit finnischer Sauna, Dampfbad, beheiztem Außenpool und einer Auswahl an exklusiven Behandlungen. Unsere erfahrenen Therapeuten verwenden ausschließlich natürliche Produkte aus der Region.",
    schedule: "Täglich 7:00 \u2013 21:00 Uhr",
    gradient:
      "linear-gradient(135deg, #D4DACE 0%, #E8DDD3 50%, #B8965A 100%)",
  },
  {
    id: "gourmet-restaurant",
    name: "Gourmet Restaurant",
    description:
      "Unser Küchenchef kreiert in der hauseigenen Gourmetküche saisonale Menüs mit regionalen Zutaten. Genießen Sie mehrgängige Abendessen bei Kerzenschein, begleitet von erlesenen Weinen aus unserem historischen Weinkeller.",
    schedule: "Abendessen: 18:30 \u2013 22:00 Uhr",
    gradient:
      "linear-gradient(135deg, #B8965A 0%, #E8DDD3 40%, #FAF8F5 100%)",
  },
  {
    id: "weinverkostung",
    name: "Weinverkostung",
    description:
      "Entdecken Sie die besten Tropfen der Region bei einer geführten Weinverkostung in unserem historischen Gewölbekeller. Unser Sommelier führt Sie durch eine Auswahl von sechs erlesenen Weinen, begleitet von regionalen Käsespezialitäten.",
    schedule: "Freitag & Samstag, 17:00 Uhr",
    gradient:
      "linear-gradient(135deg, #2C3E2D 0%, #4A6B4C 40%, #D4DACE 100%)",
  },
  {
    id: "natur-wandern",
    name: "Natur & Wandern",
    description:
      "Die umliegende Landschaft bietet über 50 km markierte Wanderwege für jeden Anspruch. Unser Bergführer begleitet Sie auf Wunsch zu verborgenen Aussichtspunkten und idyllischen Berghütten. Wanderkarten und Nordic-Walking-Stöcke stehen kostenfrei bereit.",
    schedule: "Geführte Touren: Mi & Sa, 9:00 Uhr",
    gradient:
      "linear-gradient(135deg, #2C3E2D 0%, #D4DACE 50%, #FAF8F5 100%)",
  },
  {
    id: "private-events",
    name: "Private Events",
    description:
      "Ob Hochzeit, Jubiläum oder Firmenfeier \u2013 unsere eleganten Veranstaltungsräume bieten den perfekten Rahmen für Ihren besonderen Anlass. Unser Event-Team plant und organisiert jeden Moment mit Sorgfalt und Leidenschaft.",
    schedule: "Auf Anfrage",
    gradient:
      "linear-gradient(135deg, #E8DDD3 0%, #B8965A 40%, #FAF8F5 100%)",
  },
  {
    id: "yoga-am-morgen",
    name: "Yoga am Morgen",
    description:
      "Beginnen Sie Ihren Tag mit sanften Yoga-Übungen auf unserer Sonnenterrasse. Unsere zertifizierte Yogalehrerin führt Sie durch eine 60-minütige Einheit, die Körper und Geist in Einklang bringt \u2013 mit Blick auf die aufgehende Sonne über den Bergen.",
    schedule: "Täglich 7:30 \u2013 8:30 Uhr",
    gradient:
      "linear-gradient(135deg, #FAF8F5 0%, #D4DACE 40%, #E8DDD3 100%)",
  },
];

/* ── Gallery Items ────────────────────────────────────────────────────── */

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Hoteleingang bei Dämmerung",
    category: "Hotel",
    gradient: "linear-gradient(135deg, #2C3E2D 0%, #B8965A 60%, #E8DDD3 100%)",
    aspect: "landscape",
  },
  {
    id: "g2",
    title: "Suite Deluxe \u2013 Schlafbereich",
    category: "Zimmer",
    gradient: "linear-gradient(135deg, #E8DDD3 0%, #FAF8F5 50%, #D4DACE 100%)",
    aspect: "portrait",
  },
  {
    id: "g3",
    title: "Gourmet-Teller mit saisonalen Zutaten",
    category: "Restaurant",
    gradient: "linear-gradient(135deg, #B8965A 0%, #E8DDD3 40%, #FAF8F5 100%)",
    aspect: "square",
  },
  {
    id: "g4",
    title: "Morgennebel über dem Tal",
    category: "Natur",
    gradient: "linear-gradient(135deg, #D4DACE 0%, #FAF8F5 50%, #E8DDD3 100%)",
    aspect: "landscape",
  },
  {
    id: "g5",
    title: "Wellnessbereich mit Außenpool",
    category: "Hotel",
    gradient: "linear-gradient(135deg, #D4DACE 0%, #B8965A 60%, #FAF8F5 100%)",
    aspect: "portrait",
  },
  {
    id: "g6",
    title: "Hochzeit im Rosengarten",
    category: "Events",
    gradient: "linear-gradient(135deg, #E8DDD3 0%, #B8965A 40%, #D4DACE 100%)",
    aspect: "landscape",
  },
  {
    id: "g7",
    title: "Zimmer Komfort \u2013 Gartenblick",
    category: "Zimmer",
    gradient: "linear-gradient(135deg, #FAF8F5 0%, #D4DACE 60%, #E8DDD3 100%)",
    aspect: "square",
  },
  {
    id: "g8",
    title: "Weinverkostung im Gewölbekeller",
    category: "Restaurant",
    gradient: "linear-gradient(135deg, #2C3E2D 0%, #4A6B4C 50%, #B8965A 100%)",
    aspect: "portrait",
  },
  {
    id: "g9",
    title: "Alpenpanorama vom Balkon",
    category: "Natur",
    gradient: "linear-gradient(135deg, #D4DACE 0%, #2C3E2D 50%, #FAF8F5 100%)",
    aspect: "landscape",
  },
  {
    id: "g10",
    title: "Lobby mit Kaminfeuer",
    category: "Hotel",
    gradient: "linear-gradient(135deg, #B8965A 0%, #E8DDD3 50%, #FAF8F5 100%)",
    aspect: "square",
  },
  {
    id: "g11",
    title: "Junior Suite \u2013 Badezimmer",
    category: "Zimmer",
    gradient: "linear-gradient(135deg, #FAF8F5 0%, #E8DDD3 40%, #D4DACE 100%)",
    aspect: "portrait",
  },
  {
    id: "g12",
    title: "Gedeckter Tisch am Abend",
    category: "Restaurant",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #B8965A 50%, #E8DDD3 100%)",
    aspect: "landscape",
  },
  {
    id: "g13",
    title: "Wanderweg durch den Wald",
    category: "Natur",
    gradient: "linear-gradient(135deg, #2C3E2D 0%, #D4DACE 60%, #FAF8F5 100%)",
    aspect: "portrait",
  },
  {
    id: "g14",
    title: "Firmenfeier im Festsaal",
    category: "Events",
    gradient: "linear-gradient(135deg, #E8DDD3 0%, #B8965A 60%, #2C3E2D 100%)",
    aspect: "square",
  },
  {
    id: "g15",
    title: "Spa-Behandlung bei Kerzenlicht",
    category: "Hotel",
    gradient: "linear-gradient(135deg, #E8DDD3 0%, #D4DACE 40%, #B8965A 100%)",
    aspect: "landscape",
  },
  {
    id: "g16",
    title: "Yoga auf der Sonnenterrasse",
    category: "Events",
    gradient: "linear-gradient(135deg, #FAF8F5 0%, #D4DACE 50%, #B8965A 100%)",
    aspect: "portrait",
  },
];

/* ── Testimonials ─────────────────────────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Ein Ort, an dem die Seele zur Ruhe kommt. Vom ersten Moment an fühlt man sich wie in einer anderen Welt \u2013 geborgen, verwöhnt und fern von allem Alltäglichen.",
    author: "Elisabeth & Thomas M.",
    location: "München",
    date: "Oktober 2025",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Das HAVEN hat unsere Erwartungen in jeder Hinsicht übertroffen. Die Suite war ein Traum, das Restaurant ein Gedicht, und der Spa-Bereich \u2013 schlicht himmlisch.",
    author: "Dr. Katharina S.",
    location: "Wien",
    date: "August 2025",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Wir kommen seit drei Jahren immer wieder. Die Liebe zum Detail, die herzliche Gastfreundschaft und die atemberaubende Lage machen das HAVEN zu unserem persönlichen Lieblingsort.",
    author: "Familie Bergmann",
    location: "Zürich",
    date: "Dezember 2025",
    rating: 5,
  },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
