import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Funciona para razas grandes y perros que jalan mucho?",
    a: "Absolutamente. PawLux está diseñada para soportar hasta 80kg de fuerza. El cable de acero reforzado y el sistema de freno instantáneo funcionan perfectamente para razas grandes como Labradores, Pastores Alemanes y Bulldogs. Cientos de nuestros clientes tienen perros de más de 40kg y lo confirman.",
  },
  {
    q: "¿Realmente se puede usar para pasear dos perros al mismo tiempo?",
    a: "Sí, esa es una de las características más populares. PawLux incluye un sistema de doble clip independiente que permite pasear dos perros con total control. Cada perro tiene su propio sistema de freno. La guía anti-enredos mantiene los cables separados y organizados en todo momento.",
  },
  {
    q: "¿Qué tan rápido es el sistema de freno?",
    a: "El freno de bloqueo instantáneo responde en menos de 0.3 segundos con un solo clic. Puedes bloquearlo con el pulgar sin soltar el mango. Es intuitivo, preciso y funciona incluso con guantes o en condiciones de lluvia gracias al grip antideslizante.",
  },
  {
    q: "¿Es resistente al agua y al uso diario intensivo?",
    a: "Completamente. El cuerpo de PawLux está fabricado en ABS de grado militar y el cable es de acero recubierto en nylon resistente al agua. Aguanta lluvia, tierra, polvo y exposición UV prolongada. Está diseñada para durar años de uso diario sin degradarse.",
  },
  {
    q: "¿Cuándo recibo mi pedido?",
    a: "Todos los pedidos se procesan en las próximas 24 horas. El tiempo de entrega es de 1 a 3 días hábiles en la mayoría de las ciudades. Recibirás un número de seguimiento por email para rastrear tu pedido en tiempo real.",
  },
  {
    q: "¿Cómo funciona la garantía de 30 días?",
    a: "Simple: si por cualquier razón no estás 100% satisfecho en los primeros 30 días, nos contactas, te enviamos la etiqueta de devolución sin costo y procesamos tu reembolso completo en 48-72 horas. Sin preguntas, sin trámites complicados. Es nuestra promesa.",
  },
  {
    q: "¿Para qué tamaño de perro está recomendada?",
    a: "PawLux está disponible en tres tamaños: Standard (hasta 30kg), XL (hasta 60kg) y Doble (para dos perros hasta 25kg cada uno). Al hacer tu pedido, en la descripción del producto puedes ver la guía de tallas para elegir la más adecuada para tu perro.",
  },
  {
    q: "¿Tienen opción de pago en cuotas?",
    a: "Sí, aceptamos pagos con tarjeta en cuotas sin interés según tu banco. También aceptamos PayPal, transferencia y otras billeteras digitales. El proceso de pago es 100% seguro con certificación SSL.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-electric">Preguntas frecuentes</span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-balance sm:text-4xl">
          Todo lo que necesitas saber
        </h2>
        <p className="mx-auto mb-12 max-w-md text-center text-base text-muted-foreground">
          ¿Tienes dudas? Las resolvemos. Si tu pregunta no está aquí, escríbenos y respondemos en menos de 2 horas.
        </p>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="overflow-hidden rounded-xl border border-border/40 surface-1 px-1"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl border border-border/40 surface-1 p-6 text-center">
          <p className="mb-2 text-sm font-semibold text-foreground">¿Tienes más preguntas?</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Nuestro equipo está disponible todos los días para ayudarte.
          </p>
          <a
            href="mailto:hola@pawlux.com"
            className="inline-flex items-center gap-2 text-sm font-semibold text-electric transition-opacity hover:opacity-80"
          >
            Escríbenos → hola@pawlux.com
          </a>
        </div>
      </div>
    </section>
  )
}
