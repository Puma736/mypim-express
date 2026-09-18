import React from 'react';
import { Sparkles, TrendingUp, Package, Zap, DollarSign } from 'lucide-react';
import { formatBs } from '../utils/costingEngine.js';

export default function ResultadoCosteoCard({ resultado }) {
  if (!resultado) return null;

  const {
    nombre_tratamiento,
    costo_insumos,
    mod_total,
    cif_diario,
    costo_total,
    margen_porcentaje,
    precio_sugerido,
    ganancia_por_servicio,
  } = resultado;

  // Determinar color del margen
  const margenColor = margen_porcentaje >= 45
    ? 'text-emerald-600'
    : margen_porcentaje >= 30
      ? 'text-amber-600'
      : 'text-red-500';

  return (
    <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 to-rose-950 text-white p-6 space-y-6 shadow-2xl">

      {/* Título */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-rose-300" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Análisis de Costeo</p>
          <h3 className="font-extrabold text-base text-white">{nombre_tratamiento}</h3>
        </div>
      </div>

      {/* Precio sugerido — el número grande */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center space-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Precio de Venta Sugerido</p>
        <p className="text-5xl font-black text-white stat-number tracking-tight">
          {formatBs(precio_sugerido)}
        </p>
        <p className="text-xs text-slate-400">Con {margen_porcentaje}% de margen sobre el precio final</p>
      </div>

      {/* Desglose de costos */}
      <div className="space-y-2 text-sm">
        {[
          { icon: Package, label: 'Costo de Insumos',    value: costo_insumos, color: 'text-slate-300' },
          { icon: Zap,     label: 'Mano de Obra (MOD)',  value: mod_total,     color: 'text-slate-300' },
          { icon: DollarSign, label: 'CIF Operativo (luz/agua/local)', value: cif_diario, color: 'text-slate-300' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-slate-500" />
              <span className={`${color} text-xs`}>{label}</span>
            </div>
            <span className="font-semibold text-white text-xs stat-number">{formatBs(value)}</span>
          </div>
        ))}

        {/* Costo total */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-bold text-slate-200">Costo Total</span>
          <span className="text-sm font-black text-white stat-number">{formatBs(costo_total)}</span>
        </div>
      </div>

      {/* Ganancia y margen */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-2xl p-4 text-center">
          <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide mb-1">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            Ganancia por Servicio
          </p>
          <p className="text-xl font-black text-emerald-300 stat-number">
            {formatBs(ganancia_por_servicio)}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Margen Real</p>
          <p className={`text-xl font-black stat-number ${margenColor}`}>
            {margen_porcentaje}%
          </p>
        </div>
      </div>

      {/* Alerta si el margen es bajo */}
      {margen_porcentaje < 30 && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs">
          <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>Consejo:</strong> Un margen menor al 30% puede ser riesgoso. Considera subir
            el precio o revisar el costo de tus insumos.
          </span>
        </div>
      )}
    </div>
  );
}
