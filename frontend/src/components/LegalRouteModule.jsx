import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Sparkles, 
  FileText, 
  Tag, 
  AlertTriangle, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  ExternalLink,
  Award
} from 'lucide-react';
import { 
  LEGAL_STEPS, 
  LEGAL_DISCLAIMER, 
  CITIES, 
  SUBSECTORS 
} from '../utils/legalData';

export default function LegalRouteModule({ 
  selectedCity, 
  setSelectedCity, 
  selectedSubsector, 
  setSelectedSubsector, 
  completedStepIds, 
  onToggleStep,
  onOpenInciGenerator
}) {
  const [openStepId, setOpenStepId] = useState('step-seprec');

  const selectedCityObj = CITIES.find(c => c.id === selectedCity) || CITIES[0];
  const selectedSubsectorObj = SUBSECTORS.find(s => s.id === selectedSubsector) || SUBSECTORS[0];

  // Calculate completion percentage
  let totalChecklistCount = 0;
  let completedChecklistCount = 0;

  LEGAL_STEPS.forEach(step => {
    step.checklist.forEach(item => {
      totalChecklistCount++;
      if (completedStepIds.includes(item.id)) {
        completedChecklistCount++;
      }
    });
  });

  const legalPercentage = totalChecklistCount > 0 
    ? Math.round((completedChecklistCount / totalChecklistCount) * 100) 
    : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-900 via-charcoal-900 to-sage-800 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sage-300 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>RegTech Bolivia • Módulo 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ruta Legal & Notificación Sanitaria AGEMED
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Paso a paso ordenado para formalizar tu microempresa cosmética bajo la normativa boliviana y Decisiones de la Comunidad Andina (CAN 516 / 833).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenInciGenerator}
              className="px-5 py-3 rounded-2xl bg-clay-500 hover:bg-clay-600 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <Tag className="w-4 h-4" />
              <span>Generar Etiqueta INCI</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Requisitos</span>
            </button>
          </div>
        </div>

        {/* Selectors: City & Subsector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              1. Selecciona tu Ciudad / Alcaldía Municipal (GAM):
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-sage-400"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.gamName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              2. Selecciona tu Subrubro Cosmético:
            </label>
            <select
              value={selectedSubsector}
              onChange={(e) => setSelectedSubsector(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-sage-400"
            >
              {SUBSECTORS.map(s => (
                <option key={s.id} value={s.id}>[{s.code}] {s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mandatory Legal Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Aviso Legal Regulatorio Obligatorio</span>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>

      {/* Progress & Subsector Info Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center font-extrabold text-xl">
            {legalPercentage}%
          </div>
          <div>
            <h3 className="font-bold text-charcoal-900 text-base">Progreso de Requisitos Cumplidos</h3>
            <p className="text-xs text-slate-500">
              {completedChecklistCount} de {totalChecklistCount} tareas completadas para {selectedCityObj.name}.
            </p>
          </div>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-linen-50 border border-slate-200 text-xs space-y-1">
          <span className="font-bold text-slate-700 block">Categoría de Riesgo Técnico:</span>
          <span className="font-semibold text-clay-700 bg-clay-50 px-2 py-0.5 rounded border border-clay-200">
            {selectedSubsectorObj.riskCategory}
          </span>
          <p className="text-slate-500 text-[11px] pt-1">{selectedSubsectorObj.description}</p>
        </div>
      </div>

      {/* Interactive Accordion Steps */}
      <div id="printable-area" className="space-y-4">
        <h2 className="text-xl font-bold text-charcoal-900 px-1">
          Etapas Secuenciales de la Ruta Legal
        </h2>

        {LEGAL_STEPS.map((step, idx) => {
          const isOpen = openStepId === step.id;
          const stepChecklist = step.checklist;
          const stepCompletedCount = stepChecklist.filter(item => completedStepIds.includes(item.id)).length;
          const isFullyCompleted = stepCompletedCount === stepChecklist.length;

          return (
            <div 
              key={step.id} 
              className={`rounded-3xl border transition-all bg-white ${
                isFullyCompleted 
                  ? 'border-sage-300 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Accordion Header */}
              <div 
                onClick={() => setOpenStepId(isOpen ? null : step.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isFullyCompleted 
                      ? 'bg-sage-600 text-white' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-sage-600">
                        {step.stage}
                      </span>
                      {isFullyCompleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sage-100 text-sage-800">
                          Completado
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-charcoal-900 mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                    {stepCompletedCount}/{stepChecklist.length} Tareas
                  </span>
                  <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                  
                  {/* Stage Summary Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-linen-50/80 border border-slate-200/60 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Institución:</span>
                      <span className="font-bold text-slate-800">{step.institution}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Tiempo Estimado:</span>
                      <span className="font-bold text-slate-800">{step.duration}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Costo Aproximado:</span>
                      <span className="font-bold text-clay-700">{step.cost}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.summary}
                  </p>

                  {/* Checklist Items */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Checklist de Requisitos (Haz clic para marcar como completado):
                    </h4>
                    {stepChecklist.map((item) => {
                      const isChecked = completedStepIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => onToggleStep(item.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                            isChecked
                              ? 'bg-sage-50/60 border-sage-300 text-sage-900 font-medium'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0 text-sage-600">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-sage-600 fill-sage-100" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <span className="text-xs sm:text-sm leading-snug">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Expert Tip Box */}
                  <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-sage-900 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    <span><strong>Tip para Bolivia:</strong> {step.tips}</span>
                  </div>

                  {/* Special CTA for INCI step */}
                  {step.id === 'step-inci-label' && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenInciGenerator}
                        className="w-full py-3.5 rounded-2xl bg-clay-500 hover:bg-clay-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <Tag className="w-4 h-4" />
                        <span>Abrir Generador de Etiqueta INCI Interactivo</span>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
