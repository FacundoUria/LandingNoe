import { useState } from 'react'
import { POR_QUE_ELEGIRNOS } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import Doodle from './Doodle.jsx'
import FlipCard from './FlipCard.jsx'
import Reveal from './Reveal.jsx'

const STAGGER_MS = 90

// ¿Por qué elegir Bellissima?: las 4 tarjetas que giran (ver FlipCard).
export default function WhyChooseUs() {
  const [cardsRef, cardsVisible] = useReveal({ threshold: 0.3 })
  // La primera tarjeta hace un giro de muestra una sola vez
  const [peekDone, setPeekDone] = useState(false)

  return (
    <section aria-labelledby="por-que-titulo" className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
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

        {/* 2x2 en desktop, una columna en mobile. auto-rows-fr: todas miden lo que la más alta */}
        <ul ref={cardsRef} className="mt-8 lg:mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5 lg:max-w-4xl lg:mx-auto auto-rows-fr">
          {POR_QUE_ELEGIRNOS.beneficios.map((beneficio, index) => {
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
      </div>
    </section>
  )
}
