import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Layers, 
  Clock, 
  Box, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  HelpCircle,
  Percent,
  Download
} from 'lucide-react';
import { 
  PRESET_FORMULAS, 
  calculateBatchCosting, 
  formatBs, 
  UNIT_CONVERSIONS 
} from '../utils/costingEngine';
import TechnicalSheetModal from './TechnicalSheetModal';

export default function CostCalculatorModule({ onSaveFormula, loadedFormula }) {
  
  // State for costing variables - INICIA DESDE CERO (Limpio)
  const [formulaName, setFormulaName] = useState('');
  const [subsector, setSubsector] = useState('SR-01');
  const [batchUnits, setBatchUnits] = useState(1);
  const [lossPercentage, setLossPercentage] = useState(5);
  const [hoursLote, setHoursLote] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [cifLote, setCifLote] = useState(0);
  const [fixedMonthlyCosts, setFixedMonthlyCosts] = useState(0);
  const [retailMargin, setRetailMargin] = useState(0.55);
  const [wholesaleMargin, setWholesaleMargin] = useState(0.30);

  // Dynamic lists - INICIAN VACÍAS
  const [ingredients, setIngredients] = useState([]);
  const [packaging, setPackaging] = useState([]);

  // Technical sheet modal
  const [showTechSheet, setShowTechSheet] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Load preset or passed formula
  useEffect(() => {
    if (loadedFormula) {
      applyFormulaData(loadedFormula);
    }
  }, [loadedFormula]);

  const applyFormulaData = (data) => {
    setFormulaName(data.name || '');
    setSubsector(data.subsector || 'SR-01');
    setBatchUnits(data.batchUnits || 1);
    setLossPercentage(data.lossPercentage || 5);
    setHoursLote(data.hoursLote || 0);
    setHourlyRate(data.hourlyRate || 0);
    setCifLote(data.cifLote || 0);
    setFixedMonthlyCosts(data.fixedMonthlyCosts || 0);
    setRetailMargin(data.retailMargin || 0.55);
    setWholesaleMargin(data.wholesaleMargin || 0.30);
    setIngredients(data.ingredients || []);
    setPackaging(data.packaging || []);
  };

  const resetToCleanState = () => {
    setFormulaName('');
    setSubsector('SR-01');
    setBatchUnits(1);
    setLossPercentage(5);
    setHoursLote(0);
    setHourlyRate(0);
    setCifLote(0);
    setFixedMonthlyCosts(0);
    setRetailMargin(0.55);
    setWholesaleMargin(0.30);
    setIngredients([]);
    setPackaging([]);
  };

  const handlePresetSelect = (presetId) => {
    const preset = PRESET_FORMULAS.find(p => p.id === presetId);
    if (preset) {
      applyFormulaData(preset);
    }
  };

  // REACTIVE MATH COMPUTATION ENGINE
  const results = calculateBatchCosting({
    ingredients,
    packaging,
    batchUnits,
    lossPercentage,
    hoursLote,
    hourlyRate,
    cifLote,
    fixedMonthlyCosts,
    retailMargin,
    wholesaleMargin
  });

  // Ingredient Handlers
  const addIngredient = () => {
    const newIng = {
      id: Date.now().toString(),
      name: '',
      inci: '',
      matrixPrice: 0,
      matrixQty: 1,
      matrixUnit: 'g',
      formulaQty: 0,
      formulaUnit: 'g'
    };
    setIngredients([...ingredients, newIng]);
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id) {
        return { ...ing, [field]: value };
      }
      return ing;
    }));
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  // Packaging Handlers
  const addPackagingItem = () => {
    const newPkg = {
      id: Date.now().toString(),
      name: '',
      priceUnit: 0,
      qtyPerProduct: 1
    };
    setPackaging([...packaging, newPkg]);
  };

  const updatePackagingItem = (id, field, value) => {
    setPackaging(packaging.map(pkg => {
      if (pkg.id === id) {
        return { ...pkg, [field]: value };
      }
      return pkg;
    }));
  };

  const removePackagingItem = (id) => {
    setPackaging(packaging.filter(pkg => pkg.id !== id));
  };

  // Save handler
  const handleSave = () => {
    if (!formulaName.trim()) {
      alert('Por favor ingresa un nombre para tu formulación antes de guardar.');
      return;
    }
    const formulaPayload = {
      id: loadedFormula?.id || `formula-${Date.now()}`,
      name: formulaName,
      subsector,
      batchUnits,
      lossPercentage,
      hoursLote,
      hourlyRate,
      cifLote,
      fixedMonthlyCosts,
      retailMargin,
      wholesaleMargin,
      ingredients,
      packaging,
      costingResults: results,
      updatedAt: new Date().toISOString()
    };
    onSaveFormula(formulaPayload);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Module Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-900 via-charcoal-900 to-clay-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-clay-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Motor Reactivo de Costeo • Módulo 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Calculadora de Costo por Lote & Punto de Equilibrio
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Cálculo reactivo desde cero. Ingresa tus propios materiales, unidades ($g, Kg, ml, L, gotas$), empaques y costos operativos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={resetToCleanState}
              className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-1.5 transition-all"
              title="Limpiar campos e iniciar desde cero"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Limpiar Formulario</span>
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Fórmula</span>
            </button>
            <button
              onClick={() => setShowTechSheet(true)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Ficha Técnica</span>
            </button>
          </div>
        </div>

        {/* Optional Presets Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>¿Deseas cargar una plantilla de ejemplo?</span>
          </div>
          <div className="w-full sm:w-auto flex flex-wrap gap-2">
            {PRESET_FORMULAS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePresetSelect(p.id)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all truncate"
              >
                Cargar {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>¡Fórmula guardada exitosamente en tu catálogo local!</span>
        </div>
      )}

      {/* Main Grid: Inputs (Left 7 Cols) & Instant Results (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Config & Dynamic Lists */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* General Batch Config Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-charcoal-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Box className="w-5 h-5 text-sage-600" />
              <span>1. Configuración General del Lote de Producción</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Formulación</label>
                <input
                  type="text"
                  placeholder="Ej. Mi Sérum Hidratante Facial"
                  value={formulaName}
                  onChange={(e) => setFormulaName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unidades Terminadas por Lote ($U$)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Ej. 10"
                  value={batchUnits || ''}
                  onChange={(e) => setBatchUnits(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Factor de Merma ($FM$): <span className="text-clay-600 font-extrabold">{lossPercentage}%</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={lossPercentage}
                    onChange={(e) => setLossPercentage(parseFloat(e.target.value) || 0)}
                    className="w-full accent-clay-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-500 min-w-[35px]">{lossPercentage}%</span>
                </div>
                <span className="text-[10px] text-slate-400">Merma típica en cosmética: 3% a 8%</span>
              </div>
            </div>

            {/* Direct Labor & CIF */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Horas Invertidas en Lote</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  value={hoursLote || ''}
                  onChange={(e) => setHoursLote(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tarifa Horaria ($Bs/h$)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0"
                  value={hourlyRate || ''}
                  onChange={(e) => setHourlyRate(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CIF Prorrateados ($Bs.$)</label>
                <input
                  type="number"
                  step="5"
                  min="0"
                  placeholder="0"
                  value={cifLote || ''}
                  onChange={(e) => setCifLote(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Costos Fijos Totales del Taller ($Bs/Mes$)</label>
              <input
                type="number"
                step="50"
                min="0"
                placeholder="0"
                value={fixedMonthlyCosts || ''}
                onChange={(e) => setFixedMonthlyCosts(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-sage-500"
              />
              <span className="text-[10px] text-slate-400">Usado para calcular el Punto de Equilibrio mensual (Alquiler, servicios, licencias)</span>
            </div>
          </div>

          {/* Dynamic Ingredients Section */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-charcoal-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-sage-600" />
                <span>2. Materias Primas e Insumos Activos ({ingredients.length})</span>
              </h2>
              <button
                onClick={addIngredient}
                className="px-3 py-1.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Insumo</span>
              </button>
            </div>

            {ingredients.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs font-semibold text-slate-500">No hay materias primas agregadas</p>
                <p className="text-[11px] text-slate-400">Haz clic en <strong>"+ Añadir Insumo"</strong> para comenzar a ingresar tus ingredientes.</p>
                <button
                  onClick={addIngredient}
                  className="mt-1 px-3 py-1.5 rounded-xl bg-sage-600 text-white text-xs font-bold shadow-sm"
                >
                  + Añadir Primer Insumo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {ingredients.map((ing, idx) => (
                  <div 
                    key={ing.id}
                    className="p-4 rounded-2xl bg-linen-50/70 border border-slate-200/80 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full">
                        Ingrediente #{idx + 1}
                      </span>
                      <button
                        onClick={() => removeIngredient(ing.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Eliminar insumo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Nombre Comercial</label>
                        <input
                          type="text"
                          placeholder="Ej. Aceite de Coco / Agua Desmineralizada"
                          value={ing.name}
                          onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Nomenclatura INCI</label>
                        <input
                          type="text"
                          placeholder="Ej. Cocos Nucifera Oil / Aqua"
                          value={ing.inci}
                          onChange={(e) => updateIngredient(ing.id, 'inci', e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Matrix Purchase & Formula Usage */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-200/60">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500">Precio Compra Matriz ($Bs.$)</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="0"
                          value={ing.matrixPrice || ''}
                          onChange={(e) => updateIngredient(ing.id, 'matrixPrice', parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500">Cant. Compra Matriz</label>
                        <div className="flex gap-1">
                          <input
                            type="number"
                            placeholder="1"
                            value={ing.matrixQty || ''}
                            onChange={(e) => updateIngredient(ing.id, 'matrixQty', parseFloat(e.target.value) || 0)}
                            className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold text-slate-900"
                          />
                          <select
                            value={ing.matrixUnit}
                            onChange={(e) => updateIngredient(ing.id, 'matrixUnit', e.target.value)}
                            className="w-1/2 bg-white border border-slate-300 rounded-lg p-1 text-[11px] font-semibold text-slate-800"
                          >
                            {Object.keys(UNIT_CONVERSIONS).map(u => (
                              <option key={u} value={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500">Cant. Usada en Fórmula</label>
                        <div className="flex gap-1">
                          <input
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={ing.formulaQty || ''}
                            onChange={(e) => updateIngredient(ing.id, 'formulaQty', parseFloat(e.target.value) || 0)}
                            className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-bold text-slate-900"
                          />
                          <select
                            value={ing.formulaUnit}
                            onChange={(e) => updateIngredient(ing.id, 'formulaUnit', e.target.value)}
                            className="w-1/2 bg-white border border-slate-300 rounded-lg p-1 text-[11px] font-semibold text-slate-800"
                          >
                            {Object.keys(UNIT_CONVERSIONS).map(u => (
                              <option key={u} value={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="bg-white p-1.5 rounded-lg border border-slate-200 text-right">
                        <span className="block text-[9px] font-bold text-slate-400">Costo Insumo Lote</span>
                        <span className="text-xs font-black text-sage-700">
                          {formatBs(results.evaluatedIngredients[idx]?.itemCost || 0)}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Packaging Section */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-charcoal-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-clay-600" />
                <span>3. Componentes de Packaging y Envase ($CP$) ({packaging.length})</span>
              </h2>
              <button
                onClick={addPackagingItem}
                className="px-3 py-1.5 rounded-xl bg-clay-50 hover:bg-clay-100 text-clay-800 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Empaque</span>
              </button>
            </div>

            {packaging.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs font-semibold text-slate-500">No hay elementos de packaging agregados</p>
                <p className="text-[11px] text-slate-400">Agrega frascos, tapas, etiquetas o cajas secundarias.</p>
                <button
                  onClick={addPackagingItem}
                  className="mt-1 px-3 py-1.5 rounded-xl bg-clay-500 text-white text-xs font-bold shadow-sm"
                >
                  + Añadir Primer Empaque
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {packaging.map((pkg) => (
                  <div key={pkg.id} className="flex items-center gap-3 p-3 rounded-2xl bg-linen-50 border border-slate-200">
                    <input
                      type="text"
                      placeholder="Ej. Frasco Gotero de Vidrio 30ml / Etiqueta Frontal"
                      value={pkg.name}
                      onChange={(e) => updatePackagingItem(pkg.id, 'name', e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
                    />
                    <div className="w-28 flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-400">Bs.</span>
                      <input
                        type="number"
                        step="0.10"
                        placeholder="0.00"
                        value={pkg.priceUnit || ''}
                        onChange={(e) => updatePackagingItem(pkg.id, 'priceUnit', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <button
                      onClick={() => removePackagingItem(pkg.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Instant Reactive Results Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="sticky top-24 space-y-6">
            
            {/* Result Primary Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-charcoal-900 via-sage-900 to-charcoal-800 text-white shadow-2xl space-y-6 border border-sage-500/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-clay-400 animate-pulse" />
                  <h3 className="font-extrabold text-base tracking-tight">Resultados del Algoritmo</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-clay-500/20 text-clay-300 border border-clay-500/30">
                  Reactivo en Tiempo Real
                </span>
              </div>

              {/* CUP Highlight */}
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center space-y-1">
                <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">
                  Costo Unitario de Producción (CUP)
                </span>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                  {formatBs(results.cup)}
                </p>
                <span className="text-[11px] text-slate-400 block pt-1">
                  Costo total por cada frasco/unidad terminada
                </span>
              </div>

              {/* Cost Breakdown Items */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">MP Bruto Lote:</span>
                  <span className="font-bold text-white">{formatBs(results.rawMPTotal)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">MP con Merma ({lossPercentage}%):</span>
                  <span className="font-bold text-clay-300">{formatBs(results.mpWithLoss)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Packaging Total Lote ($CP$):</span>
                  <span className="font-bold text-white">{formatBs(results.totalPackagingBatch)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Mano de Obra ($MOD$):</span>
                  <span className="font-bold text-white">{formatBs(results.modTotal)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Costos Indirectos ($CIF$):</span>
                  <span className="font-bold text-white">{formatBs(results.cifTotal)}</span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm">
                  <span className="font-bold text-sage-300">Costo Total del Lote:</span>
                  <span className="font-black text-white">{formatBs(results.totalBatchCost)}</span>
                </div>
              </div>

              {/* Margins & Suggested Prices Sliders */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">Margen Minorista (B2C):</span>
                    <span className="text-emerald-400">{(retailMargin * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.20"
                    max="0.80"
                    step="0.05"
                    value={retailMargin}
                    onChange={(e) => setRetailMargin(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-1 bg-white/10 p-2.5 rounded-xl border border-white/10">
                    <span className="text-xs font-semibold text-slate-300">PVP Sugerido (B2C):</span>
                    <span className="text-lg font-extrabold text-emerald-400">{formatBs(results.pvpRetail)}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">Margen Mayorista (B2B):</span>
                    <span className="text-cyan-400">{(wholesaleMargin * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.50"
                    step="0.05"
                    value={wholesaleMargin}
                    onChange={(e) => setWholesaleMargin(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-1 bg-white/10 p-2.5 rounded-xl border border-white/10">
                    <span className="text-xs font-semibold text-slate-300">Precio Mayorista (B2B):</span>
                    <span className="text-base font-bold text-cyan-400">{formatBs(results.priceWholesale)}</span>
                  </div>
                </div>
              </div>

              {/* Break-Even Point Box */}
              <div className="p-4 rounded-2xl bg-clay-500/20 border border-clay-500/40 space-y-1">
                <span className="text-[11px] font-extrabold text-clay-300 uppercase tracking-wider block">
                  Punto de Equilibrio Mensual:
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">{results.breakEvenUnits} Unidades / mes</span>
                  <span className="text-xs font-bold text-clay-300">{formatBs(results.breakEvenRevenue)}</span>
                </div>
                <p className="text-[10px] text-slate-300 pt-1">
                  Ventas mensuales necesarias para cubrir costos fijos de {formatBs(fixedMonthlyCosts)}.
                </p>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Fórmula</span>
                </button>
                <button
                  onClick={() => setShowTechSheet(true)}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Exportar Ficha</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Technical Sheet Modal */}
      {showTechSheet && (
        <TechnicalSheetModal
          formulaName={formulaName || 'Formulación Cosmética'}
          subsector={subsector}
          batchUnits={batchUnits}
          results={results}
          onClose={() => setShowTechSheet(false)}
        />
      )}

    </div>
  );
}
