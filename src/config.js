// Links y datos de contacto de la landing. Editá acá para cambiarlos en todo el sitio.

export const STORE_URL = 'https://miarbell.com.ar/tienda-arbell/?id=192390'

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

// Foto del hero. Mientras sea null se muestra un fondo decorativo.
// Cuando esté la foto real: guardala en public/images/ y poné acá su ruta, ej. '/images/hero.jpg'
export const HERO_IMAGE = null

export function whatsappUrl(message = WHATSAPP.defaultMessage) {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`
}
