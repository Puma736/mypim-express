import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'MY PIM EXPRESS - Cosmetics & Beauty Edition',
    hackathon: 'HACKBIZ 2026 UAGRM',
    timestamp: new Date().toISOString()
  });
});

export default router;
