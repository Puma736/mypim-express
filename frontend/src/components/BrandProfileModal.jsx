import React, { useState } from 'react';
import { X, User, Building2, Save, Sparkles, Phone, Mail } from 'lucide-react';
import { CITIES, SUBSECTORS } from '../utils/legalData';

export default function BrandProfileModal({ brandProfile, onSave, onClose }) {
  const [name, setName] = useState(brandProfile.name || 'BioCosmética Bolivia');
  const [founder, setFounder] = useState(brandProfile.founder || 'María Rene Aguilera');
  const [city, setCity] = useState(brandProfile.city || 'Santa Cruz de la Sierra');
  const [subsector, setSubsector] = useState(brandProfile.subsector || 'SR-01');
  const [phone, setPhone] = useState(brandProfile.phone || '+591 78901234');
  const [email, setEmail] = useState(brandProfile.email || 'contacto@biocosmetica.bo');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      founder,
      city,
      subsector,
      phone,
      email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-sage-900 to-charcoal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-600 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Perfil de tu Marca Cosmética</h2>
              <p className="text-xs text-slate-300">Configura tus datos para personalizar las fichas e informes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Comercial de la Marca</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Fundador / Titular</label>
            <input
              type="text"
              required
              value={founder}
              onChange={(e) => setFounder(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sage-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad de Bolivia</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sage-500"
              >
                {CITIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subrubro Principal</label>
              <select
                value={subsector}
                onChange={(e) => setSubsector(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sage-500"
              >
                {SUBSECTORS.map(s => (
                  <option key={s.id} value={s.id}>[{s.code}] {s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sage-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correo de Contacto</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sage-500"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Perfil</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
