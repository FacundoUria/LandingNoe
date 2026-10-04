import { useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import Reveal from './Reveal.jsx'

export default function Faq() {
  // Índice de la pregunta abierta (solo una a la vez); null = todas cerradas
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section
      id={SECTION_IDS.preguntasFrecuentes}
      aria-labelledby="faq-titulo"
      className="page-container mt-14 lg:mt-24 scroll-mt-20"
    >
      <Reveal as="h2" id="faq-titulo" className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-center">
        {PREGUNTAS_FRECUENTES.titulo}
      </Reveal>

      <Reveal delay={100} className="mt-6 lg:mt-10 max-w-3xl mx-auto space-y-3">
        {PREGUNTAS_FRECUENTES.preguntas.map(({ pregunta, respuesta }, index) => {
          const open = openIndex === index
          const buttonId = `faq-pregunta-${index}`
          const panelId = `faq-respuesta-${index}`

          return (
            <div
              key={pregunta}
              className={`bg-white rounded-2xl border overflow-hidden transition-[border-color,box-shadow] duration-200 ${
                open ? 'border-arbell-blue/40 shadow-sm' : 'border-slate-200/80'
              }`}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group w-full flex items-center justify-between gap-4 px-4 py-4 lg:px-6 text-left text-sm lg:text-base font-semibold text-slate-800 rounded-2xl transition-colors duration-200 hover:bg-arbell-light/60 hover:text-arbell-blue focus-visible:outline-offset-[-2px]"
                >
                  {pregunta}
                  <svg
                    className={`shrink-0 w-5 h-5 text-arbell-blue transition-[rotate] duration-300 ease-soft ${
                      open ? 'rotate-180' : 'group-hover:rotate-[25deg]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                    className={`px-4 pb-4 lg:px-6 lg:pb-5 text-sm lg:text-base text-slate-600 leading-relaxed transition duration-300 ease-soft ${
                      open ? 'opacity-100 translate-y-0 delay-75' : 'opacity-0 -translate-y-1'
                    }`}
                  >
                    {respuesta}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </Reveal>

      <Reveal as="p" className="mt-8 text-center text-sm lg:text-base text-slate-600">
        <span className="font-semibold text-slate-800">{PREGUNTAS_FRECUENTES.dudaTitulo}</span>{' '}
        <a
          className="link-underline rounded-sm font-semibold text-arbell-blue"
          href={whatsappUrl()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {PREGUNTAS_FRECUENTES.dudaLink}
        </a>
      </Reveal>
    </section>
  )
}
