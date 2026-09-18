/**
 * Motor RTS — cliente (espejo del backend)
 * MY PIM EXPRESS · HACKBIZ 2026
 *
 * Se usa directamente en React sin necesitar llamada al backend,
 * para respuesta instantánea en la UI.
 */

export const RANGOS_RTS = [
  { min: 0,     max: 12000,    categoria: 'Exento',          pago: 0,     color: 'green'  },
  { min: 12001, max: 15000,    categoria: 'Categoría 1',     pago: 47,    color: 'green'  },
  { min: 15001, max: 18700,    categoria: 'Categoría 2',     pago: 90,    color: 'green'  },
  { min: 18701, max: 23500,    categoria: 'Categoría 3',     pago: 147,   color: 'yellow' },
  { min: 23501, max: 29500,    categoria: 'Categoría 4',     pago: 158,   color: 'yellow' },
  { min: 29501, max: 37000,    categoria: 'Categoría 5',     pago: 200,   color: 'orange' },
  { min: 37001, max: 60000,    categoria: 'Categoría 6',     pago: 350,   color: 'orange' },
  { min: 60001, max: Infinity, categoria: 'Régimen General', pago: null,  color: 'red'    },
];

/**
 * @param {number} capital — Capital declarado en Bs.
 * @returns {{ categoria, pago_bimestral, pago_anual, es_regimen_general, descripcion, alerta_color }}
 */
export function calcularRTS(capital) {
  const c = Math.max(0, Number(capital) || 0);
  const rango = RANGOS_RTS.find(r => c >= r.min && c <= r.max)
             ?? RANGOS_RTS[RANGOS_RTS.length - 1];

  const esGeneral = rango.categoria === 'Régimen General';

  const descripcionMap = {
    'Exento':          'Tu salón está exento del RTS. ¡Sin impuesto simplificado por ahora!',
    'Categoría 1':     'Pagas Bs. 47 cada dos meses al SIN. Ideal para iniciar.',
    'Categoría 2':     'Pagas Bs. 90 cada dos meses al SIN.',
    'Categoría 3':     'Pagas Bs. 147 cada dos meses al SIN.',
    'Categoría 4':     'Pagas Bs. 158 cada dos meses al SIN. Considera llevar un registro de ventas.',
    'Categoría 5':     'Pagas Bs. 200 cada dos meses. Recomendamos asesoría contable básica.',
    'Categoría 6':     'Pagas Bs. 350 cada dos meses. Es momento de contratar un contador.',
    'Régimen General': 'Tu capital supera el límite del RTS. Debes inscribirte en el Régimen General con contabilidad formal.',
  };

  return {
    capital_declarado:  c,
    categoria_rts:      rango.categoria,
    pago_bimestral:     esGeneral ? 'Contabilidad completa' : rango.pago,
    pago_anual:         esGeneral ? null : rango.pago * 6,
    es_regimen_general: esGeneral,
    descripcion:        descripcionMap[rango.categoria] ?? '',
    alerta_color:       rango.color,
  };
}

/** Mapea el color semáforo a clases Tailwind */
export function colorClasses(color) {
  const map = {
    green:  { bg: 'bg-emerald-50',  border: 'border-emerald-300', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-800' },
    yellow: { bg: 'bg-amber-50',    border: 'border-amber-300',   text: 'text-amber-800',   badge: 'bg-amber-100 text-amber-800'   },
    orange: { bg: 'bg-orange-50',   border: 'border-orange-300',  text: 'text-orange-800',  badge: 'bg-orange-100 text-orange-800' },
    red:    { bg: 'bg-red-50',      border: 'border-red-300',     text: 'text-red-800',     badge: 'bg-red-100 text-red-800'       },
  };
  return map[color] ?? map.green;
}
