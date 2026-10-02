import { STORE_URL } from '../config.js'

const CATEGORIES = [
  { emoji: '🌿', label: 'Cuidado Facial' },
  { emoji: '🧴', label: 'Cuidado Corporal' },
  { emoji: '✨', label: 'Fragancias' },
  { emoji: '💄', label: 'Maquillaje' },
  { emoji: '🌱', label: 'Suplementos & Té' },
  { emoji: '💍', label: 'Joyería & Bijou' },
]

export default function ProductCategories() {
  return (
    <section className="page-container mt-10 lg:mt-16">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <div>
          <h3 className="text-base lg:text-2xl font-bold text-slate-900">Líneas de Productos</h3>
          <p className="text-xs lg:text-sm text-slate-500">Más de 800 fórmulas de alta rotación</p>
        </div>
        <a
          className="group text-xs lg:text-sm font-semibold text-arbell-blue flex items-center gap-0.5 rounded-sm"
          href={STORE_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="link-underline">Ver todas</span>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* El padding con margen negativo deja lugar para la elevación y el foco sin que el scroll los recorte */}
      <div className="flex gap-2.5 overflow-x-auto custom-scroll -mx-1 px-1 pt-1 pb-3 text-xs md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:m-0 md:p-0 lg:gap-4 lg:text-sm">
        {CATEGORIES.map(({ emoji, label }) => (
          <a
            key={label}
            className="group shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200/80 font-medium text-slate-800 whitespace-nowrap shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-arbell-blue/40 hover:shadow-lg hover:shadow-arbell-blue/10 active:scale-[0.98] md:flex-row md:gap-3 lg:px-5 lg:py-4"
            href={STORE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span
              aria-hidden="true"
              className="flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-arbell-light text-xl lg:text-2xl transition duration-200 group-hover:bg-arbell-blue/10 group-hover:scale-105"
            >
              {emoji}
            </span>
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
