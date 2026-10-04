import { INSTAGRAM, TIKTOK } from '../config.js'
import { REDES } from '../content.js'
import { InstagramIcon, TikTokIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'

const CHANNELS = [
  {
    name: 'Instagram',
    href: INSTAGRAM.url,
    ariaLabel: `Instagram de Distribuidora Bellissima (${INSTAGRAM.handle})`,
    Icon: InstagramIcon,
    // Halo con el rosa de Instagram
    badgeClass: 'bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 hover:ring-pink-500/25 hover:shadow-pink-500/40',
  },
  {
    name: 'TikTok',
    href: TIKTOK.url,
    ariaLabel: `TikTok de Distribuidora Bellissima (${TIKTOK.handle})`,
    Icon: TikTokIcon,
    // Halo con el celeste de TikTok
    badgeClass: 'bg-slate-900 hover:ring-cyan-400/35 hover:shadow-cyan-400/40',
  },
]

export default function SocialSection() {
  return (
    <section aria-label="Redes sociales" className="page-container mt-14 mb-10 lg:mt-20 lg:mb-16">
      <Reveal className="flex items-center justify-center gap-4">
        <h2 className="text-lg lg:text-xl font-extrabold uppercase tracking-wide text-arbell-blue">{REDES.titulo}</h2>
        <ul className="flex items-center gap-3">
          {CHANNELS.map(({ name, href, ariaLabel, Icon, badgeClass }) => (
            <li key={name}>
              <a
                aria-label={ariaLabel}
                className={`flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-xl text-white shadow-sm ring-0 transition duration-300 ease-spring hover:scale-115 hover:-rotate-8 hover:ring-4 hover:shadow-lg active:scale-95 ${badgeClass}`}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
