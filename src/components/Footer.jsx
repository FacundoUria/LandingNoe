import { STORE_URL } from '../config.js'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-8 pb-16 text-center text-slate-500">
      <div className="page-container">
        <div className="flex flex-col items-center gap-4 mb-6 lg:flex-row lg:justify-between lg:mb-0 lg:text-left">
          <div className="flex flex-col items-center lg:flex-row lg:gap-3">
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

          <a
            className="link-underline rounded-sm text-xs lg:text-sm font-medium text-slate-400 hover:text-arbell-blue"
            href={STORE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Tienda
          </a>
        </div>

        <div className="text-[11px] lg:text-xs text-slate-400 lg:mt-8 lg:pt-6 lg:border-t lg:border-slate-100">
          © {new Date().getFullYear()} Distribuidora Bellissima · Distribuidora independiente de Arbell
        </div>
      </div>
    </footer>
  )
}
