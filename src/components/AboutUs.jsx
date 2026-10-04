import { useRef, useState } from 'react'
import { SECTION_IDS, TEAM_IMAGE } from '../config.js'
import { QUIENES_SOMOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Reveal from './Reveal.jsx'

const STAGGER_MS = 90

// Foto con un marco de color desplazado detrás que se acomoda al aparecer
function TeamPhoto() {
  const [ref, visible] = useReveal({ threshold: 0.25 })

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-3xl bg-linear-to-br from-arbell-accent to-arbell-blue transition duration-700 ease-soft delay-200 ${
          visible ? 'opacity-100 translate-x-3 translate-y-3 lg:translate-x-5 lg:translate-y-5' : 'opacity-0 translate-x-0 translate-y-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute -top-3 -left-3 lg:-top-5 lg:-left-5 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl bg-[radial-gradient(circle,var(--color-arbell-blue)_1.5px,transparent_2px)] bg-size-[12px_12px] transition duration-700 ease-soft delay-300 ${
          visible ? 'opacity-40' : 'opacity-0'
        }`}
      />
      <img
        src={TEAM_IMAGE}
        alt={QUIENES_SOMOS.imagenAlt}
        loading="lazy"
        className={`reveal ${visible ? 'is-visible' : ''} relative w-full aspect-[4/3] object-cover object-top rounded-3xl shadow-lg border border-white`}
      />
    </div>
  )
}

// El build de Tailwind descarta -webkit-backface-visibility porque los Safari actuales no lo
// necesitan; va inline para cubrir iOS anteriores a 15.4.
const FACE_STYLE = { WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }

// Tarjeta que gira en 3D: frente con ícono y título, dorso con el texto.
// Gira solo con click/tap o Enter/Espacio (aria-pressed). En hover (mouse) el frente apenas
// se inclina y se eleva, como pista de que se puede tocar.
// Frente y dorso comparten la misma celda de grid, así la tarjeta mide lo que la cara más alta.
function FlipCard({ emoji, titulo, texto, popDelay, visible, peek, onPeekEnd }) {
  const [flipped, setFlipped] = useState(false)

  function handleClick() {
    setFlipped((value) => !value)
    if (peek) onPeekEnd()
  }

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={handleClick}
      className="group/card block w-full h-full text-left rounded-2xl perspective-distant"
    >
      <span
        className={`flip-inner grid h-full transition-[transform,translate] duration-700 ease-soft ${
          flipped ? 'rotate-y-180' : 'group-hover/card:-rotate-y-6 group-hover/card:-translate-y-1'
        } ${peek ? 'animate-flip-peek' : ''}`}
        onAnimationEnd={(event) => {
          if (event.animationName === 'flip-peek') onPeekEnd()
        }}
      >
        {/* Frente */}
        <span className="[grid-area:1/1] flex flex-col bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flip-face [transform:rotateY(0deg)] transition-shadow duration-300 group-hover/card:shadow-lg group-hover/card:shadow-arbell-blue/10" style={FACE_STYLE}>
          <span
            aria-hidden="true"
            className={`flex items-center justify-center w-14 h-14 rounded-full bg-arbell-light text-3xl ${visible ? 'animate-pop' : ''}`}
            style={{ animationDelay: `${popDelay}ms` }}
          >
            {emoji}
          </span>
          <span className="mt-3 block text-base font-bold text-slate-900 leading-snug">{titulo}</span>
          <span aria-hidden="true" className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-arbell-blue">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {QUIENES_SOMOS.beneficiosPista}
          </span>
        </span>

        {/* Dorso */}
        <span className="[grid-area:1/1] flex flex-col justify-center bg-linear-to-br from-arbell-blue to-[#005a9e] text-white rounded-2xl p-5 shadow-md flip-face [transform:rotateY(180deg)]" style={FACE_STYLE}>
          <span aria-hidden="true" className="block text-xs font-bold uppercase tracking-wider text-sky-200">
            {titulo}
          </span>
          <span className="mt-2 block text-sm leading-relaxed">{texto}</span>
        </span>
      </span>
    </button>
  )
}

export default function AboutUs() {
  const { porQue, beneficios, cta } = QUIENES_SOMOS
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.3 })
  const [datosRef, datosVisible] = useReveal()
  const [historiaOpen, setHistoriaOpen] = useState(false)
  const historiaRef = useRef(null)

  function toggleHistoria() {
    const opening = !historiaOpen
    setHistoriaOpen(opening)
    // En mobile, al abrir, acercar el inicio del texto si quedó fuera de la pantalla
    if (opening && window.matchMedia('(max-width: 63.999rem)').matches) {
      requestAnimationFrame(() => {
        const panel = historiaRef.current
        if (!panel || panel.getBoundingClientRect().top < window.innerHeight * 0.6) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      })
    }
  }
  // La primera tarjeta hace un giro de muestra una sola vez
  const [peekDone, setPeekDone] = useState(false)

  return (
    <section
      id={SECTION_IDS.quienesSomos}
      aria-labelledby="quienes-somos-titulo"
      className="page-container mt-14 lg:mt-24 scroll-mt-20"
    >
      <Reveal className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full">
          {QUIENES_SOMOS.etiqueta}
        </span>
        <h2 id="quienes-somos-titulo" className="mt-3 text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {QUIENES_SOMOS.titulo}
        </h2>
        <p className="mt-3 text-base lg:text-xl font-semibold text-arbell-blue">{QUIENES_SOMOS.bajada}</p>
      </Reveal>

      <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center">
        {TEAM_IMAGE && <TeamPhoto />}

        <div className="mt-8 lg:mt-0">
          <Reveal as="p" delay={120} className="text-lg lg:text-2xl font-semibold text-slate-800 leading-snug">
            {QUIENES_SOMOS.resumen}
          </Reveal>

          {/* Datos destacados: informativos, sin hover. 2+1 en mobile, en fila desde sm */}
          <ul ref={datosRef} className="mt-5 lg:mt-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5 lg:gap-3">
            {QUIENES_SOMOS.datos.map(({ emoji, texto }, index) => (
              <li
                key={texto}
                className={`reveal ${datosVisible ? 'is-visible' : ''} flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-xs ${
                  index === QUIENES_SOMOS.datos.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
                style={{ '--reveal-delay': `${200 + index * STAGGER_MS}ms` }}
              >
                <span aria-hidden="true" className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-arbell-light text-lg">
                  {emoji}
                </span>
                <span className="text-xs lg:text-sm font-semibold text-slate-700 leading-snug">{texto}</span>
              </li>
            ))}
          </ul>

          <Reveal delay={480} className="mt-6 lg:mt-8">
            <button
              type="button"
              aria-expanded={historiaOpen}
              aria-controls="historia-bellissima"
              onClick={toggleHistoria}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-arbell-blue/25 bg-white px-5 py-2.5 text-sm font-bold text-arbell-blue shadow-xs transition duration-200 hover:border-arbell-blue hover:bg-arbell-light/60 active:scale-95"
            >
              {historiaOpen ? QUIENES_SOMOS.botonHistoriaCerrar : QUIENES_SOMOS.botonHistoria}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ease-soft ${historiaOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Reveal>
        </div>
      </div>

      {/* Historia completa: se despliega con el botón (altura animada + fade, como el FAQ).
          Cerrada queda inert, así su contenido no recibe foco. */}
      <div
        ref={historiaRef}
        id="historia-bellissima"
        role="region"
        aria-label={QUIENES_SOMOS.historiaTitulo}
        inert={!historiaOpen}
        className={`grid scroll-mt-20 transition-[grid-template-rows] duration-500 ease-soft ${
          historiaOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mt-8 lg:mt-12 grid gap-6 lg:grid-cols-2 lg:gap-12 rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-10 shadow-xs text-sm lg:text-base text-slate-600 leading-relaxed transition duration-500 ease-soft ${
              historiaOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-2'
            }`}
          >
            <div className="space-y-4">
              {QUIENES_SOMOS.parrafos.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>
            <div className="lg:border-l lg:border-slate-100 lg:pl-12">
              <h3 className="text-lg lg:text-xl font-bold text-slate-900">{porQue.titulo}</h3>
              <p className="mt-2">{porQue.texto}</p>
            </div>
          </div>
        </div>
      </div>

      <Reveal as="h3" className="mt-10 lg:mt-16 text-lg lg:text-2xl font-bold text-slate-900 text-center">
        {QUIENES_SOMOS.beneficiosTitulo}
      </Reveal>
      {/* Tarjetas que giran. auto-rows-fr: todas las filas miden lo que la tarjeta más alta */}
      <ul ref={cardsRef} className="mt-5 lg:mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 auto-rows-fr">
        {beneficios.map((beneficio, index) => {
          const delay = 100 + index * STAGGER_MS
          return (
            <li
              key={beneficio.titulo}
              className={`reveal ${cardsVisible ? 'is-visible' : ''}`}
              style={{ '--reveal-delay': `${delay}ms` }}
            >
              <FlipCard
                {...beneficio}
                popDelay={delay + 150}
                visible={cardsVisible}
                peek={index === 0 && cardsVisible && !peekDone}
                onPeekEnd={() => setPeekDone(true)}
              />
            </li>
          )
        })}
      </ul>

      <Reveal className="relative mt-10 lg:mt-16 overflow-hidden rounded-3xl bg-linear-to-br from-[#004b8d] to-arbell-blue px-6 py-8 lg:px-12 lg:py-12 text-center text-white shadow-xl">
        <div aria-hidden="true" className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none animate-float-slow" />
        <div className="relative max-w-2xl mx-auto">
          <h3 className="text-xl lg:text-3xl font-extrabold tracking-tight">{cta.titulo}</h3>
          <p className="mt-3 text-sm lg:text-base text-sky-100 leading-relaxed">{cta.texto}</p>
          <a
            href={`#${SECTION_IDS.formulario}`}
            className="group mt-6 inline-flex items-center gap-2 bg-white text-arbell-blue font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-arbell-light hover:shadow-xl hover:shadow-black/20 active:scale-95 focus-visible:outline-white"
          >
            {cta.boton}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  )
}
