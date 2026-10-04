import { TEAM_FACES } from '../config.js'

// Mini fotos circulares superpuestas de Mary y Noe. size: clases de ancho/alto (ej. "w-9 h-9");
// ring: color del anillo (por defecto blanco).
export default function TeamFaces({ size, ring = 'ring-white' }) {
  return (
    <div className="flex -space-x-3 shrink-0">
      {TEAM_FACES.map(({ src, nombre }) => (
        <img
          key={nombre}
          src={src}
          alt={nombre}
          loading="lazy"
          className={`${size} rounded-full object-cover ring-2 ${ring} shadow-md`}
        />
      ))}
    </div>
  )
}
