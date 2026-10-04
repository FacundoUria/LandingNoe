import { useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import { WhatsAppIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'
import Doodle from './Doodle.jsx'
import TeamFaces from './TeamFaces.jsx'

const STAGGER_MS = 70

// Íconos de línea por tema (la clave se elige en content.js, campo "icono")
const ICONOS = {
  bolsa: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  ganancia: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  billetera: 'M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3',
  etiqueta: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z',
  birrete: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  celular: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  reloj: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  mensaje: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
}

// Resalta el "No" o "Para nada" con el que empieza la respuesta
function withLeadHighlight(text) {
  const match = text.match(/^(No|Para nada)(?=[\s,.])/)
  if (!match) return text
  return (
    <>
      <strong className="font-semibold text-slate-900">{match[1]}</strong>
      {text.slice(match[1].length)}
    </>
  )
}

function ContactCard({ className = '' }) {
  const { contacto } = PREGUNTAS_FRECUENTES
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-linear-to-br from-arbell-dark to-arbell-blue p-6 lg:p-7 text-white shadow-lg shadow-arbell-dark/20 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <Doodle type="sparkle" twinkle delay={300} className="absolute top-5 right-5 w-8 h-8 text-amber-300" />
      <div className="relative">
        <TeamFaces size="w-11 h-11" />
        <p className="mt-4 text-lg font-bold">{contacto.titulo}</p>
        <a
          href={whatsappUrl()}
          rel="noopener noreferrer"
          target="_blank"
          className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-arbell-blue shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-arbell-light hover:shadow-lg active:scale-95 focus-visible:outline-white"
        >
          <WhatsAppIcon className="w-5 h-5 text-emerald-500 transition-transform duration-200 group-hover:scale-110" />
          {contacto.boton}
        </a>
      </div>
    </div>
  )
}

export default function Faq() {
  // Índice de la pregunta abierta (solo una a la vez); la primera arranca abierta
  const [openIndex, setOpenIndex] = useState(0)
  const [listRef, listVisible] = useReveal({ threshold: 0.1 })

  return (
    <section
      id={SECTION_IDS.preguntasFrecuentes}
      aria-labelledby="faq-titulo"
      className="relative isolate overflow-x-clip mt-14 lg:mt-24 py-16 lg:py-24 bg-linear-to-b from-sky-50 to-white scroll-mt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-0 top-8 w-[26rem] h-[26rem] lg:w-[36rem] lg:h-[36rem] -translate-x-1/3 rounded-full bg-arbell-accent/10 blur-3xl"
      />

      <div className="page-container lg:grid lg:grid-cols-[35fr_65fr] lg:gap-14 lg:items-start">
        {/* Columna izquierda: sticky en desktop mientras se scrollea la sección */}
        <div className="lg:sticky lg:top-24">
          <Reveal className="text-center lg:text-left">
            <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full">
              {PREGUNTAS_FRECUENTES.etiqueta}
            </span>
            <h2 id="faq-titulo" className="mt-3 text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {PREGUNTAS_FRECUENTES.titulo}
            </h2>
            <p className="mt-3 text-sm lg:text-base text-slate-500">{PREGUNTAS_FRECUENTES.bajada}</p>
          </Reveal>
          {/* En desktop la card de contacto va acá; en mobile, después del acordeón */}
          <Reveal delay={150} className="hidden lg:block mt-8">
            <ContactCard />
          </Reveal>
        </div>

        <ul ref={listRef} className="mt-6 lg:mt-0 space-y-3">
          {PREGUNTAS_FRECUENTES.preguntas.map(({ icono, pregunta, respuesta }, index) => {
            const open = openIndex === index
            const buttonId = `faq-pregunta-${index}`
            const panelId = `faq-respuesta-${index}`

            return (
              <li
                key={pregunta}
                className={`reveal ${listVisible ? 'is-visible' : ''}`}
                style={{ '--reveal-delay': `${index * STAGGER_MS}ms` }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${
                    open ? 'border-arbell-blue/30 shadow-lg shadow-arbell-blue/10' : 'border-slate-200'
                  }`}
                >
                  {/* Barra de acento de la pregunta abierta */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 inset-y-0 w-1 bg-arbell-blue origin-top transition-transform duration-300 ease-soft ${
                      open ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  />
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className={`group w-full flex items-center gap-3 lg:gap-4 px-4 py-4 lg:px-5 text-left text-sm lg:text-base font-semibold rounded-2xl transition-colors duration-200 focus-visible:outline-offset-[-2px] ${
                        open ? 'text-slate-900' : 'text-slate-800 hover:bg-arbell-light/50'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                          open ? 'bg-arbell-blue text-white' : 'bg-arbell-light text-arbell-blue'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                          <path d={ICONOS[icono]} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="flex-1">{pregunta}</span>
                      {/* "+" que gira 45° y queda como "×" al abrir */}
                      <span
                        aria-hidden="true"
                        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition duration-300 ease-soft ${
                          open ? 'rotate-45 bg-arbell-light text-arbell-blue' : 'text-slate-400 group-hover:text-arbell-blue'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* Altura animada con grid-template-rows (0fr → 1fr) + fade del contenido */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!open}
                    className={`grid transition-[grid-template-rows] duration-300 ease-soft ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pl-[4.25rem] pr-5 pb-5 lg:pl-[4.75rem] lg:pr-8 text-sm lg:text-base text-slate-600 leading-relaxed transition duration-300 ease-soft ${
                          open ? 'opacity-100 translate-y-0 delay-75' : 'opacity-0 -translate-y-1'
                        }`}
                      >
                        {withLeadHighlight(respuesta)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <Reveal className="lg:hidden mt-8">
          <ContactCard />
        </Reveal>
      </div>
    </section>
  )
}
