import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { EVENTO } from './src/config.js'
import { PREGUNTAS_FRECUENTES } from './src/content.js'

// Plugin que agrega un <script type="application/ld+json"> al <head> del HTML
function jsonLd(name, data) {
  return {
    name,
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(data).replace(/</g, '\\u003c'),
        injectTo: 'head',
      },
    ],
  }
}

// Datos estructurados FAQPage para Google, con las preguntas y respuestas completas de content.js
const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PREGUNTAS_FRECUENTES.preguntas.map(({ pregunta, respuesta }) => ({
    '@type': 'Question',
    name: pregunta,
    acceptedAnswer: { '@type': 'Answer', text: respuesta },
  })),
}

// Datos estructurados Event del evento de config.js (solo los datos del flyer)
const { datosEstructurados: ev } = EVENTO
const eventData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: EVENTO.titulo,
  description: EVENTO.bajada,
  startDate: ev.fechaISO,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: ev.lugar.nombre,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ev.lugar.direccion,
      addressLocality: ev.lugar.ciudad,
      addressRegion: ev.lugar.provincia,
      addressCountry: ev.lugar.pais,
    },
  },
  image: [ev.imagen],
  offers: {
    '@type': 'Offer',
    name: 'Preventa',
    price: ev.precio,
    priceCurrency: ev.moneda,
  },
  organizer: {
    '@type': 'Organization',
    name: ev.organizador,
  },
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    jsonLd('faq-json-ld', faqData),
    EVENTO.activa && jsonLd('event-json-ld', eventData),
  ],
})
