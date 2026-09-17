import React from 'react';
import { Heart, Sparkles, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-stone-400 py-8 border-t border-stone-800 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-white font-bold">
          <div className="w-6 h-6 rounded-lg bg-sage-500 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span>MY PIM EXPRESS — Cosmetics & Beauty Edition</span>
        </div>

        <p className="text-center md:text-left text-stone-400">
          Modelo de Negocio Canvas • Hackatón <strong className="text-white">HACKBIZ 2026</strong> (UAGRM - Santa Cruz de la Sierra).
        </p>

        <div className="flex items-center gap-1 text-stone-400">
          <span>Desarrollado con</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>para emprendedores bolivianos</span>
        </div>
      </div>
    </footer>
  );
}
