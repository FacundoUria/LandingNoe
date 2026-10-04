import { CATALOGO_URL, SECTION_IDS, STORE_URL, whatsappUrl } from '../config.js'
import { FOOTER, NAV } from '../content.js'

const EXTERNAL = { rel: 'noopener noreferrer', target: '_blank' }

const LINKS = [
  { label: FOOTER.links.tienda, href: STORE_URL, ...EXTERNAL },
  CATALOGO_URL && { label: FOOTER.links.catalogo, href: CATALOGO_URL, ...EXTERNAL },
  { label: NAV.quienesSomos, href: `#${SECTION_IDS.quienesSomos}` },
  { label: NAV.preguntasFrecuentes, href: `#${SECTION_IDS.preguntasFrecuentes}` },
  { label: FOOTER.links.contacto, href: whatsappUrl(), ...EXTERNAL },
].filter(Boolean)

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-8 pb-16 text-center text-slate-500">
      <div className="page-container">
        <div className="flex flex-col items-center gap-5 mb-6 lg:flex-row lg:justify-between lg:mb-0 lg:text-left">
          <div className="flex flex-col items-center lg:flex-row lg:gap-3">
            <img
              src="/images/logo.jpg"
              alt="Distribuidora Bellissima"
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover border-2 border-sky-200 shadow-md mb-2 lg:mb-0"
            />
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-base font-black text-slate-800 tracking-tight">Distribuidora Bellissima</span>
              <span className="text-[11px] font-medium text-arbell-blue uppercase tracking-wider">{FOOTER.bajada}</span>
            </div>
          </div>

          <nav aria-label="Enlaces del pie">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs lg:text-sm font-medium text-slate-500">
              {LINKS.map(({ label, ...linkProps }, index) => (
                <li key={label} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true" className="text-slate-300">·</span>}
                  <a className="link-underline rounded-sm hover:text-arbell-blue" {...linkProps}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="text-[11px] lg:text-xs text-slate-400 lg:mt-8 lg:pt-6 lg:border-t lg:border-slate-100">
          © {new Date().getFullYear()} {FOOTER.copyright}
        </div>
      </div>
    </footer>
  )
}
