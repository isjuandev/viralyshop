import { PRODUCT_NAME, WHATSAPP_NUMBER } from "../constants";

export function buildMessage({
  nombre,
  telefono,
  departamento,
  ciudad,
}) {
  return `¡Buenas! ${"\uD83D\uDC4B"} Quiero confirmar mi compra ${"\uD83D\uDED2"}

Me llamo ${nombre}
Mi WhatsApp es ${telefono}

Pedí la ${PRODUCT_NAME} ${"\uD83D\uDC3E"}
Para enviar a ${ciudad}, ${departamento} ${"\uD83D\uDCCD"}

Pago contra entrega cuando llegue ${"\uD83D\uDCB5"}

¡Gracias!`;
}

export function openWhatsApp(message = "") {
  const normalizedMessage = message.replace(/\n/g, "\r\n");
  const suffix = normalizedMessage
    ? `?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(normalizedMessage)}`
    : `?phone=${WHATSAPP_NUMBER}`;
  window.open(`https://api.whatsapp.com/send${suffix}`, "_blank");
}
