import { useEffect, useState } from 'react'
import { STORE_URL } from '../config.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div
        className={`page-container flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        <a
          aria-label="Arbell Inicio"
          className="flex items-center gap-1.5 rounded-lg transition-opacity duration-200 hover:opacity-80"
          href="#"
        >
          <img
            src="/images/logo.jpg"
            alt="Distribuidora Bellissima - Arbell"
            className="w-9 h-9 rounded-full object-cover border border-sky-200 shadow-xs"
          />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Distribuidora</span>
            <span className="text-sm font-extrabold text-arbell-blue tracking-tight">Bellissima</span>
          </div>
        </a>

        <div className="flex items-center space-x-2">
          <a
            className="group inline-flex items-center gap-1 bg-linear-to-r from-arbell-blue to-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm hover:shadow-md hover:shadow-arbell-blue/30 hover:brightness-110 active:scale-95 transition duration-200"
            href={STORE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Tienda</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
