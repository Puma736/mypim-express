import React from 'react';
import { 
  ShieldCheck, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { formatBs } from '../utils/costingEngine';

export default function Dashboard({ 
  brandProfile, 
  completedSteps, 
  totalSteps, 
  formalizationPercentage, 
  savedFormulas, 
  onNavigate,
  onLoadFormula,
  onOpenProfile
}) {
  
  // Calculate average profit margin of saved formulas
  const avgRetailMargin = savedFormulas.length > 0
    ? (savedFormulas.reduce((acc, f) => acc + (f.costingResults?.safeRetailMargin || 0.55), 0) / savedFormulas.length) * 100
    : 55;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Brand Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-800 via-sage-900 to-charcoal-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-sage-300 text-xs font-bold tracking-wider uppercase mb-1">
            <Building2 className="w-4 h-4" />
            <span>{brandProfile.city || 'Santa Cruz de la Sierra'} • Subrubro: {brandProfile.subsector || 'Cosmética Natural'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ¡Hola, {brandProfile.name || 'Creador(a) de Belleza'}!
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Bienvenido al panel de control de tu marca. Aquí puedes supervisar tu avance en la ruta legal boliviana y gestionar el costeo reactivo de tus formulaciones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
          >
            <span>Editar Perfil</span>
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className="px-5 py-2.5 rounded-xl bg-clay-500 hover:bg-clay-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Fórmula</span>
          </button>
        </div>
      </div>

      {/* Termómetro de Formalización (Barra de Progreso %) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal-900">Termómetro de Formalización Legal</h2>
              <p className="text-xs text-slate-500">Progreso según normativa SEPREC, SIN, GAM y AGEMED</p>
            </div>
          </div>
          <span className="text-2xl font-black text-sage-600">{formalizationPercentage}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
          <div 
            className="h-full bg-gradient-to-r from-sage-500 via-clay-500 to-sage-600 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${formalizationPercentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
          <span>{completedSteps} de {totalSteps} Requisitos Completados</span>
          <button 
            onClick={() => onNavigate('legal')}
            className="text-sage-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>Continuar Checklist Legal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Fórmulas en Catálogo</p>
            <p className="text-2xl font-extrabold text-charcoal-900">{savedFormulas.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-clay-100 text-clay-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Margen Promedio B2C</p>
            <p className="text-2xl font-extrabold text-charcoal-900">{avgRetailMargin.toFixed(0)}%</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Estado AGEMED (NSO)</p>
            <p className="text-sm font-bold text-amber-800">
              {formalizationPercentage >= 80 ? 'Listo para Notificar' : 'En Preparación'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Subrubro Activo</p>
            <p className="text-xs font-bold text-charcoal-900 truncate max-w-[130px]">
              {brandProfile.subsector || 'SR-01 Cosmética'}
            </p>
          </div>
        </div>

      </div>

      {/* Main Module Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module 1 Card */}
        <div 
          onClick={() => onNavigate('legal')}
          className="group cursor-pointer p-6 rounded-3xl bg-white border border-slate-200 hover:border-sage-400 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center group-hover:bg-sage-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Módulo 1
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-sage-700 transition-colors">
              Ruta Legal & Notificación AGEMED
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Checklist normativo para SEPREC, SIN, GAM y etiquetado INCI oficial.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-sage-700 group-hover:translate-x-1 transition-transform">
            <span>Abrir Módulo Legal</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Module 2 Card */}
        <div 
          onClick={() => onNavigate('calculator')}
          className="group cursor-pointer p-6 rounded-3xl bg-white border border-slate-200 hover:border-clay-400 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-clay-50 text-clay-600 flex items-center justify-center group-hover:bg-clay-600 group-hover:text-white transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Módulo 2
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-clay-700 transition-colors">
              Calculadora de Costeo por Lote
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Motor reactivo para calcular CUP, mermas, packaging, PVP B2C/B2B y Punto de Equilibrio.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-clay-700 group-hover:translate-x-1 transition-transform">
            <span>Ir a Calculadora</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Module 3 Card */}
        <div 
          onClick={() => onNavigate('academy')}
          className="group cursor-pointer p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Módulo 3
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-amber-800 transition-colors">
              Academia Financiera & Kits
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Píldoras educativas (PEPS, Sueldo del fundador) y simulador de combos para ferias.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
            <span>Explorar Lecciones</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

      {/* Saved Formulas Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-charcoal-900">Catálogo de Fórmulas Creadas</h2>
            <p className="text-xs text-slate-500">Selecciona cualquier fórmula para cargarla directamente en el motor de costeo</p>
          </div>
          <button
            onClick={() => onNavigate('calculator')}
            className="px-4 py-2 rounded-xl bg-sage-50 text-sage-800 text-xs font-bold hover:bg-sage-100 transition-colors"
          >
            + Nueva Fórmula
          </button>
        </div>

        {savedFormulas.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calculator className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-600">Aún no tienes fórmulas guardadas</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Crea tu primera fórmula en la Calculadora de Costos para analizar el costo por lote y punto de equilibrio.
            </p>
            <button
              onClick={() => onNavigate('calculator')}
              className="mt-2 px-4 py-2 rounded-xl bg-sage-600 text-white text-xs font-bold shadow-sm"
            >
              Comenzar a Costear
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedFormulas.map((formula) => (
              <div 
                key={formula.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-sage-400 bg-linen-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-sage-800">
                      {formula.subsector || 'Fórmula Cosmética'}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Lote: {formula.batchUnits} Unidades
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">{formula.name}</h3>
                </div>

                {/* Quick Math Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-center">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">CUP (Unitario)</span>
                    <span className="text-xs font-black text-charcoal-900">
                      {formatBs(formula.costingResults?.cup || 0)}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">PVP (Minorista)</span>
                    <span className="text-xs font-black text-sage-700">
                      {formatBs(formula.costingResults?.pvpRetail || 0)}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">P. Equilibrio</span>
                    <span className="text-xs font-black text-clay-700">
                      {formula.costingResults?.breakEvenUnits || 0} U/mes
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onLoadFormula(formula)}
                    className="w-full py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Cargar en Calculadora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
