import { useEffect, useRef } from 'react'
import { HERO_IMAGE } from '../config.js'
import { HERO } from '../content.js'

// Parallax de la foto: solo desktop y sin movimiento reducido
const PARALLAX_QUERY = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)'
const PARALLAX_SPEED = 0.15

function useParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const media = window.matchMedia(PARALLAX_QUERY)
    let frame = 0

    function update() {
      frame = 0
      // Solo mientras el hero está a la vista
      const offset = Math.min(window.scrollY, window.innerHeight) * PARALLAX_SPEED
      element.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    function sync() {
      if (media.matches) {
        window.addEventListener('scroll', handleScroll, { passive: true })
        update()
      } else {
        window.removeEventListener('scroll', handleScroll)
        element.style.transform = ''
      }
    }

    sync()
    media.addEventListener('change', sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

export default function Hero() {
  const parallaxRef = useParallax()

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#004b8d] via-[#0063ad] to-arbell-blue text-white">
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute -right-16 -top-20 w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-white/10 blur-2xl animate-float-slow will-change-transform" />
        <div className="absolute -left-12 top-40 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-sky-300/15 blur-xl animate-float-slower will-change-transform" />
      </div>

      {/* Foto del equipo: a la derecha del texto, fundida con el fondo por el borde izquierdo.
          En mobile/tablet termina detrás de la card del formulario. En desktop se extiende
          por arriba (lg:-top-24) para que el parallax no deje un hueco. */}
      {HERO_IMAGE && (
        <div
          ref={parallaxRef}
          className="absolute right-0 bottom-12 w-1/2 h-60 sm:h-72 md:w-[46%] md:h-80 lg:-top-24 lg:bottom-0 lg:h-auto lg:w-[min(50%,48rem)] will-change-transform"
        >
          <div className="w-full h-full [mask-image:linear-gradient(to_right,transparent,#000_18%)] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%)] animate-photo-in [animation-delay:200ms]">
            <img
              src={HERO_IMAGE}
              alt={HERO.imagenAlt}
              className="w-full h-full object-cover object-[60%_20%]"
            />
          </div>
        </div>
      )}

      <div className="page-container relative z-10 pt-6 pb-24 md:pb-28 lg:pt-16 lg:pb-40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase mb-3.5 lg:mb-5 border border-white/25 animate-fade-up">
          <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{HERO.badge}</span>
        </div>

        <h1 className="text-[1.7rem] leading-tight sm:text-4xl lg:text-5xl lg:leading-tight font-extrabold tracking-tight mb-3 lg:mb-5 max-w-[19ch] lg:max-w-xl [text-shadow:0_2px_12px_rgb(0_40_90/0.35)] animate-fade-up [animation-delay:80ms]">
          {HERO.titulo}
        </h1>

        <div className="max-w-[52%] md:max-w-[50%] lg:max-w-lg">
          <p className="text-[13px] sm:text-sm lg:text-lg text-sky-100 leading-relaxed mb-4 lg:mb-7 animate-fade-up [animation-delay:160ms]">
            {HERO.texto}
          </p>

          <ul className="flex flex-col gap-2.5 lg:flex-row lg:gap-8 text-xs sm:text-sm font-medium text-white/95 animate-fade-up [animation-delay:240ms]">
            {HERO.items.map(({ emoji, texto }) => (
              <li key={texto} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="shrink-0 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-white/15 border border-white/20 text-base lg:text-lg"
                >
                  {emoji}
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Onda inferior: transición al fondo claro de la página */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px w-full h-8 md:h-12 lg:h-16 text-slate-50"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 70C180 110 360 120 600 92C840 64 1020 20 1200 26C1320 30 1390 48 1440 60V120H0Z" />
      </svg>
    </section>
  )
}
