import { Router } from 'express';

const router = Router();

router.get('/steps', (req, res) => {
  res.json({
    success: true,
    steps: [
      { id: 'seprec', name: 'Matrícula SEPREC' },
      { id: 'sin', name: 'NIT - Impuestos Nacionales' },
      { id: 'gam', name: 'Licencia Municipal GAM' },
      { id: 'bpm', name: 'BPM Simplificadas Taller' },
      { id: 'agemed', name: 'Notificación Sanitaria Obligatoria (NSO) AGEMED' },
      { id: 'inci', name: 'Etiquetado INCI' }
    ]
  });
});

export default router;
