import { INSTAGRAM, TIKTOK } from '../config.js'
import { InstagramIcon, TikTokIcon } from './icons.jsx'

const CHANNELS = [
  {
    name: 'Instagram',
    caption: INSTAGRAM.handle,
    href: INSTAGRAM.url,
    ariaLabel: 'Instagram de Distribuidora Bellissima',
    Icon: InstagramIcon,
    badgeClass: 'bg-linear-to-tr from-yellow-300 via-red-500 to-arbell-blue',
    hoverClass: 'hover:border-pink-400 hover:shadow-pink-500/15',
  },
  {
    name: 'TikTok',
    caption: TIKTOK.handle,
    href: TIKTOK.url,
    ariaLabel: 'TikTok de Distribuidora Bellissima',
    Icon: TikTokIcon,
    badgeClass: 'bg-slate-900',
    hoverClass: 'hover:border-slate-900 hover:shadow-slate-900/15',
  },
]

export default function SocialSection() {
  return (
    <section className="page-container mt-10 mb-8 lg:mt-16 lg:mb-16">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 lg:p-8 lg:max-w-xl lg:mx-auto shadow-xs text-center">
        <span className="text-[11px] font-bold text-arbell-blue uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full">
          ¡Conectemos!
        </span>
        <h3 className="text-base lg:text-xl font-extrabold text-slate-900 mt-2 lg:mt-3 mb-1">Seguinos en nuestras redes</h3>
        <p className="text-xs lg:text-sm text-slate-500 mb-4 lg:mb-6">Novedades, lanzamientos y consejos diarios para tu negocio.</p>

        <div className="grid grid-cols-2 gap-2.5 lg:gap-4">
          {CHANNELS.map(({ name, caption, href, ariaLabel, Icon, badgeClass, hoverClass }) => (
            <a
              key={name}
              aria-label={ariaLabel}
              className={`group flex flex-col items-center justify-center min-w-0 p-3 lg:p-5 rounded-2xl bg-linear-to-b from-sky-50 to-slate-50 border border-slate-200/80 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${hoverClass}`}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${badgeClass} flex items-center justify-center text-white mb-1.5 shadow-sm transition-transform duration-200 group-hover:scale-110`}>
                <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-xs lg:text-sm font-bold text-slate-800">{name}</span>
              <span className="text-[10px] lg:text-xs text-slate-500 max-w-full leading-tight wrap-anywhere">{caption}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
