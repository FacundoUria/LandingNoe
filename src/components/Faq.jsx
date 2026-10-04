import { useCallback, useEffect, useRef, useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import { WhatsAppIcon } from './icons.jsx'
import Doodle from './Doodle.jsx'
import FaqDialog from './FaqDialog.jsx'
import HandUnderline from './HandUnderline.jsx'
import Reveal from './Reveal.jsx'
import TeamFaces from './TeamFaces.jsx'
import { FAQ_ICONS } from './faqIcons.js'

const STAGGER_MS = 60
// Duración de la animación de cierre del detalle (0 con movimiento reducido)
const CLOSE_MS = 300

// Banner de contacto debajo de la grilla: horizontal en desktop, apilado en mobile
function ContactBanner() {
  const { contacto } = PREGUNTAS_FRECUENTES
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-arbell-dark to-arbell-blue p-6 lg:px-10 lg:py-8 text-white shadow-lg shadow-arbell-dark/20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <Doodle type="sparkle" twinkle delay={300} className="absolute top-5 right-5 lg:top-4 lg:right-1/3 w-8 h-8 text-amber-300" />
      <div className="relative flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <TeamFaces size="w-12 h-12" />
          <p className="text-lg lg:text-xl font-bold">{contacto.titulo}</p>
        </div>
        <a
          href={whatsappUrl()}
          rel="noopener noreferrer"
          target="_blank"
          className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-arbell-blue shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-arbell-light hover:shadow-lg active:scale-95 focus-visible:outline-white"
        >
          <WhatsAppIcon className="w-5 h-5 text-emerald-500 transition-transform duration-200 group-hover:scale-110" />
          {contacto.boton}
        </a>
      </div>
    </div>
  )
}

export default function Faq() {
  const { preguntas } = PREGUNTAS_FRECUENTES
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.1 })
  // Pregunta del detalle abierto (null = cerrado) y si está visible (para animar entrada y salida)
  const [active, setActive] = useState(null)
  const [shown, setShown] = useState(false)
  const activeRef = useRef(null)
  const cardRefs = useRef([])
  const closeTimer = useRef(null)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Mientras el detalle está abierto, la página no scrollea (sin salto por la barra de scroll)
  useEffect(() => {
    if (active === null) return
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    return () => {
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
    }
  }, [active])

  function openDetail(index) {
    clearTimeout(closeTimer.current)
    activeRef.current = index
    setActive(index)
    // Dos frames para que el panel se pinte cerrado antes de animar la entrada
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
  }

  const closeDetail = useCallback((afterClose) => {
    setShown(false)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    closeTimer.current = setTimeout(
      () => {
        const index = activeRef.current
        activeRef.current = null
        setActive(null)
        if (afterClose) afterClose()
        else cardRefs.current[index]?.focus()
      },
      reduced ? 0 : CLOSE_MS,
    )
  }, [])

  const handleClose = useCallback(() => closeDetail(), [closeDetail])

  const handleNavigate = useCallback(
    (step) => {
      const next = (activeRef.current + step + preguntas.length) % preguntas.length
      activeRef.current = next
      setActive(next)
    },
    [preguntas.length],
  )

  // "Quiero sumarme": cierra y lleva al formulario, con el foco en el primer campo
  const handleJoin = useCallback(() => {
    closeDetail(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(SECTION_IDS.formulario)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      document.getElementById('leadFullName')?.focus({ preventScroll: true })
    })
  }, [closeDetail])

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

      <div className="page-container lg:max-w-6xl">
        <Reveal className="text-center">
          <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-white/80 border border-sky-100 px-3 py-1 rounded-full">
            {PREGUNTAS_FRECUENTES.etiqueta}
          </span>
          <h2 id="faq-titulo" className="mt-3 text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {PREGUNTAS_FRECUENTES.titulo}
          </h2>
        </Reveal>

        {/* Respuestas rápidas: 2 columnas en mobile, 4 en desktop, todas del mismo alto */}
        <ul ref={cardsRef} className="mt-8 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 auto-rows-fr">
          {preguntas.map(({ icono, corta, rapida }, index) => (
            <li
              key={corta}
              className={`reveal ${cardsVisible ? 'is-visible' : ''}`}
              style={{ '--reveal-delay': `${index * STAGGER_MS}ms` }}
            >
              <button
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                type="button"
                aria-haspopup="dialog"
                onClick={() => openDetail(index)}
                className="group/underline flex flex-col w-full h-full text-left rounded-3xl border border-slate-200 bg-white p-4 lg:p-6 shadow-xs transition duration-300 ease-soft hover:-translate-y-1 hover:border-arbell-blue/30 hover:shadow-lg hover:shadow-arbell-blue/10 active:scale-[0.98]"
              >
                <span aria-hidden="true" className="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-arbell-light text-arbell-blue">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path d={FAQ_ICONS[icono]} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-4 block text-xs lg:text-sm font-medium text-slate-500">{corta}</span>
                <span className="mt-1 block text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  <HandUnderline text={`**${rapida}**`} onHover />
                </span>
                <span className="mt-auto pt-4 block text-xs font-semibold text-arbell-blue">
                  {PREGUNTAS_FRECUENTES.verDetalle} +
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8 lg:mt-12">
          <ContactBanner />
        </Reveal>
      </div>

      {active !== null && (
        <FaqDialog index={active} shown={shown} onClose={handleClose} onNavigate={handleNavigate} onJoin={handleJoin} />
      )}
    </section>
  )
}
