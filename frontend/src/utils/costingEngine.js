/**
 * Motor de Costeo de Servicios — cliente
 * MY PIM EXPRESS · HACKBIZ 2026
 *
 * Fórmula exacta (Bloque 2B):
 *   MOD           = horas_trabajadas × mano_obra_por_hora
 *   CIF_Diario    = 15 Bs. (fijo: luz + agua + alquiler prorrateado)
 *   Costo_Total   = costo_insumos + MOD + CIF_Diario
 *   Precio_Sugerido = Costo_Total / (1 − margen / 100)
 */

export const CIF_DIARIO = 15; // Bs. fijo por servicio

/**
 * @param {{
 *   nombre_tratamiento: string,
 *   costo_insumos: number,
 *   horas_trabajadas: number,
 *   mano_obra_por_hora: number,
 *   margen_deseado_porcentaje: number
 * }} params
 */
export function calcularPrecioServicio(params) {
  const {
    nombre_tratamiento        = 'Servicio',
    costo_insumos             = 0,
    horas_trabajadas          = 0,
    mano_obra_por_hora        = 0,
    margen_deseado_porcentaje = 50,
  } = params;

  const margen   = Math.min(95, Math.max(1, Number(margen_deseado_porcentaje)));
  const insumos  = Math.max(0, Number(costo_insumos));
  const horas    = Math.max(0, Number(horas_trabajadas));
  const tarifa   = Math.max(0, Number(mano_obra_por_hora));

  const mod_total      = horas * tarifa;
  const cif_diario     = CIF_DIARIO;
  const costo_total    = insumos + mod_total + cif_diario;
  const precio_sugerido = costo_total / (1 - margen / 100);
  const ganancia       = precio_sugerido - costo_total;

  return {
    nombre_tratamiento,
    costo_insumos:          r2(insumos),
    mod_total:              r2(mod_total),
    cif_diario,
    costo_total:            r2(costo_total),
    margen_porcentaje:      margen,
    precio_sugerido:        r2(precio_sugerido),
    ganancia_por_servicio:  r2(ganancia),
  };
}

function r2(n) { return Math.round(n * 100) / 100; }

/** Formatea un número como moneda boliviana */
export function formatBs(n) {
  if (typeof n !== 'number') return n;
  return `Bs. ${n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Genera el mensaje de WhatsApp con el resumen del costeo.
 */
export function generarMensajeWhatsApp({ estetica, servicio, rts }) {
  const lines = [
    `💄 *MY PIM EXPRESS — Reporte*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🏪 *Salón:* ${estetica?.nombre_salon ?? 'N/D'}`,
    `👤 *Propietaria:* ${estetica?.nombre_propietaria ?? 'N/D'}`,
    `📍 *Mercado:* ${estetica?.ubicacion_mercado ?? 'N/D'}`,
    `📞 *WhatsApp:* ${estetica?.telefono_whatsapp ?? 'N/D'}`,
    ``,
    `💼 *COSTEO DE SERVICIO*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `🔧 Servicio: ${servicio?.nombre_tratamiento ?? 'N/D'}`,
    `🧴 Insumos:       ${formatBs(servicio?.costo_insumos)}`,
    `👐 Mano de Obra:  ${formatBs(servicio?.mod_total)}`,
    `💡 CIF Operativo: ${formatBs(servicio?.cif_diario)}`,
    `📦 Costo Total:   ${formatBs(servicio?.costo_total)}`,
    `📈 Margen:        ${servicio?.margen_porcentaje}%`,
    `💰 *Precio Sugerido: ${formatBs(servicio?.precio_sugerido)}*`,
    `✅ Ganancia/serv: ${formatBs(servicio?.ganancia_por_servicio)}`,
    ``,
    `🏦 *IMPUESTO RTS (SIN)*`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `💵 Capital Declarado: ${formatBs(rts?.capital_declarado)}`,
    `📋 Categoría: ${rts?.categoria_rts ?? 'N/D'}`,
    `🗓️ Pago Bimestral: ${typeof rts?.pago_bimestral === 'number' ? formatBs(rts.pago_bimestral) : rts?.pago_bimestral}`,
    ``,
    `_Calculado con MY PIM EXPRESS · HACKBIZ 2026 · UAGRM_`,
  ];
  return lines.join('\n');
}
