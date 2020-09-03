import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.get('/search', clientsController.findbyFilter);
clientsRouter.get('/search/:id', clientsController.findById);

export default clientsRouter;
