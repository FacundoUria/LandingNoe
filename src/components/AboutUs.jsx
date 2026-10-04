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

// El build de Tailwind descarta -webkit-backface-visibility porque los Safari actuales no lo
// necesitan; va inline para cubrir iOS anteriores a 15.4.
const FACE_STYLE = { WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }

// Color propio de cada tarjeta (la clave se elige en content.js, campo "color").
// Clases completas para que Tailwind las detecte. El dorso usa tonos oscuros del color para que
// el texto blanco se lea bien (dorado y verde en sus tonos claros no tienen contraste suficiente).
const CARD_COLORS = {
  azul: {
    icon: 'from-arbell-blue to-arbell-accent shadow-arbell-blue/30',
    blob: 'bg-arbell-blue/10',
    hover: 'group-hover/card:border-arbell-blue/40 group-hover/card:shadow-arbell-blue/20',
    turn: 'bg-arbell-blue',
    back: 'from-arbell-dark to-arbell-blue shadow-arbell-dark/25',
  },
  rosa: {
    icon: 'from-pink-600 to-pink-400 shadow-pink-500/30',
    blob: 'bg-pink-500/10',
    hover: 'group-hover/card:border-pink-500/40 group-hover/card:shadow-pink-500/20',
    turn: 'bg-pink-500',
    back: 'from-pink-800 to-pink-600 shadow-pink-800/25',
  },
  dorado: {
    icon: 'from-amber-600 to-arbell-gold shadow-amber-500/30',
    blob: 'bg-arbell-gold/10',
    hover: 'group-hover/card:border-arbell-gold/40 group-hover/card:shadow-amber-500/20',
    turn: 'bg-arbell-gold',
    back: 'from-amber-800 to-amber-600 shadow-amber-800/25',
  },
  verde: {
    icon: 'from-emerald-600 to-emerald-400 shadow-emerald-500/30',
    blob: 'bg-emerald-500/10',
    hover: 'group-hover/card:border-emerald-500/40 group-hover/card:shadow-emerald-500/20',
    turn: 'bg-emerald-500',
    back: 'from-emerald-800 to-emerald-600 shadow-emerald-800/25',
  },
}

// Íconos de línea de las tarjetas (la clave se elige en content.js, campo "icono").
// El apretón de manos es de Lucide (licencia ISC); el resto, del mismo set que el FAQ.
const FLIP_ICONS = {
  megafono: [
    'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46',
  ],
  apreton: [
    'm11 17 2 2a1 1 0 1 0 3-3',
    'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
    'm21 3 1 11h-2',
    'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3',
    'M3 4h8',
  ],
  birrete: [
    'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  ],
  dialogo: [
    'M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
  ],
}

const TURN_ICON_PATH =
  'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'

function LineIcon({ paths, className, strokeWidth = 1.6 }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

// Botoncito circular de giro (decorativo: la tarjeta entera es el botón)
function TurnBadge({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-4 right-4 flex items-center justify-center w-9 h-9 rounded-full text-white shadow-md ${className}`}
    >
      <LineIcon paths={[TURN_ICON_PATH]} strokeWidth={2} className="w-4 h-4 transition-transform duration-500 ease-soft group-hover/card:rotate-180" />
    </span>
  )
}

// Tarjeta horizontal que gira en 3D: frente con ícono, título y frase gancho; dorso con el texto.
// Gira solo con click/tap o Enter/Espacio (aria-pressed). En hover (mouse) el frente se eleva
// y toma el color de la tarjeta en el borde y la sombra.
// Frente y dorso comparten la misma celda de grid, así la tarjeta mide lo que la cara más alta.
function FlipCard({ icono, color, titulo, gancho, texto, popDelay, visible, peek, onPeekEnd }) {
  const [flipped, setFlipped] = useState(false)
  const iconPaths = FLIP_ICONS[icono]
  const colors = CARD_COLORS[color] ?? CARD_COLORS.azul

  function handleClick() {
    setFlipped((value) => !value)
    if (peek) onPeekEnd()
  }

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={handleClick}
      className="group/card block w-full h-full text-left rounded-3xl perspective-distant"
    >
      <span
        className={`flip-inner grid h-full transition-[transform,translate] duration-700 ease-soft ${
          flipped ? 'rotate-y-180' : 'group-hover/card:-translate-y-1'
        } ${peek ? 'animate-flip-peek' : ''}`}
        onAnimationEnd={(event) => {
          if (event.animationName === 'flip-peek') onPeekEnd()
        }}
      >
        {/* Frente */}
        <span
          className={`relative overflow-hidden [grid-area:1/1] flex items-start gap-4 lg:gap-5 rounded-3xl border border-slate-200 bg-white p-5 pb-16 lg:p-6 lg:pr-16 shadow-sm flip-face [transform:rotateY(0deg)_translateZ(1px)] transition-[border-color,box-shadow] duration-300 group-hover/card:shadow-xl ${colors.hover}`}
          style={FACE_STYLE}
        >
          {/* Círculo difuminado del color de la tarjeta asomando desde la esquina */}
          <span aria-hidden="true" className={`pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl ${colors.blob}`} />

          <span
            aria-hidden="true"
            className={`relative shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br text-white shadow-lg ${colors.icon} ${
              visible ? 'animate-pop' : ''
            }`}
            style={{ animationDelay: `${popDelay}ms` }}
          >
            <LineIcon paths={iconPaths} className="w-8 h-8" />
          </span>
          <span className="relative min-w-0 pt-1">
            <span className="block text-lg font-bold text-slate-900 leading-snug">{titulo}</span>
            <span className="mt-1.5 block text-sm lg:text-[15px] text-slate-500 leading-relaxed">{gancho}</span>
          </span>

          <TurnBadge className={colors.turn} />
        </span>

        {/* Dorso: el botón de giro va abajo a la derecha, por eso el texto deja margen a la derecha */}
        <span
          className={`relative overflow-hidden [grid-area:1/1] flex flex-col rounded-3xl bg-linear-to-br p-5 pb-16 lg:p-6 lg:pr-16 text-white shadow-lg flip-face [transform:rotateY(180deg)_translateZ(1px)] ${colors.back}`}
          style={FACE_STYLE}
        >
          <span aria-hidden="true" className="block text-xs font-bold uppercase tracking-wider text-white/70">
            {titulo}
          </span>
          <span className="mt-2 block text-[15px] leading-relaxed">{texto}</span>
          <TurnBadge className="bg-white/20" />
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

      <Reveal as="h3" className="mt-10 lg:mt-16 text-lg lg:text-2xl font-bold text-slate-900 text-center">
        {QUIENES_SOMOS.beneficiosTitulo}
      </Reveal>
      {/* Tarjetas que giran: 2x2 en desktop, una columna en mobile. auto-rows-fr: todas miden lo que la más alta */}
      <ul ref={cardsRef} className="mt-5 lg:mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5 lg:max-w-4xl lg:mx-auto auto-rows-fr">
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
