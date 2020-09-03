import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.get('/search/byDate', ordersController.findbyDate);
ordersRouter.get('/search/:id', ordersController.findbyId);

export default ordersRouter;
