import React, { useState } from 'react';
import { DollarSign, Calculator, Table2 } from 'lucide-react';
import { calcularRTS, RANGOS_RTS } from '../utils/rtsEngine.js';
import ResultadoRTSCard from './ResultadoRTSCard.jsx';

export default function SimuladorRTS({ capitalInicial = '' }) {
  const [capital, setCapital]       = useState(capitalInicial?.toString() ?? '');
  const [resultado, setResultado]   = useState(null);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleCalcular = (e) => {
    e.preventDefault();
    const val = parseFloat(capital);
    if (isNaN(val) || val < 0) return;
    setResultado(calcularRTS(val));
  };

  return (
    <div className="space-y-6">

      {/* Formulario de entrada */}
      <form onSubmit={handleCalcular} className="space-y-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <DollarSign className="w-3.5 h-3.5 text-rose-400" />
            Capital Declarado del Salón (Bs.)
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Bs.</span>
              <input
                type="number"
                min="0"
                step="500"
                className="input-base pl-10"
                placeholder="Ej: 25000"
                value={capital}
                onChange={e => setCapital(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md shadow-rose-500/20 flex items-center gap-2 transition-all"
            >
              <Calculator className="w-4 h-4" />
              Calcular
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Ingresa el capital total de tu negocio (inventario + equipos + efectivo disponible).
          </p>
        </div>
      </form>

      {/* Resultado */}
      {resultado && (
        <div className="animate-scale-in">
          <ResultadoRTSCard resultado={resultado} />
        </div>
      )}

      {/* Tabla de referencia RTS */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setMostrarTabla(!mostrarTabla)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-700"
        >
          <div className="flex items-center gap-2">
            <Table2 className="w-4 h-4 text-rose-400" />
            Ver tabla completa de categorías RTS — SIN Bolivia
          </div>
          <span className="text-slate-400 text-lg leading-none">{mostrarTabla ? '−' : '+'}</span>
        </button>

        {mostrarTabla && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-rose-50 text-rose-800">
                <tr>
                  <th className="px-4 py-2.5 text-left font-bold">Categoría</th>
                  <th className="px-4 py-2.5 text-left font-bold">Capital Declarado (Bs.)</th>
                  <th className="px-4 py-2.5 text-right font-bold">Pago Bimestral</th>
                  <th className="px-4 py-2.5 text-right font-bold">Pago Anual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RANGOS_RTS.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-charcoal-900">{r.categoria}</td>
                    <td className="px-4 py-2.5 text-slate-500">
                      {r.max === Infinity
                        ? `> Bs. 60.000`
                        : `Bs. ${r.min.toLocaleString()} – ${r.max.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-2.5 text-right font-bold text-rose-700">
                      {r.pago === null ? 'Contabilidad' : r.pago === 0 ? 'Exento' : `Bs. ${r.pago}`}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-500">
                      {r.pago === null ? '—' : r.pago === 0 ? '—' : `Bs. ${r.pago * 6}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
