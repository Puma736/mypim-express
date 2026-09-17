import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Building2,
  FileText,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const INCUBATOR_LESSONS = [
  {
    id: 'incubation-1',
    category: 'Formalización Comercial',
    title: 'Paso 1: Matrícula de Comercio en SEPREC',
    readTime: '3 min',
    summary: 'Cómo obtener el reconocimiento legal como Empresa Unipersonal o SRL en Santa Cruz de la Sierra.',
    content: `
### ¿Qué es el registro en SEPREC?
El Servicio Plurinacional del Registro de Comercio (SEPREC) es la entidad oficial donde se otorga la Matrícula de Comercio para operar legalmente en Bolivia.

#### Pasos de Gestión:
1. **Verificación de Homonimia:** Comprobar que el nombre comercial (ej. *BioCosmética Bolivia*) no esté registrado previamente.
2. **Carga de Documentación:** Cédula de Identidad y definición del objeto social.
3. **Obtención de Matrícula Digital:** Pago de arancel oficial (Bs. 260 Unipersonal / Bs. 455 SRL).

> **Nuestra Incubadora Gestiona:** Nos encargamos de todo el proceso de inscripción y reserva de nombre por ti.
    `,
    takeaway: 'La Matrícula SEPREC es el primer requisito legal para cualquier trámite posterior.'
  },
  {
    id: 'incubation-2',
    category: 'Bioseguridad y Municipio',
    title: 'Paso 2: Licencia Municipal en GAMSCZ & BPM',
    readTime: '4 min',
    summary: 'Requisitos de bioseguridad municipal para talleres artesanales y cabinas en Santa Cruz de la Sierra.',
    content: `
### Licencia de Funcionamiento en Santa Cruz de la Sierra
El Gobierno Autónomo Municipal de Santa Cruz de la Sierra (GAMSCZ) inspecciona las condiciones higiénicas y ambientales del espacio productivo.

#### Requisitos Básicos:
1. **Extintor PQS de 6kg** e inspección de bioseguridad.
2. **Superficies Lavables e Impermeables:** Azulejo, melamina sellada o acero inoxidable en el área de formulación.
3. **Uso Obligatorio de EPP:** Mandil, barbijo quirúrgico y cofia para el personal.

> **Nuestra Incubadora Gestiona:** Preparamos tu taller para la inspección municipal del GAMSCZ.
    `,
    takeaway: 'Las BPM Simplificadas garantizan que tu producto sea seguro y apto para registro ante AGEMED.'
  },
  {
    id: 'incubation-3',
    category: 'Regulación Sanitaria AGEMED',
    title: 'Paso 3: Notificación Sanitaria Obligatoria (NSO)',
    readTime: '4 min',
    summary: 'Normativa Andina CAN 516 / 833 para la comercialización legal de cosméticos en Bolivia.',
    content: `
### ¿Cómo funciona la Notificación NSO ante AGEMED?
Bajo la normativa de la Comunidad Andina (CAN 516 y 833), los productos cosméticos no requieren Registro Sanitario complejo de medicina, sino la Notificación Sanitaria Obligatoria (NSO).

#### Requisitos Clave:
* **Fórmula Cualitativa 100% INCI** en orden decreciente.
* **Patrocinio de Regente Farmacéutico acreditado.**
* **Ensayos microbiológicos y organolépticos de laboratorio.**
* **Proyecto de etiqueta con rotulado oficial.**

> **Nuestra Incubadora Gestiona:** Contamos con Regente Farmacéutico en nuestro equipo para presentar tu carpeta a AGEMED.
    `,
    takeaway: 'La Notificación NSO te autoriza a vender legalmente en supermercados, farmacias y ferias de Bolivia.'
  }
];

export default function AcademyModule() {
  const [activeLesson, setActiveLesson] = useState(INCUBATOR_LESSONS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Module Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-900 via-charcoal-900 to-clay-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sage-300 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Guías de Incubación Legal • Santa Cruz de la Sierra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Aprende el Proceso de Formalización
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Microcápsulas informativas para entender cómo nuestra incubadora gestiona tus trámites legales ante SEPREC, SIN, GAMSCZ y AGEMED.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Lessons List & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lesson List (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-charcoal-900 px-1">
            Pasos de Formalización
          </h2>

          <div className="space-y-3">
            {INCUBATOR_LESSONS.map((lesson) => {
              const isSelected = activeLesson.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-sage-600 text-white border-sage-700 shadow-md scale-[1.02]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-charcoal-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-sage-100 text-sage-800'
                    }`}>
                      {lesson.category}
                    </span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {lesson.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug">{lesson.title}</h3>
                  <p className={`text-xs line-clamp-2 ${
                    isSelected ? 'text-white/90' : 'text-slate-500'
                  }`}>
                    {lesson.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Lesson Reader (Right 8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-sage-700 uppercase tracking-wider block mb-1">
              {activeLesson.category} • Lectura de {activeLesson.readTime}
            </span>
            <h2 className="text-2xl font-black text-charcoal-900">{activeLesson.title}</h2>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {activeLesson.content}
          </div>

          <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-sage-900 text-xs font-semibold flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-sage-600 flex-shrink-0" />
            <div>
              <span className="font-bold block">Punto Clave:</span>
              <p>{activeLesson.takeaway}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
