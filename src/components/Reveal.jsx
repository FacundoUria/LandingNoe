import { useReveal } from '../hooks/useReveal.js'

// Envuelve un bloque para que aparezca con fade + subida al entrar en pantalla.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...props }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
