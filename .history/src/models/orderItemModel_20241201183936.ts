import pool from '../config/db';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export const getOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM OrderItems WHERE order_id = ?', [orderId]);
    return rows as OrderItem[];
  } catch (error) {
    console.error('Error getting products from order: ', error);
    throw error;
  }
};
