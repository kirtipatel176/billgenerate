import { Item } from "@/types/estimate";

export function calculateItemAmount(quantity: number | null | undefined, rate: number | null | undefined): number {
  const q = quantity || 0;
  const r = rate || 0;
  return q * r;
}

export function calculateSubtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + (item.amount || 0), 0);
}

export function calculateTotal(subtotal: number, discount: number, taxRate: number): number {
  const afterDiscount = Math.max(0, subtotal - (discount || 0));
  const taxAmount = (afterDiscount * (taxRate || 0)) / 100;
  return afterDiscount + taxAmount;
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function generateEstimateNumber(currentCount: number): string {
  const pad = String(currentCount + 1).padStart(3, '0');
  return `EST-${pad}`;
}
