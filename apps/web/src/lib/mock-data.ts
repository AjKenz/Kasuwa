import type { ChatMessageData, OperatorStats, Product } from "./types";

export const CATEGORY_THEME: Record<string, { emoji: string; gradient: string }> = {
  Bags: { emoji: "👜", gradient: "from-amber-200 to-amber-400" },
  Footwear: { emoji: "👟", gradient: "from-sky-200 to-sky-400" },
  Electronics: { emoji: "📱", gradient: "from-violet-200 to-violet-400" },
  Fashion: { emoji: "🧵", gradient: "from-rose-200 to-rose-400" },
  Beauty: { emoji: "🧴", gradient: "from-emerald-200 to-emerald-400" },
  Home: { emoji: "🏺", gradient: "from-orange-200 to-orange-400" },
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    sellerName: "Amara Collections",
    priceMinor: 1_850_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Bags",
    attributes: { material: "Leather", color: "Tan" },
    status: "published",
    imageUrl: "bags-1",
    generatedImageUrl: "bags-1-lifestyle",
    createdAt: daysAgo(2),
    translations: [
      {
        locale: "en",
        title: "Handwoven Tan Leather Tote",
        description: "A spacious everyday tote, handwoven from full-grain leather in Kano.",
        status: "reviewed",
      },
      {
        locale: "fr",
        title: "Sac Fourre-Tout en Cuir Tissé",
        description: "Un grand sac du quotidien, tissé à la main en cuir pleine fleur à Kano.",
        status: "machine",
      },
      {
        locale: "ar",
        title: "حقيبة جلدية بنية منسوجة يدويًا",
        description: "حقيبة يومية فسيحة، منسوجة يدويًا من جلد كامل الحبيبات في كانو.",
        status: "machine",
      },
    ],
  },
  {
    id: "p2",
    sellerName: "Lagos Sole Co.",
    priceMinor: 950_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Footwear",
    attributes: { material: "Canvas", size: "38-45" },
    status: "published",
    imageUrl: "shoes-1",
    createdAt: daysAgo(5),
    translations: [
      {
        locale: "en",
        title: "Everyday Canvas Sneakers",
        description: "Lightweight canvas sneakers built for Lagos streets and rainy commutes.",
        status: "reviewed",
      },
      {
        locale: "fr",
        title: "Baskets en Toile du Quotidien",
        description: "Baskets légères en toile, conçues pour les rues de Lagos.",
        status: "machine",
      },
      {
        locale: "ar",
        title: "أحذية رياضية قماشية يومية",
        description: "أحذية رياضية خفيفة الوزن مصممة لشوارع لاغوس.",
        status: "machine",
      },
    ],
  },
  {
    id: "p3",
    sellerName: "Zenith Gadgets",
    priceMinor: 12_500_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Electronics",
    attributes: { storage: "128GB", color: "Midnight" },
    status: "published",
    imageUrl: "phone-1",
    createdAt: daysAgo(1),
    translations: [
      {
        locale: "en",
        title: "Refurbished Flagship Phone, 128GB",
        description: "Grade-A refurbished flagship with a 12-month warranty.",
        status: "reviewed",
      },
      {
        locale: "fr",
        title: "Téléphone Phare Reconditionné, 128 Go",
        description: "Téléphone phare reconditionné de qualité A, garantie 12 mois.",
        status: "reviewed",
      },
      {
        locale: "ar",
        title: "هاتف رائد مجدد، 128 جيجابايت",
        description: "هاتف رائد مجدد من الفئة أ مع ضمان 12 شهرًا.",
        status: "machine",
      },
    ],
  },
  {
    id: "p4",
    sellerName: "Adire House",
    priceMinor: 2_200_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Fashion",
    attributes: { fabric: "Adire cotton", fit: "Unisex" },
    status: "published",
    imageUrl: "fashion-1",
    generatedImageUrl: "fashion-1-lifestyle",
    createdAt: daysAgo(9),
    translations: [
      {
        locale: "en",
        title: "Indigo Adire Wrap Shirt",
        description: "Hand-dyed indigo adire cotton, one of a kind pattern.",
        status: "reviewed",
      },
      {
        locale: "fr",
        title: "Chemise Portefeuille Adire Indigo",
        description: "Coton adire teint à la main à l'indigo, motif unique.",
        status: "machine",
      },
      {
        locale: "ar",
        title: "قميص أديري نيلي مصبوغ يدويًا",
        description: "قطن أديري مصبوغ يدويًا باللون النيلي، نقشة فريدة من نوعها.",
        status: "machine",
      },
    ],
  },
  {
    id: "p5",
    sellerName: "Pure Shea Lagos",
    priceMinor: 450_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Beauty",
    attributes: { size: "250ml", skinType: "All types" },
    status: "draft",
    imageUrl: "beauty-1",
    createdAt: daysAgo(0),
    translations: [
      {
        locale: "en",
        title: "Whipped Shea Butter, 250ml",
        description: "Unrefined shea butter whipped with baobab oil.",
        status: "machine",
      },
    ],
  },
  {
    id: "p6",
    sellerName: "Kano Crafts",
    priceMinor: 3_100_000,
    currency: "NGN",
    sourceLocale: "en",
    category: "Home",
    attributes: { material: "Clay", height: "32cm" },
    status: "published",
    imageUrl: "home-1",
    createdAt: daysAgo(14),
    translations: [
      {
        locale: "en",
        title: "Hand-Thrown Clay Water Pot",
        description: "Traditional clay pot, keeps water naturally cool.",
        status: "reviewed",
      },
      {
        locale: "fr",
        title: "Pot à Eau en Argile Fait Main",
        description: "Pot en argile traditionnel, garde l'eau naturellement fraîche.",
        status: "machine",
      },
    ],
  },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const CHAT_SAMPLE: ChatMessageData[] = [
  {
    id: "m1",
    role: "user",
    content: "Do you have a blue bag under 20,000 naira?",
  },
  {
    id: "m2",
    role: "assistant",
    content: "Let me check the catalogue for you.",
    toolCall: {
      name: "search_products",
      arguments: { query: "blue bag", maxPriceNGN: 20000 },
    },
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "I didn't find a blue one, but Amara Collections has a Tan Leather Tote for ₦18,500 that's very close in price. Want to see it?",
  },
];

export const OPERATOR_STATS: OperatorStats = {
  requestsToday: 1284,
  errorsToday: 7,
  avgCostPerListingUsd: 0.014,
  costPerRequestUsd: [
    { label: "Mon", value: 0.012 },
    { label: "Tue", value: 0.013 },
    { label: "Wed", value: 0.011 },
    { label: "Thu", value: 0.015 },
    { label: "Fri", value: 0.014 },
    { label: "Sat", value: 0.016 },
    { label: "Sun", value: 0.014 },
  ],
  errorRatePercent: [
    { label: "Mon", value: 0.4 },
    { label: "Tue", value: 0.6 },
    { label: "Wed", value: 0.3 },
    { label: "Thu", value: 1.2 },
    { label: "Fri", value: 0.5 },
    { label: "Sat", value: 0.9 },
    { label: "Sun", value: 0.5 },
  ],
  queueDepth: [
    { label: "00:00", value: 2 },
    { label: "04:00", value: 1 },
    { label: "08:00", value: 6 },
    { label: "12:00", value: 9 },
    { label: "16:00", value: 4 },
    { label: "20:00", value: 3 },
  ],
};
