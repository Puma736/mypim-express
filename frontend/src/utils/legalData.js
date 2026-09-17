/**
 * Ruta Legal Boliviana & Notificación Sanitaria AGEMED / CAN 516 & 833
 * Módulo de RegTech para Cosmética y Estética en Bolivia - HACKBIZ 2026
 */

export const LEGAL_DISCLAIMER = `DISCLAIMER LEGAL OBLIGATORIO: La plataforma My PiM Express provee orientación metodológica, educativa y checklists normativos basados en la legislación boliviana y decisiones de la Comunidad Andina (CAN 516 / 833). Esta guía no sustituye la representación legal profesional, el patrocinio de un Regente Farmacéutico acreditado ni los ensayos fisicoquímicos / microbiológicos exigidos oficialmente por la Agencia Estatal de Medicamentos y Tecnologías en Salud (AGEMED).`;

export const CITIES = [
  { id: 'scz', name: 'Santa Cruz de la Sierra', gamName: 'Gobierno Autónomo Municipal de Santa Cruz de la Sierra (GAMSCZ)' },
  { id: 'lp', name: 'La Paz', gamName: 'Gobierno Autónomo Municipal de La Paz (GAMLP)' },
  { id: 'cbba', name: 'Cochabamba', gamName: 'Gobierno Autónomo Municipal de Cochabamba (GAMC)' },
  { id: 'elalto', name: 'El Alto', gamName: 'Gobierno Autónomo Municipal de El Alto (GAMEA)' }
];

export const SUBSECTORS = [
  {
    id: 'SR-01',
    code: 'SR-01',
    name: 'Cosmética Natural y Artesanal',
    description: 'Jabonería botánica, champú sólido, mantecas corporales, aceites de macerado.',
    riskCategory: 'Bajo - Taller Artesanal',
    icon: 'Sparkles'
  },
  {
    id: 'SR-02',
    code: 'SR-02',
    name: 'Dermocosmética / Cuidado Facial y Capilar',
    description: 'Sérums activos, tónicos, cremas antiedad, mascarillas arcillosas, lociones.',
    riskCategory: 'Medio - Control Técnico de Insumos',
    icon: 'Droplet'
  },
  {
    id: 'SR-03',
    code: 'SR-03',
    name: 'Maquillaje y Pigmentación',
    description: 'Labiales, rubores ecológicos, sombras minerales, rímel botánico.',
    riskCategory: 'Medio - Control de Pigmentos Minerales',
    icon: 'Palette'
  },
  {
    id: 'SR-04',
    code: 'SR-04',
    name: 'Servicios de Belleza y Cabina',
    description: 'Lashistas, manicuristas, facialistas, diseño de cejas, cabinas de estética.',
    riskCategory: 'Bioseguridad y Biocidas Municipales',
    icon: 'Scissors'
  }
];

export const LEGAL_STEPS = [
  {
    id: 'step-seprec',
    stage: '1. Comercial Base',
    title: 'SEPREC: Registro de Matrícula de Comercio',
    institution: 'Servicio Plurinacional del Registro de Comercio (SEPREC)',
    duration: '24 a 48 Horas (100% Online)',
    cost: 'Bs. 260 (Empresa Unipersonal) / Bs. 455 (SRL)',
    summary: 'Obtención del reconocimiento legal para operar legalmente como comerciante o sociedad en Bolivia.',
    checklist: [
      { id: 'seprec-1', text: 'Verificación y reserva de nombre/homonimia comercial en portal web de SEPREC.' },
      { id: 'seprec-2', text: 'Carga de Cédula de Identidad del titular o representante legal.' },
      { id: 'seprec-3', text: 'Definición del objeto social (Ej: "Fabricación y comercialización de productos cosméticos y de cuidado personal").' },
      { id: 'seprec-4', text: 'Pago de arancel oficial y descarga del Certificado Digital de Matrícula de Comercio.' }
    ],
    tips: 'Consejo: Si inicias solo/a, regístrate como Empresa Unipersonal para simplificar la contabilidad.'
  },
  {
    id: 'step-sin',
    stage: '1. Comercial Base',
    title: 'SIN: Obtención del NIT (Servicio de Impuestos Nacionales)',
    institution: 'Servicio de Impuestos Nacionales (SIN)',
    duration: '1 a 2 Días Hábiles',
    cost: 'Gratuito',
    summary: 'Inscripción en el Padrón Nacional Biométrico Digital (PBD-digital) para emisión de facturas.',
    checklist: [
      { id: 'sin-1', text: 'Pre-inscripción en la oficina virtual de Impuestos Nacionales (SIAT).' },
      { id: 'sin-2', text: 'Presentación de factura de luz del domicilio fiscal (taller o vivienda).' },
      { id: 'sin-3', text: 'Croquis de ubicación del taller de producción o cabina de atención.' },
      { id: 'sin-4', text: 'Captura de huella dactilar y fotografía en plataforma del SIN.' },
      { id: 'sin-5', text: 'Habilitación de modalidad de facturación (Portal Web en Línea o Electrónica).' }
    ],
    tips: 'La actividad cosmética manufacturera corresponde al régimen general del IVA / IT / IUE.'
  },
  {
    id: 'step-gam',
    stage: '1. Comercial Base',
    title: 'GAM: Licencia de Funcionamiento Municipal',
    institution: 'Alcaldía Municipal (Santa Cruz, La Paz, Cochabamba, El Alto)',
    duration: '5 a 15 Días Hábiles',
    cost: 'Según zona comercial y metros cuadrados (Bs. 150 - 450 aprox.)',
    summary: 'Autorización municipal para la apertura de taller de elaboración o cabina de belleza estética.',
    checklist: [
      { id: 'gam-1', text: 'Fotocopia de Matrícula SEPREC y NIT actualizado.' },
      { id: 'gam-2', text: 'Plano o croquis del espacio productivo / cabina con señalética básica de seguridad.' },
      { id: 'gam-3', text: 'Extintor de incendios (PQS 6kg) y botiquín de primeros auxilios inspeccionado.' },
      { id: 'gam-4', text: 'Inspección de bioseguridad ambiental por técnicos de la Alcaldía.' }
    ],
    tips: 'En Santa Cruz y La Paz el trámite de licencia para microempresas de bajo riesgo se realiza en línea.'
  },
  {
    id: 'step-bpm',
    stage: '2. Sanitaria y Técnica',
    title: 'BPM Simplificadas: Buenas Prácticas de Manufactura',
    institution: 'Estándar Técnico de Taller Artesanal / AGEMED',
    duration: 'Implementación Continua',
    cost: 'Inversión en adecuación física (Bs. 300 - 800)',
    summary: 'Condiciones higiénicas y operativas mínimas para evitar la contaminación cruzada en la fabricación cosmética.',
    checklist: [
      { id: 'bpm-1', text: 'Superficies de trabajo lavables e impermeables (Acero inoxidable, azulejo o melamina sellada).' },
      { id: 'bpm-2', text: 'Uso obligatorio de EPP: Cofia para cabello, barbijo quirúrgico, guantes de nitrilo y mandil blanco.' },
      { id: 'bpm-3', text: 'Agua purificada/desmineralizada para la formulación (No usar agua directa de grifo).' },
      { id: 'bpm-4', text: 'Fichas de registro de lotes de producción y control de materias primas (Bitácora de Lote).' },
      { id: 'bpm-5', text: 'Zona diferenciada y etiquetada para insumos, empaques y productos terminados.' }
    ],
    tips: 'Las BPM son el requisito previo más importante antes de solicitar la inspección de AGEMED.'
  },
  {
    id: 'step-agemed',
    stage: '2. Sanitaria y Técnica',
    title: 'AGEMED: Notificación Sanitaria Obligatoria (NSO - CAN 516 / 833)',
    institution: 'Agencia Estatal de Medicamentos y Tecnologías en Salud (AGEMED - MNSD)',
    duration: '20 a 45 Días Hábiles',
    cost: 'Arancel oficial AGEMED (según grupo) + Regencia Farmacéutica',
    summary: 'Autorización sanitaria requerida bajo la normativa andina (Decisiones CAN 516 y 833) para comerciar cosméticos.',
    checklist: [
      { id: 'agemed-1', text: 'Formulario NSO firmante por el titular y el Regente Farmacéutico acreditado.' },
      { id: 'agemed-2', text: 'Fórmula cualitativa completa del cosmético en nomenclatura INCI (100% de ingredientes).' },
      { id: 'agemed-3', text: 'Especificaciones organolépticas y fisicoquímicas del producto (pH, viscosidad, densidad).' },
      { id: 'agemed-4', text: 'Estudio o ensayo de estabilidad microbiológica emitido por laboratorio autorizado.' },
      { id: 'agemed-5', text: 'Proyecto o boceto de etiqueta frontal y posterior conforme a la norma de rotulado.' },
      { id: 'agemed-6', text: 'Certificado de Buenas Prácticas de Manufactura (BPM) del taller de origen.' }
    ],
    tips: 'Bajo las Decisiones CAN 516/833, los cosméticos no requieren Registro Sanitario de farmacia sino la Notificación Sanitaria Obligatoria (NSO).'
  },
  {
    id: 'step-inci-label',
    stage: '2. Sanitaria y Técnica',
    title: 'Estándar Obligatorio de Rotulado e INCI',
    institution: 'AGEMED & Normativa Andina de Etiquetado',
    duration: 'Fase de Diseño de Empaque',
    cost: 'Costo de diseño de etiqueta',
    summary: 'Requisitos técnicos que debe exhibir la etiqueta comercial de todo cosmético en Bolivia para consumidor final.',
    checklist: [
      { id: 'inci-1', text: 'Nombre comercial del producto y denominación genérica del cosmético.' },
      { id: 'inci-2', text: 'Fórmula cualitativa expresada en nomenclatura INCI en orden decreciente de concentración.' },
      { id: 'inci-3', text: 'Contenido neto impreso en el sistema métrico decimal (g o ml).' },
      { id: 'inci-4', text: 'Número de Lote de producción (Ej: L-2026-001) y Fecha de Vencimiento / Caducidad.' },
      { id: 'inci-5', text: 'Código de Notificación Sanitaria Obligatoria (Ej: NSO-BO-XXXXX-XX).' },
      { id: 'inci-6', text: 'Nombre o razón social del titular, ciudad y país de origen ("Hecho en Bolivia").' },
      { id: 'inci-7', text: 'Instrucciones de uso, precauciones y advertencias sanitarias de seguridad.' }
    ],
    tips: 'La nomenclatura INCI (International Nomenclature of Cosmetic Ingredients) es estándar mundial obligatorio.'
  }
];

export const INCI_DICTIONARY = [
  { common: 'Agua Desmineralizada', inci: 'Aqua', function: 'Solvente base' },
  { common: 'Ácido Hialurónico', inci: 'Sodium Hyaluronate', function: 'Humectante e hidratante profundo' },
  { common: 'Glicerina Vegetal', inci: 'Glycerin', function: 'Humectante natural' },
  { common: 'Aceite de Coco', inci: 'Cocos Nucifera Oil', function: 'Emoliente y acondicionador' },
  { common: 'Manteca de Cacao', inci: 'Theobroma Cacao Seed Butter', function: 'Nutritivo y protector cutáneo' },
  { common: 'Aceite de Almendras', inci: 'Prunus Amygdalus Dulcis Oil', function: 'Emoliente suavisante' },
  { common: 'Niacinamida (Vitamina B3)', inci: 'Niacinamide', function: 'Despigmentante y seborregulador' },
  { common: 'Vitamina E (Tocoferol)', inci: 'Tocopherol', function: 'Antioxidante y conservador de aceites' },
  { common: 'Extracto de Caléndula', inci: 'Calendula Officinalis Flower Extract', function: 'Calmante y cicatrizante' },
  { common: 'Aceite Esencial de Romero', inci: 'Rosmarinus Officinalis Leaf Oil', function: 'Tónico capilar y aromatizante' },
  { common: 'Gel de Aloe Vera', inci: 'Aloe Barbadensis Leaf Juice', function: 'Hidratante regenerador' },
  { common: 'Cera de Abeja', inci: 'Cera Alba (Beeswax)', function: 'Texturizante y agente consistencia' }
];
