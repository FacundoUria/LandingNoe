import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { FORMULARIO } from '../content.js'
import { WhatsAppIcon } from './icons.jsx'
import TeamFaces from './TeamFaces.jsx'

const INITIAL_FORM = {
  fullName: '',
  dni: '',
  phone: '',
  email: '',
  address: '',
  service: FORMULARIO.servicios[0],
  notes: '',
}

const digits = (value) => value.replace(/\D/g, '')

// Reglas de los campos obligatorios de texto
const VALIDATORS = {
  fullName: (value) => value.trim().length >= 3,
  dni: (value) => /^[\d.\s]+$/.test(value.trim()) && [7, 8].includes(digits(value).length),
  phone: (value) => /^[\d\s+()-]+$/.test(value.trim()) && digits(value).length >= 8 && digits(value).length <= 15,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  address: (value) => value.trim().length >= 5,
}

// Íconos de línea (stroke) que van dentro de cada campo, a la izquierda
const ICON_PATHS = {
  user: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  id: 'M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z',
  phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
  mail: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  pin: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  lock: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  check: 'M4.5 12.75l6 6 9-13.5',
}

function LineIcon({ name, className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICON_PATHS[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Campos de texto obligatorios, en el orden del formulario.
// span: columnas que ocupa. Debajo de sm van todos a todo el ancho: con el ícono y el check
// adentro, a media columna no entraría el texto.
const TEXT_FIELDS = [
  { name: 'fullName', id: 'leadFullName', label: 'Nombre completo *', icon: 'user', type: 'text', autoComplete: 'name', placeholder: 'Ej: Juan Pérez', span: 'col-span-2' },
  { name: 'dni', id: 'leadDoc', label: 'DNI *', icon: 'id', type: 'text', inputMode: 'numeric', placeholder: 'Ej: 38.456.789', span: 'col-span-2 sm:col-span-1' },
  { name: 'phone', id: 'leadPhone', label: 'Teléfono / WhatsApp *', icon: 'phone', type: 'tel', autoComplete: 'tel', placeholder: 'Ej: 261 555-4321', span: 'col-span-2 sm:col-span-1' },
  { name: 'email', id: 'leadEmail', label: 'Email *', icon: 'mail', type: 'email', autoComplete: 'email', placeholder: 'Ej: juan.perez@email.com', span: 'col-span-2 sm:col-span-1' },
  { name: 'address', id: 'leadAddress', label: 'Dirección *', icon: 'pin', type: 'text', autoComplete: 'street-address', placeholder: 'Ej: Av. Las Heras 450, Mendoza', span: 'col-span-2 sm:col-span-1' },
]

function getErrors(form) {
  return TEXT_FIELDS.filter(({ name }) => !VALIDATORS[name](form[name])).map(({ name }) => name)
}

const LABEL_CLASS = 'block text-xs font-semibold text-slate-600 mb-1.5 truncate'
const FIELD_BASE_CLASS =
  'peer w-full min-w-0 h-12 pl-10 pr-10 text-sm rounded-xl border bg-white text-slate-800 placeholder:text-slate-400 outline-none transition duration-200 focus:ring-2'
const FIELD_OK_CLASS = 'border-slate-200 hover:border-slate-300 focus:border-arbell-blue focus:ring-arbell-blue/25'
const FIELD_ERROR_CLASS = 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/25'

// Cuánto dura el estado "Abriendo WhatsApp..." del botón
const SENDING_MS = 1500

function buildMessage(form) {
  const lines = [
    '¡Hola Distribuidora Bellissima! Les dejo mis datos:',
    '',
    `*Nombre completo:* ${form.fullName.trim()}`,
    `*DNI:* ${form.dni.trim()}`,
    `*Teléfono / WhatsApp:* ${form.phone.trim()}`,
    `*Email:* ${form.email.trim()}`,
    `*Dirección:* ${form.address.trim()}`,
    `*Servicio de interés:* ${form.service}`,
  ]
  const notes = form.notes.trim()
  if (notes) lines.push(`*Notas:* ${notes}`)
  lines.push('', '_Enviado desde el formulario de la página web._')
  return lines.join('\n')
}

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -mt-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-sm animate-check-in"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
        <path d={ICON_PATHS.check} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function TextField({ field, value, onChange, showError, shaking, onShakeEnd }) {
  const { name, id, label, icon, span, ...inputProps } = field
  const valid = VALIDATORS[name](value)
  const errorId = `${id}-error`

  return (
    <div
      className={`min-w-0 ${span} ${shaking ? 'animate-shake' : ''}`}
      onAnimationEnd={(event) => {
        if (event.animationName === 'shake') onShakeEnd(name)
      }}
    >
      <label className={LABEL_CLASS} htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          className={`${FIELD_BASE_CLASS} ${showError ? FIELD_ERROR_CLASS : FIELD_OK_CLASS}`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          {...inputProps}
        />
        {/* Va después del input para poder usar peer-focus */}
        <LineIcon
          name={icon}
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
            showError ? 'text-red-400' : 'text-slate-400 peer-focus:text-arbell-blue'
          }`}
        />
        {valid && <CheckIcon />}
      </div>
      {showError && (
        <p id={errorId} className="mt-1 text-[11px] leading-tight font-medium text-red-600">
          {FORMULARIO.errores[name]}
        </p>
      )}
    </div>
  )
}

export default function LeadForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  // Los errores se muestran recién después del primer intento de envío
  const [attempted, setAttempted] = useState(false)
  const [shaking, setShaking] = useState([])
  const [notesOpen, setNotesOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const sendingTimer = useRef(null)
  const notesRef = useRef(null)

  useEffect(() => () => clearTimeout(sendingTimer.current), [])

  const errors = attempted ? getErrors(form) : []
  const validCount = TEXT_FIELDS.length - getErrors(form).length
  const progress = validCount / TEXT_FIELDS.length

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleShakeEnd(name) {
    setShaking((prev) => prev.filter((fieldName) => fieldName !== name))
  }

  function toggleNotes() {
    const opening = !notesOpen
    setNotesOpen(opening)
    // Al abrir, el foco va al textarea (después de que deja de estar inert)
    if (opening) requestAnimationFrame(() => notesRef.current?.focus())
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (sending) return

    const invalid = getErrors(form)
    if (invalid.length > 0) {
      setAttempted(true)
      setShaking(invalid)
      const firstInvalid = TEXT_FIELDS.find(({ name }) => name === invalid[0])
      document.getElementById(firstInvalid.id)?.focus()
      return
    }

    window.open(whatsappUrl(buildMessage(form)), '_blank', 'noopener,noreferrer')
    setSending(true)
    sendingTimer.current = setTimeout(() => setSending(false), SENDING_MS)
  }

  return (
    <section
      id={SECTION_IDS.formulario}
      aria-label={FORMULARIO.titulo}
      className="page-container relative z-20 -mt-16 lg:-mt-24 scroll-mt-20 animate-fade-up [animation-delay:320ms]"
    >
      <div className="lg:max-w-5xl lg:mx-auto lg:grid lg:grid-cols-[2fr_3fr] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Panel azul: columna izquierda en desktop, franja arriba de la card en mobile/tablet */}
        <div className="relative overflow-hidden bg-linear-to-br from-arbell-dark to-arbell-blue text-white px-5 py-3.5 lg:p-10 lg:flex lg:flex-col lg:justify-center">
          <div aria-hidden="true" className="pointer-events-none">
            <div className="absolute -right-10 -top-10 w-32 h-32 lg:w-56 lg:h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="hidden lg:block absolute -left-12 -bottom-16 w-56 h-56 rounded-full bg-arbell-accent/20 blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <TeamFaces size="w-9 h-9 lg:w-12 lg:h-12" />
              <p className="text-sm lg:text-base font-semibold">{FORMULARIO.equipo}</p>
            </div>

            <div className="hidden lg:block">
              <h2 className="mt-8 text-3xl font-extrabold tracking-tight leading-tight">{FORMULARIO.titulo}</h2>
              <p className="mt-3 text-sky-100 leading-relaxed">{FORMULARIO.bajada}</p>
              <ul className="mt-8 space-y-3">
                {FORMULARIO.ventajas.map((ventaja) => (
                  <li key={ventaja} className="flex items-center gap-3 font-medium">
                    <span aria-hidden="true" className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 text-emerald-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path d={ICON_PATHS.check} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {ventaja}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="px-5 pt-5 pb-6 lg:px-10 lg:pt-9 lg:pb-9">
          <div className="lg:hidden text-center">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{FORMULARIO.titulo}</h2>
            <p className="text-xs text-slate-500">{FORMULARIO.bajada}</p>
          </div>

          {/* Progreso: campos obligatorios válidos sobre el total */}
          <div
            role="progressbar"
            aria-label={FORMULARIO.progreso}
            aria-valuemin={0}
            aria-valuemax={TEXT_FIELDS.length}
            aria-valuenow={validCount}
            className="mt-4 lg:mt-0 h-1.5 rounded-full bg-slate-100 overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-arbell-blue to-arbell-accent origin-left transition-transform duration-500 ease-soft"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          <form noValidate className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-x-4" onSubmit={handleSubmit}>
            {TEXT_FIELDS.map((field) => (
              <TextField
                key={field.name}
                field={field}
                value={form[field.name]}
                onChange={handleChange}
                showError={errors.includes(field.name)}
                shaking={shaking.includes(field.name)}
                onShakeEnd={handleShakeEnd}
              />
            ))}

            {/* Servicio de interés: radios nativos (teclado con flechas) estilizados como pastillas */}
            <fieldset className="col-span-2 min-w-0">
              <legend className={LABEL_CLASS}>{FORMULARIO.servicioTitulo}</legend>
              <div className="grid grid-cols-2 gap-2">
                {FORMULARIO.servicios.map((servicio) => (
                  <label key={servicio} className="relative min-w-0 cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={servicio}
                      checked={form.service === servicio}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <span className="flex items-center justify-center h-full min-h-11 px-3 py-2 rounded-xl border text-center text-xs sm:text-sm font-semibold leading-snug transition duration-200 border-slate-200 bg-white text-slate-600 hover:border-arbell-blue/40 hover:bg-arbell-light/40 peer-checked:border-arbell-blue peer-checked:bg-arbell-blue peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-arbell-blue/25 peer-focus-visible:ring-2 peer-focus-visible:ring-arbell-blue peer-focus-visible:ring-offset-2">
                      {servicio}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Nota opcional: se despliega con el link */}
            <div className="col-span-2">
              <button
                type="button"
                aria-expanded={notesOpen}
                aria-controls="nota-panel"
                onClick={toggleNotes}
                className="rounded-sm text-sm font-semibold text-arbell-blue transition-colors duration-200 hover:text-arbell-dark"
              >
                {notesOpen ? FORMULARIO.notaOcultar : FORMULARIO.notaAgregar}
              </button>
              <div
                id="nota-panel"
                inert={!notesOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-soft ${notesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className={`pt-2 px-0.5 pb-0.5 transition-opacity duration-300 ${notesOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <label className="sr-only" htmlFor="leadNotes">{FORMULARIO.notaLabel}</label>
                    <textarea
                      ref={notesRef}
                      className="w-full min-w-0 px-3.5 py-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 outline-none transition duration-200 resize-y hover:border-slate-300 focus:border-arbell-blue focus:ring-2 focus:ring-arbell-blue/25"
                      id="leadNotes"
                      name="notes"
                      rows="2"
                      placeholder={FORMULARIO.notaPlaceholder}
                      value={form.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 mt-1">
              <button
                className="group relative overflow-hidden w-full py-3.5 px-4 bg-arbell-blue text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-arbell-blue/25 transition duration-200 flex items-center justify-center gap-2 enabled:hover:-translate-y-0.5 enabled:hover:bg-[#006bb4] enabled:hover:shadow-xl enabled:hover:shadow-arbell-blue/40 enabled:active:scale-95 disabled:opacity-80 disabled:cursor-wait"
                type="submit"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-30" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span>{FORMULARIO.botonEnviando}</span>
                  </>
                ) : (
                  <>
                    {/* Brillo que cruza el botón cada ~4s */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shine"
                    />
                    <WhatsAppIcon className="relative w-5 h-5" />
                    <span className="relative">{FORMULARIO.boton}</span>
                    <svg
                      className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] lg:text-xs text-slate-400">
                <LineIcon name="lock" className="w-3.5 h-3.5" />
                {FORMULARIO.aviso}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
