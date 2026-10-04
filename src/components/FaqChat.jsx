import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { SECTION_IDS, TEAM_AVATAR } from '../config.js'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'
import TeamFaces from './TeamFaces.jsx'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
// Cuánto "escriben" antes de cada respuesta
const TYPING_MS = 800
// Después de cuántas respuestas llega el mensaje con el botón al formulario
const CTA_AFTER = 3

const { preguntas, chat } = PREGUNTAS_FRECUENTES

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

// Burbuja de ellas (izquierda, blanca, con mini foto)
function TheirBubble({ children }) {
  return (
    <div className="flex items-end gap-2 animate-[fade-up_300ms_var(--ease-soft)_backwards]">
      <img src={TEAM_AVATAR} alt="" className="shrink-0 w-7 h-7 rounded-full object-cover ring-2 ring-white" />
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-slate-700 leading-relaxed shadow-sm">
        {children}
      </div>
    </div>
  )
}

// Burbuja de quien pregunta (derecha, azul)
function MyBubble({ children }) {
  return (
    <div className="flex justify-end animate-[fade-up_300ms_var(--ease-soft)_backwards]">
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-arbell-blue px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-arbell-blue/20">
        {children}
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2" aria-hidden="true">
      <img src={TEAM_AVATAR} alt="" className="shrink-0 w-7 h-7 rounded-full object-cover ring-2 ring-white" />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="block w-1.5 h-1.5 rounded-full bg-slate-400 animate-typing" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  )
}

function goToForm() {
  const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
  document.getElementById(SECTION_IDS.formulario)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  document.getElementById('leadFullName')?.focus({ preventScroll: true })
}

// FAQ en formato conversación: saludo al entrar en pantalla, preguntas como respuestas rápidas,
// "escribiendo…" y la respuesta (corta en grande + completa). Después de 3 respuestas llega
// un mensaje con el botón al formulario. Con movimiento reducido no hay "escribiendo…".
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

  // Agrega un mensaje de ellas, con "escribiendo…" antes (salvo movimiento reducido)
  const reply = useCallback((message, onDone) => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
    if (!reduced) setTyping(true)
    timers.current.push(
      setTimeout(
        () => {
          setTyping(false)
          setMessages((prev) => [...prev, { id: nextId.current++, ...message }])
          onDone?.()
        },
        reduced ? 0 : TYPING_MS,
      ),
    )
  }, [])

  // El saludo llega la primera vez que el chat entra en pantalla
  useEffect(() => {
    if (!chatVisible) return
    const timer = setTimeout(() => reply({ from: 'them', type: 'saludo' }), 300)
    return () => clearTimeout(timer)
  }, [chatVisible, reply])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Baja solo al llegar un mensaje (scroll interno del chat, no de la página)
  useEffect(() => {
    const box = scrollRef.current
    if (!box) return
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
    box.scrollTo({ top: box.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, typing])

  function ask(index) {
    if (busy.current) return
    busy.current = true
    setAsked((prev) => (prev.includes(index) ? prev : [...prev, index]))
    setMessages((prev) => [...prev, { id: nextId.current++, from: 'me', index }])
    reply({ from: 'them', type: 'respuesta', index }, () => {
      answered.current += 1
      if (answered.current === CTA_AFTER) {
        reply({ from: 'them', type: 'cierre' }, () => {
          busy.current = false
        })
      } else {
        busy.current = false
      }
    })
  }

  return (
    <div ref={chatRef} className="flex flex-col h-[460px] lg:h-[520px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-arbell-dark/10">
      {/* Cabecera */}
      <div className="flex items-center gap-3 bg-arbell-blue px-4 py-3 text-white">
        <TeamFaces size="w-9 h-9" />
        <div className="leading-tight">
          <p className="text-sm font-bold">{chat.nombre}</p>
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <span aria-hidden="true" className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-300 opacity-60 animate-ping [animation-duration:2s] motion-reduce:hidden" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {chat.estado}
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="relative flex-1 min-h-0 bg-arbell-light/40">
        <DoodlePattern />
        <div ref={scrollRef} className="relative h-full overflow-y-auto px-4 py-5 space-y-3" aria-live="polite">
          {messages.map((message) => {
            if (message.from === 'me') {
              return <MyBubble key={message.id}>{preguntas[message.index].corta}</MyBubble>
            }
            if (message.type === 'saludo') {
              return <TheirBubble key={message.id}>{chat.saludo}</TheirBubble>
            }
            if (message.type === 'cierre') {
              return (
                <TheirBubble key={message.id}>
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
              <TheirBubble key={message.id}>
                <p className="text-lg font-extrabold text-slate-900 leading-snug">{rapida}</p>
                <p className="mt-1">{withLeadHighlight(respuesta)}</p>
              </TheirBubble>
            )
          })}
          {typing && <TypingBubble />}
        </div>
      </div>

      {/* Respuestas rápidas: scroll horizontal en mobile, en varias líneas en desktop */}
      <div className="border-t border-slate-200 bg-white px-3 py-3">
        <ul aria-label={chat.preguntasLabel} className="flex gap-2 overflow-x-auto custom-scroll lg:flex-wrap lg:overflow-visible">
          {preguntas.map(({ corta }, index) => {
            const done = asked.includes(index)
            return (
              <li key={corta} className="shrink-0">
                <button
                  type="button"
                  onClick={() => ask(index)}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs sm:text-sm font-semibold transition duration-200 active:scale-95 ${
                    done
                      ? 'border-slate-200 text-slate-400 hover:border-arbell-blue/40 hover:text-arbell-blue'
                      : 'border-arbell-blue/50 text-arbell-blue hover:bg-arbell-blue hover:text-white'
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
