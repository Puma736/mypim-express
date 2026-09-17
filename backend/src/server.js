import express from 'express';
import cors from 'cors';
import costingRoutes from './routes/costing.routes.js';
import legalRoutes from './routes/legal.routes.js';
import profileRoutes from './routes/profile.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/costing', costingRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'MY PIM EXPRESS Backend API',
    version: '1.0.0',
    hackathon: 'HACKBIZ 2026 UAGRM'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend MY PIM EXPRESS corriendo en puerto ${PORT}`);
});
