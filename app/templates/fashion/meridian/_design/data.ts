// ── MERIDIAN Mock Data ───────────────────────────────────────────────────────

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

// ── Watches ──────────────────────────────────────────────────────────────────

export type WatchStatus = 'verfügbar' | 'reserviert';

export type Watch = {
  id: string;
  name: string;
  reference: string;
  year: number;
  movement: string;
  caseMaterial: string;
  dialColor: string;
  diameter: string;
  condition: string;
  price: number; // cents
  description: string;
  image: string;
  gradient: string;
  status: WatchStatus;
  featured?: boolean;
};

const IMG = '/templates/fashion/meridian/images';

export const WATCHES: Watch[] = [
  {
    id: 'royal-chronograph',
    name: 'Royal Chronograph',
    reference: 'MRD-7750-RC',
    year: 1968,
    movement: 'Handaufzug, Kaliber V.72',
    caseMaterial: 'Edelstahl, poliert',
    dialColor: 'Champagner mit Patina',
    diameter: '38 mm',
    condition: 'Sehr gut, vollständig serviciert',
    price: 1290000,
    description:
      'Ein außergewöhnlicher Chronograph aus den späten Sechzigern. Das champagnerfarbene Zifferblatt hat über die Jahrzehnte eine warme Patina entwickelt, die dieses Stück einzigartig macht.',
    image: `${IMG}/products/royal-chronograph.jpg`,
    gradient: 'linear-gradient(135deg, #E8E4DD 0%, #D8D4CC 100%)',
    status: 'verfügbar',
    featured: true,
  },
  {
    id: 'grand-automatik',
    name: 'Grand Automatik',
    reference: 'MRD-2892-GA',
    year: 1975,
    movement: 'Automatik, Kaliber A.28',
    caseMaterial: '18 Kt. Gelbgold',
    dialColor: 'Silber, Sonnenschliff',
    diameter: '36 mm',
    condition: 'Exzellent, mit Originalbox',
    price: 2450000,
    description:
      'Zeitlose Eleganz in Gold. Dieses Automatikwerk in einem Gehäuse aus 18-karätigem Gelbgold verkörpert die goldene Ära der Uhrmacherkunst. Komplett mit Originalbox und Papieren.',
    image: `${IMG}/products/grand-automatik.jpg`,
    gradient: 'linear-gradient(135deg, #EDE8DC 0%, #DDD8CC 100%)',
    status: 'reserviert',
    featured: true,
  },
  {
    id: 'heritage-tourbillon',
    name: 'Heritage Tourbillon',
    reference: 'MRD-1945-HT',
    year: 1958,
    movement: 'Handaufzug, Tourbillon',
    caseMaterial: 'Platin 950',
    dialColor: 'Emaille, Grand Feu',
    diameter: '40 mm',
    condition: 'Musealer Zustand',
    price: 8500000,
    description:
      'Das Kronjuwel unserer Kollektion. Ein Tourbillon aus den Fünfzigern in Platin mit einem Grand-Feu-Emaille-Zifferblatt — ein Stück Uhrengeschichte von unschätzbarem Wert.',
    image: `${IMG}/products/heritage-tourbillon.jpg`,
    gradient: 'linear-gradient(135deg, #E5E2DC 0%, #D5D2CC 100%)',
    status: 'verfügbar',
    featured: true,
  },
  {
    id: 'navigator-gmt',
    name: 'Navigator GMT',
    reference: 'MRD-3186-NG',
    year: 1972,
    movement: 'Automatik, GMT-Kaliber',
    caseMaterial: 'Edelstahl, gebürstet',
    dialColor: 'Schwarz, matt',
    diameter: '39 mm',
    condition: 'Gut, leichte Tragespuren',
    price: 980000,
    description:
      'Für den Weltreisenden. Die GMT-Funktion mit drehbarer Lünette zeigt zwei Zeitzonen gleichzeitig an. Ein robuster Begleiter mit dem Charme vergangener Jahrzehnte.',
    image: `${IMG}/products/navigator-gmt.jpg`,
    gradient: 'linear-gradient(135deg, #E0DDD8 0%, #D0CDC8 100%)',
    status: 'verfügbar',
  },
  {
    id: 'classique-dress',
    name: 'Classique Dress',
    reference: 'MRD-9015-CD',
    year: 1982,
    movement: 'Handaufzug, ultraflach',
    caseMaterial: '18 Kt. Roségold',
    dialColor: 'Elfenbein',
    diameter: '34 mm',
    condition: 'Sehr gut, frisch serviciert',
    price: 1850000,
    description:
      'Zurückhaltende Raffinesse. Mit nur 6,2 mm Höhe gleitet diese Uhr mühelos unter jede Manschette. Das elfenbeinfarbene Zifferblatt und das Roségold-Gehäuse strahlen stille Eleganz aus.',
    image: `${IMG}/products/classique-dress.jpg`,
    gradient: 'linear-gradient(135deg, #EAE6E0 0%, #DAD6D0 100%)',
    status: 'reserviert',
  },
  {
    id: 'sport-diver',
    name: 'Sport Diver 300',
    reference: 'MRD-8800-SD',
    year: 1970,
    movement: 'Automatik, Kaliber D.30',
    caseMaterial: 'Edelstahl, satiniert',
    dialColor: 'Tropical Blue',
    diameter: '42 mm',
    condition: 'Gut, originale Patina',
    price: 750000,
    description:
      'Eine Taucheruhr aus der Blütezeit der Unterwasserexploration. Das Zifferblatt hat sich über die Jahre in ein einzigartiges Tropical Blue verwandelt — von Sammlern heiß begehrt.',
    image: `${IMG}/products/sport-diver.jpg`,
    gradient: 'linear-gradient(135deg, #DDE0E4 0%, #CDD0D4 100%)',
    status: 'verfügbar',
  },
];

// ── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Kollektion', href: '/templates/fashion/meridian/kollektion' },
  { label: 'Ankauf', href: '/templates/fashion/meridian/ankauf' },
  { label: 'Atelier', href: '/templates/fashion/meridian/atelier' },
  { label: 'Über uns', href: '/templates/fashion/meridian/ueber-uns' },
  { label: 'Kontakt', href: '/templates/fashion/meridian/kontakt' },
];
