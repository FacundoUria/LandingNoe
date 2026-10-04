import { POR_QUE_ELEGIRNOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Doodle from './Doodle.jsx'
import Reveal from './Reveal.jsx'

const STAGGER_MS = 90

// Informativo: los ítems no son clickeables, así que no se elevan en hover (solo el ícono se inclina).
export default function WhyChooseUs() {
  const [listRef, listVisible] = useReveal()

  return (
    <section aria-labelledby="por-que-titulo" className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Patrón de puntos cerca de la esquina, que se desvanece hacia todos los bordes (sin corte arriba) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-0 w-48 h-48 lg:top-10 lg:right-6 lg:w-80 lg:h-80 opacity-25 bg-[radial-gradient(circle,var(--color-arbell-blue)_1.5px,transparent_2px)] bg-size-[16px_16px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
      />

      <div className="page-container relative text-center">
        <Reveal>
          <h2 id="por-que-titulo" className="relative inline-block text-lg lg:text-2xl font-bold text-slate-900 tracking-tight">
            {POR_QUE_ELEGIRNOS.titulo}
            <Doodle type="sparkle" twinkle delay={300} className="hidden sm:block absolute -right-10 -top-5 w-8 h-8 text-arbell-accent" />
          </h2>
        </Reveal>
        <ul ref={listRef} className="mt-5 lg:mt-8 grid grid-cols-3 gap-3 lg:gap-6 lg:max-w-4xl lg:mx-auto">
          {POR_QUE_ELEGIRNOS.items.map(({ emoji, texto }, index) => {
            const delay = 100 + index * STAGGER_MS
            return (
              <li
                key={texto}
                className={`group reveal ${listVisible ? 'is-visible' : ''} flex flex-col items-center gap-2 lg:gap-3 lg:bg-white lg:border lg:border-slate-200/80 lg:rounded-2xl lg:p-6`}
                style={{ '--reveal-delay': `${delay}ms` }}
              >
                <span
                  aria-hidden="true"
                  className={`flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-arbell-light text-2xl lg:text-3xl transition-[rotate] duration-300 group-hover:rotate-6 ${
                    listVisible ? 'animate-pop' : ''
                  }`}
                  style={{ animationDelay: `${delay + 150}ms` }}
                >
                  {emoji}
                </span>
                <span className="text-xs lg:text-base font-medium text-slate-700 leading-snug">{texto}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
