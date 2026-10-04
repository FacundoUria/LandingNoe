import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS, STORE_URL } from '../config.js'
import { NAV } from '../content.js'

const SECTION_LINKS = [
  { id: SECTION_IDS.quienesSomos, label: NAV.quienesSomos },
  { id: SECTION_IDS.preguntasFrecuentes, label: NAV.preguntasFrecuentes },
]

function StoreIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const STORE_BUTTON_CLASS =
  'group inline-flex items-center gap-1.5 bg-linear-to-r from-arbell-blue to-sky-500 text-white font-bold rounded-full shadow-sm hover:shadow-md hover:shadow-arbell-blue/30 hover:brightness-110 active:scale-95 transition duration-200'

// Scroll spy: devuelve el id de la sección que cruza la franja central de la pantalla
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target
          setActiveId((current) => (entry.isIntersecting ? id : current === id ? null : current))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

const SECTION_LINK_IDS = SECTION_LINKS.map(({ id }) => id)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(SECTION_LINK_IDS)
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstMenuLinkRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Menú mobile abierto: foco al primer link, cierre con Escape o tocando afuera
  useEffect(() => {
    if (!menuOpen) return

    firstMenuLinkRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // Links del panel mobile: aparecen escalonados al abrir
  const menuItemClass = (index) => ({
    className: `transition duration-300 ease-soft ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'}`,
    style: { transitionDelay: menuOpen ? `${80 + index * 60}ms` : '0ms' },
  })

  return (
    // El header ocupa siempre h-16 en el flujo (sin saltos de layout); al scrollear se achica
    // solo la barra visible y el resto queda transparente y sin capturar clics.
    <header ref={headerRef} className="sticky top-0 z-40 h-16 pointer-events-none">
      <div
        className={`relative pointer-events-auto bg-white/95 backdrop-blur-md border-b border-slate-100 transition-[height,box-shadow] duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        } ${scrolled || menuOpen ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="page-container h-full flex items-center justify-between gap-3">
          <a
            aria-label="Distribuidora Bellissima - Inicio"
            className="flex items-center gap-1.5 rounded-lg transition-opacity duration-200 hover:opacity-80"
            href="#"
          >
            <img
              src="/images/logo.jpg"
              alt=""
              className="w-9 h-9 rounded-full object-cover border border-sky-200 shadow-xs"
            />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Distribuidora</span>
              <span className="text-sm font-extrabold text-arbell-blue tracking-tight">Bellissima</span>
            </div>
          </a>

          {/* Desktop */}
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-7">
            {SECTION_LINKS.map(({ id, label }) => {
              const active = activeId === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`link-underline rounded-sm text-sm font-semibold hover:text-arbell-blue ${
                    active ? 'text-arbell-blue' : 'text-slate-600'
                  }`}
                >
                  {label}
                </a>
              )
            })}
            <a className={`${STORE_BUTTON_CLASS} text-sm px-4 py-2`} href={STORE_URL} rel="noopener noreferrer" target="_blank">
              {NAV.tiendaLargo}
              <StoreIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </nav>

          {/* Mobile y tablet */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a className={`${STORE_BUTTON_CLASS} text-xs px-3 py-1.5`} href={STORE_URL} rel="noopener noreferrer" target="_blank">
              {NAV.tiendaCorto}
              <StoreIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-slate-700 transition-colors duration-200 hover:bg-slate-100 active:bg-slate-200"
            >
              {/* Hamburguesa → X: las líneas de arriba y abajo giran hacia el centro */}
              <span aria-hidden="true" className="relative block w-5 h-4">
                <span
                  className={`absolute left-0 top-0 block w-5 h-0.5 rounded-full bg-current transition duration-300 ease-soft ${
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block w-5 h-0.5 rounded-full bg-current transition duration-200 ${
                    menuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 block w-5 h-0.5 rounded-full bg-current transition duration-300 ease-soft ${
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <nav
          id="menu-mobile"
          aria-label="Menú"
          className={`lg:hidden absolute inset-x-0 top-full bg-white border-b border-slate-100 shadow-lg transition duration-300 ease-soft ${
            menuOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-3'
          }`}
        >
          <ul className="page-container py-2">
            {SECTION_LINKS.map(({ id, label }, index) => (
              <li key={id} {...menuItemClass(index)}>
                <a
                  ref={index === 0 ? firstMenuLinkRef : undefined}
                  href={`#${id}`}
                  onClick={closeMenu}
                  className="block px-2 py-3 rounded-lg text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-arbell-blue"
                >
                  {label}
                </a>
              </li>
            ))}
            <li {...menuItemClass(SECTION_LINKS.length)}>
              <a
                href={STORE_URL}
                rel="noopener noreferrer"
                target="_blank"
                onClick={closeMenu}
                className="mt-1 flex items-center justify-between px-2 py-3 rounded-lg border-t border-slate-100 text-sm font-bold text-arbell-blue transition-colors duration-200 hover:bg-sky-50"
              >
                {NAV.tiendaLargo}
                <StoreIcon className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
