import AppError from '@shared/errors/AppError';
import getId from '../../../utils/getId';
import clientApi from './api/clientApi';
import IClientsFilterResponseDTO from '../dtos/IClientsFilterResponseDTO';

interface IRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export default class FindClientsFiltersService {
  public async execute({
    email,
    name,
    phone,
  }: IRequest): Promise<IClientsFilterResponseDTO[]> {
    const clientResponse = await clientApi.get(
      `/search/filters?email=${email}&name=${name}&phone=${phone}`,
    );
    if (!clientResponse.data._embedded.clients.length) {
      throw new AppError('Clients does not exists', 204);
    }
    const { clients } = clientResponse.data._embedded;

    await clients.map((client: any) => {
      client.id = getId(client._links.self.href);
      delete client._links;
      return client;
    });

    return clients;
  }
}
