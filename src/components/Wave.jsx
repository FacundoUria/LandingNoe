// Onda como la del borde inferior del hero. Rellena con currentColor la parte de abajo del SVG;
// con flip se invierte para usarla en el borde superior de una sección.
export default function Wave({ className = '', flip = false }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 w-full h-8 md:h-12 lg:h-16 ${flip ? '-scale-y-100' : ''} ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path d="M0 70C180 110 360 120 600 92C840 64 1020 20 1200 26C1320 30 1390 48 1440 60V120H0Z" />
    </svg>
  )
}
