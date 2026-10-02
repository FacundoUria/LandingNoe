import { HERO_IMAGE } from '../config.js'

const BULLETS = ['Ganancias 100%', 'Manejá tus tiempos']

// Muestra la foto de config (HERO_IMAGE) o, si todavía no hay, un fondo decorativo.
function HeroVisual() {
  return (
    <div className="relative w-full h-36 md:h-48 lg:h-64 rounded-2xl overflow-hidden shadow-inner border border-white/20 mb-2 lg:mb-0">
      {HERO_IMAGE ? (
        <>
          <img
            alt="Emprendedora Arbell exitosa"
            className="w-full h-full object-cover object-right"
            src={HERO_IMAGE}
          />
          <div className="absolute inset-0 bg-linear-to-r from-arbell-blue/80 via-transparent to-transparent" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-arbell-accent/50 via-white/10 to-arbell-dark/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1.5px)] bg-size-[18px_18px]" />
          <div className="absolute -right-8 -bottom-10 w-40 h-40 lg:w-64 lg:h-64 rounded-full bg-white/15 blur-2xl" />
          <svg
            className="absolute right-5 top-1/2 -translate-y-1/2 w-20 h-20 lg:right-10 lg:w-32 lg:h-32 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
          >
            <path
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className="absolute bottom-2.5 left-3 lg:bottom-4 lg:left-4 bg-white/90 backdrop-blur-md py-1 px-2.5 rounded-lg">
        <p className="text-[11px] lg:text-xs font-bold text-arbell-dark">¡Más de 15.000 líderes activas!</p>
      </div>
    </div>
  )
}

// children: la card del formulario. En mobile/tablet se superpone al borde inferior
// del hero; desde lg queda dentro del hero, en la columna derecha.
export default function Hero({ children }) {
  return (
    <section className="relative overflow-x-clip text-white lg:py-16">
      <div className="page-container lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="relative pt-6 pb-24 lg:static lg:py-0">
          {/* Fondo: a todo el ancho detrás de esta columna en mobile, de toda la sección desde lg */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 lg:inset-0 lg:w-auto lg:translate-x-0 overflow-hidden bg-linear-to-b from-[#005a9e] via-arbell-blue to-[#0284c7] pointer-events-none"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-12 top-48 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-sky-300/15 blur-xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wide text-white uppercase mb-3.5 lg:mb-5 border border-white/25">
              <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Venta Directa &amp; Cosmética Emprendedora</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-2 lg:mb-4 animate-fade-up">
              Convertí tu tiempo en ingresos.
            </h1>
            <p className="text-sm lg:text-lg font-normal text-sky-100 leading-relaxed max-w-sm lg:max-w-lg mb-4 lg:mb-6 animate-fade-up [animation-delay:120ms]">
              Emprendé con arbell y empezá a crecer con confianza. Formá parte de la red de cosmética líder en bienestar.
            </p>

            <div className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium text-white/90 mb-5 lg:mb-8">
              {BULLETS.map((text) => (
                <span key={text} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {text}
                </span>
              ))}
            </div>

            <HeroVisual />
          </div>
        </div>

        <div className="relative z-20 -mt-20 lg:mt-0 text-slate-800 animate-fade-up [animation-delay:240ms]">{children}</div>
      </div>
    </section>
  )
}
