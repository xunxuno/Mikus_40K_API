import pool from '../config/db';
import { ResultSetHeader, FieldPacket } from 'mysql2'; 


export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  created_at: Date;
}

// Función para obtener las órdenes de un usuario
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows as Order[];
  };
  
  // Función para crear una nueva orden
  export const createOrder = async (userId: number, totalPrice: number): Promise<Order> => {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Orders (user_id, total_price) VALUES (?, ?)',
      [userId, totalPrice]
    );
  
    // Retorna un objeto con los datos relevantes
    return {
      id: result.insertId, // Asegúrate de que `insertId` sea el ID generado
      user_id: userId,
      total_price: totalPrice,
      created_at: new Date(), // O usa el valor predeterminado en la base de datos si lo hay
    };
  };
