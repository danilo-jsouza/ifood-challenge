import AppError from '@shared/errors/AppError';
import orderApi from '@modules/orders/services/api/orderApi';
import formatDate from '../../../utils/formatDate';
import clientApi from './api/clientApi';
import IClientsOrderResponseDTO from '../dtos/IClientsOrderResponseDTO';
import getId from '../../../utils/getId';

export default class FindClientsOrdersByIdService {
  public async execute(id: string): Promise<IClientsOrderResponseDTO> {
    const clientResponse = await clientApi.get(`/search/byId?id=${id}`);

    if (!clientResponse.data) {
      throw new AppError('Client does not exists', 204);
    }
    const orderResponse = await orderApi.get(
      `search/byClientId?clientId=${id}`,
    );

    if (!orderResponse.data._embedded.orders.length) {
      throw new AppError('There are no exists order for this client', 204);
    }
    const { orders } = orderResponse.data._embedded;

    await orders.map((order: any) => {
      order.id = getId(order._links.self.href);
      order.createdAt = formatDate(order.createdAt);
      order.confirmedAt = formatDate(order.confirmedAt);
      delete order._links;
      return order;
    });

    const client = clientResponse.data;

    client.id = getId(client._links.self.href);
    delete client._links;

    client.orders = orders;

    return client;
  }
}
