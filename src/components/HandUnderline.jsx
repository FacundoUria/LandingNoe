import { useReveal } from '../hooks/useReveal.js'

// Subrayado irregular estilo marcador (como los óvalos y flechas del flyer de la clienta).
// Por defecto se dibuja una vez, cuando la palabra entra en pantalla (delay en ms).
// Con onHover se dibuja al pasar el mouse sobre el elemento .group/underline más cercano
// (y se borra al salir); en ese caso el texto puede partirse en varias líneas.
function Underline({ children, delay, onHover }) {
  const [ref, visible] = useReveal({ threshold: 0.6 })
  const drawClass = onHover
    ? 'transition-[stroke-dashoffset] duration-500 ease-soft group-hover/underline:[stroke-dashoffset:0]'
    : visible
      ? 'animate-draw'
      : ''

  return (
    <span ref={ref} className={`relative inline-block ${onHover ? '' : 'whitespace-nowrap'}`}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-[-3%] -bottom-[0.12em] w-[106%] h-[0.32em] text-amber-300"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        <path
          d="M4 15C46 8 92 6 140 8C188 10 236 12 296 6"
          strokeWidth="6"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          className={drawClass}
          style={{ animationDelay: `${delay}ms` }}
        />
        <path
          d="M22 20C80 15 150 15 226 16"
          strokeWidth="3.5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          className={`opacity-70 ${drawClass} ${onHover ? 'delay-150' : ''}`}
          style={{ animationDelay: `${delay + 250}ms` }}
        />
      </svg>
    </span>
  )
}

// Muestra un texto donde lo que va entre **dobles asteriscos** lleva el subrayado a mano.
export default function HandUnderline({ text, delay = 300, onHover = false }) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, index) =>
      index % 2 === 1 ? (
        <Underline key={index} delay={delay} onHover={onHover}>
          {part}
        </Underline>
      ) : (
        part
      ),
    )
}
