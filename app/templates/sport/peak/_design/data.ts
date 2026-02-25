/* ============================================
   PEAK Athletics — Data & Types
   ============================================ */

// ---- Types ----

export type Difficulty = 'anfaenger' | 'fortgeschritten' | 'profi';

export type Course = {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  duration: number; // minutes
  trainer: string;
  schedule: string[];
  icon: string;
  gradient: string;
};

export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  certifications: string[];
  quote: string;
  gradient: string;
};

export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type OpeningHour = {
  day: string;
  time: string;
};

// ---- Difficulty Labels ----

export const difficultyLabels: Record<Difficulty, string> = {
  anfaenger: 'Anfänger',
  fortgeschritten: 'Fortgeschritten',
  profi: 'Profi',
};

export const difficultyColors: Record<Difficulty, string> = {
  anfaenger: '#22C55E',
  fortgeschritten: '#F59E0B',
  profi: '#FF4500',
};

// ---- Courses ----

export const courses: Course[] = [
  {
    id: 'functional-training',
    name: 'Functional Training',
    description: 'Ganzkörpertraining mit funktionellen Bewegungen. Verbessere Kraft, Mobilität und Koordination in einem dynamischen Workout, das deinen Körper ganzheitlich fordert.',
    difficulty: 'fortgeschritten',
    duration: 60,
    trainer: 'Max Brauer',
    schedule: ['Mo 07:00', 'Mi 07:00', 'Fr 07:00', 'Di 18:00', 'Do 18:00'],
    icon: 'dumbbell',
    gradient: 'linear-gradient(135deg, #FF4500 0%, #FF6B35 100%)',
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio',
    description: 'Hochintensives Intervalltraining für maximale Fettverbrennung. Kurze, explosive Belastungsphasen wechseln sich mit aktiver Erholung ab.',
    difficulty: 'fortgeschritten',
    duration: 45,
    trainer: 'Lisa Kraft',
    schedule: ['Mo 12:00', 'Mi 12:00', 'Fr 12:00', 'Sa 10:00'],
    icon: 'flame',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #FF4500 100%)',
  },
  {
    id: 'krafttraining',
    name: 'Krafttraining',
    description: 'Strukturiertes Krafttraining mit Fokus auf progressive Überlastung. Baue gezielt Muskelmasse auf und steigere deine Maximalkraft.',
    difficulty: 'anfaenger',
    duration: 75,
    trainer: 'Deniz Yilmaz',
    schedule: ['Mo 09:00', 'Di 09:00', 'Do 09:00', 'Mi 17:00', 'Fr 17:00'],
    icon: 'biceps-flexed',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
  },
  {
    id: 'boxing-fitness',
    name: 'Boxing Fitness',
    description: 'Boxtraining als Ganzkörperworkout. Lerne Schlagtechniken, verbessere deine Reaktionszeit und baue Stress ab — am Sandsack und mit Partner.',
    difficulty: 'fortgeschritten',
    duration: 60,
    trainer: 'Tom Fischer',
    schedule: ['Di 19:00', 'Do 19:00', 'Sa 11:00'],
    icon: 'swords',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
  },
  {
    id: 'yoga-mobility',
    name: 'Yoga & Mobility',
    description: 'Verbinde Körper und Geist. Yoga-Flows und Mobilitätsübungen für mehr Flexibilität, bessere Haltung und mentale Balance.',
    difficulty: 'anfaenger',
    duration: 60,
    trainer: 'Sarah Weber',
    schedule: ['Mo 08:00', 'Mi 08:00', 'Fr 08:00', 'Sa 09:00', 'So 10:00'],
    icon: 'heart-pulse',
    gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
  },
  {
    id: 'crossfit',
    name: 'CrossFit',
    description: 'Funktionelles Hochleistungstraining. Olympisches Gewichtheben, Gymnastik und Metabolic Conditioning in einem WOD (Workout of the Day).',
    difficulty: 'profi',
    duration: 60,
    trainer: 'Max Brauer',
    schedule: ['Mo 06:00', 'Di 06:00', 'Mi 06:00', 'Do 06:00', 'Fr 06:00'],
    icon: 'zap',
    gradient: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)',
  },
  {
    id: 'ausdauer-circuit',
    name: 'Ausdauer Circuit',
    description: 'Zirkeltraining für Ausdauer und Kondition. Verschiedene Stationen fordern Herz-Kreislauf-System und muskuläre Ausdauer gleichermaßen.',
    difficulty: 'anfaenger',
    duration: 50,
    trainer: 'Nina Hartmann',
    schedule: ['Di 10:00', 'Do 10:00', 'Sa 12:00'],
    icon: 'activity',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
  },
  {
    id: 'stretching-recovery',
    name: 'Stretching & Recovery',
    description: 'Aktive Regeneration und Dehnübungen. Fördere die Erholung, reduziere Muskelspannung und verbessere deine Beweglichkeit.',
    difficulty: 'anfaenger',
    duration: 45,
    trainer: 'Sarah Weber',
    schedule: ['Mi 20:00', 'Fr 20:00', 'So 11:00'],
    icon: 'leaf',
    gradient: 'linear-gradient(135deg, #065F46 0%, #10B981 100%)',
  },
];

// ---- Trainers ----

export const trainers: Trainer[] = [
  {
    id: 'max-brauer',
    name: 'Max Brauer',
    specialty: 'Functional Training & CrossFit',
    experience: '12 Jahre Erfahrung',
    certifications: ['CrossFit Level 3', 'NSCA-CSCS', 'Kettlebell Specialist'],
    quote: 'Stärke kommt nicht von dem, was du kannst. Sie kommt von dem, was du überwunden hast.',
    gradient: 'linear-gradient(135deg, #FF4500 0%, #FF6B35 40%, #1C1C1C 100%)',
  },
  {
    id: 'lisa-kraft',
    name: 'Lisa Kraft',
    specialty: 'HIIT & Cardio Training',
    experience: '8 Jahre Erfahrung',
    certifications: ['ACE Personal Trainer', 'TRX Certified', 'Ernährungsberaterin'],
    quote: 'Dein einziges Limit bist du selbst. Push harder.',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F97316 40%, #1C1C1C 100%)',
  },
  {
    id: 'deniz-yilmaz',
    name: 'Deniz Yilmaz',
    specialty: 'Krafttraining & Bodybuilding',
    experience: '15 Jahre Erfahrung',
    certifications: ['IFBB Pro Coach', 'Sports Science B.Sc.', 'Rehabilitation Trainer'],
    quote: 'Disziplin ist die Brücke zwischen Zielen und Ergebnissen.',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 40%, #1C1C1C 100%)',
  },
  {
    id: 'sarah-weber',
    name: 'Sarah Weber',
    specialty: 'Yoga & Mobility',
    experience: '10 Jahre Erfahrung',
    certifications: ['RYT-500 Yoga Alliance', 'FMS Level 2', 'Pilates Instructor'],
    quote: 'Flexibilität im Körper schafft Flexibilität im Leben.',
    gradient: 'linear-gradient(135deg, #059669 0%, #34D399 40%, #1C1C1C 100%)',
  },
  {
    id: 'tom-fischer',
    name: 'Tom Fischer',
    specialty: 'Boxing & Kampfsport',
    experience: '11 Jahre Erfahrung',
    certifications: ['Boxing Coach Level A', 'Krav Maga Instructor', 'First Aid Pro'],
    quote: 'Im Ring wie im Leben — aufstehen ist alles, was zählt.',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 40%, #1C1C1C 100%)',
  },
  {
    id: 'nina-hartmann',
    name: 'Nina Hartmann',
    specialty: 'Ausdauer & Circuit Training',
    experience: '7 Jahre Erfahrung',
    certifications: ['ACSM Certified', 'Running Coach', 'Group Fitness Instructor'],
    quote: 'Jeder Schritt bringt dich näher an die Version, die du sein willst.',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 40%, #1C1C1C 100%)',
  },
];

// ---- Membership Tiers ----

export const membershipTiers: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 39,
    period: 'Monat',
    description: 'Der perfekte Einstieg in dein Training.',
    features: [
      'Zugang zur Trainingsfläche',
      'Gerätetraining',
      'Umkleiden & Duschen',
      'Trainingsplan-Erstellung',
      '1x Probetraining mit Trainer',
    ],
    highlighted: false,
    cta: 'Basic wählen',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 59,
    period: 'Monat',
    description: 'Für alle, die mehr wollen. Unser beliebtestes Paket.',
    features: [
      'Alles aus Basic',
      'Alle Gruppenkurse inklusive',
      'Sauna & Wellness-Bereich',
      'Monatliche Körperanalyse',
      'Ernährungsberatung (Basis)',
      'Eigenes Handtuch-Service',
      'Getränke-Flatrate',
    ],
    highlighted: true,
    cta: 'Pro wählen',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 89,
    period: 'Monat',
    description: 'Das volle Programm. Keine Kompromisse.',
    features: [
      'Alles aus Pro',
      '4x Personal Training / Monat',
      'Individueller Ernährungsplan',
      'Priority Kursplatz-Reservierung',
      'Gästepass (2x / Monat)',
      'Premium Locker',
      'Exklusive Member-Events',
      'Recovery-Zone Zugang',
    ],
    highlighted: false,
    cta: 'Elite wählen',
  },
];

// ---- FAQs ----

export const faqs: FAQ[] = [
  {
    question: 'Kann ich ein kostenloses Probetraining machen?',
    answer: 'Ja! Wir bieten ein kostenloses Probetraining an, damit du PEAK Athletics kennenlernen kannst. Vereinbare einfach einen Termin über unser Kontaktformular oder ruf uns direkt an.',
  },
  {
    question: 'Gibt es eine Mindestvertragslaufzeit?',
    answer: 'Unsere Mitgliedschaften haben eine Mindestlaufzeit von 3 Monaten. Danach ist eine monatliche Kündigung mit 4 Wochen Frist zum Monatsende möglich.',
  },
  {
    question: 'Kann ich meine Mitgliedschaft upgraden oder downgraden?',
    answer: 'Selbstverständlich. Ein Upgrade ist jederzeit möglich und wird sofort aktiv. Ein Downgrade kann zum nächsten Monatsbeginn erfolgen.',
  },
  {
    question: 'Kann ich meine Mitgliedschaft pausieren?',
    answer: 'Ja, eine Pause ist bis zu 2 Monate pro Jahr möglich (z.B. bei Urlaub oder Krankheit). Sprich uns einfach an der Rezeption an.',
  },
  {
    question: 'Was brauche ich für mein erstes Training?',
    answer: 'Bring bequeme Sportkleidung, saubere Hallenschuhe, ein Handtuch und eine Trinkflasche mit. Alles andere stellen wir dir beim Probetraining zur Verfügung.',
  },
  {
    question: 'Gibt es Ermäßigungen für Studierende?',
    answer: 'Ja! Mit gültigem Studierendenausweis erhältst du 15% Rabatt auf alle Mitgliedschaften. Auch Azubi- und Schülerrabatte sind verfügbar.',
  },
];

// ---- Opening Hours ----

export const openingHours: OpeningHour[] = [
  { day: 'Montag – Freitag', time: '06:00 – 22:00' },
  { day: 'Samstag', time: '08:00 – 20:00' },
  { day: 'Sonntag', time: '09:00 – 14:00' },
  { day: 'Feiertage', time: '10:00 – 16:00' },
];

// ---- Contact Info ----

export const contactInfo = {
  address: 'Industriestraße 42, 10115 Berlin',
  phone: '+49 30 123 456 78',
  email: 'info@peak-athletics.de',
  instagram: '@peak_athletics',
};

// ---- Format Price ----

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ---- Weekly Schedule ----

export type ScheduleEntry = {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
};

export const weeklySchedule: ScheduleEntry[] = [
  { time: '06:00', monday: 'CrossFit', tuesday: 'CrossFit', wednesday: 'CrossFit', thursday: 'CrossFit', friday: 'CrossFit' },
  { time: '07:00', monday: 'Functional', wednesday: 'Functional', friday: 'Functional' },
  { time: '08:00', monday: 'Yoga', wednesday: 'Yoga', friday: 'Yoga', saturday: undefined },
  { time: '09:00', monday: 'Kraft', tuesday: 'Kraft', thursday: 'Kraft', saturday: 'Yoga' },
  { time: '10:00', tuesday: 'Ausdauer', thursday: 'Ausdauer', saturday: 'HIIT', sunday: 'Yoga' },
  { time: '11:00', saturday: 'Boxing', sunday: 'Stretching' },
  { time: '12:00', monday: 'HIIT', wednesday: 'HIIT', friday: 'HIIT', saturday: 'Ausdauer' },
  { time: '17:00', wednesday: 'Kraft', friday: 'Kraft' },
  { time: '18:00', tuesday: 'Functional', thursday: 'Functional' },
  { time: '19:00', tuesday: 'Boxing', thursday: 'Boxing' },
  { time: '20:00', wednesday: 'Stretching', friday: 'Stretching' },
];
