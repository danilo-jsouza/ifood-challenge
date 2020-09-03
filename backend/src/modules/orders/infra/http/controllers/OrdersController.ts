import { Request, Response } from 'express';
import FindOrdersByDateService from '@modules/orders/services/FindOrdersByDateService';
import FindOrdersClientsById from '@modules/orders/services/FindOrdersClientsById';

export default class OrdersController {
  public async findbyDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const start = request.query.start as string;
    const end = request.query.end as string;

    const findOrdersByDate = new FindOrdersByDateService();

    const orders = await findOrdersByDate.execute({
      start,
      end,
    });

    return response.json(orders);
  }

  public async findbyId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findOrdersById = new FindOrdersClientsById();

    const order = await findOrdersById.execute(id);

    return response.json(order);
  }
}
