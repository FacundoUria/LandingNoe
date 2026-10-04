import { useRef, useState } from 'react'
import { SECTION_IDS, TEAM_AVATAR, TEAM_IMAGE } from '../config.js'
import { QUIENES_SOMOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Doodle from './Doodle.jsx'
import HandUnderline from './HandUnderline.jsx'
import Reveal from './Reveal.jsx'

const STAGGER_MS = 90

// Convierte "texto **resaltado** texto" en nodos, con las partes entre ** en negrita
function withHighlights(text) {
  return text.split(/\*\*(.+?)\*\*/).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-slate-900">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

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
      <Doodle type="heart" delay={700} className="hidden sm:block absolute -top-7 -right-5 lg:-top-9 lg:-right-8 w-12 h-12 lg:w-14 lg:h-14 rotate-12 text-arbell-accent" />
    </div>
  )
}

export default function AboutUs() {
  const { porQue, cta } = QUIENES_SOMOS
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

  return (
    <section
      id={SECTION_IDS.quienesSomos}
      aria-labelledby="quienes-somos-titulo"
      className="page-container mt-10 lg:mt-16 scroll-mt-20"
    >
      <Reveal className="text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full">
          {QUIENES_SOMOS.etiqueta}
        </span>
        <h2 id="quienes-somos-titulo" className="mt-3 text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          <HandUnderline text={QUIENES_SOMOS.titulo} />
        </h2>
        <p className="mt-3 text-base lg:text-xl font-semibold text-arbell-blue">{QUIENES_SOMOS.bajada}</p>
      </Reveal>

      <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center">
        {TEAM_IMAGE && <TeamPhoto />}

        <div className="mt-8 lg:mt-0">
          <Reveal as="p" delay={120} className="text-lg lg:text-2xl font-semibold text-slate-800 leading-snug">
            {QUIENES_SOMOS.resumen}
          </Reveal>

          {/* Datos destacados: informativos, sin hover. En mobile uno por fila (ícono al costado);
              desde sm, tres columnas iguales con el ícono arriba y el texto que hace wrap. */}
          <ul ref={datosRef} className="mt-5 lg:mt-7 grid gap-2.5 sm:grid-cols-3 lg:gap-3">
            {QUIENES_SOMOS.datos.map(({ emoji, texto }, index) => (
              <li
                key={texto}
                className={`reveal ${datosVisible ? 'is-visible' : ''} min-w-0 flex items-center gap-3 sm:flex-col sm:justify-center sm:gap-2 sm:text-center rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 sm:py-3.5 shadow-xs`}
                style={{ '--reveal-delay': `${200 + index * STAGGER_MS}ms` }}
              >
                <span aria-hidden="true" className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-arbell-light text-lg">
                  {emoji}
                </span>
                <span className="min-w-0 text-sm sm:text-xs lg:text-sm font-semibold text-slate-700 leading-snug wrap-break-word hyphens-auto">
                  {texto}
                </span>
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
          {/* Una columna en mobile (historia y después la tarjeta); dos en desktop, con la misma
              altura. El padding deja ver la sombra de la tarjeta dentro del overflow-hidden. */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 px-1 pt-8 pb-3 lg:pt-12">
            {/* Nuestra historia: entra desde la izquierda */}
            <div
              className={`flex flex-col justify-center transition duration-500 ease-soft ${
                historiaOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-6'
              }`}
            >
              <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-arbell-blue">
                {QUIENES_SOMOS.historiaTitulo}
              </h3>
              <div className="relative mt-4 pl-5 lg:pl-6 space-y-4">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-linear-to-b from-arbell-blue to-arbell-accent"
                />
                {QUIENES_SOMOS.parrafos.map((parrafo, index) => (
                  <p
                    key={parrafo}
                    className={
                      index === 0
                        ? 'text-base lg:text-lg text-slate-700 leading-relaxed'
                        : 'text-sm lg:text-base text-slate-600 leading-relaxed'
                    }
                  >
                    {withHighlights(parrafo)}
                  </p>
                ))}
              </div>
            </div>

            {/* ¿Por qué Bellissima?: tarjeta destacada que entra desde la derecha */}
            <figure
              className={`relative overflow-hidden flex flex-col justify-center rounded-3xl bg-linear-to-br from-arbell-dark to-arbell-blue p-7 lg:p-10 text-white shadow-lg shadow-arbell-dark/20 transition duration-500 ease-soft ${
                historiaOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-6'
              }`}
            >
              <div aria-hidden="true" className="pointer-events-none">
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -left-10 -bottom-12 w-40 h-40 rounded-full bg-arbell-accent/20 blur-2xl" />
              </div>
              <div className="relative">
                <span aria-hidden="true" className="block font-serif text-7xl lg:text-8xl leading-none text-arbell-accent/60 -mb-4 lg:-mb-6">
                  “
                </span>
                <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-sky-200">{porQue.titulo}</h3>
                <blockquote className="mt-3 text-lg lg:text-xl font-semibold leading-relaxed">
                  <p>{porQue.texto}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {TEAM_AVATAR && (
                    <img
                      src={TEAM_AVATAR}
                      alt=""
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 shadow-md"
                    />
                  )}
                  <span className="text-sm lg:text-base font-semibold text-sky-100">{porQue.firma}</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* Llamado a la acción: corto, con tres datos y botón al formulario */}
      <Reveal className="relative mt-10 lg:mt-16 overflow-hidden rounded-3xl bg-linear-to-br from-[#004b8d] to-arbell-blue px-6 py-12 lg:px-12 lg:py-20 text-center text-white shadow-xl">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute -right-16 -top-16 w-56 h-56 lg:w-80 lg:h-80 rounded-full bg-white/10 blur-2xl animate-float-slow will-change-transform" />
          <div className="absolute -left-12 -bottom-16 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-sky-300/15 blur-xl animate-float-slower will-change-transform" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">{cta.titulo}</h3>
          <p className="mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg text-sky-100">{cta.bajada}</p>

          <ul className="mt-7 lg:mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8 text-sm lg:text-base font-semibold">
            {cta.datos.map((dato) => (
              <li key={dato} className="flex items-center gap-2">
                <span aria-hidden="true" className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 text-emerald-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {dato}
              </li>
            ))}
          </ul>

          {/* Flecha a mano apuntando al botón (solo donde hay lugar al costado) */}
          <span className="relative inline-block mt-8 lg:mt-10">
            <Doodle type="arrow" delay={200} className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 mr-3 w-20 h-12 -rotate-6 text-amber-300/80" />
            <a
              href={`#${SECTION_IDS.formulario}`}
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-white text-arbell-blue font-extrabold text-sm lg:text-base uppercase tracking-wider px-7 py-3.5 lg:px-8 lg:py-4 rounded-xl shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-arbell-light hover:shadow-xl hover:shadow-black/20 active:scale-95 focus-visible:outline-white"
            >
              {/* Brillo que cruza el botón cada ~4s, como el del formulario */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-sky-200/70 to-transparent animate-shine"
              />
              <span className="relative">{cta.boton}</span>
              <svg
                className="relative w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </span>
        </div>
      </Reveal>
    </section>
  )
}
