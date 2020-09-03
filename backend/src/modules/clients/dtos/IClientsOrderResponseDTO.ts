export default interface IClientsOrderResponseDTO {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  orders: Order[];
}

interface Order {
  id: string;
  clientId: string;
  createdAt: Date;
  confirmedAt: Date;
  Items: Item[];
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}
