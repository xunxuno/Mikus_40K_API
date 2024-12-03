import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

export interface Cart {
  id: number;
  user_id: number;
  state: 'pendiente' | 'finalizado';
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    price: number;
  }

  export const createCart = async (userId: number): Promise<number> => {
    const [result] = await pool.query(
        'INSERT INTO Cart (user_id, state) VALUES (?, ?)',
        [userId, 'pendiente']
    );
    return (result as any).insertId;
};

export const updateCartState = async (cartId: number, state: 'pendiente' | 'finalizado'): Promise<void> => {
  try {
      await pool.query('UPDATE Cart SET state = ? WHERE id = ?', [state, cartId]);
  } catch (error) {
      console.error('Error updating cart state:', error);
      throw error;
  }
};


export const findCartByUserId = async (userId: number): Promise<Cart[]> => {
    const [result] = await pool.query('SELECT * FROM Cart WHERE user_id = ?', [userId]);
    return result as Cart[];
  };

export const findPendingCartByUserId = async (userId: number): Promise<Cart | null> => {
  const [result] = await pool.query(
      'SELECT * FROM Cart WHERE user_id = ? AND state = ? LIMIT 1',
      [userId, 'pendiente']
  );
  return (result as Cart[])[0] || null;
};

export const addItemToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  price: number
): Promise<void> => {
  const [cartResult] = await pool.query('SELECT state FROM Cart WHERE id = ?', [cartId]);
  const cart = (cartResult as RowDataPacket[])[0];

  if (!cart || cart.state !== 'pendiente') {
      throw new Error('Cannot add items to a finalized cart.');
  }

  await pool.query(
      'INSERT INTO CartItems (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [cartId, productId, quantity, price]
  );
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

  export const updateCartItemQuantity = async (cartId: number, productId: number, quantity: number): Promise<void> => {
    try {
        await pool.query(
            'UPDATE CartItems SET quantity = ? WHERE cart_id = ? AND product_id = ?',
            [quantity, cartId, productId]
        );
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

export const removeItemFromCart = async (cartId: number, productId: number): Promise<void> => {
  try {
      await pool.query(
          'DELETE FROM CartItems WHERE cart_id = ? AND product_id = ?',
          [cartId, productId]
      );
  } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
  }
};

export const clearCart = async (cartId: number): Promise<void> => {
  try {
      await pool.query(
          'DELETE FROM CartItems WHERE cart_id = ?',
          [cartId]
      );
  } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
  }
};

export const findCartProduct = async (cart_id: number, productId: number): Promise<number | null> => {
  const query = `
    SELECT quantity
    FROM CartItems
    WHERE cart_id = ? AND product_id = ?
  `;

  const [rows] = await pool.query<RowDataPacket[]>(query, [cart_id, productId]);

  if (rows.length > 0) {
    return rows[0].quantity; // Retorna la cantidad del producto
  }
  return null; // Si no se encuentra el producto, retorna null
};