/* ── Dr. med. Svea Ellerwald — Inhalte ───────────────────────────────────────
   Fiktive Privatpraxis für integrative Frauenmedizin.
   Alle Namen, Daten und Kontakte sind Platzhalter (Designvorlage der Unicorn Factory).
─────────────────────────────────────────────────────────────────────────── */

export const BASE = "/templates/gesundheit/ellerwald";
const IMG = `${BASE}/images`;

export const BRAND = {
  name: "Svea Ellerwald",
  title: "Dr. med. Svea Ellerwald",
  practice: "Frauenmedizin in Berlin-Mitte",
  role: "Fachärztin für Frauenheilkunde, Naturheilverfahren und Akupunktur",
  showroom: "ELLERWALD",
};

export const NAV = [
  { label: "Schwerpunkte", href: `${BASE}/schwerpunkte`, hint: "Zyklus, Kinderwunsch, Wechseljahre" },
  { label: "Über mich", href: `${BASE}/ueber-mich`, hint: "Werdegang und Praxisräume" },
  { label: "Termin & Kontakt", href: `${BASE}/termin`, hint: "Online buchen, Sprechzeiten, Kosten" },
];

export const CONTACT = {
  phone: "+49 (0) 30 123 456 78",
  phoneHref: "tel:+493012345678",
  email: "info@beispiel.de",
  street: "Musterstraße 1",
  city: "10115 Berlin",
  web: "www.beispiel.de",
  instagram: "@beispiel",
  hours: [
    { days: "Montag bis Freitag", time: "10–18 Uhr" },
    { days: "Samstag", time: "10–16 Uhr" },
  ],
};

export const IMAGES = {
  portrait: `${IMG}/portrait.jpg`,
  dew: `${IMG}/dew.jpg`,
  tea: `${IMG}/tea.jpg`,
  herbs: `${IMG}/herbs.jpg`,
  calm: `${IMG}/calm.jpg`,
  roomCorner: `${IMG}/room-corner.jpg`,
  roomChair: `${IMG}/room-chair.jpg`,
  roomPlants: `${IMG}/room-plants.jpg`,
};

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── Lebensphasen ───────────────────────────────────────────────────────── */

export type Phase = {
  id: string;
  title: string;
  hint: string;
  lead: string;
  topics: string[];
  offers: string[];
  note: string;
  more: string;
  image: string;
  alt: string;
  gradient: string;
};

export const PHASES: Phase[] = [
  {
    id: "zyklus",
    title: "Zyklus und Periode",
    hint: "ab der ersten Blutung",
    lead: "Schmerzen, die jeden Monat den Kalender bestimmen, sind kein Schicksal. Wir suchen gemeinsam nach der Ursache und nach dem, was Ihnen im Alltag wirklich hilft.",
    topics: [
      "Starke oder schmerzhafte Blutungen",
      "PMS und Stimmungsschwankungen",
      "Verdacht auf Endometriose",
      "Pille absetzen",
      "Unregelmäßiger Zyklus",
    ],
    offers: [
      "Zyklusanalyse mit Hormonprofil",
      "Ultraschall in der Praxis",
      "Phytotherapie, etwa mit Mönchspfeffer oder Frauenmantel",
      "Akupunktur bei Regelschmerzen",
    ],
    note: "Bringen Sie, wenn möglich, einen Zykluskalender der letzten drei Monate mit. Eine App genügt.",
    more: "Mehr zu Zyklus und Periode",
    image: `${IMG}/phase-zyklus.jpg`,
    alt: "Junge Frau mit geschlossenen Augen im Licht eines Fensters",
    gradient: "linear-gradient(160deg, #6F5A4E, #2F2A24)",
  },
  {
    id: "kinderwunsch",
    title: "Kinderwunsch",
    hint: "vorbereiten und begleiten",
    lead: "Manchmal dauert es länger als gedacht. Ich begleite Sie vor und neben einer Kinderwunschbehandlung, mit Diagnostik, Geduld und einem Blick auf den ganzen Menschen.",
    topics: [
      "Zyklusmonitoring",
      "Vorbereitung auf eine Schwangerschaft",
      "Begleitung neben der Kinderwunschklinik",
      "Wiederholte Fehlgeburten",
    ],
    offers: [
      "Hormon- und Schilddrüsendiagnostik",
      "Mikronährstoffanalyse, auch für den Partner",
      "Akupunktur begleitend zur IVF",
      "Gespräche, wenn die Zeit schwer wird",
    ],
    note: "Bei Kinderwunsch sind beide Partner willkommen. Der erste Termin ist bewusst länger angesetzt.",
    more: "Mehr zum Kinderwunsch",
    image: `${IMG}/phase-kinderwunsch.jpg`,
    alt: "Zwei Hände, die sich auf einem hellen Laken halten",
    gradient: "linear-gradient(160deg, #B9A597, #5B4B43)",
  },
  {
    id: "schwangerschaft",
    title: "Schwangerschaft und die Zeit danach",
    hint: "vom Test bis zum Wochenbett",
    lead: "Übelkeit, Schlaf, Rücken, Sorgen: In der Schwangerschaft ist vieles normal und trotzdem belastend. Ich ergänze die Vorsorge um sanfte, gut erprobte Mittel.",
    topics: [
      "Übelkeit und Sodbrennen",
      "Schlafprobleme",
      "Geburtsvorbereitung",
      "Wochenbett und Stillzeit",
      "Erschöpfung nach der Geburt",
    ],
    offers: [
      "Akupunktur zur Geburtsvorbereitung ab der 36. Woche",
      "Eisen- und Mikronährstoffcheck",
      "Pflanzliche Hilfe, sicher dosiert",
      "Nachsorge und Rückbildung im Blick",
    ],
    note: "Die Schwangerenvorsorge biete ich in enger Abstimmung mit Ihrer Hebamme an.",
    more: "Mehr zu Schwangerschaft und Wochenbett",
    image: `${IMG}/phase-schwangerschaft.jpg`,
    alt: "Schwangerer Bauch mit Schatten von Blättern im Sonnenlicht",
    gradient: "linear-gradient(160deg, #C79B7A, #6B4A38)",
  },
  {
    id: "wechseljahre",
    title: "Wechseljahre",
    hint: "meist zwischen 45 und 55",
    lead: "Hitzewallungen, Schlaflosigkeit, Gereiztheit: Die Wechseljahre verlaufen bei jeder Frau anders. Sie müssen sich nicht zwischen Hormonen und Naturheilkunde entscheiden, bevor Sie beides kennen.",
    topics: [
      "Hitzewallungen und Nachtschweiß",
      "Schlafstörungen",
      "Stimmung und Konzentration",
      "Gewichtsveränderungen",
      "Trockene Schleimhäute",
    ],
    offers: [
      "Hormonstatus und ausführliche Beratung",
      "Bioidentische Hormontherapie, wenn sinnvoll",
      "Pflanzliche Alternativen",
      "Akupunktur bei Hitzewallungen",
    ],
    note: "In der Wechseljahre-Sprechstunde nehmen wir uns 50 Minuten Zeit, auch für Fragen, die Sie sonst nirgends stellen.",
    more: "Mehr zu den Wechseljahren",
    image: `${IMG}/phase-wechseljahre.jpg`,
    alt: "Frau mit kurzen grauen Haaren blickt aus dem Fenster",
    gradient: "linear-gradient(160deg, #8C8F86, #3B3A36)",
  },
  {
    id: "danach",
    title: "Nach den Wechseljahren",
    hint: "gesund älter werden",
    lead: "Knochen, Herz, Beckenboden und Haut verändern sich. Mit guter Vorsorge und ein paar klugen Entscheidungen bleiben Sie beweglich und bei Kräften.",
    topics: [
      "Osteoporose-Vorsorge",
      "Beckenboden und Blase",
      "Trockenheit der Schleimhäute",
      "Krebsfrüherkennung",
    ],
    offers: [
      "Knochendichte und Laborwerte im Blick",
      "Lokale Hormontherapie",
      "Beckenbodentraining mit Physiotherapie",
      "Ernährungsmedizinische Beratung",
    ],
    note: "Die jährliche Vorsorge verbinde ich gern mit einem ausführlichen Gespräch über Ihre Gesundheit insgesamt.",
    more: "Mehr zur Zeit danach",
    image: `${IMG}/phase-danach.jpg`,
    alt: "Ältere Frau in einer Strickjacke steht lächelnd in einem Garten",
    gradient: "linear-gradient(160deg, #7C8A63, #3A3F2C)",
  },
];

/* ── Zwei Blickwinkel ───────────────────────────────────────────────────── */

export type Method = { name: string; text: string };

export const METHODS: { schulmedizin: Method[]; naturheilkunde: Method[] } = {
  schulmedizin: [
    {
      name: "Untersuchung und Ultraschall",
      text: "Die gynäkologische Untersuchung ist die Grundlage. Den Ultraschall mache ich direkt in der Praxis, ohne Überweisung.",
    },
    {
      name: "Hormon- und Labordiagnostik",
      text: "Hormonprofile, Schilddrüse, Eisen, Vitamin D: ausgewertet im Zusammenhang und nicht Wert für Wert.",
    },
    {
      name: "Vorsorge und Früherkennung",
      text: "Krebsfrüherkennung, HPV-Test und Brustuntersuchung nach aktuellen Leitlinien.",
    },
    {
      name: "Bioidentische Hormone",
      text: "Wenn Hormone sinnvoll sind, dann so niedrig dosiert wie möglich und regelmäßig überprüft.",
    },
  ],
  naturheilkunde: [
    {
      name: "Phytotherapie",
      text: "Frauenmantel, Mönchspfeffer, Traubensilberkerze: Heilpflanzen mit guter Studienlage, exakt dosiert.",
    },
    {
      name: "Akupunktur",
      text: "Bei Regelschmerzen, in der Kinderwunschzeit, zur Geburtsvorbereitung und bei Hitzewallungen.",
    },
    {
      name: "Mikronährstoffe",
      text: "Nur nach Messung. Ich verordne nichts, was Ihr Körper nicht braucht.",
    },
    {
      name: "Ernährungsmedizin",
      text: "Praktische Empfehlungen für Zyklus, Kinderwunsch und Wechseljahre, ohne Dogma.",
    },
  ],
};

/* ── Der erste Termin (Ablauf) ──────────────────────────────────────────── */

export const FIRST_VISIT = [
  {
    when: "Vor dem Termin",
    title: "Fragebogen in Ruhe ausfüllen",
    text: "Nach der Buchung erhalten Sie einen Fragebogen per E-Mail. Vorhandene Befunde bringen Sie einfach mit.",
  },
  {
    when: "Erstgespräch, 75 Minuten",
    title: "Zuhören und untersuchen",
    text: "Wir sprechen über Ihre Beschwerden, Ihre Geschichte und Ihren Alltag. Danach folgt die Untersuchung, wenn nötig mit Ultraschall.",
  },
  {
    when: "Nach etwa zwei Wochen",
    title: "Befunde und Plan",
    text: "Wir besprechen die Laborwerte und legen gemeinsam fest, womit wir beginnen. Den Plan bekommen Sie schriftlich.",
  },
  {
    when: "Danach",
    title: "Begleitung in Ihrem Tempo",
    text: "Folgetermine vereinbaren wir nach Bedarf, auf Wunsch auch als Videosprechstunde.",
  },
];

/* ── Kosten ─────────────────────────────────────────────────────────────── */

export const FEES = [
  { item: "Erstgespräch mit Untersuchung", duration: "75 Minuten", from: 220 },
  { item: "Wechseljahre- oder Kinderwunsch-Sprechstunde", duration: "50 Minuten", from: 150 },
  { item: "Folgetermin", duration: "30 Minuten", from: 90 },
  { item: "Akupunktur", duration: "45 Minuten", from: 75 },
  { item: "Videosprechstunde", duration: "30 Minuten", from: 70 },
];

/* ── Journal ────────────────────────────────────────────────────────────── */

export const JOURNAL = [
  {
    title: "Pille absetzen: Was in den ersten Monaten passiert",
    topic: "Zyklus",
    minutes: 6,
    date: "12. September 2025",
    image: `${IMG}/journal-zyklus.jpg`,
    href: `${BASE}/schwerpunkte#zyklus`,
  },
  {
    title: "Hitzewallungen: Was pflanzlich hilft und was nicht",
    topic: "Wechseljahre",
    minutes: 8,
    date: "28. August 2025",
    image: `${IMG}/journal-pflanzen.jpg`,
    href: `${BASE}/schwerpunkte#wechseljahre`,
  },
  {
    title: "Warum Frauen in den Wechseljahren schlechter schlafen",
    topic: "Wechseljahre",
    minutes: 5,
    date: "3. Juli 2025",
    image: `${IMG}/journal-schlaf.jpg`,
    href: `${BASE}/schwerpunkte#wechseljahre`,
  },
  {
    title: "Frauenmantel, Mönchspfeffer, Schafgarbe: drei Pflanzen, genau erklärt",
    topic: "Naturheilkunde",
    minutes: 7,
    date: "19. Juni 2025",
    image: `${IMG}/herbs.jpg`,
    href: `${BASE}/schwerpunkte#methoden`,
  },
];

/* ── Werdegang ──────────────────────────────────────────────────────────── */

export const CV = [
  { year: "2003", text: "Studium der Humanmedizin in Freiburg und Wien" },
  { year: "2009", text: "Weiterbildung in Frauenheilkunde und Geburtshilfe an Kliniken in Freiburg und Berlin" },
  { year: "2011", text: "Promotion über hormonelle Veränderungen in der Perimenopause" },
  { year: "2016", text: "Fachärztin für Frauenheilkunde und Geburtshilfe" },
  { year: "2018", text: "Zusatzbezeichnung Naturheilverfahren" },
  { year: "2019", text: "Zusatzbezeichnung Akupunktur" },
  { year: "2020", text: "Eigene Privatpraxis in Berlin-Mitte" },
  { year: "2022", text: "Curriculum Ernährungsmedizin, seitdem jährliche Fortbildungen in gynäkologischer Endokrinologie" },
];

/* ── Terminbuchung ──────────────────────────────────────────────────────── */

export type VisitType = { id: string; label: string; minutes: number; text: string };

export const VISIT_TYPES: VisitType[] = [
  { id: "erst", label: "Erstgespräch", minutes: 75, text: "Für neue Patientinnen, mit Untersuchung" },
  { id: "wechsel", label: "Wechseljahre-Sprechstunde", minutes: 50, text: "Hormone, Alternativen und Ihre Fragen" },
  { id: "kinderwunsch", label: "Kinderwunsch-Beratung", minutes: 50, text: "Gern gemeinsam mit Partner oder Partnerin" },
  { id: "folge", label: "Folgetermin", minutes: 30, text: "Für Patientinnen der Praxis" },
  { id: "video", label: "Videosprechstunde", minutes: 30, text: "Befunde besprechen, bequem von zu Hause" },
];

export const FAQ = [
  {
    q: "Ich bin gesetzlich versichert. Kann ich trotzdem kommen?",
    a: "Ja, sehr gern als Selbstzahlerin. Die Kosten erfahren Sie vorab, eine Übersicht finden Sie weiter oben auf dieser Seite.",
  },
  {
    q: "Wie lange warte ich auf einen ersten Termin?",
    a: "Erstgespräche sind meist innerhalb von zwei bis drei Wochen möglich. Der Kalender auf dieser Seite zeigt Ihnen die freien Zeiten.",
  },
  {
    q: "Was soll ich zum ersten Termin mitbringen?",
    a: "Vorhandene Befunde und Laborwerte, eine Liste Ihrer Medikamente und Nahrungsergänzungsmittel und, falls Sie einen führen, Ihren Zykluskalender.",
  },
  {
    q: "Kann ich einen Termin verschieben?",
    a: "Bis 24 Stunden vorher kostenfrei, per Telefon, E-Mail oder über den Link in Ihrer Terminbestätigung.",
  },
  {
    q: "Bieten Sie Videosprechstunden an?",
    a: "Ja, für Befundbesprechungen und Folgetermine. Das Erstgespräch findet in der Praxis statt, weil dazu eine Untersuchung gehört.",
  },
];
