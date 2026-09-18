import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Info, MessageCircle } from 'lucide-react';

// ── Número de WhatsApp del equipo ────────────────────────────────
const WHATSAPP_NUMBER = "59170000000"; // TODO: cambiar por el número real

// ── Pasos del diagnóstico ────────────────────────────────────────
const STEPS = [
  {
    id: 'nombre',
    title: '¿Cómo te llamas?',
    type: 'text',
    placeholder: 'Tu nombre',
  },
  {
    id: 'tipo',
    title: '¿Qué tipo de negocio tienes?',
    type: 'choice',
    options: ['Peluquería', 'Salón de belleza', 'Estética', 'Barbería', 'Otro'],
  },
  {
    id: 'zona',
    title: '¿En qué mercado o zona atiendes?',
    type: 'choice',
    options: ['Mercado Mutualista', 'La Ramada', 'Comercial Norte', 'Otra zona'],
  },
  {
    id: 'tiempo',
    title: '¿Hace cuánto tienes tu negocio?',
    type: 'choice',
    options: ['Menos de 1 año', '1 a 3 años', 'Más de 3 años'],
  },
  {
    id: 'ventas',
    title: '¿Aproximadamente cuánto vendes al mes?',
    type: 'choice',
    options: ['Menos de Bs 2.000', 'Bs 2.000–7.000', 'Bs 7.000–15.000', 'Más de Bs 15.000'],
  },
  {
    id: 'empleadas',
    title: '¿Trabajas sola o tienes empleadas?',
    type: 'choice',
    options: ['Sola', '1-2 empleadas', '3 o más'],
  },
  {
    id: 'nit',
    title: '¿Ya tienes NIT o alguna vez emitiste factura?',
    type: 'choice',
    options: ['Sí', 'No', 'No sé qué es eso'],
  },
  {
    id: 'preocupacion',
    title: '¿Qué es lo que más te preocupa hoy?',
    type: 'choice',
    options: [
      'Miedo a una multa',
      'No sé cuánto cobrar',
      'Quiero acceder a un préstamo',
      'No sé qué documentos necesito',
    ],
  },
  {
    id: 'telefono',
    title: '¿A qué WhatsApp te enviamos tu diagnóstico?',
    type: 'tel',
    placeholder: 'Ej: 70000000',
  },
];

// ── Lógica de diagnóstico ────────────────────────────────────────
function getDiagnosis(answers) {
  const altasVentas =
    answers.ventas === 'Bs 7.000–15.000' || answers.ventas === 'Más de Bs 15.000';
  const tieneEquipo = answers.empleadas !== 'Sola';

  if (answers.nit === 'No sé qué es eso') {
    return {
      type: 'neutral',
      badgeText: 'Empecemos desde cero',
      title: 'Tranquila, es más común de lo que crees',
      text: 'Antes de cualquier trámite, un estudiante te va a llamar para explicarte todo desde cero, sin apuro y sin tecnicismos.',
      docs: ['Tu carnet de identidad', 'Datos básicos de tu negocio (nada más, por ahora)'],
    };
  }
  if (altasVentas || tieneEquipo) {
    return {
      type: 'warn',
      badgeText: 'Probable Régimen General',
      title: 'Te convendría el Régimen General, con NIT y facturación',
      text: 'Por tu nivel de ventas o por tener empleadas, esto te abre la puerta a créditos más grandes, aunque necesita un poco más de papeleo. Un asesor va a armar tu caso paso a paso.',
      docs: [
        'Carnet de identidad',
        'Croquis o referencia de tu local',
        'Detalle de ingresos aproximados',
        'Datos de tus empleadas (si tienes)',
      ],
    };
  }
  return {
    type: 'ok',
    badgeText: 'Probable Régimen Simplificado (RTS)',
    title: 'Calificarías para el Régimen Simplificado',
    text: 'Es el más sencillo y barato para empezar. Un asesor te escribirá para confirmarlo y ayudarte a sacarlo.',
    docs: [
      'Carnet de identidad',
      'Croquis de tu local',
      'Formulario de inscripción (te ayudamos a llenarlo)',
    ],
  };
}

function buildWhatsappMessage(answers, diag, wantsCombo) {
  const lines = [
    wantsCombo
      ? '¡Hola! Hice mi diagnóstico en MY PIM EXPRESS y quiero el Combo Salón Seguro (Bs 250).'
      : 'Hola, hice mi diagnóstico en MY PIM EXPRESS y quería más información.',
    '',
    `Nombre: ${answers.nombre || '-'}`,
    `Negocio: ${answers.tipo || '-'} — ${answers.zona || '-'}`,
    `Tiempo operando: ${answers.tiempo || '-'}`,
    `Ventas aprox: ${answers.ventas || '-'}`,
    `Empleadas: ${answers.empleadas || '-'}`,
    `¿Tiene NIT?: ${answers.nit || '-'}`,
    `Preocupación principal: ${answers.preocupacion || '-'}`,
    `Diagnóstico sugerido: ${diag.badgeText}`,
    `Mi WhatsApp: ${answers.telefono || '-'}`,
  ];
  return lines.join('\n');
}

// ── Barra de progreso ────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-mono text-slate-400">
          Paso {current + 1} de {total}
        </span>
        <span className="text-xs font-mono text-rose-400">{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Badge de resultado ───────────────────────────────────────────
function DiagnosisBadge({ type, text }) {
  const styles = {
    ok: 'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
    warn: 'bg-amber-900/50 text-amber-300 border border-amber-700',
    neutral: 'bg-slate-700/50 text-slate-300 border border-slate-600',
  };
  const icons = {
    ok: <CheckCircle className="w-3.5 h-3.5" />,
    warn: <AlertTriangle className="w-3.5 h-3.5" />,
    neutral: <Info className="w-3.5 h-3.5" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono mb-4 ${styles[type]}`}
    >
      {icons[type]}
      {text}
    </span>
  );
}

// ── Componente principal ─────────────────────────────────────────
export default function DiagnosticoModule() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const step = STEPS[current];
  const totalSteps = STEPS.length;

  function isValid() {
    const val = answers[step?.id];
    return val && String(val).trim().length > 0;
  }

  function handleChoice(value) {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleText(e) {
    setAnswers((prev) => ({ ...prev, [step.id]: e.target.value }));
  }

  function handleNext() {
    if (!isValid()) return;
    if (current + 1 >= totalSteps) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function handleBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function handleReset() {
    setAnswers({});
    setCurrent(0);
    setDone(false);
  }

  // ── Pantalla de resultado ──────────────────────────────────────
  if (done) {
    const diag = getDiagnosis(answers);
    const comboUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildWhatsappMessage(answers, diag, true)
    )}`;
    const infoUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildWhatsappMessage(answers, diag, false)
    )}`;

    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 shadow-xl">
          <div className="h-1.5 bg-rose-500 rounded-full mb-6" />
          <DiagnosisBadge type={diag.type} text={diag.badgeText} />
          <h2 className="text-xl font-bold text-white mb-3 leading-snug">{diag.title}</h2>
          <p className="text-slate-400 text-sm mb-4">{diag.text}</p>
          <p className="text-sm font-semibold text-slate-300 mb-2">Alista estos documentos:</p>
          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1 mb-6">
            {diag.docs.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="grid gap-3">
            <a
              href={comboUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-[#0B2E1B] font-bold py-3.5 px-6 rounded-xl text-sm transition hover:opacity-90"
            >
              <MessageCircle className="w-4 h-4" />
              Sí, quiero el Combo Salón Seguro (Bs 250)
            </a>
            <a
              href={infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-slate-600 text-slate-300 font-semibold py-3.5 px-6 rounded-xl text-sm transition hover:bg-slate-700"
            >
              Todavía no, solo quería saber
            </a>
            <button
              onClick={handleReset}
              className="text-slate-500 text-xs underline text-center mt-1 hover:text-slate-300 transition"
            >
              Hacer el diagnóstico de nuevo
            </button>
          </div>
          <p className="text-[11px] text-slate-600 border-t border-slate-700 mt-5 pt-4">
            Este es un diagnóstico preliminar y gratuito. No reemplaza una asesoría tributaria formal.
          </p>
        </div>
      </div>
    );
  }

  // ── Pantalla de preguntas ──────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 shadow-xl min-h-[360px] flex flex-col">
        <ProgressBar current={current} total={totalSteps} />
        <h2 className="text-lg font-bold text-white mb-5 leading-snug">{step.title}</h2>

        {step.type === 'choice' && (
          <div className="grid gap-2.5 mb-auto">
            {step.options.map((opt) => {
              const selected = answers[step.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleChoice(opt)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all ${
                    selected
                      ? 'border-rose-500 bg-rose-500/15 text-rose-300'
                      : 'border-charcoal-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {(step.type === 'text' || step.type === 'tel') && (
          <div className="mb-auto">
            <input
              type={step.type}
              value={answers[step.id] || ''}
              onChange={handleText}
              placeholder={step.placeholder}
              className="w-full bg-charcoal-900 border border-charcoal-600 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-rose-500 transition"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-charcoal-700">
          {current > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-slate-400 text-sm font-semibold hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={handleNext}
            disabled={!isValid()}
            className="flex items-center gap-2 bg-rose-600 text-white font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-500 transition"
          >
            {current + 1 === totalSteps ? 'Ver mi diagnóstico' : 'Continuar'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
