import AppError from '@shared/errors/AppError';
import getId from '../../../utils/getId';
import formatDate from '../../../utils/formatDate';
import orderApi from './api/orderApi';
import IOrdersResponseDTO from '../dtos/IOrdersResponseDTO';

interface IRequest {
  start: string;
  end: string;
}

export default class FindOrdersByDateService {
  public async execute({
    start,
    end,
  }: IRequest): Promise<IOrdersResponseDTO[]> {
    const response = await orderApi.get(
      `search/byDate?start=${start}&end=${end}`,
    );

    if (!response.data._embedded.orders.length) {
      throw new AppError('Orders does not exists in this range date', 204);
    }

    const { orders } = response.data._embedded;

    await orders.map((order: any) => {
      order.id = getId(order._links.self.href);
      order.createdAt = formatDate(order.createdAt);
      order.confirmedAt = formatDate(order.confirmedAt);
      delete order._links;
      return order;
    });

    return orders;
  }
}
