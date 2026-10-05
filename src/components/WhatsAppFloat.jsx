import { useEffect, useState } from 'react'
import { whatsappUrl } from '../config.js'
import { WhatsAppIcon } from './icons.jsx'

// Píxeles de scroll a partir de los cuales aparece el botón
const SHOW_AFTER_PX = 300

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(() => window.scrollY > SHOW_AFTER_PX)

  useEffect(() => {
    if (visible) return
    function handleScroll() {
      if (window.scrollY > SHOW_AFTER_PX) setVisible(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible])

  return (
    <aside
      className={`fixed bottom-4 right-4 z-50 flex items-center transition duration-500 ease-spring ${
        visible ? 'visible opacity-100 translate-y-0 scale-100' : 'invisible opacity-0 translate-y-6 scale-75'
      }`}
    >
      <a
        aria-label="Contactar a una Experta en Belleza por WhatsApp"
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
        {/* "Saludo" cada ~8s, solo una vez visible */}
        <span className={`block ${visible ? 'animate-wiggle' : ''}`}>
          <WhatsAppIcon className="w-7 h-7" />
        </span>
      </a>
    </aside>
  )
}
