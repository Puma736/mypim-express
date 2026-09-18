import React, { useState } from 'react';
import { MessageCircle, Send, Copy, CheckCircle2 } from 'lucide-react';
import { generarMensajeWhatsApp } from '../utils/costingEngine.js';

/**
 * Bloque 3 — Botón de acción final WhatsApp
 *
 * Genera el resumen completo (estética + costeo + RTS) y abre
 * WhatsApp directamente con el mensaje pre-formateado.
 *
 * Props:
 *   estetica     — objeto de la estética registrada
 *   servicio     — resultado del motor de costeo
 *   rts          — resultado del motor RTS
 *   numeroSoporte — número del equipo de soporte (con código de país, sin + ni espacios)
 */
export default function WhatsAppButton({
  estetica,
  servicio,
  rts,
  numeroSoporte = '59176000000',   // Reemplazar con el número real del equipo HACKBIZ
}) {
  const [copied, setCopied] = useState(false);

  const mensaje = generarMensajeWhatsApp({ estetica, servicio, rts });
  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlWhatsApp = `https://wa.me/${numeroSoporte}?text=${mensajeCodificado}`;

  const handleCopiar = () => {
    navigator.clipboard.writeText(mensaje).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const tieneData = estetica || servicio || rts;

  return (
    <div className="space-y-3">

      {/* Botón principal WhatsApp */}
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base text-white shadow-lg transition-all
          ${tieneData
            ? 'bg-[#25D366] hover:bg-[#1ebe5a] shadow-green-500/30 hover:scale-[1.01] active:scale-[0.99]'
            : 'bg-slate-300 cursor-not-allowed pointer-events-none'
          }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span>Enviar Reporte por WhatsApp</span>
        <Send className="w-4 h-4" />
      </a>

      {/* Botón secundario: copiar texto */}
      <button
        onClick={handleCopiar}
        disabled={!tieneData}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm border transition-all
          ${tieneData
            ? 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            : 'border-slate-100 text-slate-300 cursor-not-allowed'
          }`}
      >
        {copied
          ? <><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span className="text-emerald-600">¡Copiado al portapapeles!</span></>
          : <><Copy className="w-4 h-4" /><span>Copiar texto del reporte</span></>
        }
      </button>

      {/* Vista previa del mensaje */}
      {tieneData && (
        <details className="group">
          <summary className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-slate-600 select-none py-1">
            Ver vista previa del mensaje →
          </summary>
          <pre className="mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {mensaje}
          </pre>
        </details>
      )}

      {!tieneData && (
        <p className="text-center text-xs text-slate-400">
          Completa al menos un módulo para habilitar el envío por WhatsApp.
        </p>
      )}
    </div>
  );
}
