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
  export const createOrder = async (userId: number, totalPrice: number): Promise<Order> => {
    // Capturamos el resultado de la inserción
    const [result] = await pool.execute(
      'INSERT INTO Orders (user_id, total_price) VALUES (?, ?)',
      [userId, totalPrice]
    ) as [ResultSetHeader, FieldPacket[]];  // Cambiado a ResultSetHeader
  
    // Devolvemos la nueva orden con el id generado
    return {
      id: result.insertId,  // `insertId` es parte del `ResultSetHeader`
      user_id: userId,
      total_price: totalPrice,
      created_at: new Date().toISOString()
    };
  };
