export type Locale = "en" | "fr" | "ar";

export type Currency = "NGN" | "USD" | "EUR";

export type ListingStatus = "draft" | "published";

export type TranslationStatus = "machine" | "reviewed";

export interface ProductTranslation {
  locale: Locale;
  title: string;
  description: string;
  status: TranslationStatus;
}

export interface Product {
  id: string;
  sellerName: string;
  priceMinor: number;
  currency: Currency;
  sourceLocale: Locale;
  category: string;
  attributes: Record<string, string>;
  status: ListingStatus;
  imageUrl: string;
  generatedImageUrl?: string;
  translations: ProductTranslation[];
  createdAt: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatToolCall {
  name: string;
  arguments: Record<string, string | number>;
}

export interface ChatMessageData {
  id: string;
  role: ChatRole;
  content: string;
  toolCall?: ChatToolCall;
}

export interface OperatorMetricPoint {
  label: string;
  value: number;
}

export interface OperatorStats {
  costPerRequestUsd: OperatorMetricPoint[];
  errorRatePercent: OperatorMetricPoint[];
  queueDepth: OperatorMetricPoint[];
  requestsToday: number;
  errorsToday: number;
  avgCostPerListingUsd: number;
}
