import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS } from '../config.js'
import { COMO_EMPEZAR } from '../content.js'
import HandUnderline from './HandUnderline.jsx'
import Reveal from './Reveal.jsx'
import Wave from './Wave.jsx'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// Línea que une los números y se "dibuja" con el scroll. Mide los centros de los círculos
// (vertical en mobile, horizontal en desktop), posiciona la línea entre el primero y el
// último, y devuelve cuántos pasos alcanzó. El trazo se actualiza por estilo directo (sin re-render).
function useStepsProgress(stepCount) {
  const listRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const circleRefs = useRef([])
  const [reached, setReached] = useState(0)

  useEffect(() => {
    const list = listRef.current
    const track = trackRef.current
    const fill = fillRef.current
    if (!list || !track || !fill) return
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
    let frame = 0

    function update() {
      frame = 0
      const listRect = list.getBoundingClientRect()
      const centers = circleRefs.current.map((circle) => {
        const rect = circle.getBoundingClientRect()
        return { x: rect.left + rect.width / 2 - listRect.left, y: rect.top + rect.height / 2 - listRect.top }
      })
      const first = centers[0]
      const last = centers[centers.length - 1]
      const vertical = last.y - first.y > last.x - first.x
      const length = vertical ? last.y - first.y : last.x - first.x

      Object.assign(track.style, vertical
        ? { left: `${first.x - 1}px`, top: `${first.y}px`, width: '2px', height: `${length}px` }
        : { left: `${first.x}px`, top: `${first.y - 1}px`, width: `${length}px`, height: '2px' })

      // Vertical: la punta de la línea sigue al 60% del alto de la pantalla.
      // Horizontal: se dibuja mientras la sección sube del 85% al 45% de la pantalla.
      const viewport = window.innerHeight
      let progress = vertical
        ? (viewport * 0.6 - (listRect.top + first.y)) / length
        : (viewport * 0.85 - listRect.top) / (viewport * 0.4)
      progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, progress))

      fill.style.transform = vertical ? `scaleY(${progress})` : `scaleX(${progress})`
      fill.style.transformOrigin = vertical ? 'top' : 'left'

      const drawn = progress * length
      const offsets = centers.map((center) => (vertical ? center.y - first.y : center.x - first.x))
      setReached(offsets.filter((offset) => drawn >= offset - 1).length)
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [stepCount])

  return { listRef, trackRef, fillRef, circleRefs, reached }
}

export default function HowToStart() {
  const { pasos } = COMO_EMPEZAR
  const { listRef, trackRef, fillRef, circleRefs, reached } = useStepsProgress(pasos.length)

  return (
    <section aria-labelledby="como-empezar-titulo" className="relative bg-arbell-light/50 py-20 lg:py-32">
      {/* Ondas arriba y abajo, como la del hero, para separar del blanco */}
      <Wave flip className="-top-px text-white" />
      <Wave className="-bottom-px text-white" />

      <div className="page-container relative">
        <Reveal className="text-center">
          <h2 id="como-empezar-titulo" className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            <HandUnderline text={COMO_EMPEZAR.titulo} />
          </h2>
          <p className="mt-2 text-sm lg:text-lg text-slate-500">{COMO_EMPEZAR.bajada}</p>
        </Reveal>

        <div ref={listRef} className="relative mt-8 lg:mt-12 lg:max-w-5xl lg:mx-auto">
          {/* Línea: fondo gris + trazo azul que crece con el scroll */}
          <div ref={trackRef} aria-hidden="true" className="absolute rounded-full bg-slate-200 overflow-hidden">
            <div ref={fillRef} className="w-full h-full bg-arbell-blue" style={{ transform: 'scale(0)' }} />
          </div>

          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            {pasos.map(({ titulo, texto }, index) => {
              const lit = index < reached
              return (
                <li key={titulo} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                  <span
                    ref={(element) => {
                      circleRefs.current[index] = element
                    }}
                    className={`relative z-10 shrink-0 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 text-lg lg:text-xl font-extrabold transition duration-500 ease-soft ${
                      lit
                        ? 'bg-arbell-blue border-arbell-blue text-white scale-105 shadow-lg shadow-arbell-blue/30'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="pt-2 lg:pt-0">
                    <h3 className={`text-base lg:text-lg font-bold transition-colors duration-500 ${lit ? 'text-slate-900' : 'text-slate-500'}`}>
                      {titulo}
                    </h3>
                    <p className="mt-1 text-sm lg:text-base text-slate-500 leading-relaxed">{texto}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={`#${SECTION_IDS.formulario}`}
            className="group inline-flex items-center gap-2 bg-arbell-blue text-white font-extrabold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-arbell-blue/25 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-arbell-blue/35 active:scale-95"
          >
            {COMO_EMPEZAR.boton}
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
        </Reveal>
      </div>
    </section>
  )
}
