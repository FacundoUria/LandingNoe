// Textos de la landing. Editá acá para cambiarlos sin tocar los componentes.

export const NAV = {
  quienesSomos: 'Quiénes somos',
  preguntasFrecuentes: 'Preguntas frecuentes',
  tiendaCorto: 'Ver tienda',
  tiendaLargo: 'Ver tienda online',
}

export const HERO = {
  badge: 'Emprendimiento de venta directa',
  // Lo que va entre **dobles asteriscos** lleva el subrayado dibujado a mano
  titulo: 'Multiplicá **tus ingresos** con Arbell Bellissima',
  texto:
    'Convertite en Asesora Independiente de la mano del equipo líder de Distribuidora Bellissima. Capacitación, soporte y un negocio a tu medida.',
  firma: 'Lideradas por Mary y Noe',
  // icono: ganancia o reloj (dibujos en Hero.jsx)
  items: [
    { icono: 'ganancia', texto: 'Importantes ganancias y premios' },
    { icono: 'reloj', texto: 'Flexibilidad horaria total' },
  ],
  botonPrincipal: 'Quiero sumarme',
  botonSecundario: 'Ver tienda online',
  imagenAlt: 'Mary y Noe, del equipo de Distribuidora Bellissima',
}

export const FORMULARIO = {
  // Panel azul (en mobile, franja arriba de la card)
  equipo: 'Te contactamos nosotras',
  titulo: 'Comenzá en 1 minuto',
  bajada: 'Completá tus datos para recibir asesoramiento personalizado.',
  ventajas: ['Respuesta por WhatsApp', 'Sin costo de inscripción', 'Sin compromiso'],
  progreso: 'Datos completos',
  servicioTitulo: 'Servicio de interés *',
  servicios: ['Emprender / Venta de productos', 'Asesoramiento personal', 'Comprar productos', 'Consulta general'],
  notaAgregar: '+ Agregar una nota (opcional)',
  notaOcultar: '− Ocultar nota',
  notaLabel: 'Nota',
  notaPlaceholder: 'Ej: Puedo recibir llamadas solo por la tarde',
  boton: 'Quiero unirme al equipo',
  botonEnviando: 'Abriendo WhatsApp...',
  aviso: 'Tus datos solo se usan para contactarte.',
  // Mensajes debajo de cada campo cuando falta o no es válido
  errores: {
    fullName: 'Ingresá tu nombre completo.',
    dni: 'Ingresá un DNI válido (7 u 8 números).',
    phone: 'Ingresá un teléfono válido, con código de área.',
    email: 'Ingresá un email válido, por ejemplo nombre@email.com.',
    address: 'Ingresá tu dirección.',
  },
}

export const POR_QUE_ELEGIRNOS = {
  titulo: '¿Por qué elegir Distribuidora Bellissima?',
  items: [
    { emoji: '👩‍🏫', texto: 'Capacitación constante' },
    { emoji: '🤝', texto: 'Apoyo de líderes' },
    { emoji: '📲', texto: 'Catálogo digital actualizado' },
  ],
}

export const QUIENES_SOMOS = {
  etiqueta: 'Quiénes somos',
  // Lo que va entre ** lleva el subrayado a mano
  titulo: 'Conocé **Bellissima**: tu Distribuidora Oficial Arbell',
  bajada: 'Pasión por la belleza, el bienestar integral y el crecimiento personal.',
  imagenAlt: 'Noe y Mary, líderes de Distribuidora Bellissima',
  // A la vista, al lado de la foto
  resumen: 'Somos Mary y Noe. Acercamos los productos Arbell a cada hogar y acompañamos a quienes quieren emprender.',
  datos: [
    { emoji: '🏅', texto: 'Distribuidora Oficial Arbell' },
    { emoji: '👭', texto: 'Lideradas por Mary y Noe' },
    { emoji: '🤝', texto: 'Acompañamiento diario' },
  ],
  botonHistoria: 'Conocé nuestra historia',
  botonHistoriaCerrar: 'Mostrar menos',
  historiaTitulo: 'Nuestra historia',
  // Se despliegan con el botón "Conocé nuestra historia". Lo que va entre **dobles asteriscos** se resalta en negrita.
  parrafos: [
    'En Bellissima creemos que **el cuidado personal y el éxito profesional van de la mano**. Como Distribuidora Oficial Arbell, nos dedicamos a acercar productos de belleza, salud y nutrición de máxima calidad a cada hogar, al mismo tiempo que abrimos puertas a personas que buscan transformar su realidad económica.',
    'Liderado por Mary y Noe, nuestro equipo combina experiencia, calidez y un acompañamiento constante para guiar a cada persona en su camino: ya sea eligiendo el mejor tratamiento para su bienestar o **construyendo un negocio propio, rentable y sin límites**.',
  ],
  porQue: {
    titulo: '¿Por qué Bellissima?',
    firma: '— Mary y Noe',
    texto:
      'En Bellissima elegimos ir un paso más allá. No somos solo una distribuidora que entrega productos: somos tus socias estratégicas, tus mentoras y tu red de soporte diario.',
  },
  beneficiosTitulo: 'Lo que encontrás con nosotras',
  // Tarjetas que giran. icono: megafono, apreton, birrete o dialogo; color: azul, rosa, dorado o verde
  // (dibujos y colores en AboutUs.jsx). gancho: frase corta del frente; texto: el dorso.
  beneficios: [
    {
      icono: 'megafono',
      color: 'azul',
      titulo: 'Estrategias y materiales de venta listos para usar',
      gancho: 'Contenido y recursos para publicar desde el día uno.',
      texto:
        'No te dejamos sola pensando qué publicar. Te brindamos recursos gráficos, ideas para redes sociales y estrategias probadas para que impulses tus ventas desde el primer día.',
    },
    {
      icono: 'apreton',
      color: 'rosa',
      titulo: 'Acompañamiento 1 a 1',
      gancho: 'Atención personalizada, nunca sos un número.',
      texto:
        'En nuestro equipo no sos un número de cuenta. Contás con la atención directa y personalizada de nosotras. Evaluamos tu punto de partida, escuchamos tus objetivos y diseñamos un plan a tu medida.',
    },
    {
      icono: 'birrete',
      color: 'dorado',
      titulo: 'Capacitación comercial continua',
      gancho: 'Ventas, atención al cliente y liderazgo.',
      texto:
        'Te formamos no solo en el conocimiento de las líneas de producto, sino en técnicas de venta, atención al cliente y desarrollo de liderazgo para que construyas una carrera sólida en Arbell.',
    },
    {
      icono: 'dialogo',
      color: 'verde',
      titulo: 'Asesoramiento técnico para compradores',
      gancho: 'Te ayudamos a armar tu rutina ideal.',
      texto:
        'Si buscás productos para tu consumo, te brindamos una consultoría personalizada para responder todas tus dudas y armar la rutina perfecta para vos y tu familia.',
    },
  ],
  cta: {
    titulo: '¿Querés emprender con nosotras?',
    bajada: 'Te acompañamos desde el primer día. Vos ponés las ganas, nosotras el resto.',
    datos: ['Sin experiencia previa', 'Inscripción gratuita', 'Sin pedido mínimo'],
    boton: 'Quiero sumarme',
  },
}

export const PREGUNTAS_FRECUENTES = {
  etiqueta: 'Preguntas frecuentes',
  titulo: 'Todo lo que querés saber antes de empezar',
  // Por pregunta: icono (bolsa, ganancia, billetera, etiqueta, birrete, celular, reloj o mensaje;
  // dibujos en Faq.jsx), corta y rapida (lo que se ve en la tarjeta) y pregunta/respuesta completas
  // (lo que se ve en el detalle). Si la respuesta completa empieza con "No" o "Para nada", se resalta.
  preguntas: [
    {
      icono: 'bolsa',
      corta: '¿Hay pedido mínimo?',
      rapida: 'Sin mínimo',
      pregunta: '¿Tengo que hacer un pedido mínimo para vender?',
      respuesta:
        'No, en Arbell no tenés ningún tipo de pedido mínimo obligatorio. Podés encargar desde un solo producto hasta la cantidad que tus clientes te pidan, vendiendo a tu propio ritmo y sin presiones.',
    },
    {
      icono: 'ganancia',
      corta: '¿Cuánto gano?',
      rapida: '30% a 60%',
      pregunta: '¿Cuál es el porcentaje de ganancia?',
      respuesta:
        'Empezás como Experta con entre un 30% y un 60% de ganancia sobre tus ventas. Además, a medida que avanzás en la carrera comercial (como Líder de Grupo o Distribuidora), tus ganancias y beneficios aumentan.',
    },
    {
      icono: 'billetera',
      corta: '¿Cuándo pago?',
      rapida: 'Al retirar',
      pregunta: '¿Cómo y cuándo se pagan los pedidos?',
      respuesta:
        'Los pedidos no se abonan por adelantado: se pagan directamente al momento de retirarlos por la distribuidora. De esta forma gestionás tus entregas de manera cómoda y segura.',
    },
    {
      icono: 'etiqueta',
      corta: '¿Cuesta sumarme?',
      rapida: '$0',
      pregunta: '¿Tiene algún costo sumarme o inscribirme?',
      respuesta:
        'No, registrarte para recibir asesoramiento e iniciar tu emprendimiento es totalmente gratuito. Te acompañamos para que puedas empezar con inversión cero y sin riesgos.',
    },
    {
      icono: 'birrete',
      corta: '¿Necesito experiencia?',
      rapida: 'No hace falta',
      pregunta: '¿Necesito tener experiencia previa en ventas?',
      respuesta:
        'Para nada. Te brindamos capacitación constante y el acompañamiento personalizado de nuestras líderes de equipo para que aprendas a tu ritmo y conozcas las mejores estrategias comerciales.',
    },
    {
      icono: 'celular',
      corta: '¿Cómo muestro?',
      rapida: 'Catálogo digital gratis',
      pregunta: '¿Cómo muestro los productos a mis clientes?',
      respuesta:
        'Contás con el catálogo digital y la tienda virtual gratis para compartir fácil y rápido por WhatsApp y redes sociales, además del catálogo impreso para vender de manera presencial.',
    },
    {
      icono: 'reloj',
      corta: '¿Tengo horarios?',
      rapida: 'Vos los elegís',
      pregunta: '¿Tengo horarios fijos o compromisos de tiempo?',
      respuesta:
        'No, contás con flexibilidad horaria total. Vos manejás tus propios tiempos desde el celular y decidís cuánto tiempo dedicarle a tu negocio.',
    },
    {
      icono: 'mensaje',
      corta: '¿Y después?',
      rapida: 'Te escribimos',
      pregunta: '¿Qué pasa después de completar el formulario?',
      respuesta:
        'Una vez que dejes tus datos, una de nuestras líderes de Distribuidora Bellissima te va a contactar por teléfono o WhatsApp para darte la bienvenida, resolver tus dudas y explicarte cómo hacer tu primer encargo.',
    },
  ],
  verDetalle: 'Ver detalle',
  // Detalle (modal en desktop, panel desde abajo en mobile)
  detalle: {
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    cerrar: 'Cerrar',
    boton: 'Quiero sumarme',
  },
  contacto: {
    titulo: '¿No encontrás tu respuesta?',
    boton: 'Escribinos por WhatsApp',
  },
}

export const COMO_EMPEZAR = {
  // Lo que va entre ** lleva el subrayado a mano
  titulo: '¿Cómo **empezar**?',
  bajada: 'En 3 pasos simples.',
  pasos: [
    { titulo: 'Completá el formulario', texto: 'Dejanos tus datos: te lleva menos de un minuto.' },
    { titulo: 'Te contactamos por WhatsApp', texto: 'Una de nuestras líderes te contacta por WhatsApp para darte la bienvenida.' },
    { titulo: 'Hacés tu primer encargo', texto: 'Sin pedido mínimo ni inversión inicial.' },
  ],
  boton: 'Quiero empezar',
}

export const REDES = {
  titulo: '¡Conectemos!',
}

export const FOOTER = {
  bajada: 'Belleza y bienestar • Arbell',
  links: {
    tienda: 'Tienda',
    catalogo: 'Catálogo vigente',
    contacto: 'Contacto',
  },
  copyright: 'Distribuidora Bellissima · Distribuidora Oficial de Arbell',
}
