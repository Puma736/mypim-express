import React, { useState } from 'react';
import { Sparkles, Building2, Store, ShieldCheck, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { SUBSECTORS } from '../../../utils/legalData';
import { BOLIVIAN_MARKETS } from '../../../data/mockData';

export default function OnboardingModule({ brandProfile, onSaveProfile, onFinishOnboarding }) {
  const [name, setName] = useState(brandProfile.name || '');
  const [subsector, setSubsector] = useState(brandProfile.subsector || 'SR-01');
  const [salesChannel, setSalesChannel] = useState(brandProfile.salesChannel || BOLIVIAN_MARKETS[0].name);
  const [formalizationStage, setFormalizationStage] = useState(brandProfile.formalizationStage || 'Informal');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...brandProfile,
      name: name || 'Mi Emprendimiento Cosmético',
      subsector,
      salesChannel,
      formalizationStage
    };
    onSaveProfile(updated);
    onFinishOnboarding();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl space-y-8">
        
        {/* Onboarding Banner Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo 0 • Diagnóstico Dinámico</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight">
            ¡Bienvenido a My PiM Express!
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto">
            Configura tu diagnóstico inicial en 1 minuto. Adaptado para emprendedores de mercados populares y canales digitales en Santa Cruz de la Sierra.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Brand Name Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              1. Nombre de tu Emprendimiento o Marca
            </label>
            <input
              type="text"
              required
              placeholder="Ej. BioCosmética Chiquitana / Lash Studio Santa Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:border-sage-500"
            />
          </div>

          {/* Subsector Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              2. Selecciona tu Subrubro Técnico Cosmético:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUBSECTORS.map((sub) => {
                const isSelected = subsector === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSubsector(sub.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                      isSelected
                        ? 'bg-sage-50 border-sage-500 text-sage-900 shadow-sm ring-1 ring-sage-500'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-sage-700">[{sub.code}]</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-sage-600" />}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm">{sub.name}</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">{sub.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sales Channel Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              3. ¿Cuál es tu Canal de Venta Principal?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BOLIVIAN_MARKETS.map((market) => {
                const isSelected = salesChannel === market.name;
                return (
                  <button
                    key={market.id}
                    type="button"
                    onClick={() => setSalesChannel(market.name)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{market.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formalization Current Stage */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              4. Estado Actual de Formalización:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Informal', label: 'Persona Natural / Informal' },
                { id: 'En trámite', label: 'En Trámite (SEPREC / NIT)' },
                { id: 'Formalizado', label: '100% Formalizado' }
              ].map((stage) => {
                const isSelected = formalizationStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setFormalizationStage(stage.id)}
                    className={`p-3 rounded-2xl border text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    {stage.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sage-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Guardar Diagnóstico y Ver Ruta Legal</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </form>

      </div>
    </div>
  );
}
