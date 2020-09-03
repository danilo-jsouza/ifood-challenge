import { Request, Response } from 'express';
import FindClientsFiltersService from '@modules/clients/services/FindClientsByFiltersService';
import FindClientsOrdersByIdService from '@modules/clients/services/FindClientsOrdersByIdService';

export default class ClientsController {
  public async findbyFilter(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const name = request.query.name as string;
    const email = request.query.email as string;
    const phone = request.query.phone as string;

    const findClientsFilter = new FindClientsFiltersService();

    const clients = await findClientsFilter.execute({
      name,
      email,
      phone,
    });

    return response.json(clients);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const findClientsOrdersById = new FindClientsOrdersByIdService();

    const client = await findClientsOrdersById.execute(id);

    return response.json(client);
  }
}
