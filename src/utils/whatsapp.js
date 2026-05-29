import { PRODUCT_NAME, WHATSAPP_NUMBER } from "../constants";

export function buildMessage({
  nombre,
  telefono,
  tipoEntrega,
  departamento,
  ciudad,
  direccion,
  barrio,
  cedula,
  cantidad,
}) {
  const isOfficePickup = tipoEntrega === "oficina";
  const cityLine = `📍 *Ciudad:* ${ciudad}, ${departamento}`;
  const addressBase = [direccion, barrio].filter(Boolean).join(", ");
  const addressLine = !isOfficePickup
    ? `🏠 *Dirección:* ${addressBase}`
    : `🏢 *Entrega:* Recoger en oficina`;
  const idLine = isOfficePickup && cedula
    ? `🪪 *Cédula:* ${cedula}`
    : null;

  const conditionalLines = [addressLine, idLine].filter(Boolean).join("\n");

  return `Hola 👋 Quiero confirmar mi compra:

🙋 *Nombre:* ${nombre}
📱 *WhatsApp:* ${telefono}
🐾 *Producto:* ${PRODUCT_NAME}
📦 *Cantidad:* ${cantidad} unidad${cantidad > 1 ? "es" : ""}
${cityLine}
${conditionalLines}
💵 *Pago:* Contra entrega

✅ ¡Gracias!`;
}

export function openWhatsApp(message = "") {
  const normalizedMessage = message.replace(/\n/g, "\r\n");
  const suffix = normalizedMessage
    ? `?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(normalizedMessage)}`
    : `?phone=${WHATSAPP_NUMBER}`;
  window.open(`https://api.whatsapp.com/send${suffix}`, "_blank");
}
