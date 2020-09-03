import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ModalContainer from 'react-modal';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { format } from 'date-fns';
import { Container, ModalContent, ClientInfo, NoContent } from './styles';
import api from '../../service/api';
import calcTotal from '../../utils/calcTotal';
import formatPhoneNumber from '../../utils/formatPhoneNumber';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '0',
    width: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
  },
};

interface CardProps {
  orders: any[];
  isLoading: boolean;
}

interface OrderResult {
  id: string;
  clientId: string;
  restaurantId: string;
  createdAt: string;
  confirmedAt: string;
  items: Item[];
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface OrderClientModal {
  id: string;
  clientId: string;
  restaurantId: string;
  createdAt: string;
  confirmedAt: string;
  items: Item[];
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface ClientOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: [
    {
      id: string;
      clientId: string;
      restaurantId: string;
      createdAt: string;
      confirmedAt: string;
      items: Item[];
    },
  ];
}

const SearchResult: React.FC<CardProps> = ({ orders, isLoading }) => {
  const [clientOrder, setClientOrder] = useState<ClientOrder[]>([]);
  const [hasOrder, setHasOrder] = useState(false);
  const [clientOrderInfo, setClientOrderInfo] = useState<OrderClientModal>(
    {} as OrderClientModal,
  );
  const [toggle, setToggle] = useState(false);
  const orderedClient = useCallback(async () => {
    setClientOrder([]);
    const data = await Promise.all(
      orders &&
        orders.map(async order => {
          const response = await api.get(
            `clients/search/${order.clientId || order.id}`,
          );
          return response.data;
        }),
    );
    if (data.length > 0) {
      setHasOrder(true);
      setClientOrder(data);
      return;
    }
    setHasOrder(false);
  }, [orders]);

  useEffect(() => {
    orderedClient();
  }, [orderedClient]);

  const handleOpenModal = useCallback(async (id: string) => {
    const response = await api.get(`orders/search/${id}`);
    setClientOrderInfo(response.data);
    setToggle(true);
  }, []);

  return (
    <Container>
      {hasOrder ? (
        <table>
          <tr>
            <th>Date</th>
            <th>Client Name</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>Total Value</th>
          </tr>
          {clientOrder.map(client =>
            client.orders.map(order => (
              <tr key={order.id} onClick={() => handleOpenModal(order.id)}>
                <td>{format(new Date(order.createdAt), 'dd/MM/yyyy')}</td>
                <td>{client.name}</td>
                <td>{formatPhoneNumber(client.phone)}</td>
                <td>{client.email}</td>
                <td>{calcTotal(order.items)}</td>
              </tr>
            )),
          )}
        </table>
      ) : (
        <NoContent>
          {isLoading ? (
            <Loader
              type="ThreeDots"
              color="#ea1d2c"
              height={100}
              width={100}
              timeout={3000}
            />
          ) : (
            'No order found ... :('
          )}
        </NoContent>
      )}
      <ModalContainer style={customStyles} ariaHideApp={false} isOpen={toggle}>
        <ModalContent>
          <div>
            <h1>Details</h1>
            <button type="button" onClick={() => setToggle(false)}>
              X
            </button>
          </div>
          <ClientInfo>
            <span>
              <strong>Client Name: </strong>
              {clientOrderInfo.client?.name}
            </span>
            <span>
              <strong>Phone: </strong>
              {formatPhoneNumber(clientOrderInfo.client?.phone)}
            </span>
            <span>
              <strong>Email: </strong>
              {clientOrderInfo.client?.email}
            </span>
          </ClientInfo>
          <table>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {clientOrderInfo.items &&
              clientOrderInfo.items.map(item => (
                <tr key={uuidv4()}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{`$ ${item.price * item.quantity}`}</td>
                </tr>
              ))}
          </table>
        </ModalContent>
      </ModalContainer>
    </Container>
  );
};

export default SearchResult;
