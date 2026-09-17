import React from 'react';
import { Users, GraduationCap, Star, MessageSquare, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { UAGRM_MENTORS, generateMentorWhatsappLink } from '../../../data/mentorsData';

export default function MentoringModule({ brandProfile, formalizationPercentage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sage-900 via-charcoal-900 to-rose-950 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Red de Mentoría Transdisciplinaria • UAGRM (Santa Cruz)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mentores Universitarios de la UAGRM
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              Conexión directa con estudiantes y egresados de último semestre de Contabilidad, Finanzas, Derecho y Farmacia para acompañarte en tu formalización.
            </p>
          </div>
        </div>
      </div>

      {/* Mentors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {UAGRM_MENTORS.map((mentor) => {
          const whatsappUrl = generateMentorWhatsappLink(mentor, brandProfile, formalizationPercentage);
          return (
            <div 
              key={mentor.id}
              className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-sage-400 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-sage-200 shadow-sm flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-charcoal-900 text-base">{mentor.name}</h3>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                        {mentor.rating} ({mentor.reviewsCount})
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-sage-700">{mentor.career}</p>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{mentor.faculty}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-linen-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-700 block">Especialidad de Asesoría:</span>
                  <span className="font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block">
                    {mentor.specialty}
                  </span>
                  <p className="text-stone-600 text-[11px] pt-1">{mentor.bio}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Solicitar Asesoría por WhatsApp</span>
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
