import { useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { WhatsAppIcon } from './icons.jsx'
import Doodle from './Doodle.jsx'
import FaqChat from './FaqChat.jsx'
import Reveal from './Reveal.jsx'

// Preguntas frecuentes en formato conversación (ver FaqChat), con la lista completa a demanda.
// Las mismas preguntas y respuestas van como datos estructurados FAQPage (vite.config.js).
export default function Faq() {
  const { preguntas } = PREGUNTAS_FRECUENTES
  const [listOpen, setListOpen] = useState(false)

  return (
    <section
      id={SECTION_IDS.preguntasFrecuentes}
      aria-labelledby="faq-titulo"
      className="relative isolate mt-6 lg:mt-10 py-20 lg:py-28 bg-[linear-gradient(to_bottom,var(--color-white)_0%,var(--color-sky-50)_22%,var(--color-sky-50)_78%,var(--color-white)_100%)] scroll-mt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-0 top-1/4 w-[22rem] h-[22rem] lg:w-[34rem] lg:h-[34rem] -translate-x-1/2 rounded-full bg-arbell-accent/[0.07] blur-3xl"
      />

      <div className="page-container lg:grid lg:grid-cols-[1fr_minmax(0,36rem)] lg:gap-16 lg:items-center">
        <Reveal className="text-center lg:text-left">
          <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-white/80 border border-sky-100 px-3 py-1 rounded-full">
            {PREGUNTAS_FRECUENTES.etiqueta}
          </span>
          <h2 id="faq-titulo" className="mt-3 text-2xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {PREGUNTAS_FRECUENTES.titulo}
          </h2>
          <p className="mt-3 text-sm lg:text-lg text-slate-500">{PREGUNTAS_FRECUENTES.bajada}</p>
          {/* "¡Probá!" con flecha a mano hacia el chat (solo desktop) */}
          <div aria-hidden="true" className="hidden lg:flex items-center justify-end gap-1 mt-6 pr-2">
            <span className="font-hand text-4xl font-bold text-arbell-blue -rotate-6">{PREGUNTAS_FRECUENTES.probar}</span>
            <Doodle type="arrow" delay={400} strokeWidth={2.5} className="w-24 h-14 rotate-6 text-arbell-blue" />
          </div>
          <p className="mt-4 lg:mt-8 text-sm lg:text-base text-slate-600">
            {PREGUNTAS_FRECUENTES.otraDuda}{' '}
            <a
              href={whatsappUrl()}
              rel="noopener noreferrer"
              target="_blank"
              className="group inline-flex items-center gap-1.5 rounded-sm font-semibold text-arbell-blue hover:text-arbell-dark"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
              <span className="link-underline">{PREGUNTAS_FRECUENTES.otraDudaLink}</span>
            </a>
          </p>
        </Reveal>

        <Reveal delay={150} className="relative mt-8 lg:mt-0">
          {/* Detrás del chat (desktop): círculo difuminado, destello y corazón a mano */}
          <div aria-hidden="true" className="hidden lg:block pointer-events-none">
            <div className="absolute -inset-12 rounded-full bg-arbell-accent/15 blur-3xl" />
            <Doodle type="sparkle" twinkle delay={600} className="absolute -top-8 -right-6 w-12 h-12 text-amber-300" />
            <Doodle type="heart" delay={900} className="absolute bottom-24 -left-10 w-11 h-11 -rotate-12 text-arbell-accent" />
          </div>

          {/* Desktop: leve inclinación que se endereza en hover, sombra profunda y flotación lenta */}
          <div className="relative rounded-[1.75rem] shadow-xl shadow-arbell-dark/10 lg:shadow-2xl lg:shadow-arbell-dark/25 lg:rotate-[1.5deg] lg:hover:rotate-0 transition-[rotate] duration-500 ease-soft lg:animate-float-y">
            <FaqChat />
          </div>

          {/* Lista completa en texto, para quien prefiera leer todo */}
          <div className="mt-4 text-center lg:text-left">
            <button
              type="button"
              aria-expanded={listOpen}
              aria-controls="faq-lista"
              onClick={() => setListOpen((open) => !open)}
              className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-arbell-blue hover:text-arbell-dark"
            >
              <span className="link-underline">{listOpen ? PREGUNTAS_FRECUENTES.ocultarTodas : PREGUNTAS_FRECUENTES.verTodas}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ease-soft ${listOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div
            id="faq-lista"
            inert={!listOpen}
            className={`grid transition-[grid-template-rows] duration-500 ease-soft ${listOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          >
            <div className="overflow-hidden">
              <dl className={`mt-4 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 lg:px-6 text-left transition-opacity duration-500 ${listOpen ? 'opacity-100' : 'opacity-0'}`}>
                {preguntas.map(({ pregunta, respuesta }) => (
                  <div key={pregunta} className="py-4">
                    <dt className="text-sm lg:text-base font-bold text-slate-900">{pregunta}</dt>
                    <dd className="mt-1 text-sm lg:text-[15px] text-slate-600 leading-relaxed">{respuesta}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
