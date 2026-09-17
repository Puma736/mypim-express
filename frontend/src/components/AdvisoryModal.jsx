import React, { useState } from 'react';
import { X, MessageSquare, Phone, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

export default function AdvisoryModal({ brandProfile, onClose }) {
  const [name, setName] = useState(brandProfile.founder || brandProfile.name || '');
  const [phone, setPhone] = useState(brandProfile.phone || '');
  const [email, setEmail] = useState(brandProfile.email || '');
  const [notes, setNotes] = useState('Deseo orientación personalizada para la Notificación Sanitaria NSO ante AGEMED y cálculo de costos.');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('http://localhost:5000/api/advisory/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          subsector: brandProfile.subsector,
          city: brandProfile.city,
          type: 'Pack Completo / Asesor en Vivo',
          notes
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `¡Hola! Vengo de la plataforma My PiM Express. Mi emprendimiento es "${brandProfile.name}" (${brandProfile.city}). Deseo consultar con un asesor legal/técnico en vivo.`
    );
    window.open(`https://wa.me/59178901234?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-clay-900 via-charcoal-900 to-sage-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-clay-500 flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Pack Completo • Asesoría en Vivo</h2>
              <p className="text-xs text-slate-300">Hablar con un especialista legal/técnico de Bolivia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900">¡Solicitud Registrada!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Un asesor de la red **My PiM Express** te contactará por WhatsApp para resolver tus dudas técnicas ante AGEMED o SEPREC.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Abrir Chat Directo en WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="p-4 rounded-2xl bg-linen-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-clay-700 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>¿En qué consiste el Pack Completo?</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Acceso integrado a los 3 módulos (Ruta Legal, Calculadora Reactiva y Academia) con acompañamiento técnico en vivo para tu trámite de Notificación Sanitaria NSO o Licencia Municipal.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Teléfono</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">¿Qué consulta técnica o legal deseas resolver?</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-sage-500"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-2xl bg-clay-500 hover:bg-clay-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Enviando...' : 'Enviar Solicitud'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
