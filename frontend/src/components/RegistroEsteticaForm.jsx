import React, { useState, useCallback } from 'react';
import { User, Store, MapPin, Phone, DollarSign, Save, CheckCircle2 } from 'lucide-react';

const UBICACIONES = ['Mutualista', 'La Ramada', 'Comercial Norte', 'Otro'];

export default function RegistroEsteticaForm({ onSave, initialData = null }) {
  const [nombre_propietaria, setNombrePropietaria] = useState(initialData?.nombre_propietaria ?? '');
  const [nombre_salon,       setNombreSalon]       = useState(initialData?.nombre_salon ?? '');
  const [ubicacion_mercado,  setUbicacion]         = useState(initialData?.ubicacion_mercado ?? 'Mutualista');
  const [telefono_whatsapp,  setTelefono]          = useState(initialData?.telefono_whatsapp ?? '');
  const [capital_declarado,  setCapital]           = useState(initialData?.capital_declarado?.toString() ?? '');
  const [errors,             setErrors]            = useState({});
  const [saved,              setSaved]             = useState(false);

  const validate = () => {
    const e = {};
    if (!nombre_propietaria.trim()) e.nombre_propietaria = 'Campo obligatorio';
    if (!nombre_salon.trim())       e.nombre_salon       = 'Campo obligatorio';
    if (!telefono_whatsapp.trim())  e.telefono_whatsapp  = 'Campo obligatorio';
    const cap = parseFloat(capital_declarado);
    if (isNaN(cap) || cap < 0)     e.capital_declarado  = 'Ingresa un monto válido en Bs.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    onSave({
      id_estetica:         initialData?.id_estetica ?? ('est-' + Date.now()),
      nombre_propietaria:  nombre_propietaria.trim(),
      nombre_salon:        nombre_salon.trim(),
      ubicacion_mercado,
      telefono_whatsapp:   telefono_whatsapp.trim(),
      capital_declarado:   parseFloat(capital_declarado),
      registro_completado: true,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {saved && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          ¡Perfil del salón guardado exitosamente!
        </div>
      )}

      {/* Fila 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nombre propietaria */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <User className="w-3.5 h-3.5 text-rose-400" />
            Nombre de la Propietaria / Titular
          </label>
          <input
            type="text"
            autoComplete="name"
            className={`input-base ${errors.nombre_propietaria ? 'border-red-400' : ''}`}
            placeholder="Ej: María Alejandra Rojas"
            value={nombre_propietaria}
            onChange={e => {
              setNombrePropietaria(e.target.value);
              if (errors.nombre_propietaria) setErrors(prev => ({ ...prev, nombre_propietaria: undefined }));
            }}
          />
          {errors.nombre_propietaria && (
            <p className="text-xs text-red-500 font-medium">{errors.nombre_propietaria}</p>
          )}
        </div>

        {/* Nombre salón */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <Store className="w-3.5 h-3.5 text-rose-400" />
            Nombre del Negocio / Establecimiento
          </label>
          <input
            type="text"
            autoComplete="organization"
            className={`input-base ${errors.nombre_salon ? 'border-red-400' : ''}`}
            placeholder="Ej: Peluquería Glamour, Centro Estético Bella, Spa Natural..."
            value={nombre_salon}
            onChange={e => {
              setNombreSalon(e.target.value);
              if (errors.nombre_salon) setErrors(prev => ({ ...prev, nombre_salon: undefined }));
            }}
          />
          {errors.nombre_salon && (
            <p className="text-xs text-red-500 font-medium">{errors.nombre_salon}</p>
          )}
        </div>
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Ubicación */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            Ubicación / Mercado
          </label>
          <select
            className="input-base"
            value={ubicacion_mercado}
            onChange={e => setUbicacion(e.target.value)}
          >
            {UBICACIONES.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <Phone className="w-3.5 h-3.5 text-rose-400" />
            WhatsApp de Contacto
          </label>
          <input
            type="tel"
            autoComplete="tel"
            className={`input-base ${errors.telefono_whatsapp ? 'border-red-400' : ''}`}
            placeholder="Ej: +591 76543210"
            value={telefono_whatsapp}
            onChange={e => {
              setTelefono(e.target.value);
              if (errors.telefono_whatsapp) setErrors(prev => ({ ...prev, telefono_whatsapp: undefined }));
            }}
          />
          {errors.telefono_whatsapp && (
            <p className="text-xs text-red-500 font-medium">{errors.telefono_whatsapp}</p>
          )}
        </div>
      </div>

      {/* Capital declarado */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
          <DollarSign className="w-3.5 h-3.5 text-rose-400" />
          Capital Declarado (Bs.)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 pointer-events-none">
            Bs.
          </span>
          <input
            type="number"
            min="0"
            step="100"
            className={`input-base pl-10 ${errors.capital_declarado ? 'border-red-400' : ''}`}
            placeholder="18000"
            value={capital_declarado}
            onChange={e => {
              setCapital(e.target.value);
              if (errors.capital_declarado) setErrors(prev => ({ ...prev, capital_declarado: undefined }));
            }}
          />
        </div>
        {errors.capital_declarado
          ? <p className="text-xs text-red-500 font-medium">{errors.capital_declarado}</p>
          : <p className="text-[11px] text-slate-400">
              El capital declarado determina tu categoría en el Régimen Tributario Simplificado (RTS) del SIN.
            </p>
        }
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <Save className="w-5 h-5" />
        Guardar Perfil del Negocio
      </button>
    </form>
  );
}
