/* ── SAVEUR Restaurant Data ─────────────────────────────────────────────── */

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "vorspeisen" | "hauptgerichte" | "desserts" | "weinbegleitung";
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "restaurant" | "kueche" | "events";
  gradient: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
};

export type OpeningHour = {
  day: string;
  hours: string;
};

/* ── Menu Items ───────────────────────────────────────────────────────── */

export const menuItems: MenuItem[] = [
  /* Vorspeisen */
  {
    id: "v1",
    name: "Tatar vom Rind",
    description:
      "Handgeschnittenes Rinderfilet mit Eigelb-Confit, Kapern, Schalotten und geräuchertem Paprikaöl auf Toast",
    price: 24,
    category: "vorspeisen",
  },
  {
    id: "v2",
    name: "Jakobsmuscheln",
    description:
      "Gebratene Jakobsmuscheln auf Erbsenpüree mit Speck-Crumble, Zitronenthymian und Trüffelvinaigrette",
    price: 28,
    category: "vorspeisen",
  },
  {
    id: "v3",
    name: "Wildkräutersalat",
    description:
      "Saisonale Wildkräuter mit warmem Ziegenkäse, karamellisierten Walnüssen und Honig-Senf-Dressing",
    price: 18,
    category: "vorspeisen",
  },
  {
    id: "v4",
    name: "Hummercremesuppe",
    description:
      "Samtiger Hummerfond mit Cognac-Schaum, Hummermedaillon und frischem Estragon",
    price: 22,
    category: "vorspeisen",
  },
  {
    id: "v5",
    name: "Foie Gras Terrine",
    description:
      "Hausgemachte Gänseleberterrine mit Portwein-Gelee, Brioche und Feigen-Chutney",
    price: 32,
    category: "vorspeisen",
  },

  /* Hauptgerichte */
  {
    id: "h1",
    name: "Filet vom Wagyu-Rind",
    description:
      "250g Wagyu-Filet (A5) mit Périgord-Trüffel, Kartoffel-Mousseline und Rotwein-Jus",
    price: 68,
    category: "hauptgerichte",
  },
  {
    id: "h2",
    name: "Bretonischer Steinbutt",
    description:
      "Gebratener Steinbutt auf Safran-Risotto mit glasierten Artischocken und Beurre Blanc",
    price: 48,
    category: "hauptgerichte",
  },
  {
    id: "h3",
    name: "Rehrücken Baden-Baden",
    description:
      "Rosa gebratener Rehrücken mit Sellerie-Birnen-Püree, Preiselbeeren und Wacholdersoße",
    price: 52,
    category: "hauptgerichte",
  },
  {
    id: "h4",
    name: "Lammkarree Provençale",
    description:
      "Kräuter-krustiertes Lammkarree mit Ratatouille, schwarzen Oliven und Rosmarin-Jus",
    price: 46,
    category: "hauptgerichte",
  },
  {
    id: "h5",
    name: "Ente à l\u2019Orange",
    description:
      "Konfierte Entenbrust mit Grand-Marnier-Orangensauce, Süßkartoffelpüree und glasierten Karotten",
    price: 42,
    category: "hauptgerichte",
  },
  {
    id: "h6",
    name: "Trüffel-Ravioli",
    description:
      "Hausgemachte Ravioli gefüllt mit schwarzem Trüffel und Ricotta in Salbeibutter mit Parmesan",
    price: 38,
    category: "hauptgerichte",
  },

  /* Desserts */
  {
    id: "d1",
    name: "Crème Brûlée Tonkabohne",
    description:
      "Klassische Crème Brûlée verfeinert mit Tonkabohne, karamellisierter Zuckerkruste und Vanille-Tuile",
    price: 16,
    category: "desserts",
  },
  {
    id: "d2",
    name: "Schokoladenfondant",
    description:
      "Warmer Valrhona-Schokoladenkuchen mit flüssigem Kern, Himbeer-Sorbet und Gold-Crumble",
    price: 18,
    category: "desserts",
  },
  {
    id: "d3",
    name: "Tarte Tatin",
    description:
      "Karamellisierte Apfeltarte mit Calvados-Eis und Bourbon-Vanille-Sauce",
    price: 16,
    category: "desserts",
  },
  {
    id: "d4",
    name: "Käseauswahl",
    description:
      "Affineur-Auswahl von fünf gereiften Käsesorten mit Feigen-Senf, Nüssen und hausgebackenem Brot",
    price: 22,
    category: "desserts",
  },

  /* Weinbegleitung */
  {
    id: "w1",
    name: "Chablis Premier Cru 2021",
    description:
      "William Fèvre, Burgund — Mineralisch, frisch mit Noten von Zitrus und weißem Pfirsich",
    price: 14,
    category: "weinbegleitung",
  },
  {
    id: "w2",
    name: "Barolo DOCG 2018",
    description:
      "Marchesi di Barolo, Piemont — Vollmundig mit Aromen von Kirsche, Rose und Lakritz",
    price: 18,
    category: "weinbegleitung",
  },
  {
    id: "w3",
    name: "Spätburgunder Reserve 2020",
    description:
      "Weingut Friedrich Becker, Pfalz — Eleganter Pinot Noir mit feiner Frucht und seidigen Tanninen",
    price: 12,
    category: "weinbegleitung",
  },
  {
    id: "w4",
    name: "Sauternes 2019",
    description:
      "Château Suduiraut, Bordeaux — Opulenter Dessertwein mit Honig, Aprikose und Karamell",
    price: 16,
    category: "weinbegleitung",
  },
];

/* ── Gallery Items ────────────────────────────────────────────────────── */

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Der große Saal",
    category: "restaurant",
    gradient:
      "linear-gradient(135deg, #1A1412 0%, #3D2B1F 40%, #C8956C 100%)",
  },
  {
    id: "g2",
    title: "Kerzenschein",
    category: "restaurant",
    gradient:
      "radial-gradient(ellipse at 30% 40%, #D4AF37 0%, #6B2D3E 50%, #1A1412 100%)",
  },
  {
    id: "g3",
    title: "Offene Küche",
    category: "kueche",
    gradient:
      "linear-gradient(160deg, #231C18 0%, #C8956C 50%, #F5F0EB 100%)",
  },
  {
    id: "g4",
    title: "Flammenspiel",
    category: "kueche",
    gradient:
      "radial-gradient(circle at 50% 60%, #D4AF37 0%, #C8956C 30%, #1A1412 80%)",
  },
  {
    id: "g5",
    title: "Private Dining",
    category: "events",
    gradient:
      "linear-gradient(145deg, #6B2D3E 0%, #231C18 50%, #D4AF37 100%)",
  },
  {
    id: "g6",
    title: "Das Bar-Erlebnis",
    category: "restaurant",
    gradient:
      "linear-gradient(180deg, #1A1412 0%, #3D2B1F 30%, #6B2D3E 100%)",
  },
  {
    id: "g7",
    title: "Patisserie",
    category: "kueche",
    gradient:
      "radial-gradient(ellipse at 70% 30%, #F5F0EB 0%, #C8956C 40%, #231C18 100%)",
  },
  {
    id: "g8",
    title: "Weinverkostung",
    category: "events",
    gradient:
      "linear-gradient(120deg, #6B2D3E 0%, #D4AF37 40%, #C8956C 100%)",
  },
  {
    id: "g9",
    title: "Tischkultur",
    category: "restaurant",
    gradient:
      "linear-gradient(200deg, #C8956C 0%, #1A1412 50%, #D4AF37 100%)",
  },
  {
    id: "g10",
    title: "Chef\u2019s Table",
    category: "events",
    gradient:
      "radial-gradient(circle at 40% 50%, #C8956C 0%, #6B2D3E 40%, #1A1412 90%)",
  },
  {
    id: "g11",
    title: "Mise en Place",
    category: "kueche",
    gradient:
      "linear-gradient(135deg, #231C18 0%, #D4AF37 60%, #F5F0EB 100%)",
  },
  {
    id: "g12",
    title: "Sommelier bei der Arbeit",
    category: "restaurant",
    gradient:
      "linear-gradient(170deg, #6B2D3E 0%, #C8956C 50%, #231C18 100%)",
  },
];

/* ── Team Members ─────────────────────────────────────────────────────── */

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Jean-Marc Dubois",
    role: "Küchenchef & Gründer",
    bio: "Nach Stationen bei Alain Ducasse und im Noma gründete Jean-Marc SAVEUR mit der Vision, französische Haute Cuisine mit regionaler Saisonalität zu verbinden. Seine Küche lebt von Respekt vor dem Produkt und der Leidenschaft für das Handwerk.",
    initials: "JD",
    gradient:
      "linear-gradient(135deg, #1A1412 0%, #C8956C 50%, #D4AF37 100%)",
  },
  {
    id: "t2",
    name: "Amelie Bergmann",
    role: "Sous-Chefin",
    bio: "Amelie bringt ihre österreichische Finesse und ihr Gespür für innovative Texturen ein. Ihre Desserts und Vorspeisen sind bekannt für überraschende Geschmackskombinationen, die auf den Punkt gebracht sind.",
    initials: "AB",
    gradient:
      "linear-gradient(160deg, #6B2D3E 0%, #C8956C 50%, #F5F0EB 100%)",
  },
  {
    id: "t3",
    name: "Maximilian Roth",
    role: "Sommelier",
    bio: "Als zertifizierter Master Sommelier kennt Maximilian die Weinwelt wie seine Westentasche. Seine Weinbegleitungen sind legendär und verwandeln jedes Menü in eine Reise durch die besten Terroirs Europas.",
    initials: "MR",
    gradient:
      "radial-gradient(circle at 30% 40%, #D4AF37 0%, #6B2D3E 60%, #1A1412 100%)",
  },
  {
    id: "t4",
    name: "Sophia Hartmann",
    role: "Restaurantleiterin",
    bio: "Sophias untrügliches Gespür für Gastfreundschaft und ihr Blick für Details sorgen dafür, dass jeder Gast sich wie ein Ehrengast fühlt. Sie orchestriert den Service mit Eleganz und Wärme.",
    initials: "SH",
    gradient:
      "linear-gradient(145deg, #231C18 0%, #6B2D3E 40%, #C8956C 100%)",
  },
];

/* ── Opening Hours ────────────────────────────────────────────────────── */

export const openingHours: OpeningHour[] = [
  { day: "Montag", hours: "Ruhetag" },
  { day: "Dienstag", hours: "18:00 \u2013 23:00" },
  { day: "Mittwoch", hours: "18:00 \u2013 23:00" },
  { day: "Donnerstag", hours: "18:00 \u2013 23:00" },
  { day: "Freitag", hours: "18:00 \u2013 00:00" },
  { day: "Samstag", hours: "12:00 \u2013 14:30 & 18:00 \u2013 00:00" },
  { day: "Sonntag", hours: "12:00 \u2013 14:30 & 18:00 \u2013 22:00" },
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

export function getMenuByCategory(category: MenuItem["category"]): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getGalleryByCategory(
  category: GalleryItem["category"]
): GalleryItem[] {
  return galleryItems.filter((item) => item.category === category);
}

/* ── Category labels for display ──────────────────────────────────────── */

export const categoryLabels: Record<MenuItem["category"], string> = {
  vorspeisen: "Vorspeisen",
  hauptgerichte: "Hauptgerichte",
  desserts: "Desserts",
  weinbegleitung: "Weinbegleitung",
};

export const galleryCategoryLabels: Record<GalleryItem["category"], string> = {
  restaurant: "Restaurant",
  kueche: "K\u00FCche",
  events: "Events",
};
