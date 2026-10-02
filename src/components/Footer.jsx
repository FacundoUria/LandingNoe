import { STORE_URL } from '../config.js'

const LINKS = [
  { label: 'Términos', href: 'https://arbell.com.ar' },
  { label: 'Privacidad', href: 'https://arbell.com.ar' },
  { label: 'Tienda Oficial', href: STORE_URL },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-8 pb-16 text-center text-slate-500">
      <div className="page-container">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12 lg:text-left">
          <div>
            <div className="flex flex-col items-center justify-center mb-4 lg:flex-row lg:justify-start lg:gap-3">
              <img
                src="/images/logo.jpg"
                alt="Distribuidora Bellissima"
                className="w-16 h-16 rounded-full object-cover border-2 border-sky-200 shadow-md mb-2 lg:mb-0"
              />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-base font-black text-slate-800 tracking-tight">Distribuidora Bellissima</span>
                <span className="text-[11px] font-medium text-arbell-blue uppercase tracking-wider">
                  Belleza y Bienestar • Arbell
                </span>
              </div>
            </div>

            <p className="text-xs lg:text-sm text-slate-400 mb-5 lg:mb-0 max-w-xs lg:max-w-md mx-auto lg:mx-0">
              Empresa argentina de venta directa cosmética, bienestar y desarrollo personal con más de 30 años acompañando a miles de familias.
            </p>
          </div>

          <nav
            aria-label="Enlaces del pie"
            className="flex items-center justify-center space-x-5 text-slate-400 text-xs lg:text-sm mb-6 lg:mb-0 font-medium"
          >
            {LINKS.map(({ label, href }, index) => (
              <span key={label} className="flex items-center space-x-5">
                {index > 0 && <span aria-hidden="true">•</span>}
                <a
                  className="link-underline rounded-sm hover:text-arbell-blue"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <div className="text-[11px] lg:text-xs text-slate-400 lg:mt-8 lg:pt-6 lg:border-t lg:border-slate-100 lg:text-center">
          © {new Date().getFullYear()} Arbell Oficial. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
