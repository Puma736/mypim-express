import React from 'react';
import { X, Printer, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { formatBs } from '../utils/costingEngine';

export default function TechnicalSheetModal({ formulaName, subsector, batchUnits, results, onClose }) {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-sage-900 to-charcoal-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sage-600 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ficha Técnica de Costos & Formulación</h2>
              <p className="text-xs text-slate-300">Documento de Análisis Financiero de Lote - My PiM Express</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet Area */}
        <div id="printable-area" className="p-8 overflow-y-auto space-y-8 font-sans text-charcoal-900 bg-white">
          
          {/* Document Title Header */}
          <div className="flex justify-between items-start border-b-2 border-sage-600 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-widest text-sage-600 uppercase">
                  MY PIM EXPRESS • COSMETIC ED.
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {subsector}
                </span>
              </div>
              <h1 className="text-2xl font-black text-charcoal-900 mt-1">{formulaName}</h1>
              <p className="text-xs text-slate-500 font-medium">
                Fecha de Emisión: {new Date().toLocaleDateString('es-BO')} | Lote de Producción: {batchUnits} Unidades
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Costo Unitario (CUP)</span>
              <span className="text-2xl font-black text-sage-700">{formatBs(results.cup)}</span>
            </div>
          </div>

          {/* Raw Ingredients Cost Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              1. Desglose Proporcional de Materias Primas e INCI
            </h3>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Ingrediente</th>
                  <th className="p-2.5">Nomenclatura INCI</th>
                  <th className="p-2.5 text-center">Matriz Compra</th>
                  <th className="p-2.5 text-center">Uso en Fórmula</th>
                  <th className="p-2.5 text-right">Costo Insumo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {results.evaluatedIngredients.map((ing, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">{ing.name}</td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-600">{ing.inci}</td>
                    <td className="p-2.5 text-center">{formatBs(ing.matrixPrice)} / {ing.matrixQty} {ing.matrixUnit}</td>
                    <td className="p-2.5 text-center font-bold text-sage-800">{ing.formulaQty} {ing.formulaUnit}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{formatBs(ing.itemCost)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <td colSpan="4" className="p-2.5 text-right">Subtotal MP sin Merma:</td>
                  <td className="p-2.5 text-right">{formatBs(results.rawMPTotal)}</td>
                </tr>
                <tr className="bg-sage-50 text-sage-900 font-black">
                  <td colSpan="4" className="p-2.5 text-right">Total MP con Factor de Merma (5%):</td>
                  <td className="p-2.5 text-right">{formatBs(results.mpWithLoss)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Packaging & Direct Costs Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                2. Componentes de Packaging ($CP$)
              </h3>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2 text-left">Empaque</th>
                    <th className="p-2 text-right">Precio Unitario</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.evaluatedPackaging.map((pkg, i) => (
                    <tr key={i}>
                      <td className="p-2 font-medium">{pkg.name}</td>
                      <td className="p-2 text-right font-bold">{formatBs(pkg.priceUnit)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2 text-right">Packaging Unitario:</td>
                    <td className="p-2 text-right text-sage-700">{formatBs(results.singlePackagingCost)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                3. Costos Operativos del Lote
              </h3>
              <div className="p-4 rounded-2xl bg-linen-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Mano de Obra Directa ($MOD$):</span>
                  <span className="font-bold">{formatBs(results.modTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Costos Indirectos ($CIF$):</span>
                  <span className="font-bold">{formatBs(results.cifTotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-black text-sm text-sage-800">
                  <span>Costo Total Lote:</span>
                  <span>{formatBs(results.totalBatchCost)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Final Financial Summary & Margins */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-sage-300">
              4. Análisis de Precios Sugeridos y Rentabilidad
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Costo Unitario (CUP)</span>
                <span className="text-xl font-black text-white">{formatBs(results.cup)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                  PVP Minorista B2C ({(results.safeRetailMargin * 100).toFixed(0)}% Margen)
                </span>
                <span className="text-xl font-black text-emerald-300">{formatBs(results.pvpRetail)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
                <span className="text-[10px] text-cyan-300 font-bold block uppercase">
                  Precio Mayorista B2B ({(results.safeWholesaleMargin * 100).toFixed(0)}% Margen)
                </span>
                <span className="text-xl font-black text-cyan-300">{formatBs(results.priceWholesale)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10 gap-2">
              <span>
                <strong>Punto de Equilibrio:</strong> {results.breakEvenUnits} Unidades/mes ({formatBs(results.breakEvenRevenue)})
              </span>
              <span className="text-[11px] text-slate-400">
                Calculado sobre costos fijos mensuales.
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-4 space-y-1">
            <p className="font-bold">MY PIM EXPRESS — Plataforma RegTech & Costeo para Bolivia</p>
            <p>Generado para la Hackatón HACKBIZ 2026 (UAGRM). Basado en normativa AGEMED y Decisiones CAN 516 / 833.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
