import { BASE_PRICE } from "../constants";

export function calculatePrice(qty) {
  if (qty === 2) return Math.round(BASE_PRICE * 2 * 0.85);
  if (qty === 3) return Math.round(BASE_PRICE * 3 * 0.75);
  return BASE_PRICE;
}

export function calculateDiscount(qty) {
  return BASE_PRICE * qty - calculatePrice(qty);
}
