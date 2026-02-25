/* ================================================================
   WERKBANK Data
   Meisterbetrieb für Holz & Innenausbau
   ================================================================ */

/* ── Types ────────────────────────────────────────────────────── */

export type Service = {
  id: string;
  name: string;
  description: string;
  details: string[];
  icon: string;
  gradient: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  location: string;
  year: number;
  gradient: string;
};

export type ProjectCategory = "moebel" | "innenausbau" | "restaurierung" | "aussenbereich";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  gradient: string;
};

export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
};

export type ContactInfo = {
  company: string;
  street: string;
  city: string;
  phone: string;
  email: string;
  website: string;
};

export type OpeningHours = {
  label: string;
  hours: string;
};

/* ── Category Labels ──────────────────────────────────────────── */

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  moebel: "Möbel",
  innenausbau: "Innenausbau",
  restaurierung: "Restaurierung",
  aussenbereich: "Außenbereich",
};

/* ── Services ─────────────────────────────────────────────────── */

export const services: Service[] = [
  {
    id: "schreinerei",
    name: "Schreinerei & Möbelbau",
    description:
      "Individuelle Möbel nach Maß, die Funktion und Ästhetik vereinen. Von der ersten Skizze bis zum fertigen Stück — jedes Möbel ist ein Unikat.",
    details: [
      "Maßgefertigte Einbauschränke & Garderoben",
      "Küchenbau & Küchenplanung",
      "Sideboards, Regale & Vitrinen",
      "Ess- & Arbeitstische nach Maß",
      "Betten & Schlafzimmermöbel",
      "Individuelle Sonderlösungen",
    ],
    icon: "tree-pine",
    gradient: "linear-gradient(135deg, #8B5E3C 0%, #D4A574 50%, #EDE5DA 100%)",
  },
  {
    id: "innenausbau",
    name: "Innenausbau",
    description:
      "Kompletter Innenausbau aus einer Hand. Wir verwandeln Räume in Lebensräume — mit Liebe zum Detail und handwerklicher Präzision.",
    details: [
      "Wandverkleidungen & Paneele",
      "Deckenverkleidungen & Akustiklösungen",
      "Einbauregale & Nischen",
      "Dachgeschossausbau",
      "Laden- & Praxiseinrichtungen",
      "Empfangs- & Thekenbau",
    ],
    icon: "home",
    gradient: "linear-gradient(135deg, #5A6672 0%, #8A7B6E 50%, #EDE5DA 100%)",
  },
  {
    id: "restaurierung",
    name: "Restaurierung",
    description:
      "Behutsame Restaurierung antiker Möbel und denkmalgeschützter Bauelemente. Wir bewahren Geschichte und geben ihr neues Leben.",
    details: [
      "Antike Möbelrestaurierung",
      "Denkmalschutzarbeiten",
      "Oberflächenrestaurierung",
      "Furnier- & Intarsienarbeiten",
      "Historische Beschläge & Hardware",
      "Bestandsaufnahme & Dokumentation",
    ],
    icon: "wrench",
    gradient: "linear-gradient(135deg, #C45C3B 0%, #D4A574 50%, #F5EDE3 100%)",
  },
  {
    id: "tueren-fenster",
    name: "Türen & Fenster",
    description:
      "Individuelle Türen und Fenster in höchster Qualität. Ob modern oder klassisch — wir fertigen passgenau für jede Architektur.",
    details: [
      "Haustüren & Eingangselemente",
      "Innentüren nach Maß",
      "Schiebetüren & Raumteiler",
      "Holzfenster & Kastenfenster",
      "Glasarbeiten & Sprossen",
      "Zargen & Bekleidungen",
    ],
    icon: "door-open",
    gradient: "linear-gradient(135deg, #3D2B1F 0%, #8B5E3C 50%, #D4A574 100%)",
  },
  {
    id: "terrassen",
    name: "Terrassen & Außenbereich",
    description:
      "Holz im Außenbereich: Terrassen, Pergolen und Gartenmöbel, die Wind und Wetter trotzen und natürliche Schönheit ausstrahlen.",
    details: [
      "Terrassenbeläge & Holzdecks",
      "Pergolen & Überdachungen",
      "Gartenmöbel nach Maß",
      "Sichtschutz & Zäune",
      "Carports & Unterstellplätze",
      "Holzfassaden & Verkleidungen",
    ],
    icon: "leaf",
    gradient: "linear-gradient(135deg, #6B8F71 0%, #D4A574 50%, #F5EDE3 100%)",
  },
  {
    id: "treppenbau",
    name: "Treppenbau",
    description:
      "Treppen sind mehr als Verbindungselemente — sie sind Skulpturen im Raum. Wir planen und fertigen Treppen, die begeistern.",
    details: [
      "Freitragende Treppen",
      "Bolzentreppen",
      "Wendeltreppen",
      "Geländer & Handläufe",
      "Treppensanierung",
      "Kombinationen Holz-Stahl-Glas",
    ],
    icon: "stairs",
    gradient: "linear-gradient(135deg, #D4A574 0%, #8A7B6E 50%, #3D2B1F 100%)",
  },
];

/* ── Projects ─────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "villa-eichwald",
    title: "Villa Eichwald — Komplettausbau",
    category: "innenausbau",
    description:
      "Kompletter Innenausbau einer Villa aus den 1920er Jahren. Wandpaneele, Einbaumöbel und ein maßgefertigter Bibliotheksraum mit Eichenholz.",
    location: "Stuttgart-Degerloch",
    year: 2024,
    gradient: "linear-gradient(145deg, #8B5E3C, #D4A574, #EDE5DA)",
  },
  {
    id: "kueche-metzger",
    title: "Küche Metzger — Massivholzküche",
    category: "moebel",
    description:
      "Offene Wohnküche aus geräucherter Eiche mit Naturstein-Arbeitsplatte. Planung, Fertigung und Montage aus einer Hand.",
    location: "Esslingen am Neckar",
    year: 2024,
    gradient: "linear-gradient(145deg, #3D2B1F, #8B5E3C, #D4A574)",
  },
  {
    id: "weingut-kircher",
    title: "Weingut Kircher — Verkostungsraum",
    category: "innenausbau",
    description:
      "Ausbau eines historischen Gewölbekellers zum Verkostungsraum. Barrique-Holz trifft auf moderne Beleuchtung.",
    location: "Heilbronn",
    year: 2023,
    gradient: "linear-gradient(145deg, #5A6672, #8A7B6E, #D4A574)",
  },
  {
    id: "sekretaer-barock",
    title: "Barock-Sekretär — Restaurierung",
    category: "restaurierung",
    description:
      "Vollständige Restaurierung eines Barock-Sekretärs aus dem 18. Jahrhundert. Furnier, Intarsien und Messingbeschläge originalgetreu erneuert.",
    location: "Tübingen",
    year: 2024,
    gradient: "linear-gradient(145deg, #C45C3B, #D4A574, #F5EDE3)",
  },
  {
    id: "terrasse-waldhaus",
    title: "Terrasse Waldhaus — Thermoesche",
    category: "aussenbereich",
    description:
      "Großzügige Terrassenanlage mit Thermoeschen-Dielen, integrierter Sitzbank und Pflanzgefäßen. 85 Quadratmeter Handwerk.",
    location: "Böblingen",
    year: 2023,
    gradient: "linear-gradient(145deg, #6B8F71, #D4A574, #EDE5DA)",
  },
  {
    id: "treppe-loft",
    title: "Loft-Treppe — Stahl & Eiche",
    category: "moebel",
    description:
      "Freitragende Treppe aus Stahl und massiver Eiche für ein umgebautes Industrieloft. Minimalistisch, skulptural, kraftvoll.",
    location: "Stuttgart-Ost",
    year: 2024,
    gradient: "linear-gradient(145deg, #5A6672, #3D2B1F, #8B5E3C)",
  },
  {
    id: "apotheke-hirsch",
    title: "Hirsch-Apotheke — Ladenausbau",
    category: "innenausbau",
    description:
      "Kompletter Umbau einer traditionsreichen Apotheke. Moderne Funktionalität in historischem Ambiente mit Nussbaum-Einrichtung.",
    location: "Ludwigsburg",
    year: 2023,
    gradient: "linear-gradient(145deg, #8B5E3C, #8A7B6E, #F5EDE3)",
  },
  {
    id: "kommode-jugendstil",
    title: "Jugendstil-Kommode — Restaurierung",
    category: "restaurierung",
    description:
      "Aufwändige Restaurierung einer Jugendstil-Kommode mit Mahagoni-Furnier und handgeschnitzten Ornamenten.",
    location: "Reutlingen",
    year: 2022,
    gradient: "linear-gradient(145deg, #C45C3B, #8B5E3C, #3D2B1F)",
  },
  {
    id: "pergola-sonnenhof",
    title: "Pergola Sonnenhof — Douglasie",
    category: "aussenbereich",
    description:
      "Großzügige Pergola mit integriertem Sonnensegel aus Douglasien-Vollholz. Ein Rückzugsort im eigenen Garten.",
    location: "Waiblingen",
    year: 2024,
    gradient: "linear-gradient(145deg, #6B8F71, #8B5E3C, #D4A574)",
  },
  {
    id: "ankleidezimmer-luxus",
    title: "Ankleidezimmer — Begehbarer Traum",
    category: "moebel",
    description:
      "Begehbarer Kleiderschrank mit LED-Beleuchtung, Schubladen mit Soft-Close und Nussbaum-Fronten. Luxus, der sich öffnet.",
    location: "Sindelfingen",
    year: 2024,
    gradient: "linear-gradient(145deg, #D4A574, #8A7B6E, #3D2B1F)",
  },
];

/* ── Team ─────────────────────────────────────────────────────── */

export const teamMembers: TeamMember[] = [
  {
    id: "heinrich-weller",
    name: "Heinrich Weller",
    role: "Gründer & Schreinermeister",
    description:
      "Hat die Werkstatt 1987 gegründet und leitet sie mit der gleichen Leidenschaft wie am ersten Tag. Über 40 Jahre Erfahrung im Holzhandwerk.",
    gradient: "linear-gradient(145deg, #8B5E3C, #D4A574)",
  },
  {
    id: "markus-weller",
    name: "Markus Weller",
    role: "Geschäftsführer & Schreinermeister",
    description:
      "Führt den Betrieb in zweiter Generation und verbindet traditionelles Handwerk mit modernem Design und nachhaltiger Fertigung.",
    gradient: "linear-gradient(145deg, #3D2B1F, #8B5E3C)",
  },
  {
    id: "thomas-braun",
    name: "Thomas Braun",
    role: "Werkstattleiter",
    description:
      "Koordiniert die Fertigung und sorgt dafür, dass jedes Werkstück in höchster Qualität die Werkstatt verlässt. Seit 2001 im Team.",
    gradient: "linear-gradient(145deg, #5A6672, #8A7B6E)",
  },
  {
    id: "julia-schwarz",
    name: "Julia Schwarz",
    role: "Planung & Design",
    description:
      "Entwirft Möbel und Raumkonzepte mit dem Blick für das Besondere. Studierte Innenarchitektin mit Liebe zum Holz.",
    gradient: "linear-gradient(145deg, #C45C3B, #D4A574)",
  },
  {
    id: "andreas-koch",
    name: "Andreas Koch",
    role: "Geselle Schreinerei",
    description:
      "Spezialist für Oberflächenveredelung und Furnier. Seine Leidenschaft sind filigrane Arbeiten und traditionelle Techniken.",
    gradient: "linear-gradient(145deg, #D4A574, #8B5E3C)",
  },
  {
    id: "lena-vogel",
    name: "Lena Vogel",
    role: "Büro & Organisation",
    description:
      "Hält alle Fäden zusammen — von der Terminplanung bis zur Kundenbetreuung. Das organisatorische Herz der WERKBANK.",
    gradient: "linear-gradient(145deg, #8A7B6E, #D4A574)",
  },
];

/* ── Timeline ─────────────────────────────────────────────────── */

export const timeline: TimelineEvent[] = [
  {
    year: 1987,
    title: "Gründung",
    description:
      "Heinrich Weller gründet die Schreinerei in einer kleinen Werkstatt in Stuttgart-Vaihingen. Mit drei Mitarbeitern und großer Leidenschaft.",
  },
  {
    year: 1995,
    title: "Erweiterung",
    description:
      "Umzug in die heutige Werkstatt mit 800m² Fläche. Anschaffung moderner CNC-Technik bei Beibehaltung traditioneller Handwerkskunst.",
  },
  {
    year: 2005,
    title: "Meisterbrief",
    description:
      "Markus Weller legt die Meisterprüfung ab und tritt in den Betrieb ein. Vater und Sohn arbeiten fortan Seite an Seite.",
  },
  {
    year: 2015,
    title: "Neue Werkstatt",
    description:
      "Großzügiger Ausbau mit Showroom und Designstudio. Integration von CAD/CAM-Technologie für präzise Planung und Fertigung.",
  },
  {
    year: 2024,
    title: "Heute",
    description:
      "12 Mitarbeiter, über 500 realisierte Projekte und der gleiche Anspruch wie am ersten Tag: Qualität ohne Kompromisse.",
  },
];

/* ── Contact ──────────────────────────────────────────────────── */

export const contactInfo: ContactInfo = {
  company: "WERKBANK Schreinerei",
  street: "Musterstraße 1",
  city: "10115 Berlin",
  phone: "+49 (0) 30 123 456 78",
  email: "info@beispiel.de",
  website: "www.beispiel.de",
};

export const openingHoursWerkstatt: OpeningHours[] = [
  { label: "Montag – Freitag", hours: "07:00 – 17:00 Uhr" },
  { label: "Samstag", hours: "nach Vereinbarung" },
  { label: "Sonntag", hours: "geschlossen" },
];

export const openingHoursBuero: OpeningHours[] = [
  { label: "Montag – Freitag", hours: "08:00 – 18:00 Uhr" },
  { label: "Samstag", hours: "09:00 – 13:00 Uhr" },
  { label: "Sonntag", hours: "geschlossen" },
];
