import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Calendar } from 'lucide-react';
import { colorClasses, } from '../utils/rtsEngine.js';
import { formatBs } from '../utils/costingEngine.js';

const IconMap = {
  green:  CheckCircle2,
  yellow: ShieldCheck,
  orange: AlertTriangle,
  red:    XCircle,
};

export default function ResultadoRTSCard({ resultado }) {
  if (!resultado) return null;

  const { categoria_rts, pago_bimestral, pago_anual, es_regimen_general,
          descripcion, alerta_color, capital_declarado } = resultado;

  const c    = colorClasses(alerta_color);
  const Icon = IconMap[alerta_color] ?? CheckCircle2;

  return (
    <div className={`rounded-3xl border-2 ${c.border} ${c.bg} p-6 space-y-5`}>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${c.border} border-2 bg-white`}>
          <Icon className={`w-7 h-7 ${c.text}`} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Resultado — Régimen Tributario Simplificado (SIN Bolivia)
          </p>
          <h3 className={`text-2xl font-extrabold ${c.text}`}>{categoria_rts}</h3>
          <p className="text-sm text-slate-600 mt-1 leading-snug">{descripcion}</p>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Capital Declarado</p>
          <p className={`text-xl font-black stat-number ${c.text}`}>
            {formatBs(capital_declarado)}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1 flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3" />
            Pago Bimestral
          </p>
          <p className={`text-2xl font-black stat-number ${c.text}`}>
            {es_regimen_general
              ? <span className="text-sm font-bold">Ver contador</span>
              : pago_bimestral === 0
                ? <span className="text-emerald-600">¡Exento!</span>
                : formatBs(pago_bimestral)
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Pago Anual (6 bimestres)</p>
          <p className={`text-xl font-black stat-number ${c.text}`}>
            {pago_anual != null ? formatBs(pago_anual) : '—'}
          </p>
        </div>
      </div>

      {/* Alerta Régimen General */}
      {es_regimen_general && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
          <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm mb-0.5">Acción requerida: Régimen General</p>
            <p>Tu capital supera los Bs. 60.000. Debes inscribirte en el Régimen General del SIN
              y contratar un contador acreditado para llevar contabilidad formal.</p>
          </div>
        </div>
      )}

      {/* Pago = 0 celebración */}
      {!es_regimen_general && pago_bimestral === 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p>¡Excelente! Tu salón está exento del impuesto simplificado. Aprovecha para formalizar tu negocio sin costo tributario.</p>
        </div>
      )}
    </div>
  );
}
