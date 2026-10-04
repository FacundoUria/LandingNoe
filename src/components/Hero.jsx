import { HERO_IMAGE, SECTION_IDS } from '../config.js'
import { HERO } from '../content.js'
import Doodle from './Doodle.jsx'
import HandUnderline from './HandUnderline.jsx'
import TeamFaces from './TeamFaces.jsx'

// Color de la pared azul de la foto: rellena el arco por encima de la imagen sin que se note el borde
const PHOTO_WALL = '#014e88'

// Óvalo dibujado a mano alrededor de cada nombre (como los del flyer). El trazo se dibuja con
// stroke-dashoffset en px de pantalla (non-scaling-stroke), después de que entra la foto.
function NameOval({ delay }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-2 -inset-y-1 w-[calc(100%+1rem)] h-[calc(100%+0.5rem)]"
      viewBox="0 0 300 100"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path
        d="M214 9C150 0 62 5 24 29C-8 50 18 89 122 95C222 100 302 80 293 45C285 16 228 6 158 9"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="1500"
        strokeDashoffset="1500"
        className="animate-draw-oval"
        style={{ animationDelay: `${delay}ms` }}
      />
    </svg>
  )
}

// Nombre a mano (Caveat) dentro de su óvalo, con una flecha curva hacia la persona
function HandName({ name, delay, className, arrowClassName }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <span
        className="relative inline-block px-3 font-hand text-2xl sm:text-3xl xl:text-4xl font-bold leading-none text-white animate-fade-up"
        style={{ animationDelay: `${delay - 150}ms` }}
      >
        <NameOval delay={delay} />
        {name}
      </span>
      <Doodle type="arrow" delay={delay + 500} strokeWidth={2.5} className={`absolute w-12 h-8 sm:w-14 sm:h-9 text-white ${arrowClassName}`} />
    </div>
  )
}

// Foto del equipo en un arco (como un portarretrato), con los nombres a mano afuera.
// La imagen (822×594) nunca se muestra más grande que su tamaño real: el arco mide como mucho
// 400 px de ancho y la foto se dibuja a ~0,75×. Se ubica abajo y centrada en las dos caras;
// arriba queda el azul de la pared, así las cabezas no tocan la curva del arco.
function HeroArch() {
  return (
    <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[360px] xl:max-w-[400px] animate-photo-in [animation-delay:200ms]">
      <div className="relative animate-float-y">
        {/* Detrás del arco: círculo difuminado y patrón de puntos */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-full bg-arbell-accent/20 blur-3xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 lg:w-52 lg:h-52 opacity-30 bg-[radial-gradient(circle,#fff_1.5px,transparent_2px)] bg-size-[14px_14px] [mask-image:radial-gradient(closest-side,#000,transparent)]"
        />

        <div
          className="relative aspect-[5/6] overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-white/15 shadow-2xl shadow-[#001a33]/50"
          style={{ backgroundColor: PHOTO_WALL }}
        >
          <img
            src={HERO_IMAGE}
            alt={HERO.imagenAlt}
            className="absolute bottom-0 left-[-17.75%] w-[154.25%] max-w-none [mask-image:linear-gradient(to_bottom,transparent,#000_8%)]"
          />
        </div>

        <HandName
          name="Noe"
          delay={1300}
          className="-left-[10%] -top-[3%]"
          arrowClassName="left-[10%] top-full mt-1 rotate-[70deg]"
        />
        <HandName
          name="Mary"
          delay={1600}
          className="-right-[12%] top-[2%]"
          arrowClassName="right-[8%] top-full mt-1 -scale-x-100 -rotate-[70deg]"
        />

        <Doodle type="sparkle" twinkle delay={1900} className="hidden sm:block absolute -left-[16%] top-[48%] w-10 h-10 text-amber-300" />
        <Doodle type="heart" delay={2100} className="hidden sm:block absolute -right-[13%] bottom-[10%] w-10 h-10 rotate-12 text-white/60" />
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#004b8d] via-[#0063ad] to-arbell-blue text-white">
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute -right-16 -top-20 w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-white/10 blur-2xl animate-float-slow will-change-transform" />
        <div className="absolute -left-12 top-40 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-sky-300/15 blur-xl animate-float-slower will-change-transform" />
      </div>

      <div className="page-container relative z-10 pt-8 pb-24 md:pb-28 lg:pt-20 lg:pb-40 lg:grid lg:grid-cols-[55fr_45fr] lg:gap-12 lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase mb-3.5 lg:mb-5 border border-white/25 animate-fade-up">
            <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{HERO.badge}</span>
          </div>

          <h1 className="text-[1.9rem] sm:text-4xl lg:text-6xl leading-[1.02] font-black tracking-tight text-balance mb-5 lg:mb-7 lg:max-w-xl [text-shadow:0_2px_12px_rgb(0_40_90/0.35)] animate-fade-up [animation-delay:80ms]">
            <HandUnderline text={HERO.titulo} delay={650} />
          </h1>

          {/* Nota firmada: tarjeta con cinta adhesiva, el texto y la firma a mano.
              Cae a su lugar después del título; en hover (desktop) se endereza un poco. */}
          <figure className="relative max-w-[440px] rounded-2xl bg-white p-[18px] text-slate-700 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.5)] -rotate-[0.8deg] lg:-rotate-[1.2deg] lg:hover:-rotate-[0.5deg] transition-[rotate] duration-500 ease-soft animate-note-in [animation-delay:200ms]">
            <span
              aria-hidden="true"
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-3 w-[70px] h-5 rounded-[2px] bg-[#fcd34d]/85 shadow-sm"
            />
            <p className="text-sm sm:text-base leading-relaxed">{HERO.texto}</p>
            <figcaption className="mt-3 flex items-center gap-2.5">
              <TeamFaces size="w-8 h-8" />
              <span className="font-hand text-2xl font-bold leading-none text-arbell-blue">{HERO.firma}</span>
            </figcaption>
          </figure>

          {/* Datos: dos columnas con línea fina arriba y separador, sin íconos ni cajas */}
          <dl className="mt-7 lg:mt-9 grid grid-cols-2 max-w-[440px] border-t border-white/25 pt-4 animate-fade-up [animation-delay:280ms]">
            {HERO.datos.map(({ titulo, texto }, index) => (
              <div key={titulo} className={index === 0 ? 'pr-4 sm:pr-5' : 'pl-4 sm:pl-5 border-l border-white/25'}>
                <dt className="text-base font-bold text-white">{titulo}</dt>
                <dd className="mt-0.5 text-sm text-sky-100">{texto}</dd>
              </div>
            ))}
          </dl>

          {/* Mobile/tablet: el arco va entre los datos y el botón */}
          {HERO_IMAGE && (
            <div className="lg:hidden mt-12 mb-4">
              <HeroArch />
            </div>
          )}

          {/* Botón al formulario: ancho completo en mobile */}
          <div className="mt-6 lg:mt-9 flex animate-fade-up [animation-delay:340ms]">
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
          </div>

        </div>

        {/* Desktop: el arco a la derecha */}
        {HERO_IMAGE && (
          <div className="hidden lg:block">
            <HeroArch />
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
