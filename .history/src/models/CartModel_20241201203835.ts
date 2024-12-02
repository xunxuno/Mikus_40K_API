import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

export interface Cart {
    id: number;
    user_id: number;
    created_at: Date;
}
export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    price: number;
  }

export const createCart = async (userId: number): Promise<number> => {
    const [result] = await pool.query('INSERT INTO Cart (user_id) VALUES (?)', [userId]);
    return (result as any).insertId;
};

export const findCartByUserId = async (userId: number): Promise<Cart[]> => {
    const [result] = await pool.query('SELECT * FROM Cart WHERE user_id = ?', [userId]);
    return result as Cart[];
  };

export const addItemToCart = async (cartId: number, productId: number, quantity: number, price: number) => {
    try {
        await pool.query(
            'INSERT INTO CartItems (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [cartId, productId, quantity, price]
        );
    } catch (error) {
        console.error('Error at adding items', error);
        throw error;
    }
};

export const getCartItemsByCartId = async (cartId: number): Promise<CartItem[]> => {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM CartItems WHERE cart_id = ?',
      [cartId]
    );
  
    // Forzar el tipo del resultado a CartItem[]
    return rows as CartItem[];
  };
  export const getTotalPrice = (cartItems: any[]) => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };
