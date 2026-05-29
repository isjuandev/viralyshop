export function scrollToForm() {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToProduct() {
  document.getElementById("product")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
