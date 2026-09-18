import React from 'react';
import { Scissors, Calculator, ShieldCheck, ArrowRight, MessageCircle, Star, MapPin, TrendingUp, Zap } from 'lucide-react';

const STATS = [
  { value: '8 Rangos', label: 'RTS Bolivia (SIN)', icon: ShieldCheck, color: 'from-rose-500 to-rose-700' },
  { value: 'Bs. 15', label: 'CIF diario calculado', icon: Zap, color: 'from-gold-500 to-gold-700' },
  { value: '4 Mercados', label: 'Mutualista · La Ramada · y más', icon: MapPin, color: 'from-rose-400 to-gold-500' },
  { value: '100% Bs.', label: 'Precios en Bolivianos', icon: TrendingUp, color: 'from-emerald-500 to-emerald-700' },
];

const FEATURES = [
  { icon: Scissors,      title: 'Registro de tu Negocio',     desc: 'Guarda los datos de tu peluquería, estética, salón de uñas o spa: nombre, mercado, propietaria y capital.' },
  { icon: ShieldCheck,   title: 'Simulador RTS Bolivia',      desc: 'Descubre tu categoría tributaria y cuánto pagas al SIN cada dos meses.' },
  { icon: Calculator,    title: 'Costeo de Servicios',        desc: 'Calcula el precio real de cualquier servicio: tinte, keratina, manicura, corte, extensiones y más.' },
  { icon: MessageCircle, title: 'Reporte por WhatsApp',       desc: 'Envía el resumen completo de costeo e impuesto a tu equipo con un solo toque.' },
];

export default function LandingHero({ onStart }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-white to-cream-50">

      {/* Blobs decorativos */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-gold-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Hero ─────────────────────────────────── */}
        <div className="pt-12 sm:pt-20 pb-8 text-center">

          {/* Badge hackathon */}
          <div className="animate-fade-in-up stagger-1 flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-rose-100 to-gold-100 border border-rose-200 text-rose-800 text-sm font-semibold shadow-sm">
              <Star className="w-4 h-4 text-gold-500 fill-gold-400" />
              Hackatón <strong>HACKBIZ 2026</strong> · UAGRM · Santa Cruz, Bolivia
            </div>
          </div>

          <h1 className="animate-fade-in-up stagger-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
            Gestión financiera para
            <br />
            <span className="gradient-text">el sector de belleza & estética</span>
          </h1>

          <p className="animate-fade-in-up stagger-3 mt-5 text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Para <strong className="text-charcoal-900">peluquerías, centros de estética, salones de uñas, spas, barberías y lashistas</strong> en
            <strong className="text-charcoal-900"> Santa Cruz de la Sierra</strong>.
            Calcula precios reales y conoce tu impuesto RTS en segundos.
          </p>

          <div className="animate-fade-in-up stagger-4 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStart('registro')}
              className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              <Scissors className="w-5 h-5" />
              Registrar mi Negocio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onStart('costeo')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 text-slate-700 font-bold text-lg shadow-md flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              <Calculator className="w-5 h-5 text-rose-500" />
              Calcular Precio
            </button>
          </div>

          <p className="animate-fade-in stagger-5 mt-4 text-xs text-slate-400">
            ✓ Sin registro · ✓ Gratis · ✓ Funciona sin internet · ✓ En Bolivianos
          </p>
        </div>

        {/* ── Stats ────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`animate-fade-in-up stagger-${i + 1} p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:-translate-y-0.5 transition-all text-center space-y-3`}>
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mx-auto shadow-md`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-charcoal-900 stat-number">{s.value}</p>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Features ─────────────────────────────── */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-5 pb-16">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`animate-fade-in-up stagger-${i + 1} flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:border-rose-300 hover:shadow-md transition-all`}>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 border border-rose-100">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-charcoal-900 text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
