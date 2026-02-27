export type Template = {
  slug: string;
  name: string;
  branch: string;
  type: string;
  description: string;
  thumbnail: string;
  pages: string[];
};

export const BRANCH_LABELS: Record<string, string> = {
  fashion: 'Fashion & Bekleidung',
  gastro: 'Gastronomie',
  sport: 'Sport & Fitness',
  hotel: 'Hotel & Tourismus',
  immobilien: 'Immobilien',
  gesundheit: 'Gesundheit',
  handwerk: 'Handwerk & Dienstleistung',
};

export const TYPE_LABELS: Record<string, string> = {
  shop: 'Online-Shop',
  website: 'Unternehmenswebsite',
  landing: 'Landing Page',
  feature: 'Feature / Tool',
};

export const TEMPLATES: Template[] = [
  {
    slug: 'fashion/elegance',
    name: 'Elegance',
    branch: 'fashion',
    type: 'shop',
    description:
      'Luxuriöser Fashion-Shop mit eleganter Typografie, großflächigen Lifestyle-Bildern und Premium-Produktpräsentation.',
    thumbnail: '/templates/fashion/elegance/thumb.jpg',
    pages: [
      '/',
      '/collections',
      '/products',
      '/lookbook',
      '/sale',
      '/about',
      '/cart',
      '/wishlist',
      '/size-guide',
    ],
  },
  {
    slug: 'fashion/streetwear',
    name: 'VLTG Streetwear',
    branch: 'fashion',
    type: 'shop',
    description:
      'Brutalistischer Streetwear- & Sneaker-Shop mit Neon-Akzenten, Glitch-Effekten und urbanem Design. Inklusive Sneaker-Größenrechner.',
    thumbnail: '/templates/fashion/streetwear/thumb.jpg',
    pages: [
      '/',
      '/collections',
      '/products',
      '/about',
      '/cart',
      '/wishlist',
      '/size-guide',
    ],
  },
  {
    slug: 'fashion/jewelry',
    name: 'AURUM Jewelry',
    branch: 'fashion',
    type: 'shop',
    description:
      'Luxuriöser Schmuck-Boutique-Shop mit feiner Typografie, goldenen Akzenten und minimalistischem Design. Inklusive Ringgrößen-Finder.',
    thumbnail: '/templates/fashion/jewelry/thumb.jpg',
    pages: [
      '/',
      '/collections',
      '/products',
      '/about',
      '/cart',
      '/wishlist',
      '/ring-size-guide',
    ],
  },
  {
    slug: 'fashion/palazzo',
    name: 'PALAZZO',
    branch: 'fashion',
    type: 'shop',
    description:
      'Dunkler, opulenter Luxus-Shop im italienischen Stil mit dramatischem Kontrast, goldenen Akzenten und exklusiver Produktinszenierung. Inkl. Warenkorb, Merkliste & Größenberater.',
    thumbnail: '/templates/fashion/palazzo/thumb.jpg',
    pages: [
      '/',
      '/collections',
      '/products',
      '/lookbook',
      '/about',
      '/cart',
      '/wishlist',
      '/size-guide',
    ],
  },
  {
    slug: 'fashion/jardin',
    name: 'JARDIN',
    branch: 'fashion',
    type: 'shop',
    description:
      'Zeitgenössischer Fashion-Shop mit lichtdurchfluteter, natürlicher Ästhetik, erdigen Tönen und raffinierter Produktpräsentation. Inkl. Warenkorb, Merkliste & Größenberater.',
    thumbnail: '/templates/fashion/jardin/thumb.jpg',
    pages: [
      '/',
      '/collections',
      '/products',
      '/editorial',
      '/about',
      '/cart',
      '/wishlist',
      '/size-guide',
    ],
  },
  {
    slug: 'gastro/saveur',
    name: 'SAVEUR',
    branch: 'gastro',
    type: 'website',
    description:
      'Elegante Restaurant-Website mit dunklem, warmem Ambiente, editorialer Typografie und einladender Atmosphäre für gehobene Gastronomie.',
    thumbnail: '/templates/gastro/saveur/thumb.jpg',
    pages: ['/', '/speisekarte', '/reservierung', '/ueber-uns', '/galerie'],
  },
  {
    slug: 'sport/peak',
    name: 'PRSM Athletics',
    branch: 'sport',
    type: 'website',
    description:
      'Kraftvolle Fitness-Studio-Website mit rohem, industriellem Design, hohem Kontrast und energetischer Ausstrahlung.',
    thumbnail: '/templates/sport/peak/thumb.jpg',
    pages: ['/', '/kurse', '/team', '/mitgliedschaft', '/kontakt'],
  },
  {
    slug: 'hotel/haven',
    name: 'HAVEN',
    branch: 'hotel',
    type: 'website',
    description:
      'Luxuriöse Hotel-Website mit lichtdurchfluteter Ästhetik, goldenen Akzenten und einer Atmosphäre von Ruhe und Exklusivität.',
    thumbnail: '/templates/hotel/haven/thumb.jpg',
    pages: ['/', '/zimmer', '/erlebnis', '/galerie', '/kontakt'],
  },
  {
    slug: 'immobilien/quartier',
    name: 'QUARTIER',
    branch: 'immobilien',
    type: 'website',
    description:
      'Moderne Immobilien-Website mit architektonischem Design, klaren Linien und professioneller Objektpräsentation.',
    thumbnail: '/templates/immobilien/quartier/thumb.jpg',
    pages: ['/', '/objekte', '/verkaufen', '/ueber-uns', '/kontakt'],
  },
  {
    slug: 'gesundheit/vita',
    name: 'VITA',
    branch: 'gesundheit',
    type: 'website',
    description:
      'Vertrauenswürdige Praxis-Website mit beruhigender Farbwelt, klarer Struktur und patientenfreundlichem Design.',
    thumbnail: '/templates/gesundheit/vita/thumb.jpg',
    pages: ['/', '/leistungen', '/team', '/praxis', '/kontakt'],
  },
  {
    slug: 'handwerk/werkbank',
    name: 'WERKBANK',
    branch: 'handwerk',
    type: 'website',
    description:
      'Authentische Handwerker-Website mit warmen Materialfarben, ehrlicher Typografie und handwerklichem Charakter.',
    thumbnail: '/templates/handwerk/werkbank/thumb.jpg',
    pages: ['/', '/leistungen', '/projekte', '/ueber-uns', '/kontakt'],
  },
];

export function getTemplatesByFilter(
  branch?: string,
  type?: string
): Template[] {
  return TEMPLATES.filter((t) => {
    if (branch && t.branch !== branch) return false;
    if (type && t.type !== type) return false;
    return true;
  });
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function getAllBranches(): string[] {
  return [...new Set(TEMPLATES.map((t) => t.branch))];
}

export function getAllTypes(): string[] {
  return [...new Set(TEMPLATES.map((t) => t.type))];
}
