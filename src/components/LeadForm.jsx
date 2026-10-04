import { useEffect, useRef, useState } from 'react'
import { SECTION_IDS, whatsappUrl } from '../config.js'
import { FORMULARIO } from '../content.js'

const SERVICES = [
  'Emprender / Venta de productos',
  'Asesoramiento personal',
  'Comprar productos',
  'Consulta general',
]

const INITIAL_FORM = {
  fullName: '',
  dni: '',
  phone: '',
  email: '',
  address: '',
  service: SERVICES[0],
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

// Campos de texto obligatorios, en el orden del formulario
const TEXT_FIELDS = [
  { name: 'fullName', id: 'leadFullName', label: '👤 Nombre completo *', type: 'text', autoComplete: 'name', placeholder: 'Ej: Juan Pérez', wide: true },
  { name: 'dni', id: 'leadDoc', label: '🆔 DNI *', type: 'text', inputMode: 'numeric', placeholder: 'Ej: 38.456.789' },
  { name: 'phone', id: 'leadPhone', label: '📞 Teléfono / WhatsApp *', type: 'tel', autoComplete: 'tel', placeholder: 'Ej: 261 555-4321' },
  { name: 'email', id: 'leadEmail', label: '✉️ Email *', type: 'email', autoComplete: 'email', placeholder: 'Ej: juan.perez@email.com' },
  { name: 'address', id: 'leadAddress', label: '📍 Dirección *', type: 'text', autoComplete: 'street-address', placeholder: 'Ej: Av. Las Heras 450, Mendoza' },
]

function getErrors(form) {
  return TEXT_FIELDS.filter(({ name }) => !VALIDATORS[name](form[name])).map(({ name }) => name)
}

const LABEL_CLASS = 'block text-[11px] font-semibold text-slate-600 mb-1 truncate'
const FIELD_BASE_CLASS =
  'w-full min-w-0 px-3 py-2.5 text-sm rounded-xl border bg-slate-50/50 outline-none transition duration-200 focus:ring-2 focus:bg-white'
const FIELD_OK_CLASS = 'border-slate-200 hover:border-slate-300 focus:border-arbell-blue focus:ring-arbell-blue/30'
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
      className="pointer-events-none absolute right-2.5 top-1/2 -mt-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-sm animate-check-in"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function TextField({ field, value, onChange, showError, shaking, onShakeEnd }) {
  const { name, id, label, wide, ...inputProps } = field
  const valid = VALIDATORS[name](value)
  const errorId = `${id}-error`

  return (
    <div
      className={`min-w-0 ${wide ? 'col-span-2' : ''} ${shaking ? 'animate-shake' : ''}`}
      onAnimationEnd={(event) => {
        if (event.animationName === 'shake') onShakeEnd(name)
      }}
    >
      <label className={LABEL_CLASS} htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          className={`${FIELD_BASE_CLASS} pr-9 ${showError ? FIELD_ERROR_CLASS : FIELD_OK_CLASS}`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          {...inputProps}
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
  const [sending, setSending] = useState(false)
  const sendingTimer = useRef(null)

  useEffect(() => () => clearTimeout(sendingTimer.current), [])

  const errors = attempted ? getErrors(form) : []

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleShakeEnd(name) {
    setShaking((prev) => prev.filter((fieldName) => fieldName !== name))
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
      aria-labelledby="formulario-titulo"
      className="page-container relative z-20 -mt-16 lg:-mt-24 scroll-mt-20 animate-fade-up [animation-delay:320ms]"
    >
      <div className="lg:max-w-3xl lg:mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-linear-to-b from-arbell-light/70 to-white px-5 pt-5 pb-3 lg:px-8 lg:pt-7 text-center">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-arbell-blue bg-white/80 border border-sky-100 px-2.5 py-1 rounded-md">
            {FORMULARIO.badge}
          </span>
          <h2 id="formulario-titulo" className="mt-2 text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            {FORMULARIO.titulo}
          </h2>
          <p className="text-xs lg:text-sm text-slate-500">{FORMULARIO.bajada}</p>
        </div>

        <form
          noValidate
          className="grid grid-cols-2 gap-x-3 gap-y-4 px-5 pb-5 pt-3 lg:gap-x-5 lg:px-8 lg:pb-8"
          onSubmit={handleSubmit}
        >
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

          <div className="min-w-0">
            <label className={LABEL_CLASS} htmlFor="leadService">📌 Servicio de interés *</label>
            <select
              className={`${FIELD_BASE_CLASS} ${FIELD_OK_CLASS} text-slate-700`}
              id="leadService"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              {SERVICES.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label className={LABEL_CLASS} htmlFor="leadNotes">📝 Notas</label>
            <textarea
              className={`${FIELD_BASE_CLASS} ${FIELD_OK_CLASS} resize-y`}
              id="leadNotes"
              name="notes"
              rows="1"
              placeholder="Ej: Puedo recibir llamadas solo por la tarde"
              value={form.notes}
              onChange={handleChange}
            />
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
            <p className="mt-3 text-[10px] lg:text-xs text-center text-slate-400 leading-tight">{FORMULARIO.aviso}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
