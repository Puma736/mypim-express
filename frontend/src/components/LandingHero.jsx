import React from 'react';
import { Sparkles, Calculator, ShieldCheck, BookOpen, Leaf, Users, TrendingUp, ArrowRight, Award } from 'lucide-react';

export default function LandingHero({ onStartCalculator, onStartLegal, onStartAcademy }) {
  return (
    <div className="relative overflow-hidden py-8 sm:py-16 bg-gradient-to-b from-linen-50 via-white to-linen-50">
      
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sage-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-clay-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hackbiz 2026 Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sage-100 via-clay-100 to-sage-100 border border-sage-200 text-sage-800 text-xs sm:text-sm font-semibold shadow-sm">
            <Award className="w-4 h-4 text-clay-600 animate-bounce" />
            <span>Hackatón HACKBIZ 2026 - UAGRM | Solución de Triple Impacto</span>
          </div>
        </div>

        {/* Hero Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
            Impulsa tu Marca Cosmética & Dermocosmética en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-clay-500">Bolivia</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
            La primera plataforma RegTech y consultor financiero de bolsillo diseñado para emprendedoras, formuladores artesanales y profesionales de la estética en Santa Cruz, La Paz, Cochabamba y El Alto.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartCalculator}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-sage-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calculator className="w-5 h-5" />
              <span>Calcular Costo por Lote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={onStartLegal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base sm:text-lg border border-slate-300 shadow-md flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldCheck className="w-5 h-5 text-clay-500" />
              <span>Ver Ruta Legal & INCI</span>
            </button>
          </div>
        </div>

        {/* Triple Impact Value Cards */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-200/40 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mb-6">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">1. Sostenibilidad Ambiental</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fomenta el aprovechamiento responsable de botánicos amazónicos y chiquitanos, reduciendo el desperdicio de materia prima mediante cálculo reactivo de mermas (3%-8%) y envases biodegradables.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-200/40 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-clay-100 text-clay-600 flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">2. Empleo Juvenil & Mujer</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Empodera a jóvenes graduados y mujeres creadoras de cosmética natural, convirtiendo pasatiempos artesanales en microempresas rentables con valoración de mano de obra justa ($MOD$).
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-200/40 transition-transform hover:-translate-y-1">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">3. Formalización Progresiva</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Desmitifica la burocracia en Bolivia. Guía paso a paso para SEPREC, NIT, Licencias Municipales, BPM y Notificación Sanitaria Obligatoria ante AGEMED (CAN 516/833).
            </p>
          </div>

        </div>

        {/* Feature Grid Shortcut */}
        <div className="mt-12 bg-gradient-to-r from-sage-900 via-charcoal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Sparkles className="w-96 h-96 text-white" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="px-3 py-1 rounded-full bg-sage-500/20 text-sage-300 text-xs font-semibold border border-sage-500/30">
                Solución Todo-en-Uno
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                Diseñado para la realidad del emprendedor boliviano
              </h2>
              <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
                Precios en Bolivianos ($Bs.$), conversión automática de unidades ($gotas, ml, L, g, Kg$), generador de etiquetas INCI y simulador de combos para ferias.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={onStartCalculator}
                className="w-full px-6 py-3.5 rounded-xl bg-clay-500 hover:bg-clay-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Calculator className="w-4 h-4" />
                <span>Ir a Calculadora de Costos</span>
              </button>
              <button
                onClick={onStartAcademy}
                className="w-full px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Academia Financiera</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
