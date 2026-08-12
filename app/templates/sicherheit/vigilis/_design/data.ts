// ── VIGILIS Mock Data ────────────────────────────────────────────────────────
// Alle Zahlen sind Platzhalter für Demonstrationszwecke.

const HOME = '/templates/sicherheit/vigilis';

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(value);
}

// ── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Leistungen', href: `${HOME}/leistungen` },
  { label: 'Branchen', href: `${HOME}/branchen` },
  { label: 'Unternehmen', href: `${HOME}/ueber-uns` },
  { label: 'Kontakt', href: `${HOME}/kontakt` },
];

export const CONFIGURATOR_HREF = `${HOME}/konfigurator`;
export const HOME_HREF = HOME;

// ── Kennzahlen ───────────────────────────────────────────────────────────────

export const STATS = [
  { value: '340+', label: 'Betreute Objekte' },
  { value: '24/7', label: 'Besetzte Leitstelle' },
  { value: '15 Min', label: 'Interventionszeit' },
  { value: '§34a', label: 'Geprüftes Personal' },
];

// ── Vertrauenspunkte (Hero-Leiste) ───────────────────────────────────────────

export const TRUST_POINTS = [
  {
    title: 'Zertifiziert nach DIN 77200',
    text: 'Geprüfte Prozesse für Sicherheitsdienstleistungen, jährlich extern auditiert.',
  },
  {
    title: 'Eigene Leitstelle',
    text: 'Rund um die Uhr besetzt, VdS-anerkannt, mit redundanter Anbindung.',
  },
  {
    title: 'Haftpflicht bis 10 Mio. €',
    text: 'Umfassender Versicherungsschutz für jedes betreute Objekt.',
  },
  {
    title: 'Festpreisgarantie',
    text: 'Transparente Kalkulation ohne versteckte Zuschläge oder Nachberechnung.',
  },
];

// ── Leistungen ───────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  points: string[];
  image?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'standwache',
    name: 'Standwache',
    short: 'Dauerhafte Präsenz vor Ort',
    description:
      'Fest stationiertes Sicherheitspersonal an Ihrem Objekt — sichtbar, ansprechbar und jederzeit handlungsfähig. Die Standwache ist die wirksamste Form der Abschreckung und schafft ein spürbares Sicherheitsgefühl für Mitarbeiter und Besucher.',
    points: [
      'Durchgehende Personalbesetzung nach vereinbartem Zeitfenster',
      'Zutrittskontrolle und Besucherregistrierung',
      'Dokumentation aller Vorkommnisse im digitalen Wachbuch',
      'Eskalation an Leitstelle, Polizei und Ihre Ansprechpartner',
    ],
    image: '/templates/sicherheit/vigilis/images/team/wache.jpg',
  },
  {
    id: 'streife',
    name: 'Streifendienst',
    short: 'Kontrollgänge nach Plan',
    description:
      'Mobile Kontrollgänge in unregelmäßigen Intervallen — kalkulierbar im Preis, unberechenbar für Täter. Jeder Kontrollpunkt wird per NFC erfasst und ist für Sie im Objektbericht lückenlos nachvollziehbar.',
    points: [
      'Definierte Kontrollpunkte innen und außen',
      'NFC-gestützter Nachweis jedes Rundgangs',
      'Prüfung von Fenstern, Türen, Toren und Brandschutzeinrichtungen',
      'Monatlicher Objektbericht mit allen Feststellungen',
    ],
    image: '/templates/sicherheit/vigilis/images/team/funk.jpg',
  },
  {
    id: 'empfang',
    name: 'Empfangsdienst',
    short: 'Sicherheit mit Servicegesicht',
    description:
      'Geschultes Personal am Empfang verbindet Sicherheitsauftrag mit professionellem Auftritt. Ihre Besucher werden empfangen, angemeldet und begleitet — Ihr Objekt bleibt dabei jederzeit kontrolliert.',
    points: [
      'Besucherempfang und Anmeldung nach Ihrem Prozess',
      'Ausweis- und Zutrittsmanagement',
      'Post- und Paketannahme',
      'Mehrsprachiges Personal auf Anfrage',
    ],
  },
  {
    id: 'alarm',
    name: 'Alarmverfolgung',
    short: 'Intervention innerhalb von 15 Minuten',
    description:
      'Ihre Alarmanlage meldet auf unsere Leitstelle. Wir verifizieren, entscheiden und intervenieren — mit eigenen Einsatzkräften, dokumentiert und abgestimmt mit Ihren Notfallkontakten.',
    points: [
      'Aufschaltung auf die eigene 24/7-Leitstelle',
      'Verifikation vor Alarmierung — deutlich weniger Fehleinsätze',
      'Interventionszeit im Ballungsraum unter 15 Minuten',
      'Schlüsselverwaltung im zertifizierten Depot',
    ],
  },
  {
    id: 'schliess',
    name: 'Schließdienst',
    short: 'Zuverlässiges Öffnen und Schließen',
    description:
      'Wir öffnen und schließen Ihr Objekt zu festen Zeiten, prüfen dabei den ordnungsgemäßen Zustand und übernehmen die Verantwortung für die Übergabe.',
    points: [
      'Feste Öffnungs- und Schließzeiten',
      'Kontrolle von Beleuchtung, Toren und Alarmscharfschaltung',
      'Übergabeprotokoll bei jedem Vorgang',
      'Vertretungsregelung ohne Zusatzkosten',
    ],
  },
  {
    id: 'video',
    name: 'Videoleitstand',
    short: 'Aufschaltung Ihrer Kameras',
    description:
      'Bestehende Kameratechnik wird auf unsere Leitstelle aufgeschaltet. Bewegungsereignisse werden live durch Menschen bewertet — nicht nur aufgezeichnet, sondern beantwortet.',
    points: [
      'Aufschaltung vorhandener Anlagen ohne Neuinvestition',
      'Live-Bewertung von Ereignissen durch geschulte Operator',
      'Lautsprecheransprache zur sofortigen Täteransprache',
      'DSGVO-konformes Berechtigungs- und Löschkonzept',
    ],
    image: '/templates/sicherheit/vigilis/images/leitstand/monitore.jpg',
  },
];

// ── Objektarten / Branchen ───────────────────────────────────────────────────

export type ObjectType = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  /** €/h-Aufschlag durch Objektkomplexität */
  rateModifier: number;
  /** Grundstunden pro Monat, unabhängig von Fläche */
  baseHours: number;
  /** Zusätzliche Stunden je 1.000 m² */
  hoursPerThousand: number;
  typicalArea: number;
  focus: string[];
};

export const OBJECT_TYPES: ObjectType[] = [
  {
    id: 'buero',
    name: 'Bürogebäude',
    tagline: 'Verwaltung, Kanzleien, Coworking',
    description:
      'Publikumsverkehr am Tag, leerstehende Etagen in der Nacht. Der Schwerpunkt liegt auf Zutrittskontrolle, Schließdienst und der Absicherung sensibler Bereiche wie Serverräumen und Archiven.',
    image: '/templates/sicherheit/vigilis/images/objekte/buero.jpg',
    rateModifier: 1.0,
    baseHours: 22,
    hoursPerThousand: 4.5,
    typicalArea: 4000,
    focus: ['Zutrittskontrolle', 'Schließdienst', 'Serverraum-Absicherung'],
  },
  {
    id: 'logistik',
    name: 'Logistik & Lager',
    tagline: 'Umschlagzentren, Speditionen, Hallen',
    description:
      'Große Flächen, hoher Warenwert, ständiger Fahrzeugverkehr. Torkontrolle, Ladungssicherung und weiträumige Außenhautkontrollen bestimmen das Sicherheitskonzept.',
    image: '/templates/sicherheit/vigilis/images/objekte/logistik.jpg',
    rateModifier: 0.94,
    baseHours: 30,
    hoursPerThousand: 2.8,
    typicalArea: 12000,
    focus: ['Torkontrolle', 'Ladungsüberwachung', 'Außenhautkontrolle'],
  },
  {
    id: 'industrie',
    name: 'Industrie & Produktion',
    tagline: 'Werke, Fertigung, Technikzentralen',
    description:
      'Laufende Anlagen, Gefahrstoffe und Schichtbetrieb erfordern Personal mit technischem Verständnis — inklusive Anlagenkontrolle und Zusammenarbeit mit Ihrem Werkschutz.',
    image: '/templates/sicherheit/vigilis/images/objekte/industrie.jpg',
    rateModifier: 1.12,
    baseHours: 34,
    hoursPerThousand: 3.4,
    typicalArea: 9000,
    focus: ['Anlagenkontrolle', 'Gefahrstoffbereiche', 'Schichtbegleitung'],
  },
  {
    id: 'handel',
    name: 'Handel & Filialen',
    tagline: 'Center, Fachmärkte, Ladenlokale',
    description:
      'Kundennähe am Tag, Wertkonzentration in der Nacht. Auftreten und Deeskalationsfähigkeit des Personals sind hier ebenso entscheidend wie die reine Absicherung.',
    image: '/templates/sicherheit/vigilis/images/objekte/handel.jpg',
    rateModifier: 1.08,
    baseHours: 26,
    hoursPerThousand: 5.2,
    typicalArea: 2500,
    focus: ['Ladendetektive', 'Deeskalation', 'Kassenbegleitung'],
  },
  {
    id: 'baustelle',
    name: 'Baustellen',
    tagline: 'Hochbau, Tiefbau, Sanierung',
    description:
      'Offene Perimeter, wechselnde Bauphasen und hochwertiges Material im Freien. Temporäre Konzepte mit mobiler Technik und flexibler Laufzeit sind hier der Standard.',
    image: '/templates/sicherheit/vigilis/images/objekte/baustelle.jpg',
    rateModifier: 0.9,
    baseHours: 18,
    hoursPerThousand: 2.2,
    typicalArea: 6000,
    focus: ['Perimeterschutz', 'Materialsicherung', 'Mobile Videotürme'],
  },
  {
    id: 'veranstaltung',
    name: 'Veranstaltungen',
    tagline: 'Messen, Konzerte, Firmenevents',
    description:
      'Kurze Laufzeit, hohe Personendichte, klare Verantwortlichkeiten. Einlasskontrolle, Besucherlenkung und Notfallmanagement werden im Vorfeld mit Ihnen und den Behörden abgestimmt.',
    image: '/templates/sicherheit/vigilis/images/objekte/veranstaltung.jpg',
    rateModifier: 1.18,
    baseHours: 14,
    hoursPerThousand: 6.0,
    typicalArea: 3000,
    focus: ['Einlasskontrolle', 'Besucherlenkung', 'Notfallmanagement'],
  },
];

// ── Konfigurator: Leistungsmodule ────────────────────────────────────────────

export type Module = {
  id: string;
  name: string;
  description: string;
  /** Fixe Stunden pro Monat */
  baseHours: number;
  /** Anteil an den objektabhängigen Stunden */
  areaWeight: number;
  /** Stundensatz in Euro */
  rate: number;
  /** Einmalige/monatliche Pauschale unabhängig von Stunden */
  flat: number;
  recommended?: string[];
};

export const MODULES: Module[] = [
  {
    id: 'standwache',
    name: 'Standwache',
    description: 'Fest stationiertes Personal während des gesamten Zeitfensters.',
    baseHours: 96,
    areaWeight: 1.0,
    rate: 38.5,
    flat: 0,
    recommended: ['industrie', 'logistik', 'veranstaltung'],
  },
  {
    id: 'streife',
    name: 'Streifendienst',
    description: 'Kontrollgänge in unregelmäßigen Intervallen mit NFC-Nachweis.',
    baseHours: 16,
    areaWeight: 0.55,
    rate: 36.0,
    flat: 0,
    recommended: ['buero', 'baustelle', 'handel', 'logistik'],
  },
  {
    id: 'empfang',
    name: 'Empfangsdienst',
    description: 'Besucherempfang und Zutrittsmanagement zu Ihren Öffnungszeiten.',
    baseHours: 84,
    areaWeight: 0.3,
    rate: 34.5,
    flat: 0,
    recommended: ['buero'],
  },
  {
    id: 'alarm',
    name: 'Alarmverfolgung',
    description: 'Aufschaltung auf die Leitstelle inklusive Intervention vor Ort.',
    baseHours: 0,
    areaWeight: 0.08,
    rate: 42.0,
    flat: 189,
    recommended: ['buero', 'handel', 'industrie', 'logistik', 'baustelle'],
  },
  {
    id: 'schliess',
    name: 'Schließdienst',
    description: 'Öffnen und Schließen zu festen Zeiten inklusive Zustandskontrolle.',
    baseHours: 21,
    areaWeight: 0.12,
    rate: 34.0,
    flat: 0,
    recommended: ['buero', 'handel'],
  },
  {
    id: 'video',
    name: 'Videoleitstand',
    description: 'Live-Bewertung Ihrer Kameraereignisse durch geschulte Operator.',
    baseHours: 0,
    areaWeight: 0.18,
    rate: 44.0,
    flat: 349,
    recommended: ['logistik', 'baustelle', 'industrie'],
  },
];

// ── Konfigurator: Zeitfenster ────────────────────────────────────────────────

export type Coverage = {
  id: string;
  name: string;
  detail: string;
  factor: number;
};

export const COVERAGES: Coverage[] = [
  {
    id: 'nacht',
    name: 'Nachts, Mo–Fr',
    detail: 'ca. 20:00 – 06:00 Uhr',
    factor: 1.0,
  },
  {
    id: 'nacht-we',
    name: 'Nachts inkl. Wochenende',
    detail: 'Nächte plus Sa/So durchgehend',
    factor: 1.42,
  },
  {
    id: 'rund',
    name: 'Rund um die Uhr',
    detail: '24/7 an 365 Tagen',
    factor: 2.85,
  },
  {
    id: 'temporaer',
    name: 'Temporär / projektbezogen',
    detail: 'Begrenzter Zeitraum nach Absprache',
    factor: 0.62,
  },
];

// ── Konfigurator: Laufzeiten ─────────────────────────────────────────────────

export const TERMS = [
  { months: 12, label: '12 Monate', discount: 0 },
  { months: 24, label: '24 Monate', discount: 0.05 },
  { months: 36, label: '36 Monate', discount: 0.085 },
];

// ── Konfigurator: Berechnung ─────────────────────────────────────────────────

export type CalcInput = {
  objectType: string;
  area: number;
  buildings: number;
  outdoor: boolean;
  modules: string[];
  coverage: string;
  term: number;
};

export type CalcLine = {
  id: string;
  name: string;
  hours: number;
  rate: number;
  flat: number;
  total: number;
};

export type CalcResult = {
  lines: CalcLine[];
  subtotal: number;
  outdoorSurcharge: number;
  buildingSurcharge: number;
  discount: number;
  monthly: number;
  min: number;
  max: number;
  totalHours: number;
  perSqm: number;
};

export function calculate(input: CalcInput): CalcResult {
  const obj = OBJECT_TYPES.find((o) => o.id === input.objectType) ?? OBJECT_TYPES[0];
  const cov = COVERAGES.find((c) => c.id === input.coverage) ?? COVERAGES[0];
  const term = TERMS.find((t) => t.months === input.term) ?? TERMS[0];

  // Objektabhängige Stundenbasis
  const objectHours = obj.baseHours + (input.area / 1000) * obj.hoursPerThousand;

  const lines: CalcLine[] = [];

  for (const id of input.modules) {
    const mod = MODULES.find((m) => m.id === id);
    if (!mod) continue;

    const hours = (mod.baseHours + objectHours * mod.areaWeight) * cov.factor;
    const rate = mod.rate * obj.rateModifier;
    const flat = mod.flat * (cov.factor > 1.5 ? 1.25 : 1);
    const total = hours * rate + flat;

    lines.push({
      id: mod.id,
      name: mod.name,
      hours: Math.round(hours),
      rate: Math.round(rate * 10) / 10,
      flat: Math.round(flat),
      total: Math.round(total),
    });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);

  // Außengelände erhöht den Kontrollaufwand
  const outdoorSurcharge = input.outdoor ? subtotal * 0.11 : 0;

  // Jedes weitere Gebäude erzeugt Wegezeiten
  const buildingSurcharge = subtotal * Math.max(0, input.buildings - 1) * 0.075;

  const beforeDiscount = subtotal + outdoorSurcharge + buildingSurcharge;
  const discount = beforeDiscount * term.discount;
  const monthly = beforeDiscount - discount;

  const totalHours = lines.reduce((sum, l) => sum + l.hours, 0);

  return {
    lines,
    subtotal: Math.round(subtotal),
    outdoorSurcharge: Math.round(outdoorSurcharge),
    buildingSurcharge: Math.round(buildingSurcharge),
    discount: Math.round(discount),
    monthly: Math.round(monthly),
    min: Math.round((monthly * 0.94) / 10) * 10,
    max: Math.round((monthly * 1.07) / 10) * 10,
    totalHours,
    perSqm: input.area > 0 ? Math.round((monthly / input.area) * 100) / 100 : 0,
  };
}

// ── Ablauf ───────────────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Kalkulation',
    text: 'Sie ermitteln in zwei Minuten eine belastbare Preisspanne — online, ohne Termin und ohne Verpflichtung.',
  },
  {
    step: '02',
    title: 'Objektbegehung',
    text: 'Ein Sicherheitsberater nimmt Ihr Objekt auf, prüft Schwachstellen und schärft das Konzept.',
  },
  {
    step: '03',
    title: 'Festes Angebot',
    text: 'Sie erhalten ein verbindliches Angebot mit Leistungsverzeichnis, Personalprofil und Festpreis.',
  },
  {
    step: '04',
    title: 'Aufnahme des Dienstes',
    text: 'Einweisung, Schlüsselübergabe, Aufschaltung — in der Regel innerhalb von zehn Werktagen.',
  },
];

// ── Zertifikate ──────────────────────────────────────────────────────────────

export const CERTIFICATES = [
  'DIN 77200',
  'ISO 9001',
  'VdS-anerkannt',
  '§34a GewO',
  'BDSW-Mitglied',
  'ISO 27001',
];

// ── Referenzen ───────────────────────────────────────────────────────────────

export const REFERENCES = [
  {
    quote:
      'Seit der Umstellung auf die Aufschaltung haben sich unsere Fehleinsätze mehr als halbiert. Die Abrechnung ist nachvollziehbar, die Berichte kommen pünktlich.',
    author: 'Leitung Facility Management',
    company: 'Gewerbepark, 34.000 m²',
  },
  {
    quote:
      'Was uns überzeugt hat, war die Kalkulation vorab. Wir wussten vor dem ersten Gespräch, in welchem Rahmen wir uns bewegen.',
    author: 'Kaufmännische Leitung',
    company: 'Logistikzentrum, Südwestdeutschland',
  },
  {
    quote:
      'Das Personal tritt professionell auf und ist seit drei Jahren nahezu unverändert. Für unsere Mieter ist das ein spürbarer Unterschied.',
    author: 'Objektverwaltung',
    company: 'Bürokomplex, 12 Mieteinheiten',
  },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    q: 'Wie verbindlich ist der berechnete Preis?',
    a: 'Die Kalkulation basiert auf Erfahrungswerten aus vergleichbaren Objekten und trifft in den meisten Fällen den späteren Angebotspreis. Verbindlich wird der Preis nach der Objektbegehung — dann allerdings als Festpreis für die gesamte Vertragslaufzeit.',
  },
  {
    q: 'Welche Qualifikation hat das eingesetzte Personal?',
    a: 'Alle Mitarbeiter verfügen mindestens über die Unterrichtung nach §34a GewO, im Objektschutz zusätzlich über die Sachkundeprüfung. Für Empfangsdienste setzen wir Personal mit Serviceerfahrung und Fremdsprachenkenntnissen ein.',
  },
  {
    q: 'Wie schnell können Sie den Dienst aufnehmen?',
    a: 'Nach Vertragsschluss benötigen wir in der Regel zehn Werktage für Einweisung, Personalplanung und technische Aufschaltung. Bei temporären Aufträgen — etwa auf Baustellen — ist ein Start innerhalb von 48 Stunden möglich.',
  },
  {
    q: 'Kann ich bestehende Technik weiterverwenden?',
    a: 'In den meisten Fällen ja. Vorhandene Alarm- und Videoanlagen lassen sich unabhängig vom Hersteller auf unsere Leitstelle aufschalten. Eine Neuinvestition ist dafür nicht erforderlich.',
  },
  {
    q: 'Was passiert bei einem Alarm?',
    a: 'Die Meldung läuft auf unserer Leitstelle auf und wird zunächst verifiziert — per Videoaufschaltung oder Rückfrage. Bestätigt sich der Alarm, entsenden wir eine Interventionskraft und informieren parallel Ihre hinterlegten Notfallkontakte sowie bei Bedarf die Polizei.',
  },
  {
    q: 'Gibt es eine Mindestvertragslaufzeit?',
    a: 'Dauerhafte Objektschutzverträge schließen wir ab zwölf Monaten. Bei längerer Bindung geben wir den Planungsvorteil als Nachlass weiter. Temporäre Einsätze sind tageweise möglich.',
  },
];

// ── KI-Assistent: Demo-Konversation ──────────────────────────────────────────

export const ASSISTANT_MESSAGES = [
  {
    role: 'assistant' as const,
    text: 'Guten Tag. Ich unterstütze Sie bei der Einschätzung Ihres Sicherheitsbedarfs. Beschreiben Sie mir Ihr Objekt — Art, Größe und was Sie beschäftigt.',
  },
  {
    role: 'user' as const,
    text: 'Wir haben ein Logistikzentrum mit rund 12.000 m² und offenem Hofbereich. Nachts ist niemand da.',
  },
  {
    role: 'assistant' as const,
    text: 'Bei dieser Konstellation ist der Hofbereich das entscheidende Risiko. Für vergleichbare Objekte empfehlen wir eine Kombination aus Streifendienst mit erhöhter Außenhautkontrolle und einem Videoleitstand für die Torbereiche. Das liegt erfahrungsgemäß bei 3.900 – 4.600 € monatlich.',
  },
  {
    role: 'user' as const,
    text: 'Und wenn wir zusätzlich eine Standwache am Wochenende möchten?',
  },
  {
    role: 'assistant' as const,
    text: 'Eine Wochenend-Standwache erhöht den Aufwand um etwa 1.400 – 1.700 € monatlich. Ich habe die Position im Konfigurator rechts bereits vorbereitet — Sie können sie dort direkt zuschalten.',
  },
];

// ── Team ─────────────────────────────────────────────────────────────────────

export const TEAM = [
  {
    name: 'Andreas Merten',
    role: 'Geschäftsführung',
    text: 'Über zwanzig Jahre im Sicherheitsgewerbe, davor Dienst bei der Bundespolizei.',
  },
  {
    name: 'Katrin Bohlen',
    role: 'Leitung Leitstelle',
    text: 'Verantwortet den 24/7-Betrieb und die Qualifizierung der Operator.',
  },
  {
    name: 'Sebastian Reuß',
    role: 'Objektberatung',
    text: 'Erstellt Sicherheitskonzepte und begleitet die Objektaufnahme vor Ort.',
  },
];

// ── Kontaktdaten (Platzhalter) ───────────────────────────────────────────────

export const CONTACT = {
  email: 'info@beispiel.de',
  phone: '+49 (0) 30 123 456 78',
  address: 'Musterstraße 1, 10115 Berlin',
  website: 'www.beispiel.de',
  hours: 'Mo–Fr 10–18 Uhr, Sa 10–16 Uhr',
  emergency: '+49 (0) 30 123 456 79',
};
