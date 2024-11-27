import pool from '../config/db';

export interface Cart {
    id: number;
    user_id: number;
    created_at: Date;
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

