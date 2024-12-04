import pool from '../config/db';
import { ResultSetHeader, FieldPacket } from 'mysql2'; 


export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  created_at: Date;
}

// Function to get a user's orders
export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
    const [rows] = await pool.execute('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    return rows as Order[];
  };
  
  // Function to create a new order
  export const createOrder = async (userId: number, totalPrice: number): Promise<Order> => {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO Orders (user_id, total_price) VALUES (?, ?)',
      [userId, totalPrice]
    );
  
    // Returns an object with the relevant data
    return {
      id: result.insertId,
      user_id: userId,
      total_price: totalPrice,
      created_at: new Date(),
    };
  };
