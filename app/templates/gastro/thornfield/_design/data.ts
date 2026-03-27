// ── THORNFIELD Mock Data ─────────────────────────────────────────────────────

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

// ── Whiskey Products ─────────────────────────────────────────────────────────

export type WhiskeyStatus = 'verfügbar' | 'reserviert';

export type Whiskey = {
  id: string;
  name: string;
  subtitle: string;
  age: number;
  abv: number;
  price: number; // cents
  description: string;
  tastingNotes: {
    nose: string;
    palate: string;
    finish: string;
  };
  image: string;
  gradient: string;
  featured?: boolean;
  status: WhiskeyStatus;
};

const IMG = '/templates/gastro/thornfield/images';

export const WHISKEYS: Whiskey[] = [
  {
    id: 'highland-reserve',
    name: 'Highland Reserve',
    subtitle: 'Single Malt · 12 Jahre',
    age: 12,
    abv: 43,
    price: 6900,
    description:
      'Unser Einstieg in die Welt von Thornfield. Zwölf Jahre in amerikanischen Eichenfässern gereift, besticht dieser Single Malt durch seine samtige Weichheit und dezente Honignoten.',
    tastingNotes: {
      nose: 'Honig, Vanille, reife Birne',
      palate: 'Cremig, Karamell, leichte Gewürznelke',
      finish: 'Mittel, warm, ein Hauch Eichenholz',
    },
    image: `${IMG}/products/highland-reserve.jpg`,
    gradient: 'linear-gradient(135deg, #2A1F0E 0%, #1A1408 100%)',
    featured: true,
    status: 'verfügbar',
  },
  {
    id: 'copper-cask',
    name: 'Copper Cask',
    subtitle: 'Single Malt · 15 Jahre',
    age: 15,
    abv: 46,
    price: 8900,
    description:
      'Benannt nach unseren legendären Kupferbrennblasen. Fünfzehn Jahre in ehemaligen Sherry-Fässern veredelt, entfaltet dieser Whiskey eine bemerkenswerte Tiefe mit Noten von Trockenfrüchten und dunkler Schokolade.',
    tastingNotes: {
      nose: 'Rosinen, dunkle Schokolade, Orange',
      palate: 'Vollmundig, Pflaume, Muskatnuss',
      finish: 'Lang, würzig, Sherry-süße',
    },
    image: `${IMG}/products/copper-cask.jpg`,
    gradient: 'linear-gradient(135deg, #2E1A0A 0%, #1A0F06 100%)',
    featured: true,
    status: 'reserviert',
  },
  {
    id: 'peat-smoke',
    name: 'Peat & Smoke',
    subtitle: 'Single Malt · 10 Jahre',
    age: 10,
    abv: 48,
    price: 5900,
    description:
      'Für Liebhaber kräftiger Aromen. Über Torffeuer getrocknetes Malz verleiht diesem Whiskey seinen charakteristischen rauchigen Charakter — kraftvoll, aber niemals grob.',
    tastingNotes: {
      nose: 'Torf, Lagerfeuer, Meersalz',
      palate: 'Rauchig, Malz, schwarzer Pfeffer',
      finish: 'Lang, trocken, mineralisch',
    },
    image: `${IMG}/products/peat-smoke.jpg`,
    gradient: 'linear-gradient(135deg, #1A1A14 0%, #0E0E0A 100%)',
    status: 'verfügbar',
  },
  {
    id: 'golden-age',
    name: 'Golden Age',
    subtitle: 'Single Malt · 21 Jahre',
    age: 21,
    abv: 44,
    price: 15900,
    description:
      'Unser Meisterstück. Einundzwanzig Jahre Reifung in handverlesenen europäischen Eichenfässern schaffen einen Whiskey von unvergleichlicher Komplexität und Eleganz.',
    tastingNotes: {
      nose: 'Leder, alter Tabak, Honigwabe',
      palate: 'Seidige Textur, Marzipan, Ingwer, geröstete Mandeln',
      finish: 'Außergewöhnlich lang, Eichenholz, Toffee',
    },
    image: `${IMG}/products/golden-age.jpg`,
    gradient: 'linear-gradient(135deg, #2A200A 0%, #181208 100%)',
    featured: true,
    status: 'verfügbar',
  },
  {
    id: 'single-malt',
    name: 'Founders Choice',
    subtitle: 'Single Malt · 18 Jahre',
    age: 18,
    abv: 45,
    price: 12900,
    description:
      'Dem Gründer gewidmet. Achtzehn Jahre in einer Kombination aus Bourbon- und Oloroso-Sherry-Fässern gereift. Ein perfektes Gleichgewicht aus Süße und Würze.',
    tastingNotes: {
      nose: 'Bratapfel, Zimt, Vanilleschote',
      palate: 'Reichhaltig, Toffee, Orangenzeste, Eichenholz',
      finish: 'Lang, wärmend, dezente Gewürze',
    },
    image: `${IMG}/products/single-malt.jpg`,
    gradient: 'linear-gradient(135deg, #261A0C 0%, #14100A 100%)',
    status: 'reserviert',
  },
  {
    id: 'master-blend',
    name: 'Master Blend',
    subtitle: 'Blended Malt · 8 Jahre',
    age: 8,
    abv: 40,
    price: 3900,
    description:
      'Die Kunst des Blendings. Unser Master Blender vereint ausgewählte Malts zu einem zugänglichen, vielseitigen Whiskey — perfekt für Einsteiger und Kenner gleichermaßen.',
    tastingNotes: {
      nose: 'Grüner Apfel, Butterscotch, Getreide',
      palate: 'Leicht, fruchtig, Karamell',
      finish: 'Kurz bis mittel, sauber, malzig',
    },
    image: `${IMG}/products/master-blend.jpg`,
    gradient: 'linear-gradient(135deg, #221C10 0%, #161208 100%)',
    status: 'verfügbar',
  },
];

// ── Heritage / Process ───────────────────────────────────────────────────────

export type ProcessStep = {
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Mälzen',
    description:
      'Ausgewählte schottische Gerste wird eingeweicht, zum Keimen gebracht und über Torffeuer oder Heißluft getrocknet — je nach gewünschtem Charakter.',
  },
  {
    title: 'Maischen & Gären',
    description:
      'Das geschrotete Malz wird mit reinem Quellwasser vermischt. Die Würze wird in hölzernen Gärbottichen mit hauseigener Hefe über 72 Stunden fermentiert.',
  },
  {
    title: 'Destillieren',
    description:
      'In unseren kupfernen Brennblasen — seit 1928 unverändert — wird zweifach destilliert. Nur das Herzstück des Destillats fließt weiter.',
  },
  {
    title: 'Reifen',
    description:
      'In handverlesenen Eichen- und Sherryfässern reift der Whiskey über Jahre in unseren kühlen, feuchten Lagerhäusern am Fluss.',
  },
];

// ── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Sortiment', href: '/templates/gastro/thornfield/sortiment' },
  { label: 'Ankauf', href: '/templates/gastro/thornfield/ankauf' },
  { label: 'Destillerie', href: '/templates/gastro/thornfield/destillerie' },
  { label: 'Über uns', href: '/templates/gastro/thornfield/ueber-uns' },
  { label: 'Kontakt', href: '/templates/gastro/thornfield/kontakt' },
];
