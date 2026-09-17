import { Router } from 'express';

const router = Router();

// In-memory users store
const usersDB = [];

// POST /api/auth/register - Registrar nuevo emprendedor
router.post('/register', (req, res) => {
  const { name, email, phone, password, brandName, subsector, city, stage } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios (nombre, correo, contraseña).' });
  }

  const existingUser = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'El correo electrónico ya se encuentra registrado.' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    brandName: brandName || 'Mi Emprendimiento',
    subsector: subsector || 'SR-01',
    city: city || 'Santa Cruz de la Sierra',
    stage: stage || 'Inicial',
    createdAt: new Date().toISOString()
  };

  usersDB.push({ ...newUser, password });

  return res.status(201).json({
    success: true,
    message: 'Cuenta de emprendedor creada exitosamente.',
    user: newUser,
    token: `token-${newUser.id}`
  });
});

// POST /api/auth/login - Iniciar sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = usersDB.find(u => u.email.toLowerCase() === (email || '').toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas. Verifica tu correo y contraseña.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({
    success: true,
    message: 'Sesión iniciada correctamente.',
    user: userWithoutPassword,
    token: `token-${user.id}`
  });
});

// GET /api/auth/profile - Obtener datos de perfil
router.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado.' });
  }

  const userId = token.replace('Bearer token-', '');
  const user = usersDB.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ success: true, user: userWithoutPassword });
});

export default router;
