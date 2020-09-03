import React, { useCallback, useState, useRef, useMemo } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { format, isBefore } from 'date-fns';
import { Container, Header, HeaderContent } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../service/api';
import Input from '../Input';
import SearchResult from '../SearchResult';

interface Client {
  name: string;
  email: string;
  phone: string;
  id: string;
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  clientId: string;
  restaurantId: string;
  createdAt: string;
  confirmedAt: string;
  items: Item[];
}

interface Filters {
  name?: string;
  email?: string;
  phone?: string;
}

const SerachForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [startedDate, setStartedDate] = useState(new Date());
  const [endedDate, setEndedDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoClientFilter, setHasNoClientFilter] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const ordersFiltered = useMemo(() => {
    let data = [];
    if (clients.length > 0) {
      data =
        orders &&
        orders.filter(order =>
          clients.find(
            client =>
              client.id === order.clientId &&
              new Date(order.createdAt).getTime() >=
                new Date(format(startedDate, 'MM/dd/yyyy')).getTime() &&
              new Date(order.createdAt).getTime() <=
                new Date(format(endedDate, 'MM/dd/yyyy')).getTime(),
          ),
        );
    } else {
      data =
        orders && hasNoClientFilter
          ? orders.filter(
              (order, i, current) =>
                current.findIndex(
                  curr =>
                    curr.clientId === order.clientId &&
                    new Date(order.createdAt).getTime() >=
                      new Date(format(startedDate, 'MM/dd/yyyy')).getTime() &&
                    new Date(order.createdAt).getTime() <=
                      new Date(format(endedDate, 'MM/dd/yyyy')).getTime(),
                ) === i,
            )
          : [];
    }
    return data;
  }, [clients, orders, endedDate, startedDate, hasNoClientFilter]);

  const handleSubmit = useCallback(
    async (data: Filters) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email('Invalid email'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!isBefore(startedDate, endedDate)) {
          toast.error('Date range invalid');
          return;
        }

        setIsLoading(true);

        const { email, name, phone } = data;

        await api
          .get('clients/search', {
            params: {
              email,
              name,
              phone,
            },
          })
          .then(response => {
            setClients([]);
            setClients(response.data);
          });

        await api
          .get('orders/search/byDate', {
            params: {
              start: format(startedDate, 'yyyy/MM/dd'),
              end: format(endedDate, 'yyyy/MM/dd'),
            },
          })
          .then(response => {
            setOrders([]);
            setOrders(response.data);
          });

        if (name || phone || email) {
          setHasNoClientFilter(false);
        } else {
          setHasNoClientFilter(true);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Yup.ValidationError) {
          toast.error('Email format invalid');
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [endedDate, startedDate],
  );
  const handleStartDateChange = useCallback((start: Date) => {
    setStartedDate(start);
  }, []);

  const handleEndDateChange = useCallback((end: Date) => {
    setEndedDate(end);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <h1>Order List</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="client">Client Name</label>
              <Input
                name="name"
                type="text"
                id="client"
                placeholder="Client Name"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Input name="email" type="text" id="email" placeholder="E-Mail" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Input
                name="phone"
                type="text"
                id="phone"
                placeholder="Phone Number"
              />
            </div>

            <div className="group">
              <div>
                <label>Start Date</label>
                <DayPickerInput
                  placeholder="dd/mm/yyyy"
                  value={format(startedDate, 'dd/MM/yyyy')}
                  onDayChange={handleStartDateChange}
                />
              </div>

              <div>
                <label>End Date</label>
                <DayPickerInput
                  value={format(endedDate, 'dd/MM/yyyy')}
                  onDayChange={handleEndDateChange}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading}>
              Search
            </button>
          </Form>
        </HeaderContent>
      </Header>

      <SearchResult orders={ordersFiltered} isLoading={isLoading} />
    </Container>
  );
};

export default SerachForm;
