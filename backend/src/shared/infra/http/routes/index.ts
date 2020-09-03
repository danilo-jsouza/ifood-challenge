import { Router } from 'express';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/clients', clientsRouter);
routes.use('/orders', ordersRouter);

export default routes;
