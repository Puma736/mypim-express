import React, { useState } from 'react';
import { Sparkles, ShieldCheck, User, LogIn, MessageSquare, Menu, X, Award, BarChart3, Calculator, BookOpen, Users } from 'lucide-react';

export default function Navbar({ 
  user, 
  brandProfile, 
  formalizationPercentage, 
  onOpenProfile, 
  onOpenAuth, 
  onOpenAdvisory,
  activeTab, 
  setActiveTab 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'onboarding', label: 'Diagnóstico', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'legal', label: 'Ruta Legal', icon: ShieldCheck },
    { id: 'calculator', label: 'Calculadora', icon: Calculator },
    { id: 'academy', label: 'Academia', icon: BookOpen },
    { id: 'mentoring', label: 'Mentores UAGRM', icon: Users },
    { id: 'impact', label: 'Métricas Impacto', icon: Award }
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('landing')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sage-500 to-rose-500 flex items-center justify-center shadow-md shadow-sage-500/20 text-white">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-charcoal-900">
                  MY PIM <span className="text-sage-600">EXPRESS</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Beauty & Cosmetics
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden xs:block">
                RegTech & Costeo • Hackatón HACKBIZ 2026 UAGRM
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-sage-700 shadow-sm'
                      : 'text-stone-600 hover:text-charcoal-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sage-600' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Formalization badge */}
            <button
              onClick={() => handleTabChange('legal')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold hover:bg-sage-100 transition-colors"
              title="Termómetro de Formalización Legal"
            >
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span className="hidden md:inline">Formalización:</span>
              <strong>{formalizationPercentage}%</strong>
            </button>

            {/* User Profile or Login */}
            {user ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-stone-200 hover:border-sage-400 text-stone-700 hover:text-sage-700 shadow-sm transition-all text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="max-w-[100px] truncate hidden xs:inline">
                  {user.brandName || user.name || 'Mi Marca'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white shadow-sm transition-all text-xs font-bold"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Ingresar</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`p-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-sage-50 text-sage-700 border border-sage-200'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sage-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              onOpenAdvisory();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Solicitar Asesoría Legal / Mentorio</span>
          </button>
        </div>
      )}
    </header>
  );
}
