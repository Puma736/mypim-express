import React, { useState } from 'react';
import { Scissors, DollarSign, Clock, TrendingUp, Calculator, Sparkles } from 'lucide-react';
import { calcularPrecioServicio } from '../utils/costingEngine.js';
import ResultadoCosteoCard from './ResultadoCosteoCard.jsx';

const SERVICIOS_COMUNES = [
  // Cabello
  'Balayage', 'Tinte Raíz Completa', 'Keratina Brasileña', 'Corte + Secado',
  'Alisado Permanente', 'Mechas / Iluminaciones', 'Tratamiento Capilar',
  // Uñas
  'Manicura Spa', 'Pedicura Completa', 'Uñas Acrílicas', 'Uñas de Gel', 'Nail Art',
  // Estética y cuidado facial
  'Limpieza Facial Profunda', 'Depilación con Cera', 'Diseño de Cejas',
  'Extensiones de Pestañas', 'Lifting de Pestañas',
  // Barbería
  'Corte Caballero', 'Arreglo de Barba', 'Afeitado Clásico',
  // Spa y relajación
  'Masaje Relajante', 'Masaje Descontracturante', 'Tratamiento Corporal',
];

export default function CosteoServicioForm({ esteticaId, onGuardar }) {
  // Cada campo es su propio useState — evita re-renders que roban el foco
  const [nombreTratamiento, setNombreTratamiento]   = useState('');
  const [costoInsumos,      setCostoInsumos]         = useState('');
  const [horasTrabajadas,   setHorasTrabajadas]      = useState('');
  const [manoObraPorHora,   setManoObraPorHora]      = useState('');
  const [margen,            setMargen]               = useState(50);
  const [errors,            setErrors]               = useState({});
  const [resultado,         setResultado]            = useState(null);

  const clearError = (field) => setErrors(prev => ({ ...prev, [field]: undefined }));

  const validate = () => {
    const e = {};
    if (!nombreTratamiento.trim())                          e.nombre   = 'Ingresa el nombre del servicio';
    if (isNaN(parseFloat(costoInsumos))  || parseFloat(costoInsumos)  < 0) e.insumos  = 'Monto válido requerido';
    if (isNaN(parseFloat(horasTrabajadas)) || parseFloat(horasTrabajadas) <= 0) e.horas = 'Ingresa las horas (ej: 1.5)';
    if (isNaN(parseFloat(manoObraPorHora)) || parseFloat(manoObraPorHora) < 0)  e.tarifa = 'Tarifa requerida';
    return e;
  };

  const handleCalcular = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const r = calcularPrecioServicio({
      nombre_tratamiento:        nombreTratamiento.trim(),
      costo_insumos:             parseFloat(costoInsumos),
      horas_trabajadas:          parseFloat(horasTrabajadas),
      mano_obra_por_hora:        parseFloat(manoObraPorHora),
      margen_deseado_porcentaje: margen,
    });
    setResultado(r);
    onGuardar?.({ ...r, id_estetica: esteticaId, id_servicio: 'svc-' + Date.now() });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCalcular} className="space-y-5">

        {/* Nombre del servicio */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <Scissors className="w-3.5 h-3.5 text-rose-400" />
            Nombre del Servicio / Tratamiento
          </label>
          <input
            type="text"
            list="servicios-lista"
            autoComplete="off"
            className={`input-base ${errors.nombre ? 'border-red-400' : ''}`}
            placeholder="Ej: Balayage, Tinte raíz, Manicura..."
            value={nombreTratamiento}
            onChange={e => { setNombreTratamiento(e.target.value); clearError('nombre'); }}
          />
          <datalist id="servicios-lista">
            {SERVICIOS_COMUNES.map(s => <option key={s} value={s} />)}
          </datalist>
          {errors.nombre && <p className="text-xs text-red-500 font-medium">{errors.nombre}</p>}
        </div>

        {/* Fila: insumos + horas + tarifa */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Costo insumos */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
              <DollarSign className="w-3.5 h-3.5 text-rose-400" />
              Costo Insumos (Bs.)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">Bs.</span>
              <input
                type="number"
                min="0"
                step="0.5"
                className={`input-base pl-8 ${errors.insumos ? 'border-red-400' : ''}`}
                placeholder="45"
                value={costoInsumos}
                onChange={e => { setCostoInsumos(e.target.value); clearError('insumos'); }}
              />
            </div>
            <p className="text-[11px] text-slate-400">Tinte, decolorante, etc.</p>
            {errors.insumos && <p className="text-xs text-red-500 font-medium">{errors.insumos}</p>}
          </div>

          {/* Horas trabajadas */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              Horas Trabajadas
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              className={`input-base ${errors.horas ? 'border-red-400' : ''}`}
              placeholder="2.5"
              value={horasTrabajadas}
              onChange={e => { setHorasTrabajadas(e.target.value); clearError('horas'); }}
            />
            <p className="text-[11px] text-slate-400">Ej: 2.5 para un balayage</p>
            {errors.horas && <p className="text-xs text-red-500 font-medium">{errors.horas}</p>}
          </div>

          {/* Tarifa por hora */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
              <DollarSign className="w-3.5 h-3.5 text-rose-400" />
              Tarifa por Hora (Bs.)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">Bs.</span>
              <input
                type="number"
                min="0"
                step="1"
                className={`input-base pl-8 ${errors.tarifa ? 'border-red-400' : ''}`}
                placeholder="30"
                value={manoObraPorHora}
                onChange={e => { setManoObraPorHora(e.target.value); clearError('tarifa'); }}
              />
            </div>
            <p className="text-[11px] text-slate-400">Tu valor horario como estilista</p>
            {errors.tarifa && <p className="text-xs text-red-500 font-medium">{errors.tarifa}</p>}
          </div>
        </div>

        {/* Slider margen */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wide">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
              Margen de Ganancia Deseado
            </span>
            <span className="text-rose-600 font-extrabold text-base">{margen}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            className="w-full accent-rose-500 cursor-pointer"
            value={margen}
            onChange={e => setMargen(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>10% Mínimo</span>
            <span>45% Recomendado</span>
            <span>80% Premium</span>
          </div>
        </div>

        {/* Nota CIF */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>
            <strong>CIF Operativo incluido:</strong> Se agrega automáticamente Bs. 15 por servicio
            (luz, agua y alquiler prorrateado del puesto).
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-gold-500 hover:from-rose-600 hover:to-gold-600 text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Calculator className="w-5 h-5" />
          Calcular Precio Sugerido
        </button>
      </form>

      {resultado && (
        <div className="animate-scale-in">
          <ResultadoCosteoCard resultado={resultado} />
        </div>
      )}
    </div>
  );
}
