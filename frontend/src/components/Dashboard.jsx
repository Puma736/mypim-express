import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  AlertCircle,
  MessageSquare,
  Tag
} from 'lucide-react';

export default function Dashboard({ 
  brandProfile, 
  completedSteps, 
  totalSteps, 
  formalizationPercentage, 
  onNavigate,
  onOpenProfile,
  onOpenAdvisory
}) {
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Brand Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-800 via-sage-900 to-charcoal-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-sage-300 text-xs font-bold tracking-wider uppercase mb-1">
            <Building2 className="w-4 h-4" />
            <span>Incubadora Legal • Santa Cruz de la Sierra • Subrubro: {brandProfile.subsector || 'Cosmética Natural'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ¡Hola, {brandProfile.name || 'Emprendimiento Cosmético'}!
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Bienvenido al panel de seguimiento de trámites legales de tu incubadora. Supervisa el avance de tus registros en SEPREC, Impuestos Nacionales, GAMSCZ y AGEMED.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center gap-2"
          >
            <span>Editar Datos</span>
          </button>
          <button
            onClick={onOpenAdvisory}
            className="px-5 py-2.5 rounded-xl bg-clay-500 hover:bg-clay-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Solicitar Gestión</span>
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
              <p className="text-xs text-slate-500">Progreso según normativa SEPREC, SIN, GAMSCZ y AGEMED</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Estado de Trámites Legales</p>
            <p className="text-xl font-extrabold text-charcoal-900">
              {completedSteps} Completados
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Notificación AGEMED (NSO)</p>
            <p className="text-sm font-bold text-amber-800">
              {formalizationPercentage >= 80 ? 'Listo para Notificar' : 'En Preparación de Requisitos'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-clay-100 text-clay-700 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Municipio Activo</p>
            <p className="text-xs font-bold text-charcoal-900 truncate max-w-[150px]">
              Santa Cruz de la Sierra
            </p>
          </div>
        </div>

      </div>

      {/* Core Incubator Services Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module Legal Service Card */}
        <div 
          onClick={() => onNavigate('legal')}
          className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage-400 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center group-hover:bg-sage-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-sage-100 text-sage-800">
              Servicio Principal
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-sage-700 transition-colors">
              Ruta Legal & Notificación AGEMED
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Guía paso a paso por subrubro cosmético: SEPREC, SIN (NIT), Licencia Municipal GAMSCZ, BPM de Taller y Generador de Etiquetas INCI oficial.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs sm:text-sm font-bold text-sage-700 group-hover:translate-x-1 transition-transform">
            <span>Iniciar o Revisar Trámites</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Module Incubator Advisory Card */}
        <div 
          onClick={onOpenAdvisory}
          className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-clay-400 shadow-sm hover:shadow-md transition-all space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-clay-50 text-clay-600 flex items-center justify-center group-hover:bg-clay-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-clay-100 text-clay-800">
              Gestión Personalizada
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-clay-700 transition-colors">
              Solicitar Gestión Directa por la Incubadora
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Deja que nuestro equipo legal y Regente Farmacéutico se encarguen de tramitar tu Matrícula, Licencia GAMSCZ y NSO ante AGEMED.
            </p>
          </div>
          <div className="pt-2 flex items-center text-xs sm:text-sm font-bold text-clay-700 group-hover:translate-x-1 transition-transform">
            <span>Contactar Asesor Legal por WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

    </div>
  );
}
