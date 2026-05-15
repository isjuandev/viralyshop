import { PRODUCT_NAME, WHATSAPP_NUMBER } from "../constants";
import { formatPrice } from "./format";

export function buildMessage({ nombre, telefono, ciudad, color, cantidad, total }) {
  return `
🐾 *NUEVO PEDIDO — PaseoCan*

👤 Nombre: ${nombre}
📱 WhatsApp: ${telefono}
📍 Ciudad: ${ciudad}
🎨 Color: ${color}
📦 Cantidad: ${cantidad} unidad(es)
💰 Total a cobrar: $${formatPrice(total)} COP

✅ Forma de pago: Contra entrega
📋 Producto: ${PRODUCT_NAME} (3m · hasta 11.4kg/perro)

¡Gracias por tu pedido! Te confirmaremos el envío pronto 🚀
`;
}

export function openWhatsApp(message = "") {
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}${suffix}`, "_blank");
}
