export default interface IOrdersResponseDTO {
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
