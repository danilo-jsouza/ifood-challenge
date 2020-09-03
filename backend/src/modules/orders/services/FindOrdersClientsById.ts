import AppError from '@shared/errors/AppError';
import clientApi from '@modules/clients/services/api/clientApi';
import getId from '../../../utils/getId';
import formatDate from '../../../utils/formatDate';
import orderApi from './api/orderApi';
import IOrderClientResponseDTO from '../dtos/IOrderClientResponseDTO';

export default class FindOrdersClientsById {
  public async execute(id: string): Promise<IOrderClientResponseDTO> {
    const orderResponse = await orderApi.get(`search/byOrderId?id=${id}`);

    if (!orderResponse.data) {
      throw new AppError('Orders does not exists', 204);
    }

    const clientResponse = await clientApi.get(
      `/search/byId?id=${orderResponse.data.clientId}`,
    );

    if (!clientResponse.data) {
      throw new AppError('Orders does not exists', 204);
    }

    const client = clientResponse.data;
    const order = orderResponse.data;

    order.id = getId(order._links.self.href);
    client.id = getId(client._links.self.href);

    order.createdAt = formatDate(order.createdAt);
    order.confirmedAt = formatDate(order.confirmedAt);

    delete order._links;
    delete client._links;
    delete order.clientId;

    order.client = client;

    return order;
  }
}
