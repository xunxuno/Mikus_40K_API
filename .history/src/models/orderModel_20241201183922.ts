import pool from '../config/db';

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  created_at: string;
}

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows as Order[];
  } catch (error) {
    console.error('Error getting orders: ', error);
    throw error;
  }
};
