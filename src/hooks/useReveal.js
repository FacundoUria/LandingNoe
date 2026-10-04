import { useEffect, useRef, useState } from 'react'

const supportsObserver = () => typeof window !== 'undefined' && 'IntersectionObserver' in window

// Devuelve [ref, visible]. visible pasa a true la primera vez que el elemento entra
// en pantalla y no vuelve a false (el reveal ocurre una sola vez).
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => !supportsObserver())

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible, threshold, rootMargin])

  return [ref, visible]
}
