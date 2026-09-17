import { Router } from 'express';

const router = Router();

const lessonsData = [
  {
    id: 'lesson-finanzas-1',
    category: 'Finanzas',
    title: 'Sueldo del Fundador vs. Ganancias de la Empresa',
    readTime: '3 min',
    summary: 'Diferencia clave entre el pago por tu mano de obra ($MOD$) y las utilidades netas de la marca.',
    content: 'Muchos emprendedores sacan dinero de la caja personal. Aprende a fijarte una tarifa por hora o sueldo fijo.'
  },
  {
    id: 'lesson-contabilidad-1',
    category: 'Contabilidad',
    title: 'Registro de Ingresos y Gastos: Método PEPS para Insumos',
    readTime: '4 min',
    summary: 'Cómo llevar el control contable de materias primas perecederas como aceites botánicos.',
    content: 'Aplica el método Primeras Entradas, Primeras Salidas para evitar mermas por caducidad.'
  },
  {
    id: 'lesson-finanzas-2',
    category: 'Finanzas',
    title: 'Fijación de Precios y Combos para Ferias Artesanales',
    readTime: '3 min',
    summary: 'Estrategias comerciales en eventos sin destruir tus márgenes de utilidad.',
    content: 'Combina un producto estrella con un complemento para ofrecer packs con descuento sin bajar tu precio unitario.'
  }
];

router.get('/lessons', (req, res) => {
  res.json({ success: true, lessons: lessonsData });
});

export default router;
