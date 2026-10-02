import { whatsappUrl } from '../config.js'
import { WhatsAppIcon } from './icons.jsx'

export default function WhatsAppFloat() {
  return (
    <aside className="fixed bottom-4 right-4 z-50 flex items-center">
      <a
        aria-label="Contactar a una asesora por WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-90 transition duration-200"
        href={whatsappUrl()}
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Tooltip: solo desktop, aparece con hover o foco de teclado */}
        <span
          aria-hidden="true"
          className="hidden lg:block absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none opacity-0 translate-x-1 transition duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
        >
          ¿Hablamos?
        </span>
        <span className="absolute top-0 right-0 flex w-3.5 h-3.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping motion-reduce:hidden" />
          <span className="relative w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
        </span>
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </aside>
  )
}
