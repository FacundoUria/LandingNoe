// Mini ilustraciones (solo HTML/CSS/SVG) del panel de "¿Por qué elegir Bellissima?".
// Cada una se anima al montarse; el padre la vuelve a montar cada vez que se activa el tema.
// Las animaciones parten de un estado "apagado" y terminan en el estado normal del elemento,
// así con movimiento reducido se ve directamente el resultado final.

const SPARKLE_PATH = 'M24 4C25.6 15.5 28.5 20.6 44 23.6C29.2 26.1 25.9 30.4 24.3 44C22.5 30.8 19.4 26.7 4 24.3C18.7 21.4 22.1 16.3 24 4Z'
const CHECK_PATH = 'M4.5 12.75l6 6 9-13.5'

// Materiales listos: 3 posteos en abanico que se abren como cartas
function Posteos() {
  const cards = [
    { x: '-58%', rotate: '-14deg', color: 'bg-pink-300', delay: 120 },
    { x: '0%', rotate: '0deg', color: 'bg-arbell-accent', delay: 0, sparkle: true },
    { x: '58%', rotate: '14deg', color: 'bg-amber-300', delay: 240 },
  ]
  return (
    <div className="relative w-40 lg:w-48 h-full">
      {cards.map(({ x, rotate, color, delay, sparkle }) => (
        <div
          key={rotate}
          className={`absolute left-1/2 top-1/2 -ml-8 -mt-10 lg:-ml-10 lg:-mt-12 w-16 h-20 lg:w-20 lg:h-24 rounded-lg bg-white p-1.5 shadow-lg shadow-black/25 origin-bottom animate-fan-in ${
            sparkle ? 'z-10' : ''
          }`}
          style={{ transform: `translateX(${x}) rotate(${rotate})`, animationDelay: `${delay}ms` }}
        >
          <div className={`relative h-1/2 rounded-md ${color}`}>
            {sparkle && (
              <svg className="absolute right-1 top-1 w-4 h-4 text-white" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d={SPARKLE_PATH} />
              </svg>
            )}
          </div>
          <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-slate-200" />
          <div className="mt-1 h-1.5 w-3/5 rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  )
}

// Acompañamiento 1 a 1: dos burbujas de chat que llegan una tras otra
function Chat({ textos }) {
  return (
    <div className="flex h-full w-full max-w-xs flex-col justify-center gap-2 text-xs lg:text-sm font-semibold">
      <div className="self-end rounded-2xl rounded-br-sm bg-white/90 px-3 py-2 text-slate-700 shadow-md origin-bottom-right animate-bubble-in [animation-delay:150ms]">
        {textos[0]}
      </div>
      <div className="self-start rounded-2xl rounded-bl-sm bg-arbell-accent px-3 py-2 text-white shadow-md origin-bottom-left animate-bubble-in [animation-delay:800ms]">
        {textos[1]}
      </div>
    </div>
  )
}

// Capacitación: un camino con 3 insignias que se van encendiendo
function Camino({ textos }) {
  return (
    <div className="relative flex h-full w-full max-w-sm items-center">
      <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-[30%] border-t-2 border-dashed border-white/30" />
      <ol className="relative grid w-full grid-cols-3">
        {textos.map((texto, index) => (
          <li key={texto} className="flex flex-col items-center gap-1.5 text-center">
            <span
              className="flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-amber-300 text-arbell-dark shadow-md animate-light-on"
              style={{ animationDelay: `${300 + index * 500}ms` }}
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d={SPARKLE_PATH} />
              </svg>
            </span>
            <span className="text-[11px] lg:text-xs font-semibold leading-tight text-white/90">{texto}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Asesoramiento: una mini rutina con checks que se tildan en orden
function Rutina({ textos }) {
  return (
    <ol className="flex h-full flex-col justify-center gap-1.5 lg:gap-2">
      {textos.map((texto, index) => {
        const delay = 250 + index * 450
        return (
          <li key={texto} className="flex items-center gap-2.5 text-xs lg:text-sm font-semibold text-white">
            <span
              className="flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 rounded-md bg-emerald-400 text-white animate-light-on"
              style={{ animationDelay: `${delay}ms` }}
            >
              <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={CHECK_PATH} pathLength="1" strokeDasharray="1" strokeDashoffset="1" className="animate-draw" style={{ animationDelay: `${delay + 150}ms` }} />
              </svg>
            </span>
            {texto}
          </li>
        )
      })}
    </ol>
  )
}

const ILLUSTRATIONS = { posteos: Posteos, chat: Chat, camino: Camino, rutina: Rutina }

export default function WhyIllustration({ tipo, textos }) {
  const Illustration = ILLUSTRATIONS[tipo]
  return Illustration ? <Illustration textos={textos} /> : null
}
