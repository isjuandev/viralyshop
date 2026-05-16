export const BUNDLE_PRICING = {
  single: { qty: 1, originalPrice: 159000, savingsPct: 31.4466 },
  double: { qty: 2, originalPrice: 318000, savingsPct: 37.4215 },
};

export function getBundleByQty(qty) {
  return qty >= 2 ? BUNDLE_PRICING.double : BUNDLE_PRICING.single;
}

export function calculatePrice(qty) {
  const bundle = getBundleByQty(qty);
  return Math.round(bundle.originalPrice * (1 - bundle.savingsPct / 100));
}

export function calculateDiscount(qty) {
  const bundle = getBundleByQty(qty);
  return bundle.originalPrice - calculatePrice(qty);
}
