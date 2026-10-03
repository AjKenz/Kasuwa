import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface MockProduct {
  id: string;
  title: string;
  priceMinor: number;
  currency: string;
}

const PRODUCTS: MockProduct[] = [
  { id: "p1", title: "Handwoven Tan Leather Tote", priceMinor: 1_850_000, currency: "NGN" },
  { id: "p2", title: "Everyday Canvas Sneakers", priceMinor: 950_000, currency: "NGN" },
  { id: "p3", title: "Refurbished Flagship Phone, 128GB", priceMinor: 12_500_000, currency: "NGN" },
];

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ products: PRODUCTS }),
  };
};
