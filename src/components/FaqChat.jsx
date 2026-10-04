import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { SECTION_IDS, TEAM_AVATAR } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import HandUnderline from './HandUnderline.jsx'
import TeamFaces from './TeamFaces.jsx'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
// Cuánto "escriben" antes de cada respuesta
const TYPING_MS = 800
// Cuánto tarda el doble check en pasar a "leído"
const READ_MS = 450
// Pausa entre el saludo y la pregunta de demostración
const DEMO_DELAY_MS = 900
// Después de cuántas respuestas a preguntas propias llega el mensaje con el botón al formulario
const CTA_AFTER = 3

const { preguntas, chat } = PREGUNTAS_FRECUENTES
const isReduced = () => window.matchMedia(REDUCED_MOTION_QUERY).matches
const now = () => new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })

// Resalta el "No" o "Para nada" con el que empieza la respuesta
function withLeadHighlight(text) {
  const match = text.match(/^(No|Para nada)(?=[\s,.])/)
  if (!match) return text
  return (
    <>
      <strong className="font-semibold text-slate-800">{match[1]}</strong>
      {text.slice(match[1].length)}
    </>
  )
}

// Fondo del chat: destellos y corazones del set de doodles, casi transparentes
function DoodlePattern() {
  const id = useId()
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full text-arbell-blue opacity-[0.06]">
      <defs>
        <pattern id={id} width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path transform="translate(10 12) scale(0.5)" d="M24 4C25.6 15.5 28.5 20.6 44 23.6C29.2 26.1 25.9 30.4 24.3 44C22.5 30.8 19.4 26.7 4 24.3C18.7 21.4 22.1 16.3 24 4Z" />
            <path transform="translate(70 64) scale(0.55)" d="M24.5 40.5C14.5 33 6.2 26.4 6.6 17.8C7 11.2 13.4 7.6 18.6 10.1C21.6 11.6 23.1 14.1 24.1 16.6C25.6 13.1 28.2 10.1 32.6 9.6C38.6 9 42.7 14.1 41.6 20.2C40.4 27.6 32.8 33.4 22.8 41.8" />
            <path transform="translate(78 8) scale(0.3)" d="M24 4C25.6 15.5 28.5 20.6 44 23.6C29.2 26.1 25.9 30.4 24.3 44C22.5 30.8 19.4 26.7 4 24.3C18.7 21.4 22.1 16.3 24 4Z" />
            <path transform="translate(14 78) scale(0.35)" d="M24.5 40.5C14.5 33 6.2 26.4 6.6 17.8C7 11.2 13.4 7.6 18.6 10.1C21.6 11.6 23.1 14.1 24.1 16.6C25.6 13.1 28.2 10.1 32.6 9.6C38.6 9 42.7 14.1 41.6 20.2C40.4 27.6 32.8 33.4 22.8 41.8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

// Colita de la burbuja (abajo, del lado de quien habla)
function Tail({ side }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`absolute bottom-0 w-3 h-3 ${side === 'left' ? '-left-2.5 text-white' : '-right-2.5 -scale-x-100 text-arbell-blue'}`}
      fill="currentColor"
    >
      <path d="M12 0V12H0C5.5 11 10 7.5 12 0Z" />
    </svg>
  )
}

function DoubleCheck({ read }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 16"
      className={`w-4 h-3 transition-colors duration-300 ${read ? 'text-arbell-accent' : 'text-white/50'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 8.5L5.5 12.5L13 3.5" />
      <path d="M9.5 12.5L17 3.5" />
    </svg>
  )
}

// Burbuja de ellas: izquierda, blanca, con mini foto; entra con un "pop" desde su lado
function TheirBubble({ time, children }) {
  return (
    <div className="flex items-end gap-2.5 origin-bottom-left animate-bubble-in">
      <img src={TEAM_AVATAR} alt="" className="shrink-0 w-7 h-7 rounded-full object-cover ring-2 ring-white" />
      <div className="relative max-w-[82%] rounded-2xl rounded-bl-sm bg-white px-4 pt-2.5 pb-1.5 text-sm text-slate-700 leading-relaxed shadow-sm">
        <Tail side="left" />
        {children}
        <span className="mt-1 block text-right text-[10px] text-slate-400">{time}</span>
      </div>
    </div>
  )
}

// Burbuja de quien pregunta: derecha, azul, con hora y doble check
function MyBubble({ time, read, children }) {
  return (
    <div className="flex justify-end origin-bottom-right animate-bubble-in">
      <div className="relative max-w-[80%] rounded-2xl rounded-br-sm bg-arbell-blue px-4 pt-2 pb-1.5 text-sm font-medium text-white shadow-sm shadow-arbell-blue/20">
        <Tail side="right" />
        {children}
        <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-white/70">
          {time}
          <DoubleCheck read={read} />
        </span>
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2.5 origin-bottom-left animate-bubble-in" aria-hidden="true">
      <img src={TEAM_AVATAR} alt="" className="shrink-0 w-7 h-7 rounded-full object-cover ring-2 ring-white" />
      <div className="relative flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 shadow-sm">
        <Tail side="left" />
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  )
}

function goToForm() {
  document.getElementById(SECTION_IDS.formulario)?.scrollIntoView({ behavior: isReduced() ? 'auto' : 'smooth' })
  document.getElementById('leadFullName')?.focus({ preventScroll: true })
}

// FAQ en formato conversación. Al entrar en pantalla llega el saludo y el chat hace solo una
// pregunta de demostración, para que se entienda cómo funciona. Cada pregunta: burbuja propia,
// "escribiendo…" y la respuesta (corta subrayada a mano + completa). Después de 3 preguntas
// propias llega un mensaje con el botón al formulario. Con movimiento reducido: sin demo ni
// "escribiendo…", las respuestas aparecen directo.
export default function FaqChat() {
  const [chatRef, chatVisible] = useReveal({ threshold: 0.3 })
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [asked, setAsked] = useState([])
  const scrollRef = useRef(null)
  const timers = useRef([])
  const nextId = useRef(0)
  const answered = useRef(0)
  const busy = useRef(false)
  const userAsked = useRef(false)

  const later = useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  const push = useCallback((message) => {
    const id = nextId.current++
    setMessages((prev) => [...prev, { id, time: now(), ...message }])
    return id
  }, [])

  // Mensaje de ellas, con "escribiendo…" antes (salvo movimiento reducido)
  const reply = useCallback(
    (message, onDone) => {
      const reduced = isReduced()
      if (!reduced) setTyping(true)
      later(
        () => {
          setTyping(false)
          push({ from: 'them', ...message })
          onDone?.()
        },
        reduced ? 0 : TYPING_MS,
      )
    },
    [later, push],
  )

  // demo: la pregunta automática del principio no cuenta para el mensaje del formulario
  const ask = useCallback(
    (index, { demo = false } = {}) => {
      if (busy.current) return
      busy.current = true
      setAsked((prev) => (prev.includes(index) ? prev : [...prev, index]))
      const id = push({ from: 'me', index, read: false })
      later(() => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m))), isReduced() ? 0 : READ_MS)
      reply({ type: 'respuesta', index }, () => {
        if (!demo) answered.current += 1
        if (!demo && answered.current === CTA_AFTER) {
          reply({ type: 'cierre' }, () => {
            busy.current = false
          })
        } else {
          busy.current = false
        }
      })
    },
    [later, push, reply],
  )

  // La primera vez que el chat entra en pantalla: saludo y, sin movimiento reducido, la demo
  useEffect(() => {
    if (!chatVisible) return
    const timer = setTimeout(() => {
      busy.current = true
      reply({ type: 'saludo' }, () => {
        busy.current = false
        if (!isReduced()) later(() => !userAsked.current && ask(0, { demo: true }), DEMO_DELAY_MS)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [chatVisible, reply, ask, later])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Baja solo al llegar un mensaje (scroll interno del chat, no de la página)
  useEffect(() => {
    const box = scrollRef.current
    if (!box) return
    box.scrollTo({ top: box.scrollHeight, behavior: isReduced() ? 'auto' : 'smooth' })
  }, [messages, typing])

  return (
    <div ref={chatRef} className="flex flex-col h-[460px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
      {/* Cabecera */}
      <div className="flex items-center gap-3 bg-linear-to-r from-arbell-dark to-arbell-blue px-4 py-3 text-white">
        <TeamFaces size="w-9 h-9" ring="ring-emerald-400" />
        <div className="flex-1 leading-tight">
          <p className="text-sm font-bold">{chat.nombre}</p>
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <span aria-hidden="true" className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-300 opacity-60 animate-ping [animation-duration:2s] motion-reduce:hidden" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {chat.estado}
          </p>
        </div>
        {/* Íconos decorativos de llamada y menú */}
        <div aria-hidden="true" className="flex items-center gap-3 text-white/60">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </div>
      </div>

      {/* Mensajes */}
      <div className="relative flex-1 min-h-0 bg-arbell-light/40">
        <DoodlePattern />
        <div ref={scrollRef} className="relative h-full overflow-y-auto overflow-x-hidden px-4 py-5 space-y-3" aria-live="polite">
          {messages.map((message) => {
            if (message.from === 'me') {
              return (
                <MyBubble key={message.id} time={message.time} read={message.read}>
                  {preguntas[message.index].corta}
                </MyBubble>
              )
            }
            if (message.type === 'saludo') {
              return (
                <TheirBubble key={message.id} time={message.time}>
                  {chat.saludo}
                </TheirBubble>
              )
            }
            if (message.type === 'cierre') {
              return (
                <TheirBubble key={message.id} time={message.time}>
                  <p>{chat.cierre}</p>
                  <button
                    type="button"
                    onClick={goToForm}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-arbell-blue px-4 py-2 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-arbell-dark active:scale-95"
                  >
                    {chat.cierreBoton}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </TheirBubble>
              )
            }
            const { rapida, respuesta } = preguntas[message.index]
            return (
              <TheirBubble key={message.id} time={message.time}>
                <p className="text-lg font-extrabold text-slate-900 leading-snug">
                  <HandUnderline text={`**${rapida}**`} delay={250} />
                </p>
                <p className="mt-1.5">{withLeadHighlight(respuesta)}</p>
              </TheirBubble>
            )
          })}
          {typing && <TypingBubble />}
        </div>
      </div>

      {/* Barra inferior: "escribir mensaje" decorativo y las preguntas como respuestas rápidas */}
      <div className="border-t border-slate-200 bg-white px-3 pt-3 pb-3">
        <div aria-hidden="true" className="flex items-center gap-2">
          <div className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-400">{chat.placeholder}</div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-arbell-blue text-white shadow-sm shadow-arbell-blue/30">
            <svg className="w-4 h-4 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </div>
        </div>

        <ul aria-label={chat.preguntasLabel} className="mt-3 flex gap-2 overflow-x-auto custom-scroll lg:flex-wrap lg:overflow-visible">
          {preguntas.map(({ corta }, index) => {
            const done = asked.includes(index)
            return (
              <li key={corta} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    userAsked.current = true
                    ask(index)
                  }}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-arbell-blue/30 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-arbell-blue transition duration-200 hover:border-arbell-blue hover:bg-arbell-blue hover:text-white hover:opacity-100 active:scale-95 ${
                    done ? 'opacity-55' : ''
                  }`}
                >
                  {done && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {corta}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
