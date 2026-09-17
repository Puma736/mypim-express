import React from 'react';
import { Sparkles, ShieldCheck, User, LogIn, MessageSquare, Award, FileText } from 'lucide-react';

export default function Header({ 
  user, 
  brandProfile, 
  formalizationPercentage, 
  onOpenProfile, 
  onOpenAuth, 
  onOpenAdvisory,
  activeTab, 
  setActiveTab 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-sage-500 to-clay-500 flex items-center justify-center shadow-md shadow-sage-500/20 text-white">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-charcoal-900">
                  MY PIM <span className="text-sage-600">EXPRESS</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-clay-100 text-clay-700 border border-clay-200">
                  Incubadora Legal
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden xs:block">
                Gestión de Trámites & Formalización | Santa Cruz de la Sierra
              </p>
            </div>
          </div>

          {/* Navigation Links - Enfoque Incubadora Legal */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-sage-700 shadow-sm'
                  : 'text-slate-600 hover:text-charcoal-900 hover:bg-white/50'
              }`}
            >
              Mis Trámites
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'legal'
                  ? 'bg-white text-sage-700 shadow-sm'
                  : 'text-slate-600 hover:text-charcoal-900 hover:bg-white/50'
              }`}
            >
              Ruta Legal & AGEMED
            </button>
            <button
              onClick={() => setActiveTab('academy')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'academy'
                  ? 'bg-white text-sage-700 shadow-sm'
                  : 'text-slate-600 hover:text-charcoal-900 hover:bg-white/50'
              }`}
            >
              Guías de Incubación
            </button>
          </nav>

          {/* User Profile, Auth & Advisory Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Solicitar Gestión Directa CTA */}
            <button
              onClick={onOpenAdvisory}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-clay-500 hover:bg-clay-600 text-white text-xs font-bold shadow-md transition-all"
              title="Gestión Completa de Trámites por la Incubadora"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Solicitar Gestión</span>
            </button>

            {/* Formalization badge */}
            <button
              onClick={() => setActiveTab('legal')}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold hover:bg-sage-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span>Avance Legal: <strong>{formalizationPercentage}%</strong></span>
            </button>

            {/* Auth / Profile Button */}
            {user ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200 hover:border-sage-400 text-slate-700 hover:text-sage-700 shadow-sm transition-all text-xs sm:text-sm font-semibold"
              >
                <div className="w-7 h-7 rounded-xl bg-clay-100 text-clay-700 flex items-center justify-center font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <span className="max-w-[120px] truncate hidden xs:inline">
                  {user.brandName || user.name || 'Mi Emprendimiento'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white shadow-sm transition-all text-xs sm:text-sm font-bold"
              >
                <LogIn className="w-4 h-4" />
                <span>Ingresar / Registro</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
