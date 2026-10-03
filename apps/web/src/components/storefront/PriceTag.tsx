import { formatMoney } from "@/lib/utils";

export function PriceTag({
  priceMinor,
  currency,
  className,
}: {
  priceMinor: number;
  currency: string;
  className?: string;
}) {
  return <span className={className}>{formatMoney(priceMinor, currency)}</span>;
}
