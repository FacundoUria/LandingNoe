// Links y datos de contacto de la landing. Editá acá para cambiarlos en todo el sitio.

export const STORE_URL = 'https://miarbell.com.ar/tienda-arbell/?id=192390'

// Link al catálogo vigente. Mientras sea null, el link no aparece en el footer.
export const CATALOGO_URL = null

export const INSTAGRAM = {
  url: 'https://www.instagram.com/arbell.bellissima',
  handle: '@arbell.bellissima',
}

export const TIKTOK = {
  url: 'https://www.tiktok.com/@arbell.bellissima',
  handle: '@arbell.bellissima',
}

export const WHATSAPP = {
  number: '5492616600702',
  defaultMessage: 'Hola, vengo desde la página web',
}

// IDs de las secciones, usados por las anclas del header y el footer
export const SECTION_IDS = {
  formulario: 'formulario',
  evento: 'evento',
  quienesSomos: 'quienes-somos',
  preguntasFrecuentes: 'preguntas-frecuentes',
}

// Mostrar u ocultar la sección "Líneas de Productos"
export const SHOW_PRODUCTOS = false

// Líneas de productos. Por cada una:
// - imagen: ruta de una imagen en public/images/ (ej. '/images/facial.jpg'); con null se muestra el emoji
// - descripcion: texto breve que aparece debajo del nombre; vacío no muestra nada
export const PRODUCT_LINES = [
  { nombre: 'Cuidado Facial', emoji: '🌿', imagen: null, descripcion: '' },
  { nombre: 'Cuidado Corporal', emoji: '🧴', imagen: null, descripcion: '' },
  { nombre: 'Fragancias', emoji: '✨', imagen: null, descripcion: '' },
  { nombre: 'Maquillaje', emoji: '💄', imagen: null, descripcion: '' },
  { nombre: 'Suplementos & Té', emoji: '🌱', imagen: null, descripcion: '' },
  { nombre: 'Joyería & Bijou', emoji: '💍', imagen: null, descripcion: '' },
]

// Foto del hero. Con null se muestra solo el fondo azul.
// equipo-hero.jpg es equipo-recorte.jpg sin los carteles dibujados de "Noe" y "Mary" ni las flechas.
export const HERO_IMAGE = '/images/equipo-hero.jpg'

// Foto de la sección "Quiénes somos" (equipo.jpg sin el texto del flyer, con los nombres)
export const TEAM_IMAGE = '/images/equipo-recorte.jpg'

// Mini foto circular para la firma de "¿Por qué Bellissima?" (recorte cuadrado de las dos caras)
export const TEAM_AVATAR = '/images/equipo-avatar.jpg'

// Mini fotos circulares del formulario ("Te contactamos nosotras")
export const TEAM_FACES = [
  { src: '/images/equipo-mary.jpg', nombre: 'Mary' },
  { src: '/images/equipo-noe.jpg', nombre: 'Noe' },
]

// Aviso temporal en una franja arriba del header. Sin fecha de vencimiento: se muestra
// mientras activa sea true; para sacarlo, poné activa: false.
// texto: desktop/tablet; textoCorto: mobile (tiene que entrar en una línea junto al link).
export const PROMO = {
  activa: false,
  texto: '💐 Especial Día de la Madre: mirá el catálogo',
  textoCorto: '💐 Especial Día de la Madre',
  linkTexto: 'Ver catálogo →',
  url: 'https://catalogo.arbell.com.ar/especial-dia-de-la-madre/',
}

// Sección "Evento" (el flyer recreado en HTML, debajo del formulario) y su link en el header.
// Sin fecha de vencimiento: se muestra mientras activa sea true; para sacarla, poné activa: false.
export const EVENTO = {
  activa: true,
  titulo: 'Pausa & Glow',
  bajada: 'Un encuentro para calmar la mente y brillar',
  fechaDia: '28',
  fechaTexto: 'NOVIEMBRE - Desde las 17:00 h',
  precio: 'VALOR PREVENTA • $45.000',
  notaPrecio: 'Parte del valor de tu entrada se transforma en dinero ARBELL para canjear por productos',
  regalo: '¡CON TU ENTRADA DE REGALO UNA FRAGANCIA PREMIUM!',
  destacados: ['Automaquillaje', 'Snacks', 'Brindis', 'Sorteos'],
  incluye:
    'Incluye clase de yoga, snacks saludables, masterclass de automaquillaje y skincare, brindis final, regalos, sorteos, descuentos y mucho más por asistir',
  organiza: 'Organiza:',
  logo: '/images/logo.jpg',
  lugar: 'ESPACIO CLARK • J.Y. M. Clark 247, Ciudad de Mza',
  // El flyer original se usa solo como fondo desenfocado de la card
  fondo: '/images/evento-glow.webp',
  mensajeWhatsApp: '¡Hola! Quiero reservar mi lugar para Pausa & Glow del 28 de noviembre',
}

export function whatsappUrl(message = WHATSAPP.defaultMessage) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`
}
