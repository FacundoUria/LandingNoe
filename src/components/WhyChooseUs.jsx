import { useEffect, useRef, useState } from 'react'
import { POR_QUE_ELEGIRNOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Doodle from './Doodle.jsx'
import Reveal from './Reveal.jsx'
import WhyIllustration from './WhyIllustration.jsx'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
// Desplazamiento horizontal mínimo (px) para tomar un gesto como swipe
const SWIPE_PX = 50

// Óvalo dibujado a mano alrededor del nombre activo (como el de "Noe" en el flyer).
// Va dentro del mismo span que el texto y se extiende en em, así rodea el ancho real del
// texto con margen a cualquier tamaño. non-scaling-stroke: el trazo mantiene su grosor aunque
// el óvalo se estire; por eso el dash es en px de pantalla (1500 alcanza) y no usa pathLength.
function HandOval() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -left-[0.55em] -top-[0.4em] w-[calc(100%+1.1em)] h-[calc(100%+0.8em)] text-arbell-accent"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M214 9C150 0 62 5 24 29C-8 50 18 89 122 95C222 100 302 80 293 45C285 16 228 6 158 9"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="1500"
        strokeDashoffset="1500"
        className="animate-draw-oval"
      />
    </svg>
  )
}

// ¿Por qué elegir Bellissima?: selector de temas (pestañas + panel azul con mini ilustración).
// Autoplay cada 6 s cuando la sección está a la vista: lo marca la barra de progreso de la
// pestaña activa y avanza al terminar su animación. Se pausa con hover y se detiene para
// siempre al tocar una pestaña, usar el teclado o deslizar el panel. Sin autoplay con
// movimiento reducido.
export default function WhyChooseUs() {
  const temas = POR_QUE_ELEGIRNOS.beneficios
  // runs: cuántas veces se activó cada tema; es la key de su ilustración, así se vuelve a
  // animar al activarse y la que sale conserva su estado mientras se desvanece
  const [{ active, runs }, setState] = useState({ active: 0, runs: temas.map(() => 0) })
  const [autoplay, setAutoplay] = useState(() => !window.matchMedia(REDUCED_MOTION_QUERY).matches)
  const [hovered, setHovered] = useState(false)
  const [selectorRef, selectorVisible] = useReveal({ threshold: 0.4 })
  const tabsRef = useRef(null)
  const tabRefs = useRef([])
  const panelColRef = useRef(null)
  const arrowRef = useRef(null)
  const swipeStart = useRef(null)

  const running = autoplay && selectorVisible && !hovered

  function goTo(index) {
    setState((prev) => {
      const next = (index + temas.length) % temas.length
      if (next === prev.active) return prev
      return { active: next, runs: prev.runs.map((run, i) => (i === next ? run + 1 : run)) }
    })
  }

  // El usuario elige: cambia de tema y apaga el autoplay
  function choose(index, { focus = false } = {}) {
    const next = (index + temas.length) % temas.length
    goTo(next)
    setAutoplay(false)
    if (focus) tabRefs.current[next]?.focus()
  }

  function handleKeyDown(event) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    if (event.key in keys) {
      event.preventDefault()
      choose(active + keys[event.key], { focus: true })
    } else if (event.key === 'Home') {
      event.preventDefault()
      choose(0, { focus: true })
    } else if (event.key === 'End') {
      event.preventDefault()
      choose(temas.length - 1, { focus: true })
    }
  }

  function handlePointerDown(event) {
    swipeStart.current = { x: event.clientX, y: event.clientY }
  }

  function handlePointerUp(event) {
    const start = swipeStart.current
    swipeStart.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) choose(active + (dx < 0 ? 1 : -1))
  }

  // Mobile: la pestaña activa queda visible en el scroll horizontal (sin mover la página).
  // Desktop: la flecha a mano se alinea con la pestaña activa.
  useEffect(() => {
    function sync() {
      const tab = tabRefs.current[active]
      const tabs = tabsRef.current
      if (!tab || !tabs) return
      if (tabs.scrollWidth > tabs.clientWidth) {
        tabs.scrollTo({ left: tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
      }
      const arrow = arrowRef.current
      const column = panelColRef.current
      if (arrow && column) {
        const tabRect = tab.getBoundingClientRect()
        const columnRect = column.getBoundingClientRect()
        const y = tabRect.top + tabRect.height / 2 - columnRect.top - arrow.offsetHeight / 2
        arrow.style.transform = `translateY(${Math.max(0, y)}px)`
      }
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [active])

  return (
    <section
      aria-labelledby="por-que-titulo"
      className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-20 lg:pb-24"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
    >
      {/* Patrón de puntos cerca de la esquina, que se desvanece hacia todos los bordes (sin corte arriba) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-0 w-48 h-48 lg:top-10 lg:right-6 lg:w-80 lg:h-80 opacity-25 bg-[radial-gradient(circle,var(--color-arbell-blue)_1.5px,transparent_2px)] bg-size-[16px_16px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
      />

      <div className="page-container relative">
        <Reveal className="text-center">
          <h2 id="por-que-titulo" className="relative inline-block text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {POR_QUE_ELEGIRNOS.titulo}
            <Doodle type="sparkle" twinkle delay={300} className="hidden sm:block absolute -right-11 -top-5 w-9 h-9 text-arbell-accent" />
          </h2>
          <p className="mt-2 text-sm lg:text-lg text-slate-500">{POR_QUE_ELEGIRNOS.bajada}</p>
        </Reveal>

        <Reveal delay={120}>
          <div ref={selectorRef} className="mt-8 lg:mt-14 lg:grid lg:grid-cols-[45fr_55fr] lg:gap-16 lg:items-center">
            {/* Pestañas con los nombres cortos: scroll horizontal en mobile, lista vertical en desktop */}
            <div
              ref={tabsRef}
              role="tablist"
              aria-label={POR_QUE_ELEGIRNOS.titulo}
              onKeyDown={handleKeyDown}
              className="flex gap-1 overflow-x-auto custom-scroll -mx-4 px-4 py-3 lg:mx-0 lg:px-0 lg:py-0 lg:flex-col lg:items-start lg:gap-6 lg:overflow-visible"
            >
              {temas.map(({ titulo, corto }, index) => {
                const selected = index === active
                return (
                  <button
                    key={titulo}
                    ref={(element) => {
                      tabRefs.current[index] = element
                    }}
                    id={`por-que-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="por-que-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(index)}
                    className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-base font-bold text-left transition-colors duration-300 lg:rounded-2xl lg:px-5 lg:py-2 lg:text-2xl xl:text-3xl lg:font-extrabold lg:tracking-tight ${
                      selected ? 'text-slate-900' : 'text-slate-400 lg:text-slate-300 hover:text-slate-500'
                    }`}
                  >
                    <span className="relative inline-block">
                      {/* key: el óvalo se vuelve a dibujar cada vez que la pestaña se activa */}
                      {selected && <HandOval key={`oval-${runs[index]}`} />}
                      <span className="relative">{corto}</span>
                    </span>
                    {selected && autoplay && (
                      <span aria-hidden="true" className="absolute inset-x-5 bottom-0.5 h-0.5 lg:static lg:mt-3.5 lg:block lg:h-1 lg:max-w-[12rem] rounded-full bg-slate-200/80 overflow-hidden">
                        <span
                          key={`progress-${runs[index]}`}
                          className="block h-full rounded-full bg-arbell-accent origin-left animate-progress"
                          style={{ animationPlayState: running ? 'running' : 'paused' }}
                          onAnimationEnd={() => goTo(active + 1)}
                        />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div ref={panelColRef} className="relative mt-4 lg:mt-0">
              {/* Flecha a mano que sale del panel hacia la pestaña activa (solo desktop) */}
              <div
                ref={arrowRef}
                aria-hidden="true"
                className="hidden lg:block absolute top-0 right-full mr-1 w-20 transition-transform duration-500 ease-soft"
              >
                <Doodle type="arrow" delay={400} className="w-20 h-12 -scale-x-100 rotate-6 text-arbell-accent" />
              </div>

              {/* Panel: se puede deslizar para cambiar de tema. Ilustraciones y textos de todos los
                  temas comparten celda de grid, así el alto no salta al cambiar. */}
              <div
                id="por-que-panel"
                role="tabpanel"
                aria-labelledby={`por-que-tab-${active}`}
                tabIndex={0}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  swipeStart.current = null
                }}
                className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-arbell-dark to-arbell-blue px-6 py-7 sm:px-8 lg:px-11 lg:py-10 text-white shadow-xl shadow-arbell-dark/20 touch-pan-y select-none focus-visible:outline-offset-4"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
                <Doodle type="sparkle" twinkle delay={200} className="absolute top-5 right-5 lg:top-7 lg:right-7 w-8 h-8 lg:w-10 lg:h-10 text-white/30" />
                <Doodle type="heart" delay={500} className="absolute bottom-4 right-6 lg:bottom-6 lg:right-8 w-9 h-9 lg:w-11 lg:h-11 -rotate-12 text-white/30" />

                {/* Mini ilustración: sale la anterior y entra la nueva (fade + escala) */}
                <div aria-hidden="true" className="relative grid h-24 lg:h-32">
                  {temas.map(({ titulo, ilustracion }, index) => {
                    const selected = index === active
                    return (
                      <div
                        key={titulo}
                        className={`[grid-area:1/1] flex items-center transition-[opacity,scale,visibility] duration-500 ease-soft ${
                          selected ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-90'
                        }`}
                      >
                        {selectorVisible && <WhyIllustration key={runs[index]} {...ilustracion} />}
                      </div>
                    )
                  })}
                </div>

                {/* Frase grande y texto completo */}
                <div className="relative mt-5 lg:mt-6 grid">
                  {temas.map(({ titulo, frase, texto }, index) => {
                    const selected = index === active
                    return (
                      <div
                        key={titulo}
                        aria-hidden={!selected}
                        className={`[grid-area:1/1] pr-8 lg:pr-12 transition-[opacity,translate,visibility] duration-500 ease-soft ${
                          selected ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-3'
                        }`}
                      >
                        <p className="text-xl lg:text-2xl font-bold leading-snug">{frase}</p>
                        <p className="mt-2.5 text-sm lg:text-base text-white/75 leading-relaxed">{texto}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Puntos de posición (mobile): muestran que se puede deslizar */}
                <div aria-hidden="true" className="relative mt-6 flex gap-1.5 lg:hidden">
                  {temas.map(({ titulo }, index) => (
                    <span
                      key={titulo}
                      className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
