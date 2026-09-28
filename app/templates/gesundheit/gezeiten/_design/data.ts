/* ── GEZEITEN — Inhalte ──────────────────────────────────────────────────────
   Fiktive Praxis für Osteopathie & Naturheilkunde, geführt von einer Osteopathin
   und Heilpraktikerin. Alle Namen, Daten und Kontakte sind Platzhalter
   (Designvorlage der Unicorn Factory).
─────────────────────────────────────────────────────────────────────────── */

export const BASE = "/templates/gesundheit/gezeiten";
const IMG = `${BASE}/images`;

export const BRAND = {
  name: "Gezeiten",
  practice: "Osteopathie & Naturheilkunde",
  person: "Mara Holmsten",
  role: "Osteopathin und Heilpraktikerin",
  showroom: "GEZEITEN",
};

export const NAV = [
  { label: "Behandlung", href: `${BASE}/behandlung`, hint: "Osteopathie, Babys, Naturheilkunde, Preise" },
  { label: "Über mich", href: `${BASE}/ueber-mich`, hint: "Wer dich behandelt" },
  { label: "Kontakt", href: `${BASE}/kontakt`, hint: "Termin anfragen, Anfahrt" },
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
  hero: `${IMG}/hero.jpg`,
  treat: `${IMG}/treat.jpg`,
  therapist: `${IMG}/therapist.jpg`,
  roomTable: `${IMG}/room-table.jpg`,
  roomSession: `${IMG}/room-session.jpg`,
  baby: `${IMG}/baby.jpg`,
  babyFeet: `${IMG}/baby-feet.jpg`,
  mother: `${IMG}/mother.jpg`,
  tincture: `${IMG}/tincture.jpg`,
  moss: `${IMG}/moss.jpg`,
  sea: `${IMG}/sea.jpg`,
  linen: `${IMG}/linen.jpg`,
};

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── „Womit kommst du zu mir?“ ──────────────────────────────────────────── */

export type Concern = {
  id: string;
  quote: string;
  label: string;
  cause: string;
  approach: string;
  rhythm: string;
  image: string;
  alt: string;
  gradient: string;
};

export const CONCERNS: Concern[] = [
  {
    id: "ruecken",
    quote: "Mein Rücken ist seit Wochen fest.",
    label: "Rücken und Nacken",
    cause:
      "Oft sitzt die Ursache nicht dort, wo es wehtut. Ein verklebtes Zwerchfell, ein altes Sprunggelenk oder ein Leben am Schreibtisch können den Rücken auf Dauer in Spannung halten.",
    approach:
      "Ich untersuche den ganzen Körper, nicht nur die Stelle, die schmerzt. Mit sanften Techniken löse ich Spannungen in Faszien, Gelenken und Organen, damit sich der Rücken wieder frei bewegen kann.",
    rhythm: "Meist 3 bis 5 Behandlungen im Abstand von zwei bis drei Wochen.",
    image: `${IMG}/c-ruecken.jpg`,
    alt: "Hände einer Osteopathin an der Wirbelsäule einer Patientin",
    gradient: "linear-gradient(160deg, #9DA18D, #4F5645)",
  },
  {
    id: "kiefer",
    quote: "Ich knirsche nachts mit den Zähnen.",
    label: "Kiefer und Kopf",
    cause:
      "Der Kiefer ist eines der Ventile für Stress. Verspannte Kaumuskeln hängen oft mit Nacken, Schultern und der Körperhaltung zusammen und können Kopfschmerzen oder Ohrgeräusche auslösen.",
    approach:
      "Ich arbeite am Kiefergelenk, an der Muskulatur und am Nacken und zeige dir einfache Übungen für den Abend. Mit deiner Zahnärztin stimme ich mich gern ab, zum Beispiel bei einer Aufbissschiene.",
    rhythm: "Meist 3 bis 4 Behandlungen, anfangs im Abstand von zwei Wochen.",
    image: `${IMG}/c-kiefer.jpg`,
    alt: "Behandlung am Kopf und Nacken einer Patientin",
    gradient: "linear-gradient(160deg, #B7B8AE, #5D6154)",
  },
  {
    id: "baby",
    quote: "Mein Baby weint viel und schläft schlecht.",
    label: "Babys und Kinder",
    cause:
      "Eine lange oder sehr schnelle Geburt, eine Saugglocke oder die Lage im Bauch können Spuren hinterlassen: Babys drehen den Kopf nur zu einer Seite, trinken unruhig oder finden schwer in den Schlaf.",
    approach:
      "Die Behandlung ist sehr sanft, meist mit leichtem Halten. Dein Baby liegt dabei auf deinem Schoß oder neben dir. Ich erkläre dir, was ich tue, und du bekommst Ideen für zu Hause.",
    rhythm: "Oft reichen 2 bis 3 Behandlungen im Abstand von einer Woche.",
    image: `${IMG}/c-baby.jpg`,
    alt: "Eine Erwachsene hält behutsam die Hand eines Babys",
    gradient: "linear-gradient(160deg, #D8C7B6, #8E7765)",
  },
  {
    id: "geburt",
    quote: "Seit der Geburt fühle ich mich nicht mehr wie ich.",
    label: "Nach der Geburt",
    cause:
      "Becken, Bauch und Beckenboden haben Enormes geleistet. Dazu kommen wenig Schlaf, Tragen und Stillen. Schmerzen im Becken, im Rücken oder eine Rektusdiastase sind häufig.",
    approach:
      "Ich behandle Becken, Narben und Bauchraum und begleite dich bei der Rückbildung, gern in Abstimmung mit deiner Hebamme. Naturheilkundlich schauen wir auf Eisen, Schlaf und Kraft.",
    rhythm: "Frühestens sechs Wochen nach der Geburt, dann 3 bis 5 Behandlungen.",
    image: `${IMG}/c-geburt.jpg`,
    alt: "Mutter hält ihr Neugeborenes am Fenster",
    gradient: "linear-gradient(160deg, #D9CDBF, #867564)",
  },
  {
    id: "kopf",
    quote: "Ich habe oft Kopfschmerzen, vor allem abends.",
    label: "Kopfschmerzen",
    cause:
      "Spannungskopfschmerzen entstehen häufig im Nacken und in der oberen Brustwirbelsäule. Auch Augen, Kiefer und Schlaf spielen mit hinein.",
    approach:
      "Ich löse Spannungen an Nacken, Schädel und Brustkorb und schaue mit dir auf Alltag und Arbeitsplatz. Bei Bedarf ergänze ich pflanzliche Mittel oder Schröpfen.",
    rhythm: "Meist 3 bis 5 Behandlungen, danach nach Bedarf.",
    image: `${IMG}/c-kopf.jpg`,
    alt: "Hände behandeln den Nacken einer Patientin",
    gradient: "linear-gradient(160deg, #AEB3A6, #525A4B)",
  },
  {
    id: "erschoepft",
    quote: "Ich bin ständig erschöpft, obwohl die Blutwerte gut sind.",
    label: "Erschöpfung",
    cause:
      "Wenn nichts zu finden ist, heißt das nicht, dass nichts ist. Dauerstress, ein unruhiger Darm, flache Atmung oder wenig Schlaf können den Körper in einer Art Alarmzustand halten.",
    approach:
      "Osteopathisch arbeite ich am vegetativen Nervensystem, am Zwerchfell und am Bauchraum. Naturheilkundlich schauen wir auf Ernährung, Darm und Mikronährstoffe.",
    rhythm: "Eine längere Begleitung über zwei bis drei Monate.",
    image: `${IMG}/c-erschoepft.jpg`,
    alt: "Ruhiger Behandlungsraum mit gerolltem Handtuch und Kerze",
    gradient: "linear-gradient(160deg, #CFC6B8, #7C725F)",
  },
];

/* ── Deine erste Behandlung, proportional in Minuten ────────────────────── */

export const SESSION = [
  {
    minutes: 20,
    title: "Ankommen und erzählen",
    text: "Was führt dich zu mir, seit wann, was hast du schon versucht? Auch alte Verletzungen, Operationen und Geburten gehören dazu.",
  },
  {
    minutes: 15,
    title: "Untersuchen",
    text: "Ich schaue mir Haltung und Beweglichkeit an und ertaste, wo das Gewebe festhält.",
  },
  {
    minutes: 30,
    title: "Behandeln",
    text: "Sanfte Techniken im Liegen oder Sitzen. Du bleibst dabei bekleidet, bequeme Kleidung reicht.",
  },
  {
    minutes: 10,
    title: "Nachspüren und Plan",
    text: "Wir besprechen, wie es weitergeht, und du bekommst eine Übung für zu Hause.",
  },
];

/* ── Angebote ───────────────────────────────────────────────────────────── */

export type Offer = {
  id: string;
  title: string;
  short: string;
  text: string;
  helps: string[];
  image: string;
  alt: string;
  gradient: string;
};

export const OFFERS: Offer[] = [
  {
    id: "osteopathie",
    title: "Osteopathie für Erwachsene",
    short: "Rücken, Nacken, Kiefer, Kopf und alles, was sich festgefahren anfühlt.",
    text: "Osteopathie betrachtet den Körper als Einheit. Ich suche mit den Händen nach Bewegungseinschränkungen in Gelenken, Muskeln, Faszien und Organen und löse sie mit sanften Techniken. Ohne Knacken, ohne Hektik.",
    helps: ["Rücken- und Nackenschmerzen", "Kopfschmerzen und Migräne", "Kieferprobleme", "Verdauungsbeschwerden", "Beschwerden nach Unfällen oder Operationen"],
    image: `${IMG}/treat.jpg`,
    alt: "Osteopathin behandelt den Rücken einer Patientin in einem hellen Raum",
    gradient: "linear-gradient(160deg, #C9C3B7, #6E6A5E)",
  },
  {
    id: "kinder",
    title: "Babys und Kinder",
    short: "Sanfte Begleitung nach der Geburt, bei Schreibabys und im Wachstum.",
    text: "Kinderosteopathie ist besonders behutsam. Bei Babys arbeite ich mit sehr leichtem Druck, bei größeren Kindern auch spielerisch. Eltern sind immer dabei.",
    helps: ["Unruhe und viel Weinen", "Schiefhals und Lieblingsseite", "Trinkschwierigkeiten", "Kopfverformungen", "Haltungsfragen im Wachstum"],
    image: `${IMG}/baby.jpg`,
    alt: "Behutsame Behandlung am Arm eines Babys",
    gradient: "linear-gradient(160deg, #E0D3C5, #9A8674)",
  },
  {
    id: "mutter",
    title: "Schwangerschaft und Wochenbett",
    short: "Für ein bewegliches Becken vor der Geburt und Kraft danach.",
    text: "In der Schwangerschaft verändert sich die Statik des ganzen Körpers. Ich behandle bis kurz vor der Geburt und danach, wenn Becken, Bauch und Beckenboden sich neu sortieren.",
    helps: ["Ischias- und Beckenschmerzen", "Sodbrennen und Atemnot", "Vorbereitung auf die Geburt", "Rückbildung und Narben", "Rektusdiastase"],
    image: `${IMG}/mother.jpg`,
    alt: "Mutter hält ihr Baby in einem hellen Raum",
    gradient: "linear-gradient(160deg, #DCD2C6, #847767)",
  },
  {
    id: "naturheilkunde",
    title: "Naturheilkunde",
    short: "Pflanzen, Schröpfen, Darm und Ernährung als Ergänzung.",
    text: "Als Heilpraktikerin ergänze ich die Osteopathie dort, wo Hände allein nicht reichen. Die Mittel wähle ich sparsam und erkläre dir, warum.",
    helps: ["Phytotherapie", "Schröpfen", "Darmgesundheit und Ernährung", "Mikronährstoffe nach Messung", "Begleitung bei Stress und Schlafproblemen"],
    image: `${IMG}/tincture.jpg`,
    alt: "Hände halten eine Pipette über einer Flasche mit Pflanzentinktur",
    gradient: "linear-gradient(160deg, #A3A77B, #52573A)",
  },
];

/* ── Preise ─────────────────────────────────────────────────────────────── */

export const PRICES = [
  { item: "Erstbehandlung", note: "75 Minuten, mit ausführlichem Gespräch", price: 140 },
  { item: "Folgebehandlung", note: "50 Minuten", price: 105 },
  { item: "Babys und Kinder bis 12 Jahre", note: "40 Minuten", price: 85 },
  { item: "Naturheilkundliche Beratung", note: "45 Minuten", price: 90 },
  { item: "Schröpfen", note: "als Ergänzung zur Behandlung", price: 30 },
];

/* ── Werdegang ──────────────────────────────────────────────────────────── */

export const PATH = [
  { year: "2008", text: "Ausbildung zur Physiotherapeutin in Kiel" },
  { year: "2011", text: "Sechs Jahre in einer Reha-Klinik für Orthopädie und Neurologie" },
  { year: "2014", text: "Fünfjährige Ausbildung in Osteopathie, Abschluss D.O." },
  { year: "2017", text: "Erlaubnis zur Ausübung der Heilkunde (Heilpraktikerin)" },
  { year: "2019", text: "Weiterbildung in Kinder- und Säuglingsosteopathie" },
  { year: "2020", text: "Eigene Praxis Gezeiten in Berlin-Mitte" },
  { year: "2023", text: "Fortbildung Phytotherapie und Darmgesundheit" },
];

/* ── Häufige Fragen ─────────────────────────────────────────────────────── */

export const FAQ = [
  {
    q: "Zahlt meine Krankenkasse die Behandlung?",
    a: "Viele gesetzliche Krankenkassen erstatten Osteopathie anteilig, oft 60 bis 80 Prozent für mehrere Sitzungen im Jahr. Manche verlangen eine ärztliche Empfehlung. Frag am besten vorher bei deiner Kasse nach. Private Kassen und Zusatzversicherungen übernehmen die Kosten meist nach GebüH.",
  },
  {
    q: "Was soll ich anziehen?",
    a: "Bequeme Kleidung, in der du dich gut bewegen kannst. Für die Untersuchung reicht meist ein T-Shirt und eine lockere Hose.",
  },
  {
    q: "Tut die Behandlung weh?",
    a: "Nein. Die meisten Techniken sind sehr sanft. Manche Stellen können sich kurz empfindlich anfühlen, das sage ich dir vorher an, und du bestimmst jederzeit mit.",
  },
  {
    q: "Wie schnell bekomme ich einen Termin?",
    a: "Meist innerhalb von ein bis zwei Wochen. Für Babys halte ich jede Woche kurzfristige Termine frei.",
  },
  {
    q: "Was, wenn ich absagen muss?",
    a: "Bis 24 Stunden vorher ist das kostenfrei. Danach berechne ich die Hälfte, weil ich den Termin kurzfristig selten neu vergeben kann.",
  },
];

/* ── Anfrage-Formular ───────────────────────────────────────────────────── */

export const FOR_WHOM = ["Für mich", "Für mein Kind", "Für mein Baby"];
export const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const DAYTIMES = ["Vormittags", "Mittags", "Nachmittags", "Egal"];
