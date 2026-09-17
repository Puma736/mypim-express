import React from 'react';
import { Award, TrendingUp, ShieldCheck, CreditCard, Users, Sparkles, Building2 } from 'lucide-react';
import { CANVAS_HACKBIZ_METRICS } from '../../../data/mockData';

export default function ImpactMetricsModule() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-charcoal-900 via-sage-900 to-charcoal-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sage-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Evaluación Modelo Canvas • Hackatón HACKBIZ 2026 UAGRM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tablero de Métricas de Impacto Social & Económico
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              Evaluación del triple impacto de My PiM Express en la formalización, acceso al crédito e incremento de ventas de microempresas en Santa Cruz de la Sierra.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Emprendimientos Formalizados</span>
            <p className="text-3xl font-black text-charcoal-900">{CANVAS_HACKBIZ_METRICS.formalizedBusinesses}</p>
            <span className="text-[11px] text-sage-700 font-bold block pt-1">SEPREC, NIT, GAMSCZ y AGEMED</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Aptos para Crédito Bancario</span>
            <p className="text-3xl font-black text-charcoal-900">{CANVAS_HACKBIZ_METRICS.bankCreditEligible}</p>
            <span className="text-[11px] text-rose-600 font-bold block pt-1">Con respaldo contable PEPS</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Crecimiento Ventas Promedio</span>
            <p className="text-3xl font-black text-charcoal-900">+{CANVAS_HACKBIZ_METRICS.averageSalesGrowthPercentage}%</p>
            <span className="text-[11px] text-amber-800 font-bold block pt-1">Por costeo de mermas y kits</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 block">Empleos Juveniles Impulsados</span>
            <p className="text-3xl font-black text-charcoal-900">{CANVAS_HACKBIZ_METRICS.youthJobsCreated}</p>
            <span className="text-[11px] text-emerald-800 font-bold block pt-1">Jóvenes formuladores UAGRM</span>
          </div>
        </div>

      </div>

      {/* Canvas Summary Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-charcoal-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-sage-600" />
          <span>Alianza Estratégica UAGRM & Entidades Públicas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="font-bold text-sage-800 block">Mentores Universitarios UAGRM</span>
            <p className="text-stone-600 leading-relaxed">
              {CANVAS_HACKBIZ_METRICS.mentorshipSessionsCount} sesiones de mentoría completadas por estudiantes de Contabilidad, Finanzas y Derecho.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="font-bold text-rose-800 block">Mercados Populares Cobertura</span>
            <p className="text-stone-600 leading-relaxed">
              Atención directa a comerciantes de La Ramada, Mutualista y Comercial Norte en Santa Cruz.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="font-bold text-amber-800 block">Triple Impacto Sostenible</span>
            <p className="text-stone-600 leading-relaxed">
              Erradicación del desperdicio de materias primas e inclusión financiera de mujeres emprendedoras.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
