import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X, LayoutDashboard, ShieldCheck, Calculator, MessageCircle, Home, ClipboardList } from 'lucide-react';

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'registro',     label: 'Mi Negocio',     icon: Scissors },
  { id: 'rts',          label: 'Impuesto RTS',   icon: ShieldCheck },
  { id: 'costeo',       label: 'Costeo',         icon: Calculator },
  { id: 'diagnostico',  label: 'Diagnóstico',    icon: ClipboardList },
  { id: 'whatsapp',     label: 'Enviar Reporte', icon: MessageCircle },
];

export default function Header({ activeTab, setActiveTab }) {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (tab) => { setActiveTab(tab); setOpen(false); };

  return (
    <>
      <header className={`sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-rose-100 transition-shadow ${scrolled ? 'shadow-md shadow-rose-100/60' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20 gap-4">

          {/* Logo */}
          <button onClick={() => go('landing')} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-gold-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-base leading-tight text-charcoal-900">
                MY PIM <span className="text-rose-500">EXPRESS</span>
              </p>
              <p className="text-[10px] text-slate-400 font-medium">Belleza & Estética · SCZ · HACKBIZ 2026</p>
            </div>
            <span className="sm:hidden font-extrabold text-sm text-charcoal-900">
              PIM <span className="text-rose-500">EXPRESS</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {NAV.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => go(id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === id
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-slate-500 hover:text-charcoal-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-rose-300 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 z-50 w-[80vw] max-w-xs bg-white shadow-2xl flex flex-col animate-slide-left">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-rose-600 to-gold-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-sm">MY PIM EXPRESS</p>
                  <p className="text-[10px] text-white/70">HACKBIZ 2026 · Belleza & Estética SCZ</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
              {[{ id: 'landing', label: 'Inicio', icon: Home }, ...NAV].map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => go(id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all ${
                    activeTab === id
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === id ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{label}</span>
                  {activeTab === id && <div className="ml-auto w-2 h-2 rounded-full bg-rose-500" />}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
