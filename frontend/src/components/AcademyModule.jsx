import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle,
  Percent,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  ACADEMY_LESSONS, 
  SAMPLE_KIT_PRODUCTS 
} from '../utils/academyData';
import { formatBs } from '../utils/costingEngine';

export default function AcademyModule() {
  const [activeLesson, setActiveLesson] = useState(ACADEMY_LESSONS[0]);

  // Combo / Kit Simulator State
  const [kitName, setKitName] = useState('Kit Rutina Facial Anti-Edad');
  const [selectedKitProducts, setSelectedKitProducts] = useState([
    SAMPLE_KIT_PRODUCTS[0], // Sérum Ácido Hialurónico
    SAMPLE_KIT_PRODUCTS[1], // Jabón Artesanal
    SAMPLE_KIT_PRODUCTS[2]  // Bálsamo Labial
  ]);

  const [comboDiscountPercentage, setComboDiscountPercentage] = useState(15); // 15% discount combo

  // Add Product to Kit
  const addProductToKit = (product) => {
    setSelectedKitProducts([...selectedKitProducts, { ...product, instanceId: Date.now() }]);
  };

  const removeProductFromKit = (indexToRemove) => {
    setSelectedKitProducts(selectedKitProducts.filter((_, idx) => idx !== indexToRemove));
  };

  // Math for Kit Simulator
  const totalKitCUP = selectedKitProducts.reduce((sum, p) => sum + p.cup, 0);
  const totalKitRegularPVP = selectedKitProducts.reduce((sum, p) => sum + p.defaultPvp, 0);

  const discountAmount = totalKitRegularPVP * (comboDiscountPercentage / 100);
  const comboPrice = Math.max(totalKitCUP * 1.1, totalKitRegularPVP - discountAmount);

  const comboProfit = comboPrice - totalKitCUP;
  const comboMarginPercentage = comboPrice > 0 ? (comboProfit / comboPrice) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Module Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900 via-charcoal-900 to-clay-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Educación Financiera & Estrategia • Módulo 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Academia Financiera para Creadores de Belleza
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Microcápsulas de aprendizaje rápido adaptadas a la realidad boliviana y simulador interactivo de combos para ferias artesanales.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Financial Micro-Lessons & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lesson List (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-charcoal-900 px-1">
            Micro-Píldoras de Aprendizaje
          </h2>

          <div className="space-y-3">
            {ACADEMY_LESSONS.map((lesson) => {
              const isSelected = activeLesson.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-charcoal-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-amber-800'
                    }`}>
                      {lesson.category}
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {lesson.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug">{lesson.title}</h3>
                  <p className={`text-xs line-clamp-2 ${
                    isSelected ? 'text-white/90' : 'text-slate-500'
                  }`}>
                    {lesson.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Lesson Reader (Right 8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              {activeLesson.category} • Lectura de {activeLesson.readTime}
            </span>
            <h2 className="text-2xl font-black text-charcoal-900">{activeLesson.title}</h2>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {activeLesson.content}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold block">Conclusión Clave:</span>
              <p>{activeLesson.takeaway}</p>
            </div>
          </div>
        </div>

      </div>

      {/* SIMULADOR INTERACTIVO DE COMBOS Y KITS DE BELLEZA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-clay-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Herramienta Comercial para Ferias y Festivales</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-charcoal-900">
              Simulador de Combos & Kits de Belleza
            </h2>
            <p className="text-xs text-slate-500">
              Combina varios productos cosméticos en un pack promocional sin arruinar tu margen de utilidad.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kit Builder (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Kit / Combo</label>
              <input
                type="text"
                value={kitName}
                onChange={(e) => setKitName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              />
            </div>

            {/* Product Selector Catalog */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500">
                Selecciona Productos para Agregar al Kit:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_KIT_PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => addProductToKit(prod)}
                    className="p-3 rounded-2xl bg-linen-50 hover:bg-sage-50 border border-slate-200 hover:border-sage-300 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{prod.name}</h4>
                      <span className="text-[10px] text-slate-500 block">PVP Regular: {formatBs(prod.defaultPvp)}</span>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-white text-sage-600 flex items-center justify-center border border-slate-200 group-hover:bg-sage-600 group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Products List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Productos Seleccionados en este Pack ({selectedKitProducts.length}):
              </h3>

              {selectedKitProducts.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                  Agrega al menos 1 producto al kit para comenzar la simulación.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedKitProducts.map((prod, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{prod.name}</span>
                        <div className="text-[10px] text-slate-400 space-x-2">
                          <span>CUP: {formatBs(prod.cup)}</span>
                          <span>•</span>
                          <span>PVP: {formatBs(prod.defaultPvp)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeProductFromKit(idx)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Combo Discount Slider */}
            <div className="p-4 rounded-2xl bg-linen-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700">Descuento Promocional del Combo:</span>
                <span className="text-clay-600 font-extrabold">{comboDiscountPercentage}% OFF</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={comboDiscountPercentage}
                onChange={(e) => setComboDiscountPercentage(parseInt(e.target.value))}
                className="w-full accent-clay-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">
                Ofrecer entre 10% y 20% de descuento estimula la venta impulsiva en ferias de belleza.
              </span>
            </div>

          </div>

          {/* Kit Math Results Card (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-charcoal-900 to-amber-950 text-white shadow-xl space-y-6">
              <h3 className="font-extrabold text-base border-b border-white/10 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Análisis Financiero del Kit</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Suma CUP del Pack:</span>
                  <span className="font-bold text-white">{formatBs(totalKitCUP)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Precio Regular por Separado:</span>
                  <span className="font-bold text-slate-400 line-through">{formatBs(totalKitRegularPVP)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Ahorro para el Cliente ({comboDiscountPercentage}%):</span>
                  <span className="font-bold text-clay-400">-{formatBs(discountAmount)}</span>
                </div>
              </div>

              {/* Combo Price Big Badge */}
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  Precio Final de Venta del Combo
                </span>
                <p className="text-3xl font-black text-amber-400">{formatBs(comboPrice)}</p>
              </div>

              {/* Profit & Margin Metrics */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-300 font-bold block">Ganancia por Pack</span>
                  <span className="text-lg font-black text-emerald-300">{formatBs(comboProfit)}</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <span className="text-[10px] text-amber-300 font-bold block">Margen del Combo</span>
                  <span className="text-lg font-black text-amber-300">{comboMarginPercentage.toFixed(0)}%</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 text-center font-medium pt-2 border-t border-white/10">
                ¡Excelente estrategia! Mantienes un margen del {comboMarginPercentage.toFixed(0)}% mientras atraes clientes en tu stand.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
