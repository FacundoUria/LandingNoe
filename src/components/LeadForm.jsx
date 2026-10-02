import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../config.js'

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

const LABEL_CLASS = 'block text-[11px] font-semibold text-slate-600 mb-1'
const FIELD_CLASS =
  'w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition duration-200 hover:border-slate-300 focus:border-arbell-blue focus:ring-2 focus:ring-arbell-blue/30 focus:bg-white'

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

export default function LeadForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [sending, setSending] = useState(false)
  const sendingTimer = useRef(null)

  useEffect(() => () => clearTimeout(sendingTimer.current), [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (sending) return
    window.open(whatsappUrl(buildMessage(form)), '_blank', 'noopener,noreferrer')
    setSending(true)
    sendingTimer.current = setTimeout(() => setSending(false), SENDING_MS)
  }

  return (
    <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center mb-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-arbell-blue bg-sky-50 px-2.5 py-1 rounded-md">
          Te respondemos por WhatsApp
        </span>
      </div>
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Empezá en 1 minuto</h2>
      <p className="text-xs text-slate-500 mb-5">Completá tus datos de contacto para comenzar a vender.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className={LABEL_CLASS} htmlFor="leadFullName">👤 Nombre completo *</label>
          <input
            className={FIELD_CLASS}
            id="leadFullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Ej: Juan Pérez"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLASS} htmlFor="leadDoc">🆔 DNI *</label>
            <input
              className={FIELD_CLASS}
              id="leadDoc"
              name="dni"
              type="text"
              inputMode="numeric"
              placeholder="Ej: 38.456.789"
              value={form.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className={LABEL_CLASS} htmlFor="leadPhone">📞 Teléfono / WhatsApp *</label>
            <input
              className={FIELD_CLASS}
              id="leadPhone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Ej: 261 555-4321"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="leadEmail">✉️ Email *</label>
          <input
            className={FIELD_CLASS}
            id="leadEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Ej: juan.perez@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="leadAddress">📍 Dirección *</label>
          <input
            className={FIELD_CLASS}
            id="leadAddress"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="Ej: Av. Las Heras 450, Mendoza"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="leadService">📌 Servicio de interés *</label>
          <select
            className={`${FIELD_CLASS} text-slate-700`}
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

        <div>
          <label className={LABEL_CLASS} htmlFor="leadNotes">📝 Notas / Observaciones</label>
          <textarea
            className={FIELD_CLASS}
            id="leadNotes"
            name="notes"
            rows="2"
            placeholder="Ej: Puedo recibir llamadas solo por la tarde"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <button
          className="group w-full py-3.5 px-4 bg-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 transition duration-200 flex items-center justify-center gap-2 mt-2 enabled:hover:bg-emerald-600 enabled:hover:shadow-xl enabled:hover:shadow-emerald-500/30 enabled:active:scale-95 disabled:opacity-80 disabled:cursor-wait"
          type="submit"
          disabled={sending}
        >
          {sending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-30" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span>Abriendo WhatsApp...</span>
            </>
          ) : (
            <>
              <span>Enviar por WhatsApp 💬</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
        <p className="text-[10px] text-center text-slate-400 leading-tight pt-1">
          Al enviar tus datos serás contactado de manera directa y personalizada por Distribuidora Bellissima.
        </p>
      </form>
    </section>
  )
}
