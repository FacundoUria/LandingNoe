import { POR_QUE_ELEGIRNOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Reveal from './Reveal.jsx'

const STAGGER_MS = 90

// Informativo: los ítems no son clickeables, así que no se elevan en hover (solo el ícono se inclina).
export default function WhyChooseUs() {
  const [listRef, listVisible] = useReveal()

  return (
    <section aria-labelledby="por-que-titulo" className="page-container mt-12 lg:mt-20 text-center">
      <Reveal as="h2" id="por-que-titulo" className="text-lg lg:text-2xl font-bold text-slate-900 tracking-tight">
        {POR_QUE_ELEGIRNOS.titulo}
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
    </section>
  )
}
