export default function calcTotal(items: Item[]): string {
  let sum = 0;

  items.map(item => {
    sum += item.price * item.quantity;
  });
  return sum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

interface Item {
  quantity: number;
  price: number;
  description: string;
}
