import { Router } from 'express';
import speedOfServiceRouter from './speedOfServiceRouter';
import storesRouter from './storesRouter';

const router = Router();

router.use('/speedOfService', speedOfServiceRouter);
router.use('/stores', storesRouter);

export default router;