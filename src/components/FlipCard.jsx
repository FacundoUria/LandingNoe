import { useState } from 'react'

// El build de Tailwind descarta -webkit-backface-visibility porque los Safari actuales no lo
// necesitan; va inline para cubrir iOS anteriores a 15.4.
const FACE_STYLE = { WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }

// Color propio de cada tarjeta (la clave se elige en content.js, POR_QUE_ELEGIRNOS.beneficios, campo "color").
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

// Íconos de línea de las tarjetas (la clave se elige en content.js, POR_QUE_ELEGIRNOS.beneficios, campo "icono").
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
export default function FlipCard({ icono, color, titulo, gancho, texto, popDelay, visible, peek, onPeekEnd }) {
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
