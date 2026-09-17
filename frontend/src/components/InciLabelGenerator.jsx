import React, { useState } from 'react';
import { 
  Tag, 
  Sparkles, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  X
} from 'lucide-react';
import { INCI_DICTIONARY } from '../utils/legalData';

export default function InciLabelGenerator({ brandProfile, onClose }) {
  const [productName, setProductName] = useState('Sérum Facial Hidratante de Ácido Hialurónico');
  const [netContent, setNetContent] = useState('30 ml');
  const [batchNumber, setBatchNumber] = useState('L-2026-001');
  const [expiryDate, setExpiryDate] = useState('12/2027');
  const [nsoCode, setNsoCode] = useState('NSO-BO-00124-26');
  const [holderName, setHolderName] = useState(brandProfile.name || 'BioCosmética Bolivia S.R.L.');
  const [originCity, setOriginCity] = useState(brandProfile.city || 'Santa Cruz de la Sierra');
  const [instructions, setInstructions] = useState('Aplicar 3 a 4 gotas sobre el rostro limpio por la mañana y noche. Dar suaves toques hasta su total absorción.');
  const [warnings, setWarnings] = useState('Uso externo exclusivamente. Evitar el contacto con los ojos. Descontinuar su uso si presenta irritación. Mantener en lugar fresco y seco alejado de la luz solar directa.');

  // Formula INCI list
  const [inciList, setInciList] = useState([
    { id: '1', inci: 'Aqua', common: 'Agua Desmineralizada' },
    { id: '2', inci: 'Calendula Officinalis Flower Water', common: 'Hidrolato de Caléndula' },
    { id: '3', inci: 'Sodium Hyaluronate', common: 'Ácido Hialurónico' },
    { id: '4', inci: 'Niacinamide', common: 'Vitamina B3' },
    { id: '5', inci: 'Glycerin', common: 'Glicerina Vegetal' },
    { id: '6', inci: 'Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid', common: 'Conservante Eco-Cert' }
  ]);

  const [customInci, setCustomInci] = useState('');

  const addInciFromDict = (dictItem) => {
    if (!inciList.some(item => item.inci === dictItem.inci)) {
      setInciList([...inciList, { id: Date.now().toString(), inci: dictItem.inci, common: dictItem.common }]);
    }
  };

  const addCustomInci = () => {
    if (customInci.trim()) {
      setInciList([...inciList, { id: Date.now().toString(), inci: customInci.trim(), common: 'Ingrediente Técnico' }]);
      setCustomInci('');
    }
  };

  const removeInci = (id) => {
    setInciList(inciList.filter(item => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const fullInciString = inciList.map(item => item.inci).join(', ');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-sage-900 to-charcoal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-clay-500 text-white flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Generador de Ficha de Etiquetado INCI</h2>
              <p className="text-xs text-slate-300">Norma Técnica de Rotulado AGEMED / Decisión CAN 516-833</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Etiqueta</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Editor (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* General Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sage-800 border-b border-sage-100 pb-2">
                1. Datos Comerciales del Cosmético
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Comercial / Producto</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contenido Neto (g o ml)</label>
                  <input
                    type="text"
                    value={netContent}
                    onChange={(e) => setNetContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Número de Lote</label>
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fecha Vencimiento</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Código NSO (AGEMED)</label>
                  <input
                    type="text"
                    value={nsoCode}
                    onChange={(e) => setNsoCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs formulation-font text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Titular / Empresa</label>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad de Origen</label>
                  <input
                    type="text"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                  />
                </div>
              </div>
            </div>

            {/* INCI Formula Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-sage-100 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-sage-800">
                  2. Nomenclatura INCI (Orden Decreciente)
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold">{inciList.length} Ingredientes</span>
              </div>

              {/* Added INCI tags */}
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 min-h-[60px]">
                {inciList.map((item, idx) => (
                  <span 
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-sm"
                  >
                    <span className="text-slate-400 font-mono text-[10px]">{idx + 1}.</span>
                    <span>{item.inci}</span>
                    <button 
                      onClick={() => removeInci(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Quick Dict Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Añadir Insumo Habitual desde Diccionario INCI:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-linen-50 rounded-xl border border-slate-200">
                  {INCI_DICTIONARY.map((dict, i) => (
                    <button
                      key={i}
                      onClick={() => addInciFromDict(dict)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-sage-100 border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-sage-800 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-sage-600" />
                      <span>{dict.common}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom INCI Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribir nombre INCI en latín/inglés (ej: Tocopherol)..."
                  value={customInci}
                  onChange={(e) => setCustomInci(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-sage-500"
                />
                <button
                  onClick={addCustomInci}
                  className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold transition-colors"
                >
                  Añadir
                </button>
              </div>
            </div>

            {/* Usage & Warnings */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sage-800 border-b border-sage-100 pb-2">
                3. Instrucciones y Precauciones Sanitarias
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Modo de Empleo / Modo de Uso</label>
                <textarea
                  rows="2"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Advertencias y Precauciones</label>
                <textarea
                  rows="2"
                  value={warnings}
                  onChange={(e) => setWarnings(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>
            </div>

          </div>

          {/* Visual Label Mockup Preview (Right Column) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-clay-500" />
              <span>Previsualización Visual de la Etiqueta</span>
            </h3>

            <div id="printable-area" className="p-6 rounded-3xl bg-gradient-to-b from-linen-50 to-white border-2 border-slate-300 shadow-xl space-y-6 text-charcoal-900 font-sans">
              
              {/* Label Front Header */}
              <div className="text-center space-y-1.5 border-b border-slate-200 pb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sage-700 block">
                  {holderName}
                </span>
                <h2 className="text-lg font-black tracking-tight text-charcoal-900 leading-tight">
                  {productName || 'Nombre del Cosmético'}
                </h2>
                <div className="inline-block px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold border border-sage-200">
                  Contenido Neto: {netContent}
                </div>
              </div>

              {/* Label INCI Section */}
              <div className="space-y-1 text-[11px]">
                <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[9px]">
                  INGREDIENTES / INGREDIENTS (INCI):
                </span>
                <p className="text-slate-600 leading-relaxed font-mono text-[10px] bg-white p-2.5 rounded-xl border border-slate-200">
                  {fullInciString || 'Sin ingredientes asignados'}
                </p>
              </div>

              {/* Instructions & Warnings */}
              <div className="space-y-2 text-[10px]">
                <div>
                  <span className="font-bold text-slate-800 block">MODO DE USO:</span>
                  <p className="text-slate-600 leading-snug">{instructions}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">PRECAUCIONES:</span>
                  <p className="text-slate-600 leading-snug">{warnings}</p>
                </div>
              </div>

              {/* Sanitary Regulatory Details Footer */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-600">
                <div>
                  <span className="block font-sans text-[9px] text-slate-400 uppercase font-bold">LOTE & VENCIMIENTO:</span>
                  <span className="font-bold text-slate-900">{batchNumber} • EXP: {expiryDate}</span>
                </div>
                <div className="text-right">
                  <span className="block font-sans text-[9px] text-slate-400 uppercase font-bold">NOTIFICACIÓN AGEMED:</span>
                  <span className="font-bold text-sage-700">{nsoCode}</span>
                </div>
              </div>

              <div className="text-center pt-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest border-t border-dashed border-slate-200">
                HECHO EN BOLIVIA • {originCity.toUpperCase()}
              </div>

            </div>

            <p className="text-[11px] text-slate-400 text-center font-medium">
              Cumple con la norma técnica de rotulado exigida por AGEMED bajo la Decisión CAN 516/833.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
