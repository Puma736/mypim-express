import { Router } from 'express';

const router = Router();

const leadsDB = [];

// POST /api/advisory/request - Registrar solicitud de asesoría en vivo o Pack Completo
router.post('/request', (req, res) => {
  const { name, phone, email, subsector, city, type, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'El nombre y teléfono son obligatorios para contactar al asesor.' });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    email: email || '',
    subsector: subsector || 'SR-01',
    city: city || 'Santa Cruz',
    type: type || 'Pack Completo / Asesor en Vivo',
    notes: notes || '',
    status: 'Pendiente de Contacto',
    createdAt: new Date().toISOString()
  };

  leadsDB.push(newLead);

  return res.status(201).json({
    success: true,
    message: '¡Solicitud recibida! Un especialista legal/financiero te contactará por WhatsApp en breve.',
    lead: newLead
  });
});

// GET /api/advisory/leads - CMS Admin Endpoint para consultar solicitudes
router.get('/leads', (req, res) => {
  return res.json({ success: true, count: leadsDB.length, leads: leadsDB });
});

export default router;
