/**
 * Single source of truth for all business data, navigation,
 * membership plans, stats and social links.
 */

export const BUSINESS = {
  name: "Obee's Fitness Center",
  shortName: "Obee's",
  tagline: "Train Like It Matters.",
  description:
    "A premium fitness center in Rawalpindi engineered for people who take their transformation seriously — expert coaching, world-class equipment, and an atmosphere built for results.",
  phoneDisplay: "+92 313 4448545",
  phoneHref: "+923134448545",
  whatsapp: "923134448545",
  email: "malikbabarali520@gmail.com",
  address: {
    street: "8 Tulsa Rd, Lalazar",
    city: "Rawalpindi",
    postalCode: "46000",
    country: "Pakistan",
    full: "8 Tulsa Rd, Lalazar, Rawalpindi, 46000, Pakistan",
  },
  geo: {
    latitude: 33.5936,
    longitude: 73.0552,
  },
  hours: [
    { day: "Monday – Friday", time: "5:00 AM – 11:00 PM" },
    { day: "Saturday", time: "6:00 AM – 10:00 PM" },
    { day: "Sunday", time: "7:00 AM – 9:00 PM" },
  ],
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.obeesfitness.com";

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
] as const;

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2400, suffix: "+", label: "Active Members" },
  { value: 25, suffix: "+", label: "Expert Coaches" },
  { value: 18000, suffix: " ft²", label: "Training Floor" },
  { value: 9, suffix: " yrs", label: "Building Champions" },
];

export interface TimelineItem {
  year: string;
  title: string;
  copy: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2017",
    title: "The Foundation",
    copy: "Obee's opens its doors in Lalazar with a single vision — redefine what a gym in Rawalpindi could feel like.",
  },
  {
    year: "2020",
    title: "The Expansion",
    copy: "A full re-build into an 18,000 ft² facility with imported strength lines and a dedicated performance zone.",
  },
  {
    year: "2023",
    title: "The Standard",
    copy: "Certified coaching programs, recovery suites and a community that turns beginners into athletes.",
  },
  {
    year: "Today",
    title: "The Movement",
    copy: "Over 2,400 members trust Obee's as the premium destination for serious, sustainable transformation.",
  },
];

export interface Plan {
  id: string;
  name: string;
  cadence: string;
  price: string;
  currency: string;
  period: string;
  blurb: string;
  featured: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    cadence: "Flexible",
    price: "6,500",
    currency: "PKR",
    period: "/ month",
    blurb: "Full access, zero commitment. Perfect for testing the waters.",
    featured: false,
    features: [
      "Unlimited gym floor access",
      "All group performance classes",
      "Locker & shower facilities",
      "Free onboarding session",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    cadence: "Most Popular",
    price: "16,500",
    currency: "PKR",
    period: "/ 3 months",
    blurb: "Our most chosen plan — real momentum at a smarter rate.",
    featured: true,
    features: [
      "Everything in Monthly",
      "Personalized training program",
      "Monthly body-composition scan",
      "Priority class booking",
      "Guest passes (2 / month)",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    cadence: "Best Value",
    price: "54,000",
    currency: "PKR",
    period: "/ year",
    blurb: "For the committed. The deepest value and the full Obee's experience.",
    featured: false,
    features: [
      "Everything in Quarterly",
      "Dedicated coach & nutrition plan",
      "Recovery suite access",
      "Exclusive member events",
      "Guest passes (4 / month)",
    ],
  },
];

export interface Pillar {
  title: string;
  copy: string;
  icon: "target" | "eye" | "flame" | "shield";
}

export const PILLARS: Pillar[] = [
  {
    title: "Our Mission",
    copy: "To engineer an environment where discipline meets design — so every member leaves stronger than they arrived.",
    icon: "target",
  },
  {
    title: "Our Vision",
    copy: "To be the benchmark for premium fitness in Pakistan, where world-class training is the standard, not the exception.",
    icon: "eye",
  },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;
