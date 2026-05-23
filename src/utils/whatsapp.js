import { PRODUCT_NAME, WHATSAPP_NUMBER } from "../constants";
import { formatPrice } from "./format";

export function buildMessage({
  nombre,
  telefono,
  departamento,
  ciudad,
  cantidad,
  total,
}) {
  return `
🐾 *NUEVO PEDIDO - PaseoCan*

👤 Nombre: ${nombre}
📱 WhatsApp: ${telefono}
📍 Departamento: ${departamento}
🏙️ Ciudad: ${ciudad}
📦 Cantidad: ${cantidad} unidad(es)
💰 Total a cobrar: $${formatPrice(total)} COP

✅ Forma de pago: Contra entrega
📋 Producto: ${PRODUCT_NAME}
`.trim();
}

export function openWhatsApp(message = "") {
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}${suffix}`, "_blank");
}
