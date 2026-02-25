/* ── QUARTIER Data ──────────────────────────────────────────────────────── */

export type PropertyType = 'Wohnung' | 'Haus' | 'Gewerbe' | 'Grundstück';

export interface Property {
  id: string;
  title: string;
  address: string;
  location: string;
  price: number;
  size: number;
  rooms: number;
  bathrooms: number;
  type: PropertyType;
  description: string;
  gradient: string;
  isNew: boolean;
  isFeatured: boolean;
}

export const properties: Property[] = [
  {
    id: 'penthouse-maxvorstadt',
    title: 'Penthouse mit Alpenblick',
    address: 'Brienner Straße 42',
    location: 'München-Maxvorstadt',
    price: 2450000,
    size: 185,
    rooms: 5,
    bathrooms: 2,
    type: 'Wohnung',
    description: 'Exklusives Penthouse mit weitläufiger Dachterrasse und Panoramablick auf die Alpen. Hochwertige Ausstattung mit Eichenparkett und Naturstein.',
    gradient: 'linear-gradient(135deg, #0A1628 0%, #1e3a5f 40%, #2563EB 100%)',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'stadtvilla-bogenhausen',
    title: 'Stadtvilla Bogenhausen',
    address: 'Ismaninger Straße 78',
    location: 'München-Bogenhausen',
    price: 3850000,
    size: 320,
    rooms: 8,
    bathrooms: 3,
    type: 'Haus',
    description: 'Repräsentative Stadtvilla in bester Bogenhausener Lage. Großzügiger Garten, Pool und Doppelgarage. Komplett renoviert.',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 40%, #B8965A 100%)',
    isNew: false,
    isFeatured: true,
  },
  {
    id: 'loft-schwabing',
    title: 'Design-Loft Schwabing',
    address: 'Leopoldstraße 156',
    location: 'München-Schwabing',
    price: 895000,
    size: 120,
    rooms: 3,
    bathrooms: 1,
    type: 'Wohnung',
    description: 'Modernes Loft in historischem Industriegebäude. Deckenhöhe 4,5 m, offener Grundriss, bodentiefe Fenster.',
    gradient: 'linear-gradient(135deg, #2d3436 0%, #636e72 40%, #dfe6e9 100%)',
    isNew: true,
    isFeatured: true,
  },
  {
    id: 'altbau-lehel',
    title: 'Altbau-Juwel am Lehel',
    address: 'Thierschstraße 21',
    location: 'München-Lehel',
    price: 1250000,
    size: 145,
    rooms: 4,
    bathrooms: 2,
    type: 'Wohnung',
    description: 'Charmante Altbauwohnung mit Stuckdecken, Flügeltüren und Erker. Vollständig modernisiert bei Erhalt des historischen Charakters.',
    gradient: 'linear-gradient(135deg, #4a3728 0%, #8B7355 40%, #D4C4A8 100%)',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'buero-innenstadt',
    title: 'Premium-Bürofläche City',
    address: 'Maximilianstraße 35',
    location: 'München-Altstadt',
    price: 1800000,
    size: 280,
    rooms: 6,
    bathrooms: 2,
    type: 'Gewerbe',
    description: 'Repräsentative Bürofläche in Toplage an der Maximilianstraße. Modernste Gebäudetechnik, Tiefgarage, Empfangsbereich.',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'grundstueck-gruenwald',
    title: 'Baugrundstück Grünwald',
    address: 'Dr.-Max-Straße',
    location: 'Grünwald',
    price: 2200000,
    size: 1200,
    rooms: 0,
    bathrooms: 0,
    type: 'Grundstück',
    description: 'Erstklassiges Baugrundstück in ruhiger Villenlage. Baugenehmigung für großzügige Villa vorhanden. Südausrichtung.',
    gradient: 'linear-gradient(135deg, #2d5016 0%, #5a8a3c 40%, #a8d08d 100%)',
    isNew: true,
    isFeatured: false,
  },
  {
    id: 'gartenwohnung-nymphenburg',
    title: 'Gartenwohnung Nymphenburg',
    address: 'Nördliche Auffahrtsallee 12',
    location: 'München-Nymphenburg',
    price: 980000,
    size: 105,
    rooms: 3,
    bathrooms: 1,
    type: 'Wohnung',
    description: 'Lichtdurchflutete Gartenwohnung mit privatem Gartenanteil. Nahe Schlosspark Nymphenburg, ruhige Wohnlage.',
    gradient: 'linear-gradient(135deg, #1B2838 0%, #3E5C76 40%, #748CAB 100%)',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'reihenhaus-solln',
    title: 'Modernes Reihenhaus Solln',
    address: 'Drygalskiallee 88',
    location: 'München-Solln',
    price: 1150000,
    size: 175,
    rooms: 5,
    bathrooms: 2,
    type: 'Haus',
    description: 'Energieeffizientes Reihenhaus mit Garten und Dachterrasse. KfW-55 Standard, Smart-Home-System, zwei Stellplätze.',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 40%, #7f8c8d 100%)',
    isNew: true,
    isFeatured: false,
  },
  {
    id: 'laden-glockenbach',
    title: 'Ladenfläche Glockenbach',
    address: 'Müllerstraße 44',
    location: 'München-Glockenbachviertel',
    price: 650000,
    size: 95,
    rooms: 2,
    bathrooms: 1,
    type: 'Gewerbe',
    description: 'Attraktive Ladenfläche im trendigen Glockenbachviertel. Große Schaufenster, hohe Frequenzlage, sofort bezugsfrei.',
    gradient: 'linear-gradient(135deg, #4a1942 0%, #6b3a5f 40%, #c06c84 100%)',
    isNew: false,
    isFeatured: false,
  },
  {
    id: 'villa-starnberg',
    title: 'Seevilla Starnberg',
    address: 'Seepromenade 5',
    location: 'Starnberg',
    price: 5900000,
    size: 450,
    rooms: 10,
    bathrooms: 4,
    type: 'Haus',
    description: 'Einzigartige Villa direkt am Starnberger See. Privater Seezugang, Bootshaus, weitläufiger Parkgarten. Ein Objekt der Extraklasse.',
    gradient: 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 30%, #B8965A 70%, #d4b87a 100%)',
    isNew: false,
    isFeatured: false,
  },
];

/* ── Team ──────────────────────────────────────────────────────────────── */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  gradient: string;
  phone: string;
  email: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'alexander-hoffmann',
    name: 'Alexander Hoffmann',
    role: 'Geschäftsführer',
    initials: 'AH',
    bio: 'Über 20 Jahre Erfahrung im Premium-Immobilienmarkt. Spezialist für Anlageimmobilien und Projektentwicklung.',
    gradient: 'linear-gradient(135deg, #0A1628 0%, #1e3a5f 100%)',
    phone: '+49 89 123 456 10',
    email: 'hoffmann@quartier-immobilien.de',
  },
  {
    id: 'julia-werner',
    name: 'Julia Werner',
    role: 'Vertriebsleiterin',
    initials: 'JW',
    bio: 'Leidenschaft für Architektur und Menschen. Betreut anspruchsvolle Kunden bei der Suche nach dem perfekten Zuhause.',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    phone: '+49 89 123 456 11',
    email: 'werner@quartier-immobilien.de',
  },
  {
    id: 'markus-schneider',
    name: 'Markus Schneider',
    role: 'Immobilienberater',
    initials: 'MS',
    bio: 'Zertifizierter Immobilienmakler mit Fokus auf Wohnimmobilien in Münchens besten Lagen.',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
    phone: '+49 89 123 456 12',
    email: 'schneider@quartier-immobilien.de',
  },
  {
    id: 'sophie-klein',
    name: 'Sophie Klein',
    role: 'Marketing & Kommunikation',
    initials: 'SK',
    bio: 'Kreative Strategin für die Vermarktung exklusiver Immobilien. Spezialistin für digitale Exposés und Social Media.',
    gradient: 'linear-gradient(135deg, #B8965A 0%, #8B7355 100%)',
    phone: '+49 89 123 456 13',
    email: 'klein@quartier-immobilien.de',
  },
  {
    id: 'david-lang',
    name: 'David Lang',
    role: 'Sachverständiger',
    initials: 'DL',
    bio: 'Öffentlich bestellter und vereidigter Sachverständiger. Experte für Immobilienbewertung und Marktanalyse.',
    gradient: 'linear-gradient(135deg, #203a43 0%, #2c5364 100%)',
    phone: '+49 89 123 456 14',
    email: 'lang@quartier-immobilien.de',
  },
];

/* ── Testimonials ──────────────────────────────────────────────────────── */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  propertyType: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'QUARTIER hat uns nicht nur eine Wohnung vermittelt, sondern ein neues Zuhause gefunden. Die persönliche Betreuung und Marktkenntnis sind außergewöhnlich.',
    author: 'Familie Bergmann',
    propertyType: 'Penthouse',
    location: 'München-Maxvorstadt',
  },
  {
    id: '2',
    quote: 'Professionell, diskret und erfolgreich. Unser Haus wurde innerhalb von drei Wochen zum Wunschpreis verkauft. Absolute Empfehlung.',
    author: 'Dr. Stefan & Maria Richter',
    propertyType: 'Stadtvilla',
    location: 'München-Bogenhausen',
  },
  {
    id: '3',
    quote: 'Als Investor schätze ich die fundierten Marktanalysen und die ehrliche Beratung. QUARTIER ist mein Partner für Premium-Immobilien.',
    author: 'Thomas Keller',
    propertyType: 'Gewerbeimmobilie',
    location: 'München-Altstadt',
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSize(size: number): string {
  return `${new Intl.NumberFormat('de-DE').format(size)} m\u00B2`;
}
