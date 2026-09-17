import { Router } from 'express';

const router = Router();

// In-memory store for user formulas
const userFormulas = [
  {
    id: 'serum-acido-hialuronico',
    name: 'Sérum Facial Hidratante de Ácido Hialurónico & Caléndula',
    subsector: 'SR-02',
    batchUnits: 20,
    lossPercentage: 5,
    hoursLote: 2.5,
    hourlyRate: 25.0,
    cifLote: 35.0,
    fixedMonthlyCosts: 1800.0,
    retailMargin: 0.55,
    wholesaleMargin: 0.30,
    createdAt: new Date().toISOString()
  }
];

// POST /api/costing/calculate - Calculates batch costing server-side
router.post('/calculate', (req, res) => {
  const {
    ingredients = [],
    packaging = [],
    batchUnits = 20,
    lossPercentage = 5,
    hoursLote = 2.5,
    hourlyRate = 25.0,
    cifLote = 35.0,
    fixedMonthlyCosts = 1800.0,
    retailMargin = 0.55,
    wholesaleMargin = 0.30
  } = req.body;

  const rawMPTotal = ingredients.reduce((sum, ing) => {
    const unitPrice = ing.matrixQty > 0 ? (ing.matrixPrice / ing.matrixQty) : 0;
    return sum + (unitPrice * (ing.formulaQty || 0));
  }, 0);

  const mpWithLoss = rawMPTotal * (1 + (lossPercentage / 100));
  const singlePkg = packaging.reduce((sum, pkg) => sum + (pkg.priceUnit * (pkg.qtyPerProduct || 1)), 0);
  const totalPackagingBatch = singlePkg * batchUnits;
  const modTotal = hoursLote * hourlyRate;
  const totalBatchCost = mpWithLoss + totalPackagingBatch + modTotal + cifLote;
  const cup = totalBatchCost / Math.max(1, batchUnits);

  const pvpRetail = cup / (1 - Math.min(0.95, retailMargin));
  const priceWholesale = cup / (1 - Math.min(0.95, wholesaleMargin));

  const cifPerUnit = cifLote / Math.max(1, batchUnits);
  const variableCostWithoutCIFPerUnit = cup - cifPerUnit;
  const unitContributionMargin = pvpRetail - variableCostWithoutCIFPerUnit;

  let breakEvenUnits = 0;
  if (unitContributionMargin > 0 && fixedMonthlyCosts > 0) {
    breakEvenUnits = Math.ceil(fixedMonthlyCosts / unitContributionMargin);
  }
  const breakEvenRevenue = breakEvenUnits * pvpRetail;

  return res.json({
    success: true,
    rawMPTotal,
    mpWithLoss,
    singlePkgCost: singlePkg,
    totalPackagingBatch,
    modTotal,
    cifTotal: cifLote,
    totalBatchCost,
    cup,
    pvpRetail,
    priceWholesale,
    breakEvenUnits,
    breakEvenRevenue
  });
});

// GET /api/costing/formulas - Obtener todas las fórmulas guardadas
router.get('/formulas', (req, res) => {
  res.json({ success: true, count: userFormulas.length, data: userFormulas });
});

// POST /api/costing/formulas - Guardar o actualizar fórmula en el backend
router.post('/formulas', (req, res) => {
  const formulaPayload = req.body;

  if (!formulaPayload.name) {
    return res.status(400).json({ success: false, message: 'El nombre de la fórmula es obligatorio.' });
  }

  const existingIdx = userFormulas.findIndex(f => f.id === formulaPayload.id);
  const updatedFormula = {
    ...formulaPayload,
    id: formulaPayload.id || `formula-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    userFormulas[existingIdx] = updatedFormula;
  } else {
    userFormulas.unshift(updatedFormula);
  }

  return res.status(201).json({
    success: true,
    message: 'Fórmula guardada exitosamente en el servidor.',
    formula: updatedFormula
  });
});

export default router;
