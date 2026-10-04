import { useEffect, useRef } from 'react'
import { HERO_IMAGE, SECTION_IDS, STORE_URL } from '../config.js'
import { HERO } from '../content.js'
import HandUnderline from './HandUnderline.jsx'
import TeamFaces from './TeamFaces.jsx'

// Íconos de línea de los ítems (la clave se elige en content.js, campo "icono")
const ICONOS = {
  ganancia: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  reloj: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
}

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

      {/* Foto del equipo en desktop: a la derecha del texto, fundida con el fondo por el borde
          izquierdo. Se extiende por arriba (-top-24) para que el parallax no deje un hueco.
          En mobile/tablet la foto va debajo de los ítems (ver más abajo). */}
      {HERO_IMAGE && (
        <div
          ref={parallaxRef}
          className="hidden lg:block absolute right-0 -top-24 bottom-0 w-[min(50%,48rem)] will-change-transform"
        >
          <div className="w-full h-full [mask-image:linear-gradient(to_right,transparent,#000_35%)] animate-photo-in [animation-delay:200ms]">
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

        <h1 className="text-[1.9rem] sm:text-4xl lg:text-6xl leading-[1.05] font-extrabold tracking-tight mb-4 lg:mb-6 max-w-[19ch] lg:max-w-xl [text-shadow:0_2px_12px_rgb(0_40_90/0.35)] animate-fade-up [animation-delay:80ms]">
          <HandUnderline text={HERO.titulo} delay={650} />
        </h1>

        <p className="max-w-[34ch] text-sm sm:text-base lg:text-lg text-sky-100/90 leading-relaxed animate-fade-up [animation-delay:160ms]">
          {HERO.texto}
        </p>

        <div className="mt-4 lg:mt-5 flex items-center gap-2.5 animate-fade-up [animation-delay:220ms]">
          <TeamFaces size="w-8 h-8" />
          <span className="text-xs lg:text-sm font-medium text-white/80">{HERO.firma}</span>
        </div>

        {/* Ítems como pastillas de vidrio */}
        <ul className="mt-5 lg:mt-7 flex flex-wrap gap-2 lg:gap-3 animate-fade-up [animation-delay:280ms]">
          {HERO.items.map(({ icono, texto }) => (
            <li
              key={texto}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-2 text-xs sm:text-sm font-medium text-white whitespace-nowrap"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path d={ICONOS[icono]} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {texto}
            </li>
          ))}
        </ul>

        {/* Botones: uno abajo del otro en mobile, en fila en desktop */}
        <div className="mt-6 lg:mt-9 flex flex-col gap-3 lg:flex-row animate-fade-up [animation-delay:340ms]">
          <a
            href={`#${SECTION_IDS.formulario}`}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 w-full lg:w-auto rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-arbell-blue shadow-lg shadow-[#002a55]/25 transition duration-200 hover:-translate-y-0.5 hover:bg-arbell-light hover:shadow-xl active:scale-95 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-sky-200/70 to-transparent animate-shine"
            />
            <span className="relative">{HERO.botonPrincipal}</span>
            <svg
              className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={STORE_URL}
            rel="noopener noreferrer"
            target="_blank"
            className="group inline-flex items-center justify-center gap-2 w-full lg:w-auto rounded-xl border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-white/10 hover:border-white/70 active:scale-95 focus-visible:outline-white"
          >
            {HERO.botonSecundario}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Foto del equipo en mobile/tablet: a todo el ancho, debajo de los ítems y antes del
            formulario. Recorte desde arriba para que entren las dos de la cara a los hombros. */}
        {HERO_IMAGE && (
          <div className="lg:hidden relative mt-6 h-[260px] md:h-80 rounded-3xl overflow-hidden shadow-xl shadow-[#002a55]/30 animate-photo-in [animation-delay:400ms]">
            <img src={HERO_IMAGE} alt={HERO.imagenAlt} className="w-full h-full object-cover object-top" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-arbell-blue/70 to-transparent" />
          </div>
        )}
      </div>

      {/* Onda inferior: transición al fondo claro de la página */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px w-full h-8 md:h-12 lg:h-16 text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 70C180 110 360 120 600 92C840 64 1020 20 1200 26C1320 30 1390 48 1440 60V120H0Z" />
      </svg>
    </section>
  )
}
