export default interface IOrderClientResponse {
  id: string;
  clientId: string;
  restaurantId: string;
  createdAt: Date;
  confirmedAt: Date;
  items: Item[];
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}
