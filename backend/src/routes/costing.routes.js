import { Router } from 'express';

const router = Router();

// In-memory preset storage
const presetFormulas = [
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
    wholesaleMargin: 0.30
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
    return sum + (unitPrice * ing.formulaQty);
  }, 0);

  const mpWithLoss = rawMPTotal * (1 + (lossPercentage / 100));
  const singlePkg = packaging.reduce((sum, pkg) => sum + (pkg.priceUnit * (pkg.qtyPerProduct || 1)), 0);
  const totalPackagingBatch = singlePkg * batchUnits;
  const modTotal = hoursLote * hourlyRate;
  const totalBatchCost = mpWithLoss + totalPackagingBatch + modTotal + cifLote;
  const cup = totalBatchCost / Math.max(1, batchUnits);

  const pvpRetail = cup / (1 - Math.min(0.95, retailMargin));
  const priceWholesale = cup / (1 - Math.min(0.95, wholesaleMargin));

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
    priceWholesale
  });
});

// GET /api/costing/presets - List presets
router.get('/presets', (req, res) => {
  return res.json({ success: true, data: presetFormulas });
});

export default router;
