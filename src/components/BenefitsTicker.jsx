import { CINTA_BENEFICIOS } from '../content.js'

function TickerList({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? 'motion-reduce:hidden' : ''}`}>
      {CINTA_BENEFICIOS.map((beneficio) => (
        <li key={beneficio} className="flex items-center whitespace-nowrap">
          <span className="px-5 lg:px-7 text-xs lg:text-sm font-semibold uppercase tracking-wider text-arbell-dark">
            {beneficio}
          </span>
          <span aria-hidden="true" className="text-arbell-accent">✦</span>
        </li>
      ))}
    </ul>
  )
}

// Cinta que se desliza en loop. Hay dos copias de la lista: el track se mueve -50% y vuelve a
// empezar sin corte. Se pausa en hover; con movimiento reducido queda quieta y se scrollea a mano.
export default function BenefitsTicker() {
  return (
    <section
      aria-label="Beneficios"
      className="group mt-8 lg:mt-12 border-y border-sky-100 bg-white/70 py-3 lg:py-4 overflow-hidden motion-reduce:overflow-x-auto custom-scroll [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TickerList />
        <TickerList hidden />
      </div>
    </section>
  )
}
