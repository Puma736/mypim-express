/**
 * Red de Mentoría Transdisciplinaria - UAGRM
 * Hackatón HACKBIZ 2026 - Universidad Autónoma Gabriel René Moreno
 */

export const UAGRM_MENTORS = [
  {
    id: 'm1',
    name: 'Univ. Valeria Justiniano',
    faculty: 'Facultad de Ciencias Contables, Auditoría y Control de Gestión (UAGRM)',
    career: 'Contabilidad Pública (8vo Semestre)',
    specialty: 'Contabilidad Básica & Registro de Caja',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewsCount: 38,
    phone: '+59178901234',
    bio: 'Especialista en estructuración contable para microempresas de cosmética natural en Santa Cruz.'
  },
  {
    id: 'm2',
    name: 'Univ. Carlos Eduardo Banegas',
    faculty: 'Facultad de Ciencias Jurídicas y Políticas (UAGRM)',
    career: 'Derecho (9no Semestre)',
    specialty: 'Trámites SEPREC & Licencias GAMSCZ',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    reviewsCount: 45,
    phone: '+59171234567',
    bio: 'Asesoría en constitución de empresas unipersonales, homonimia y licencias municipales de bioseguridad.'
  },
  {
    id: 'm3',
    name: 'Univ. Andrea Soliz Mercado',
    faculty: 'Facultad de Ciencias Económicas y Financieras (UAGRM)',
    career: 'Ingeniería Financiera (8vo Semestre)',
    specialty: 'Validación de Costos de Jabonería & Margen B2C',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewsCount: 29,
    phone: '+59175678901',
    bio: 'Experta en análisis de punto de equilibrio, costo por lote de producción y prorrateo de CIF.'
  },
  {
    id: 'm4',
    name: 'Lic. Mateo Roca Vaca',
    faculty: 'Facultad de Ciencias Farmacéuticas y Bioquímicas (UAGRM)',
    career: 'Bioquímica y Farmacia (Egresado)',
    specialty: 'Regencia Farmacéutica & Notificación NSO AGEMED',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    reviewsCount: 52,
    phone: '+59176789012',
    bio: 'Orientación técnica en etiquetado cualitativo INCI, BPM de taller y requisitos de registro sanitario NSO.'
  }
];

/**
 * Genera un enlace directo a WhatsApp con mensaje pre-llenado
 */
export function generateMentorWhatsappLink(mentor, userProfile, formalizationPercentage) {
  const brandName = userProfile.brandName || userProfile.name || 'Mi Emprendimiento';
  const market = userProfile.salesChannel || 'Santa Cruz de la Sierra';
  const subsector = userProfile.subsector || 'Cosmética Natural';

  const message = `¡Hola ${mentor.name}! Te contacto a través de My PiM Express (UAGRM). Mi emprendimiento es "${brandName}" (${subsector}, ${market}). Tengo un avance del ${formalizationPercentage}% en mi ruta legal y quisiera tu asesoría en "${mentor.specialty}".`;

  return `https://wa.me/${mentor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
