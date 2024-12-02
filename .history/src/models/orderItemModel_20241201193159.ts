import pool from '../config/db';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// Función para agregar productos a una orden
export const createOrderItems = async (orderId: number, items: { product_id: number; quantity: number; price: number }[]) => {
  const promises = items.map(item => {
    return pool.execute(
      'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, item.product_id, item.quantity, item.price]
    );
  });

  await Promise.all(promises);
};
