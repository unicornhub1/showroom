/* ── VITA Medical Practice Data ─────────────────────────────────────────── */

export type Service = {
  id: string;
  name: string;
  description: string;
  details: string;
  includes: string[];
  icon: string;
};

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  bio: string;
  initials: string;
  gradient: string;
  featured?: boolean;
};

export type Room = {
  id: string;
  name: string;
  description: string;
  gradient: string;
};

export type Testimonial = {
  id: string;
  name: string;
  age: number;
  rating: number;
  text: string;
};

export type OpeningHour = {
  day: string;
  hours: string;
};

export type ContactInfo = {
  address: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  emergency: string;
};

/* ── Services ─────────────────────────────────────────────────────────── */

export const services: Service[] = [
  {
    id: "allgemeinmedizin",
    name: "Allgemeinmedizin",
    description: "Umfassende hausärztliche Versorgung für die ganze Familie.",
    details:
      "Als Ihre Hausarztpraxis sind wir die erste Anlaufstelle für alle gesundheitlichen Anliegen. Wir begleiten Sie langfristig, kennen Ihre Krankengeschichte und koordinieren bei Bedarf die Zusammenarbeit mit Fachärzten. Dabei legen wir besonderen Wert auf eine ganzheitliche Betrachtung Ihrer Gesundheit und nehmen uns Zeit für jedes Gespräch.",
    includes: [
      "Akutsprechstunde bei akuten Beschwerden",
      "Langzeitbetreuung chronischer Erkrankungen",
      "Hausbesuche nach Vereinbarung",
      "Überweisungen und Koordination mit Fachärzten",
      "Krankschreibungen und Atteste",
    ],
    icon: "\u2764",
  },
  {
    id: "vorsorge",
    name: "Vorsorge & Check-up",
    description:
      "Frühzeitige Erkennung und Prävention für Ihre langfristige Gesundheit.",
    details:
      "Vorsorge ist die beste Medizin. Unsere umfassenden Check-up-Programme erkennen Risikofaktoren frühzeitig und helfen Ihnen, gesund zu bleiben. Wir erstellen individuelle Vorsorgepläne basierend auf Ihrem Alter, Geschlecht und persönlichen Risikoprofil. Regelmäßige Vorsorge gibt Ihnen Sicherheit und ermöglicht eine rechtzeitige Behandlung.",
    includes: [
      "Gesundheits-Check-up (ab 35 alle 3 Jahre)",
      "Hautkrebs-Screening",
      "Krebsvorsorge",
      "Jugendgesundheitsuntersuchung",
      "Individuelle Vorsorgeberatung",
    ],
    icon: "\u2B50",
  },
  {
    id: "naturheilverfahren",
    name: "Naturheilverfahren",
    description:
      "Sanfte Therapien als Ergänzung zur Schulmedizin.",
    details:
      "Wir verbinden das Beste aus Schulmedizin und Naturheilkunde. Unsere naturheilkundlichen Verfahren setzen auf die Selbstheilungskräfte des Körpers und können als Ergänzung oder Alternative zur konventionellen Medizin eingesetzt werden. Dr. Bergmann verfügt über eine Zusatzqualifikation in Naturheilverfahren und berät Sie individuell.",
    includes: [
      "Akupunktur und Ohrakupunktur",
      "Phytotherapie (Pflanzenheilkunde)",
      "Neuraltherapie",
      "Eigenbluttherapie",
      "Ernährungsmedizinische Beratung",
    ],
    icon: "\u2618",
  },
  {
    id: "sportmedizin",
    name: "Sportmedizin",
    description:
      "Betreuung für Freizeit- und Leistungssportler.",
    details:
      "Ob ambitionierter Freizeitsportler oder Leistungssportler \u2013 unsere sportmedizinische Betreuung unterstützt Sie bei der Optimierung Ihrer Leistungsfähigkeit und der Prävention von Verletzungen. Dr. Richter ist erfahrener Sportmediziner und betreut Sie kompetent von der Leistungsdiagnostik bis zur Rehabilitation.",
    includes: [
      "Sportmedizinische Vorsorgeuntersuchung",
      "Leistungsdiagnostik (Belastungs-EKG)",
      "Trainingsberatung und -planung",
      "Sportärztliche Bescheinigungen",
      "Behandlung von Sportverletzungen",
    ],
    icon: "\u26A1",
  },
  {
    id: "labordiagnostik",
    name: "Labordiagnostik",
    description: "Präzise Diagnostik durch modernste Laboranalysen.",
    details:
      "Unser praxiseigenes Labor ermöglicht schnelle Sofortdiagnostik bei vielen wichtigen Parametern. Für umfassende Analysen arbeiten wir mit renommierten Fachlaboren zusammen. So erhalten Sie zeitnah verlässliche Ergebnisse als Grundlage für Ihre Behandlung. Alle Ergebnisse werden ausführlich mit Ihnen besprochen.",
    includes: [
      "Blutbild und Blutchemie",
      "Urin- und Stuhldiagnostik",
      "Schnelltests (CRP, Strep-A, Troponin)",
      "Hormonstatus und Schilddrüsenwerte",
      "Allergiediagnostik",
    ],
    icon: "\uD83D\uDD2C",
  },
  {
    id: "impfberatung",
    name: "Impfberatung",
    description:
      "Individueller Impfschutz nach neuesten Empfehlungen.",
    details:
      "Impfungen gehören zu den wirksamsten präventiven Maßnahmen der Medizin. Wir beraten Sie umfassend zu den aktuellen Empfehlungen der STIKO und erstellen einen individuellen Impfplan. Ob Grundimmunisierung, Auffrischung oder Reiseimpfung \u2013 wir sorgen für Ihren optimalen Impfschutz.",
    includes: [
      "Impfstatuskontrolle und Beratung",
      "Standard- und Auffrischungsimpfungen",
      "Reisemedizinische Impfberatung",
      "Grippeimpfung (saisonal)",
      "COVID-19-Impfung",
    ],
    icon: "\uD83D\uDEE1\uFE0F",
  },
  {
    id: "chronische-erkrankungen",
    name: "Chronische Erkrankungen",
    description:
      "Langfristige Begleitung bei Diabetes, Bluthochdruck und mehr.",
    details:
      "Chronische Erkrankungen erfordern eine kontinuierliche, einfühlsame Betreuung. Wir begleiten Sie langfristig bei der Bewältigung Ihrer Erkrankung und arbeiten gemeinsam mit Ihnen an einer optimalen Therapie. Durch strukturierte Behandlungsprogramme (DMP) stellen wir sicher, dass alle wichtigen Kontrollen regelmäßig stattfinden.",
    includes: [
      "DMP Diabetes mellitus Typ 2",
      "DMP Koronare Herzkrankheit",
      "DMP Asthma/COPD",
      "Bluthochdruck-Management",
      "Langzeit-Blutdruckmessung (24h)",
    ],
    icon: "\uD83E\uDE7A",
  },
  {
    id: "psychosomatik",
    name: "Psychosomatik",
    description:
      "Wenn Körper und Seele Unterstützung brauchen.",
    details:
      "Körperliche Beschwerden haben oft auch seelische Ursachen. In unserer psychosomatischen Grundversorgung nehmen wir uns Zeit, die Zusammenhänge zwischen körperlichen Symptomen und psychischer Belastung zu erkennen. Wir bieten Gesprächstherapie, Entspannungsverfahren und vermitteln bei Bedarf an spezialisierte Therapeuten.",
    includes: [
      "Psychosomatische Grundversorgung",
      "Stressmanagement und Burnout-Prävention",
      "Entspannungsverfahren (PMR)",
      "Begleitende Gesprächstherapie",
      "Vermittlung an Fachtherapeuten",
    ],
    icon: "\uD83E\uDDE0",
  },
];

/* ── Team Members ─────────────────────────────────────────────────────── */

export const teamMembers: TeamMember[] = [
  {
    id: "bergmann",
    name: "Dr. med. Anna Bergmann",
    title: "Fachärztin für Allgemeinmedizin \u00B7 Praxisleitung",
    specializations: [
      "Naturheilverfahren",
      "Akupunktur",
      "Psychosomatische Grundversorgung",
      "Palliativmedizin",
    ],
    bio: "Nach ihrem Studium an der Universität Heidelberg und Stationen an der Charité Berlin gründete Dr. Bergmann 2015 die Praxis VITA mit der Vision einer ganzheitlichen, patientenorientierten Medizin. Ihre besondere Stärke liegt in der Verbindung von Schulmedizin und Naturheilverfahren. Sie nimmt sich Zeit für jeden Patienten und glaubt an die Kraft einer vertrauensvollen Arzt-Patienten-Beziehung.",
    initials: "AB",
    gradient:
      "linear-gradient(135deg, #0D9488 0%, #6EE7B7 50%, #A7F3D0 100%)",
    featured: true,
  },
  {
    id: "richter",
    name: "Dr. med. Thomas Richter",
    title: "Facharzt für Innere Medizin",
    specializations: [
      "Sportmedizin",
      "Kardiologie",
      "Diabetologie",
      "Notfallmedizin",
    ],
    bio: "Dr. Richter ergänzt das Team seit 2018 mit seiner internistischen Expertise. Als begeisterter Sportmediziner und ehemaliger Mannschaftsarzt verbindet er fundiertes Fachwissen mit einem aktiven Lebensstil. Seine Patienten schätzen seine ruhige, zugewandte Art und seine Fähigkeit, auch komplexe Zusammenhänge verständlich zu erklären.",
    initials: "TR",
    gradient:
      "linear-gradient(160deg, #1A2332 0%, #0D9488 50%, #6EE7B7 100%)",
  },
  {
    id: "hoffmann",
    name: "Lisa Hoffmann",
    title: "Medizinische Fachangestellte",
    specializations: [
      "Praxisorganisation",
      "Labordiagnostik",
      "Wundversorgung",
      "EKG & Lungenfunktion",
    ],
    bio: "Lisa ist seit der ersten Stunde Teil des VITA-Teams und das organisatorische Herzstück der Praxis. Mit ihrer freundlichen Art sorgt sie dafür, dass sich jeder Patient willkommen fühlt. Ihre Sorgfalt bei der Laborarbeit und diagnostischen Untersuchungen ist für das Ärzteteam unverzichtbar.",
    initials: "LH",
    gradient:
      "linear-gradient(145deg, #F59E0B 0%, #FBBF24 50%, #FEF3C7 100%)",
  },
  {
    id: "klein",
    name: "Sarah Klein",
    title: "Medizinische Fachangestellte",
    specializations: [
      "Patientenbetreuung",
      "Impfmanagement",
      "DMP-Koordination",
      "Terminplanung",
    ],
    bio: "Sarah verstärkt das Team seit 2020 und ist die erste Ansprechpartnerin am Empfang. Ihr einfühlsamer Umgang mit Patienten und ihre strukturierte Arbeitsweise machen sie zu einer wertvollen Stütze des Praxisalltags. Sie koordiniert die Disease-Management-Programme und hat stets den Überblick über anstehende Termine.",
    initials: "SK",
    gradient:
      "radial-gradient(circle at 30% 40%, #F9A8D4 0%, #0D9488 60%, #1A2332 100%)",
  },
  {
    id: "weber",
    name: "Markus Weber",
    title: "Praxismanager",
    specializations: [
      "Praxismanagement",
      "Qualitätsmanagement",
      "Abrechnung",
      "Digitalisierung",
    ],
    bio: "Markus sorgt im Hintergrund dafür, dass alles reibungslos läuft. Mit seinem betriebswirtschaftlichen Hintergrund und seiner Leidenschaft für Digitalisierung treibt er die Modernisierung der Praxis voran. Dank ihm läuft die Online-Terminbuchung, die digitale Patientenakte und die Praxiskommunikation wie am Schnürchen.",
    initials: "MW",
    gradient:
      "linear-gradient(135deg, #1A2332 0%, #6B7B8D 40%, #0D9488 100%)",
  },
];

/* ── Rooms ────────────────────────────────────────────────────────────── */

export const rooms: Room[] = [
  {
    id: "empfang",
    name: "Empfang & Anmeldung",
    description:
      "Unser lichtdurchfluteter Empfangsbereich heißt Sie in warmer, einladender Atmosphäre willkommen. Das freundliche Team an der Anmeldung steht Ihnen für alle Fragen zur Verfügung.",
    gradient:
      "linear-gradient(135deg, #ECFDF5 0%, #0D9488 40%, #A7F3D0 100%)",
  },
  {
    id: "wartezimmer",
    name: "Wartezimmer",
    description:
      "Entspannen Sie sich in unserem komfortabel gestalteten Wartebereich mit bequemen Sitzgelegenheiten, aktueller Literatur und einer kleinen Erfrischungsecke mit Wasser und Tee.",
    gradient:
      "linear-gradient(160deg, #F0F7F4 0%, #6EE7B7 50%, #ECFDF5 100%)",
  },
  {
    id: "behandlung-1",
    name: "Behandlungsraum 1",
    description:
      "Modern ausgestatteter Behandlungsraum für allgemeinmedizinische Untersuchungen, Ultraschall und EKG-Diagnostik. Helle, beruhigende Farbgebung für eine angenehme Untersuchungsatmosphäre.",
    gradient:
      "linear-gradient(145deg, #0D9488 0%, #1A2332 50%, #6EE7B7 100%)",
  },
  {
    id: "behandlung-2",
    name: "Behandlungsraum 2",
    description:
      "Zweiter Behandlungsraum mit Fokus auf kleine Eingriffe, Wundversorgung und sportmedizinische Untersuchungen. Ausgestattet mit ergonomischer Behandlungsliege und moderner Beleuchtung.",
    gradient:
      "radial-gradient(ellipse at 30% 40%, #0D9488 0%, #1A2332 60%, #6EE7B7 100%)",
  },
  {
    id: "labor",
    name: "Labor",
    description:
      "Unser praxiseigenes Labor ermöglicht Sofortdiagnostik für viele wichtige Parameter. Blutabnahmen und Schnelltests werden hier in ruhiger Umgebung durchgeführt.",
    gradient:
      "linear-gradient(120deg, #1A2332 0%, #0D9488 40%, #F0F7F4 100%)",
  },
  {
    id: "naturheilkunde",
    name: "Naturheilkunde-Raum",
    description:
      "Ein besonderer Raum für Akupunktur, Entspannungsverfahren und naturheilkundliche Behandlungen. Gedämpftes Licht und natürliche Materialien schaffen eine Atmosphäre der Ruhe und Heilung.",
    gradient:
      "linear-gradient(135deg, #F59E0B 0%, #0D9488 50%, #ECFDF5 100%)",
  },
];

/* ── Testimonials ─────────────────────────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    name: "M.S.",
    age: 45,
    rating: 5,
    text: "Endlich eine Praxis, in der man sich als Mensch wahrgenommen fühlt. Dr. Bergmann nimmt sich wirklich Zeit und erklärt alles verständlich. Die Kombination aus Schulmedizin und Naturheilverfahren hat mir bei meinen chronischen Beschwerden enorm geholfen.",
  },
  {
    id: "r2",
    name: "K.W.",
    age: 32,
    rating: 5,
    text: "Freundliches Team, moderne Ausstattung und kaum Wartezeit dank Online-Terminbuchung. Dr. Richter hat mich sportmedizinisch hervorragend beraten. Kann die Praxis nur weiterempfehlen!",
  },
  {
    id: "r3",
    name: "H.B.",
    age: 67,
    rating: 5,
    text: "Seit Jahren werde ich hier betreut und fühle mich bestens aufgehoben. Das gesamte Team ist herzlich und kompetent. Besonders die gründlichen Vorsorgeuntersuchungen geben mir ein gutes Gefühl der Sicherheit.",
  },
];

/* ── Opening Hours ────────────────────────────────────────────────────── */

export const openingHours: OpeningHour[] = [
  { day: "Montag", hours: "08:00 \u2013 13:00 & 14:30 \u2013 18:00" },
  { day: "Dienstag", hours: "08:00 \u2013 13:00 & 14:30 \u2013 18:00" },
  { day: "Mittwoch", hours: "08:00 \u2013 13:00" },
  { day: "Donnerstag", hours: "08:00 \u2013 13:00 & 14:30 \u2013 18:00" },
  { day: "Freitag", hours: "08:00 \u2013 13:00" },
  { day: "Samstag", hours: "Geschlossen" },
  { day: "Sonntag", hours: "Geschlossen" },
];

/* ── Contact Info ─────────────────────────────────────────────────────── */

export const contactInfo: ContactInfo = {
  address: "Bahnhofstraße 12",
  city: "66111 Saarbrücken",
  phone: "0681 123456",
  fax: "0681 123457",
  email: "info@praxis-vita.de",
  emergency: "0681 123456",
};

/* ── Equipment ────────────────────────────────────────────────────────── */

export const equipment: string[] = [
  "Digitales Ultraschallgerät",
  "Ruhe- und Belastungs-EKG",
  "Lungenfunktionsmessung (Spirometrie)",
  "Langzeit-Blutdruckmessung (24h)",
  "Langzeit-EKG",
  "Praxiseigenes Labor mit Sofortdiagnostik",
  "Digitales Röntgen (in Kooperation)",
  "Elektronische Patientenakte",
  "Online-Terminbuchung",
  "Telemedizin-Sprechstunde",
];

/* ── Directions ───────────────────────────────────────────────────────── */

export const directions = {
  bus: "Haltestelle \"Rathaus\" (Linien 101, 102, 105) \u2013 3 Minuten Fußweg",
  bahn: "Saarbahn-Haltestelle \"Johanneskirche\" \u2013 5 Minuten Fußweg",
  auto: "Parkhaus \"Am Rathaus\" in 100m Entfernung. Barrierefreie Parkplätze direkt vor dem Eingang.",
  fahrrad: "Fahrradstellplätze direkt vor der Praxis vorhanden.",
};
