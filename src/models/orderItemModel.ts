import pool from '../config/db';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

// Función para agregar productos a una orden
export const createOrderItem = async (orderId: number, productId: number, quantity: number, price: number) => {
    try {
      const query = `
        INSERT INTO OrderItems (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await pool.execute(query, [orderId, productId, quantity, price]);
      return result;
    } catch (error) {
      console.error('Error creating order item:', error);
      throw error;
    }
  };
  

export const getOrderItemsByOrderId = async (orderId: number): Promise<OrderItem[]> => {
    try {
      const query = `
        SELECT * FROM OrderItems
        WHERE order_id = ?
      `;
      
      const [rows] = await pool.execute(query, [orderId]);
  
      return rows as OrderItem[];
    } catch (error) {
      console.error('Error fetching order items:', error);
      throw error;
    }
  };