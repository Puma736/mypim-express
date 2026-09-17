import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function FloatingWhatsapp({ brandProfile }) {
  const handleWhatsappClick = () => {
    const brandName = brandProfile?.name || 'Mi Emprendimiento Cosmético';
    const city = brandProfile?.city || 'Santa Cruz de la Sierra';
    
    const message = `¡Hola! Vengo de la plataforma My PiM Express. Mi emprendimiento es "${brandName}" en ${city}. Quisiera hacer una consulta rápida sobre trámites SEPREC / AGEMED o mentoría de la UAGRM.`;
    
    window.open(`https://wa.me/59178901234?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsappClick}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group no-print"
      title="Soporte y Asesoría por WhatsApp"
    >
      <PhoneCall className="w-6 h-6 animate-pulse" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pr-1">
        Soporte WhatsApp UAGRM
      </span>
    </button>
  );
}
