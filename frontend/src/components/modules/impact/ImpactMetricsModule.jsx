import React, { useState } from 'react';
import { Award, TrendingUp, ShieldCheck, CreditCard, Users, Sparkles, Building2, CheckCircle2, DollarSign, Layers, ArrowRight, HelpCircle } from 'lucide-react';
import { CANVAS_HACKBIZ_METRICS } from '../../../data/mockData';

export default function ImpactMetricsModule() {
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'metrics'

  const canvasBlocks = [
    {
      title: 'Socios Clave',
      icon: Users,
      color: 'bg-sage-50 text-sage-800 border-sage-200',
      items: [
        'Instituciones Públicas (SIN, SEPREC, Municipios)',
        'Universidades - UAGRM',
        'Estudiantes de último semestre de Contabilidad, Finanzas, Derecho'
      ]
    },
    {
      title: 'Actividades Clave',
      icon: CheckCircle2,
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      items: [
        'Diseñar rutas de formalización paso a paso',
        'Combos de capacitación en contabilidad básica, educación financiera y costeo'
      ]
    },
    {
      title: 'Recursos Clave',
      icon: Layers,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      items: [
        'Plataforma web interactiva',
        'Equipo de estudiantes de últimos semestres y egresados de carreras afines'
      ]
    },
    {
      title: 'Propuesta de Valor',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold shadow-sm',
      items: [
        'Plataforma que te ayuda a formalizar tu negocio y brinda servicios de educación financiera, asesoría legal y costeo'
      ]
    },
    {
      title: 'Relación con Clientes',
      icon: ShieldCheck,
      color: 'bg-stone-50 text-stone-800 border-stone-200',
      items: [
        'Asesoría directa y simple por WhatsApp y la plataforma web'
      ]
    },
    {
      title: 'Canales',
      icon: Building2,
      color: 'bg-clay-50 text-clay-800 border-clay-200',
      items: [
        'Redes sociales (TikTok, Facebook, WhatsApp, Instagram)',
        'Mercados (Mutualista, Ramada)',
        'Comercial Norte'
      ]
    },
    {
      title: 'Segmentos de Clientes',
      icon: Users,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
      items: [
        'Personas naturales que desarrollen actividades de comercio y prestación de servicios en el Sector Belleza'
      ]
    },
    {
      title: 'Costes de Estructura',
      icon: DollarSign,
      color: 'bg-[#FAF5F3] text-stone-800 border-stone-300',
      items: [
        'Costos por funcionamiento de la plataforma',
        'Honorarios a profesionales',
        'Comisión a estudiantes',
        'Costos operativos de tramitación'
      ]
    },
    {
      title: 'Fuentes de Ingresos',
      icon: TrendingUp,
      color: 'bg-[#F4F7F4] text-sage-900 border-sage-300 font-bold',
      items: [
        'Cobro por servicios de asesoría, formalización, costeo y educación financiera',
        'Patrocinios o alianzas'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-charcoal-900 via-sage-900 to-charcoal-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sage-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Modelo de Negocio Canvas B • HACKBIZ 2026 (UAGRM)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Plan de Negocio & Métricas de Impacto
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              Visualización completa del Canvas validado y evaluación del triple impacto en la formalización de comerciantes en Santa Cruz de la Sierra.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-800 p-1.5 rounded-2xl border border-stone-700">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'canvas' ? 'bg-sage-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Matriz Canvas B
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'metrics' ? 'bg-sage-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'
              }`}
            >
              Métricas Impacto
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'canvas' ? (
        /* Matriz Canvas B Completa (9 Bloques) */
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-charcoal-900">
                Matriz del Modelo de Negocio Canvas B (HACKBIZ UAGRM)
              </h2>
              <p className="text-xs text-stone-500">
                Propósito: Erradicar la desinformación para que el comerciante sea legal, crezca y acceda a créditos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {canvasBlocks.map((block, idx) => {
              const Icon = block.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border shadow-sm space-y-4 transition-all hover:shadow-md ${block.color}`}
                >
                  <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-charcoal-900">
                      <Icon className="w-5 h-5 text-sage-600" />
                    </div>
                    <h3 className="font-extrabold text-sm text-charcoal-900">{block.title}</h3>
                  </div>

                  <ul className="space-y-2 text-xs text-stone-700">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Problem & Purpose Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
              <h3 className="font-extrabold text-sm text-rose-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Problema Identificado</span>
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Desinformación acerca del proceso y costo de trámites para formalizarse.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <h3 className="font-extrabold text-sm text-emerald-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Propósito</span>
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Ayudar a que el comerciante sea legal, pueda crecer y acceda a créditos.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* Métricas de Impacto Cuantitativas */
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-500 block">Número de Negocios Formalizados</span>
                <p className="text-3xl font-black text-charcoal-900">{CANVAS_HACKBIZ_METRICS.formalizedBusinesses}</p>
                <span className="text-[11px] text-sage-700 font-bold block pt-1">Vía SEPREC, NIT, GAMSCZ y AGEMED</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-500 block">% Negocios con Acceso a Crédito</span>
                <p className="text-3xl font-black text-charcoal-900">
                  {Math.round((CANVAS_HACKBIZ_METRICS.bankCreditEligible / CANVAS_HACKBIZ_METRICS.formalizedBusinesses) * 100)}%
                </p>
                <span className="text-[11px] text-rose-600 font-bold block pt-1">Aptos para financiamiento bancario</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-500 block">Crecimiento de Ventas Promedio</span>
                <p className="text-3xl font-black text-charcoal-900">+{CANVAS_HACKBIZ_METRICS.averageSalesGrowthPercentage}%</p>
                <span className="text-[11px] text-amber-800 font-bold block pt-1">Por educación financiera y costeo</span>
              </div>
            </div>
          </div>

          {/* Business Canvas Financial Pillars */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-charcoal-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sage-600" />
              <span>Estructura de Costes & Fuentes de Ingresos</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-extrabold text-stone-800 uppercase block tracking-wider">
                  Costes de Estructura:
                </span>
                <ul className="space-y-1.5 text-stone-600 font-medium">
                  <li>• Costos por funcionamiento de la plataforma</li>
                  <li>• Honorarios a profesionales</li>
                  <li>• Comisión a estudiantes</li>
                  <li>• Costos operativos de tramitación</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-sage-50 border border-sage-200 space-y-2">
                <span className="font-extrabold text-sage-900 uppercase block tracking-wider">
                  Fuentes de Ingresos:
                </span>
                <ul className="space-y-1.5 text-sage-800 font-medium">
                  <li>• Cobro por servicios de asesoría, formalización, costeo y educación financiera</li>
                  <li>• Patrocinios o alianzas</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
