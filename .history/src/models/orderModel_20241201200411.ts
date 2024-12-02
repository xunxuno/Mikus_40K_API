import pool from '../config/db';
import { ResultSetHeader, FieldPacket } from 'mysql2'; 


export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  created_at: string;
}

// Función para obtener las órdenes de un usuario
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows as Order[];
  };
  
  // Función para crear una nueva orden
  export const createOrder = async (userId: number, totalPrice: number) => {
    try {
      const query = `
        INSERT INTO Orders (user_id, total_price)
        VALUES (?, ?)
      `;
      const [result] = await pool.execute(query, [userId, totalPrice]);
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  
