import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { PREGUNTAS_FRECUENTES } from '../content.js'
import { FAQ_ICONS } from './faqIcons.js'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Resalta el "No" o "Para nada" con el que empieza la respuesta
function withLeadHighlight(text) {
  const match = text.match(/^(No|Para nada)(?=[\s,.])/)
  if (!match) return text
  return (
    <>
      <strong className="font-semibold text-slate-900">{match[1]}</strong>
      {text.slice(match[1].length)}
    </>
  )
}

function ArrowIcon({ direction }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Detalle de una pregunta: modal centrado desde sm, panel que sube desde abajo en mobile.
// shown controla la animación de entrada/salida; el padre lo monta y desmonta.
// Foco atrapado adentro; Escape, click afuera o × cierran; flechas izquierda/derecha navegan.
export default function FaqDialog({ index, shown, onClose, onNavigate, onJoin }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const { preguntas, detalle } = PREGUNTAS_FRECUENTES
  const { icono, pregunta, respuesta } = preguntas[index]
  const total = preguntas.length

  // Al abrir, el foco va al botón de cerrar
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowLeft') {
        onNavigate(-1)
      } else if (event.key === 'ArrowRight') {
        onNavigate(1)
      } else if (event.key === 'Tab') {
        const focusables = [...panelRef.current.querySelectorAll(FOCUSABLE)]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNavigate])

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6">
      {/* Fondo: click afuera cierra */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-detalle-titulo"
        className={`relative w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white px-6 pt-4 pb-6 sm:p-8 shadow-2xl transition duration-300 ease-soft ${
          shown ? 'translate-y-0 sm:scale-100 sm:opacity-100' : 'translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0'
        }`}
      >
        {/* Manija del panel en mobile */}
        <span aria-hidden="true" className="sm:hidden block mx-auto mb-4 w-10 h-1.5 rounded-full bg-slate-200" />

        <div className="flex items-start justify-between gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-arbell-blue text-white shadow-lg shadow-arbell-blue/25">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
              <path d={FAQ_ICONS[icono]} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={detalle.cerrar}
            className="flex items-center justify-center w-10 h-10 -mr-2 -mt-1 rounded-full text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Cambia al navegar: se anuncia y entra con un fade corto */}
        <div key={index} aria-live="polite" className="mt-5 animate-[fade-up_350ms_var(--ease-soft)_backwards]">
          <p className="text-xs font-semibold text-arbell-blue">
            {index + 1} / {total}
          </p>
          <h2 id="faq-detalle-titulo" className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {pregunta}
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">{withLeadHighlight(respuesta)}</p>
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-arbell-blue/40 hover:bg-arbell-light/50 hover:text-arbell-blue active:scale-95"
          >
            <ArrowIcon direction="left" />
            {detalle.anterior}
          </button>
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-arbell-blue/40 hover:bg-arbell-light/50 hover:text-arbell-blue active:scale-95"
          >
            {detalle.siguiente}
            <ArrowIcon direction="right" />
          </button>
        </div>

        <button
          type="button"
          onClick={onJoin}
          className="group relative overflow-hidden mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-arbell-blue px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-arbell-blue/25 transition duration-200 hover:-translate-y-0.5 hover:bg-[#006bb4] hover:shadow-xl active:scale-95"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shine"
          />
          <span className="relative">{detalle.boton}</span>
          <svg className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}
