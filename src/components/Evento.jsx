import { EVENTO, SECTION_IDS, whatsappUrl } from '../config.js'
import Reveal from './Reveal.jsx'
import { WhatsAppIcon } from './icons.jsx'

// El flyer de "Pausa & Glow" recreado en HTML, de arriba hacia abajo y centrado. La imagen
// original va solo como fondo desenfocado. Lo único que no está en el flyer es el botón de reservar.

const GOLD = '#e8c46a'
const SERIF = "font-['Playfair_Display',Georgia,serif] [font-feature-settings:'liga'_0,'calt'_0,'dlig'_0]"

// Flor de loto dorada del separador
function Lotus({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 4C19.5 9.5 19.5 19.5 24 26C28.5 19.5 28.5 9.5 24 4Z" />
      <path d="M24 26C18 25.5 13.2 20 12.6 12.5C18.4 13.6 22.4 18.6 24 26Z" />
      <path d="M24 26C30 25.5 34.8 20 35.4 12.5C29.6 13.6 25.6 18.6 24 26Z" />
      <path d="M24 26C16.5 28.5 8.5 25.8 4.5 19.5C11 18.4 18.4 20.8 24 26Z" />
      <path d="M24 26C31.5 28.5 39.5 25.8 43.5 19.5C37 18.4 29.6 20.8 24 26Z" />
    </svg>
  )
}

// Destello de 4 puntas (relleno)
function Sparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5C12.8 7.6 14.4 9.6 22.5 12C14.4 14.4 12.8 16.4 12 22.5C11.2 16.4 9.6 14.4 1.5 12C9.6 9.6 11.2 7.6 12 1.5Z" />
    </svg>
  )
}

function GiftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 8.5A1.5 1.5 0 014.5 7h15A1.5 1.5 0 0121 8.5V11H3V8.5zM4 12.5h7V21H5.5A1.5 1.5 0 014 19.5v-7zM13 12.5h7v7a1.5 1.5 0 01-1.5 1.5H13v-8.5z" />
      <path
        d="M12 7C10.6 4.2 7.6 2.6 6.4 4.1 5.2 5.6 7.8 7 12 7zm0 0c1.4-2.8 4.4-4.4 5.6-2.9C18.8 5.6 16.2 7 12 7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Línea dorada fina que se desvanece hacia afuera (from: lado del que viene)
function GoldLine({ from = 'left', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`h-px flex-1 ${from === 'left' ? 'bg-linear-to-r' : 'bg-linear-to-l'} from-transparent to-[#e8c46a] ${className}`}
    />
  )
}

export default function Evento() {
  if (!EVENTO.activa) return null

  return (
    <section
      id={SECTION_IDS.evento}
      aria-labelledby="evento-titulo"
      className="relative scroll-mt-16 bg-linear-to-b from-white via-arbell-light/60 to-white py-14 lg:py-24"
    >
      <div className="page-container">
        <Reveal
          as="article"
          className="relative isolate mx-auto max-w-[560px] overflow-hidden rounded-3xl px-5 py-10 text-center text-white shadow-[0_40px_80px_-30px_rgb(15_42_18/0.7)] sm:px-10 sm:py-12"
        >
          {/* Fondo: el flyer original muy desenfocado + capa verde oscura para leer el texto */}
          <img
            src={EVENTO.fondo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[24px]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0f2a12]/55" />

          <h2
            id="evento-titulo"
            className={`${SERIF} bg-linear-to-r from-[#f9a8d4] to-[#fbcfe8] bg-clip-text pb-2 text-[2.6rem] min-[400px]:text-5xl leading-[1.05] font-semibold italic text-transparent drop-shadow-[0_2px_6px_rgb(0_0_0/0.35)] sm:text-7xl`}
          >
            {EVENTO.titulo}
          </h2>
          <p className="mt-1 text-sm min-[400px]:text-base sm:text-xl font-medium text-balance [text-shadow:0_1px_6px_rgb(0_0_0/0.4)]">{EVENTO.bajada}</p>

          {/* Separador: dos líneas doradas con el loto al medio */}
          <div className="mt-5 flex items-center gap-3" style={{ color: GOLD }}>
            <GoldLine from="left" />
            <Lotus className="w-11 h-8 shrink-0" />
            <GoldLine from="right" />
          </div>

          <p className="mt-4 flex items-center justify-center gap-3">
            <span className={`${SERIF} text-[3.25rem] sm:text-7xl font-bold leading-none`} style={{ color: GOLD }}>
              {EVENTO.fechaDia}
            </span>
            <span className="text-left text-sm min-[400px]:text-base sm:text-2xl font-semibold leading-tight text-balance">
              {EVENTO.fechaTexto.replace(/ h$/, ' h')}
            </span>
          </p>

          <p className="mt-6 inline-block rounded-full border-2 bg-black/30 px-5 sm:px-6 py-2 text-sm min-[400px]:text-base sm:text-2xl font-semibold uppercase tracking-wide" style={{ borderColor: GOLD }}>
            {EVENTO.precio}
          </p>

          <p className="mx-auto mt-5 max-w-[22rem] text-[15px] sm:text-xl leading-snug">{EVENTO.notaPrecio}</p>

          <div className="mt-7 flex items-center justify-center gap-3" style={{ color: GOLD }}>
            <span className="relative shrink-0">
              <Sparkle className="absolute -left-3 -top-4 w-4 h-4" />
              <GiftIcon className="w-9 h-9 sm:w-11 sm:h-11" />
            </span>
            <p className={`${SERIF} text-left text-lg min-[400px]:text-xl sm:text-[1.75rem] font-bold italic uppercase leading-tight`}>
              {EVENTO.regalo}
              <Sparkle className="ml-1.5 inline-block w-4 h-4 align-baseline" />
            </p>
          </div>

          <ul className={`${SERIF} mt-7 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-[1.3rem] min-[400px]:text-[1.45rem] sm:text-[2.1rem] leading-tight`}>
            {EVENTO.destacados.map((item) => (
              <li key={item} className="flex items-center gap-2.5 sm:gap-3">
                <span aria-hidden="true" className="text-xl" style={{ color: GOLD }}>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-6 max-w-[30rem] text-[15px] sm:text-lg leading-snug">{EVENTO.incluye}</p>

          {/* Organiza: línea dorada · Organiza: · logo · línea dorada */}
          <div className="mt-8 flex items-center gap-3">
            <GoldLine from="left" />
            <span className={`${SERIF} text-xl min-[400px]:text-2xl sm:text-3xl italic font-semibold`}>{EVENTO.organiza}</span>
            <img
              src={EVENTO.logo}
              alt="Distribuidora Bellissima, Distribuidora Oficial Arbell"
              loading="lazy"
              className="w-20 h-20 min-[400px]:w-24 min-[400px]:h-24 sm:w-28 sm:h-28 shrink-0 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <GoldLine from="right" />
          </div>

          <p className="mt-6 text-[11px] sm:text-sm font-semibold uppercase tracking-wide text-balance">{EVENTO.lugar}</p>

          <a
            href={whatsappUrl(EVENTO.mensajeWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-[#0f2a12] shadow-lg shadow-black/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-xl active:scale-95 focus-visible:outline-white"
            style={{ backgroundColor: GOLD }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent animate-shine"
            />
            <WhatsAppIcon className="relative w-5 h-5" />
            <span className="relative">Reservar mi lugar</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
