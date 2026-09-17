/**
 * Motor Matemático Reactivo de Costeo Cosmético para Bolivia
 * Cumple estrictamente con el algoritmo de costeo por lote y formulación
 * Hackatón HACKBIZ 2026 (UAGRM) - MY PIM EXPRESS
 */

// Conversión de unidades a base de referencia (g o ml)
export const UNIT_CONVERSIONS = {
  g: { base: 'g', factor: 1, type: 'mass' },
  Kg: { base: 'g', factor: 1000, type: 'mass' },
  ml: { base: 'ml', factor: 1, type: 'volume' },
  L: { base: 'ml', factor: 1000, type: 'volume' },
  gotas: { base: 'ml', factor: 0.05, type: 'volume' }, // 20 gotas ≈ 1 ml
};

/**
 * Convierte cualquier cantidad a su unidad base (g o ml)
 */
export function convertToBaseQuantity(qty, unit) {
  const numericQty = parseFloat(qty) || 0;
  const unitInfo = UNIT_CONVERSIONS[unit] || { factor: 1 };
  return numericQty * unitInfo.factor;
}

/**
 * Presets de Fórmulas Cosméticas Bolivianas con insumos e INCI reales
 */
export const PRESET_FORMULAS = [
  {
    id: 'serum-acido-hialuronico',
    name: 'Sérum Facial Hidratante de Ácido Hialurónico & Caléndula',
    subsector: 'SR-02', // Dermocosmética
    batchUnits: 20, // 20 frascos de 30ml
    lossPercentage: 5, // 5% de merma
    hoursLote: 2.5,
    hourlyRate: 25.0, // 25 Bs/hora
    cifLote: 35.0, // Alquiler prorrateado, luz, agua destilada
    fixedMonthlyCosts: 1800.0, // Costos fijos del taller (Bs/mes)
    retailMargin: 0.55, // 55%
    wholesaleMargin: 0.30, // 30%
    ingredients: [
      {
        id: '1',
        name: 'Agua Desmineralizada / Hidrolato de Caléndula',
        inci: 'Aqua, Calendula Officinalis Flower Water',
        matrixPrice: 45.0,
        matrixQty: 5,
        matrixUnit: 'L',
        formulaQty: 540,
        formulaUnit: 'ml',
      },
      {
        id: '2',
        name: 'Ácido Hialurónico de Bajo Peso Molecular',
        inci: 'Sodium Hyaluronate',
        matrixPrice: 320.0,
        matrixQty: 100,
        matrixUnit: 'g',
        formulaQty: 6.0,
        formulaUnit: 'g',
      },
      {
        id: '3',
        name: 'Niacinamida Purificada (Vitamina B3)',
        inci: 'Niacinamide',
        matrixPrice: 180.0,
        matrixQty: 250,
        matrixUnit: 'g',
        formulaQty: 12.0,
        formulaUnit: 'g',
      },
      {
        id: '4',
        name: 'Glicerina Vegetal Grado USP',
        inci: 'Glycerin',
        matrixPrice: 35.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 18,
        formulaUnit: 'g',
      },
      {
        id: '5',
        name: 'Conservante Natural Eco-Cert (Geogard ECT)',
        inci: 'Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
        matrixPrice: 150.0,
        matrixQty: 100,
        matrixUnit: 'ml',
        formulaQty: 120,
        formulaUnit: 'gotas', // 6 ml
      }
    ],
    packaging: [
      { id: 'p1', name: 'Frasco Gotero de Vidrio Ámbar 30ml', priceUnit: 4.50, qtyPerProduct: 1 },
      { id: 'p2', name: 'Tapa Gotero de Silicio y Bambú', priceUnit: 2.80, qtyPerProduct: 1 },
      { id: 'p3', name: 'Etiqueta Adhesiva Frontal/Trasera Resistente', priceUnit: 1.20, qtyPerProduct: 1 },
      { id: 'p4', name: 'Precinto Termoencogible de Seguridad', priceUnit: 0.40, qtyPerProduct: 1 },
      { id: 'p5', name: 'Caja Secundaria de Cartón Ecológico Kraft', priceUnit: 1.80, qtyPerProduct: 1 },
    ]
  },
  {
    id: 'jabon-artesanal-mora-miel',
    name: 'Jabón Artesanal de Miel de Chiquitanía & Avena',
    subsector: 'SR-01', // Cosmética Natural
    batchUnits: 30, // 30 pastillas de 100g
    lossPercentage: 4,
    hoursLote: 3.0,
    hourlyRate: 20.0,
    cifLote: 40.0,
    fixedMonthlyCosts: 1500.0,
    retailMargin: 0.50,
    wholesaleMargin: 0.25,
    ingredients: [
      {
        id: '1',
        name: 'Aceite de Coco Orgánico de la Amazonía',
        inci: 'Cocos Nucifera Oil',
        matrixPrice: 85.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 800,
        formulaUnit: 'g',
      },
      {
        id: '2',
        name: 'Aceite de Oliva Extra Virgen',
        inci: 'Olea Europaea Fruit Oil',
        matrixPrice: 120.0,
        matrixQty: 1,
        matrixUnit: 'L',
        formulaQty: 1200,
        formulaUnit: 'ml',
      },
      {
        id: '3',
        name: 'Miel Pura de Abeja Silvestre (Chiquitanía)',
        inci: 'Mel (Honey)',
        matrixPrice: 60.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 150,
        formulaUnit: 'g',
      },
      {
        id: '4',
        name: 'Avena Molida Fina (Exfoliante suave)',
        inci: 'Avena Sativa Kernel Meal',
        matrixPrice: 15.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 100,
        formulaUnit: 'g',
      },
      {
        id: '5',
        name: 'Aceite Esencial de Naranja Dulce',
        inci: 'Citrus Aurantium Dulcis Peel Oil',
        matrixPrice: 90.0,
        matrixQty: 50,
        matrixUnit: 'ml',
        formulaQty: 300,
        formulaUnit: 'gotas', // 15 ml
      }
    ],
    packaging: [
      { id: 'p1', name: 'Faja Papel Mantequilla Biodegradable', priceUnit: 0.80, qtyPerProduct: 1 },
      { id: 'p2', name: 'Cuerda de Yute / Etiqueta INCI Kraft', priceUnit: 0.50, qtyPerProduct: 1 },
    ]
  },
  {
    id: 'balsamo-labial-cacao',
    name: 'Bálsamo Labial de Cacao del Beni & Colorante Mineral Natural',
    subsector: 'SR-03', // Maquillaje
    batchUnits: 50, // 50 tubos de 5g
    lossPercentage: 6,
    hoursLote: 2.0,
    hourlyRate: 25.0,
    cifLote: 25.0,
    fixedMonthlyCosts: 1600.0,
    retailMargin: 0.60,
    wholesaleMargin: 0.35,
    ingredients: [
      {
        id: '1',
        name: 'Manteca de Cacao Silvestre del Beni',
        inci: 'Theobroma Cacao Seed Butter',
        matrixPrice: 95.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 120,
        formulaUnit: 'g',
      },
      {
        id: '2',
        name: 'Cera de Abejas Virgen Filtrada',
        inci: 'Cera Alba (Beeswax)',
        matrixPrice: 80.0,
        matrixQty: 1,
        matrixUnit: 'Kg',
        formulaQty: 80,
        formulaUnit: 'g',
      },
      {
        id: '3',
        name: 'Aceite de Almendras Dulces',
        inci: 'Prunus Amygdalus Dulcis Oil',
        matrixPrice: 70.0,
        matrixQty: 500,
        matrixUnit: 'ml',
        formulaQty: 100,
        formulaUnit: 'ml',
      },
      {
        id: '4',
        name: 'Pigmento Óxido de Hierro Rojo Mineral',
        inci: 'CI 77491 (Iron Oxides)',
        matrixPrice: 110.0,
        matrixQty: 100,
        matrixUnit: 'g',
        formulaQty: 5,
        formulaUnit: 'g',
      }
    ],
    packaging: [
      { id: 'p1', name: 'Tubo Bálsamo Labial Ecológico 5g', priceUnit: 2.20, qtyPerProduct: 1 },
      { id: 'p2', name: 'Etiqueta Adhesiva Mini INCI', priceUnit: 0.60, qtyPerProduct: 1 },
    ]
  }
];

/**
 * Función principal del Algoritmo Matemático de Costeo
 */
export function calculateBatchCosting(params) {
  const {
    ingredients = [],
    packaging = [],
    batchUnits = 1,
    lossPercentage = 5,
    hoursLote = 0,
    hourlyRate = 0,
    cifLote = 0,
    fixedMonthlyCosts = 0,
    retailMargin = 0.55,
    wholesaleMargin = 0.30
  } = params;

  // 1. Costo Proporcional de Materia Prima (MP)
  const evaluatedIngredients = ingredients.map(ing => {
    const baseMatrixQty = convertToBaseQuantity(ing.matrixQty, ing.matrixUnit);
    const baseFormulaQty = convertToBaseQuantity(ing.formulaQty, ing.formulaUnit);
    const matrixPrice = parseFloat(ing.matrixPrice) || 0;

    const unitCost = baseMatrixQty > 0 ? (matrixPrice / baseMatrixQty) : 0;
    const itemCost = unitCost * baseFormulaQty;

    return {
      ...ing,
      baseMatrixQty,
      baseFormulaQty,
      unitCost,
      itemCost: isNaN(itemCost) ? 0 : itemCost
    };
  });

  const rawMPTotal = evaluatedIngredients.reduce((sum, item) => sum + item.itemCost, 0);

  // 2. Factor de Merma Física (FM)
  const lossDecimal = (parseFloat(lossPercentage) || 0) / 100;
  const mpWithLoss = rawMPTotal * (1 + lossDecimal);

  // 3. Costo Total de Packaging (CP)
  const evaluatedPackaging = packaging.map(pkg => {
    const price = parseFloat(pkg.priceUnit) || 0;
    const qty = parseFloat(pkg.qtyPerProduct) || 1;
    const totalPkgItem = price * qty;
    return {
      ...pkg,
      totalPkgItem
    };
  });

  const singlePackagingCost = evaluatedPackaging.reduce((sum, item) => sum + item.totalPkgItem, 0);
  const totalPackagingBatch = singlePackagingCost * (parseFloat(batchUnits) || 1);

  // 4. Mano de Obra Directa (MOD)
  const modTotal = (parseFloat(hoursLote) || 0) * (parseFloat(hourlyRate) || 0);

  // 5. Costos Indirectos de Fabricación (CIF)
  const cifTotal = parseFloat(cifLote) || 0;

  // 6. Costo Total del Lote y Costo Unitario de Producción (CUP)
  const units = Math.max(1, parseFloat(batchUnits) || 1);
  const totalBatchCost = mpWithLoss + totalPackagingBatch + modTotal + cifTotal;
  const cup = totalBatchCost / units;

  // 7. Precios Sugeridos y Margen de Seguridad
  const safeRetailMargin = Math.min(0.95, Math.max(0.01, parseFloat(retailMargin) || 0.55));
  const safeWholesaleMargin = Math.min(0.95, Math.max(0.01, parseFloat(wholesaleMargin) || 0.30));

  const pvpRetail = cup / (1 - safeRetailMargin);
  const priceWholesale = cup / (1 - safeWholesaleMargin);

  // 8. Punto de Equilibrio (Unidades / Mes)
  // Formula: CFT / (PVP - (CUP - (CIF / U)))
  const cifPerUnit = cifTotal / units;
  const variableCostWithoutCIFPerUnit = cup - cifPerUnit;
  const unitContributionMargin = pvpRetail - variableCostWithoutCIFPerUnit;

  const fmtCFT = parseFloat(fixedMonthlyCosts) || 0;
  let breakEvenUnits = 0;
  if (unitContributionMargin > 0 && fmtCFT > 0) {
    breakEvenUnits = Math.ceil(fmtCFT / unitContributionMargin);
  }

  const breakEvenRevenue = breakEvenUnits * pvpRetail;

  return {
    rawMPTotal,
    mpWithLoss,
    singlePackagingCost,
    totalPackagingBatch,
    modTotal,
    cifTotal,
    totalBatchCost,
    cup,
    pvpRetail,
    priceWholesale,
    safeRetailMargin,
    safeWholesaleMargin,
    breakEvenUnits,
    breakEvenRevenue,
    evaluatedIngredients,
    evaluatedPackaging,
    units
  };
}

/**
 * Formatea valores numéricos como Bolivianos (Bs.)
 */
export function formatBs(amount) {
  const num = parseFloat(amount) || 0;
  return `Bs. ${num.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
