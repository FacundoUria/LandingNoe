import { useState } from 'react'
import { PROMO } from '../config.js'

// Franja fina arriba del header con el aviso de config.js (PROMO). No es sticky: se va con el
// scroll y el header sticky queda arriba como siempre. Al cerrarla se pliega con transición de
// altura y no vuelve a aparecer en esta visita (estado en memoria; al recargar, vuelve).
export default function PromoBar() {
  const [open, setOpen] = useState(true)

  if (!PROMO.activa) return null

  return (
    <div
      inert={!open}
      className={`grid bg-[#fce7f3] transition-[grid-template-rows] duration-300 ease-soft ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
      <div className="overflow-hidden">
        <aside aria-label="Aviso" className="page-container relative flex h-9 items-center justify-center">
          <p className="flex min-w-0 items-center gap-2 whitespace-nowrap pr-8 text-xs sm:text-sm text-slate-800">
            <span className="sm:hidden">{PROMO.textoCorto}</span>
            <span className="hidden sm:inline">{PROMO.texto}</span>
            <a
              href={PROMO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline rounded-sm font-semibold text-[#be185d] hover:text-[#9d174d]"
            >
              {PROMO.linkTexto}
            </a>
          </p>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-slate-500 transition-colors duration-200 hover:bg-pink-200/70 hover:text-slate-800"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </aside>
      </div>
    </div>
  )
}
