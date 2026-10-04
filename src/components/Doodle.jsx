import { useReveal } from '../hooks/useReveal.js'

// Dibujos a mano de la identidad del flyer: trazo irregular tipo marcador, sin relleno.
const SHAPES = {
  // Destello de 4 puntas
  sparkle: {
    viewBox: '0 0 48 48',
    paths: ['M24 4C25.6 15.5 28.5 20.6 44 23.6C29.2 26.1 25.9 30.4 24.3 44C22.5 30.8 19.4 26.7 4 24.3C18.7 21.4 22.1 16.3 24 4Z'],
  },
  // Corazón con el trazo que no termina de cerrar
  heart: {
    viewBox: '0 0 48 48',
    paths: ['M24.5 40.5C14.5 33 6.2 26.4 6.6 17.8C7 11.2 13.4 7.6 18.6 10.1C21.6 11.6 23.1 14.1 24.1 16.6C25.6 13.1 28.2 10.1 32.6 9.6C38.6 9 42.7 14.1 41.6 20.2C40.4 27.6 32.8 33.4 22.8 41.8'],
  },
  // Flecha curva que apunta a la derecha
  arrow: {
    viewBox: '0 0 80 48',
    paths: ['M5 9C14 27 32 40 64 34', 'M54 25.5L66 33.5L55.5 42.5'],
  },
  // Garabato tipo espiral
  spiral: {
    viewBox: '0 0 48 48',
    paths: ['M25 24.5C27 23.5 28.6 25.6 27.6 27.5C26.2 30 21.8 29.6 20.8 26.6C19.4 22.6 23.2 18.9 27.4 19.4C33 20 35.6 25.8 33.6 30.6C31.2 36.4 23.6 38.4 18 35.6C11 32 10 22.6 14.2 16.8C18.8 10.4 28.4 9.4 35 13.4'],
  },
}

// Decorativo (aria-hidden, sin eventos). Se dibuja al entrar en pantalla, una sola vez.
// twinkle: después de dibujarse, titila muy lento (pensado para los destellos).
export default function Doodle({ type, className = '', delay = 0, twinkle = false, strokeWidth = 2.5 }) {
  const [ref, visible] = useReveal({ threshold: 0.5 })
  const { viewBox, paths } = SHAPES[type]
  const drawMs = 800 + (paths.length - 1) * 250

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none ${visible && twinkle ? 'animate-twinkle' : ''} ${className}`}
      style={{ animationDelay: `${delay + drawMs}ms` }}
    >
      {paths.map((d, index) => (
        <path
          key={d}
          d={d}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          className={visible ? 'animate-draw' : ''}
          style={{ animationDelay: `${delay + index * 250}ms` }}
        />
      ))}
    </svg>
  )
}
