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

export function whatsappUrl(message = WHATSAPP.defaultMessage) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`
}
