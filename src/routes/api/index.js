import { Router } from 'express';
import speedOfServiceRoutes from './speedOfService';

const routes = Router();

routes.use('/speedOfService', speedOfServiceRoutes);

export default routes;