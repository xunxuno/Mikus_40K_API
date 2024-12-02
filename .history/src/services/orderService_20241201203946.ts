import { getOrdersByUserId, createOrder } from '../models/orderModel';
import { getOrderItemsByOrderId } from '../models/orderItemModel';
import { getCartItemsByCartId, getTotalPrice, CartItem  } from '../models/CartModel';  // Asegúrate de tener estas funciones en tu modelo de carrito
import { createOrderItem } from '../models/orderItemModel';  // Para agregar los ítems de la orden

import { Order } from '../models/orderModel';
import { OrderItem } from '../models/orderItemModel';

// Obtener el historial de compras del usuario
export const getOrderHistory = async (userId: number) => {
  try {
    // Obtener las órdenes del usuario
    const orders: Order[] = await getOrdersByUserId(userId);

    // Obtener los productos de cada orden
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items: OrderItem[] = await getOrderItemsByOrderId(order.id);
        return { ...order, items };
      })
    );

    return ordersWithItems;
  } catch (error) {
    console.error('Error getting purchase history: ', error);
    throw error;
  }
};

export const createNewOrder = async (userId: number, cartId: number): Promise<Order> => {
    try {
      // Obtener los ítems del carrito
      const cartItems: CartItem[] = await getCartItemsByCartId(cartId);
  
      // Calcular el precio total
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // Crear la orden
      const order = await createOrder(userId, totalPrice);
  
      // Crear los ítems de la orden
      await Promise.all(
        cartItems.map(item =>
          createOrderItem(order.id, item.product_id, item.quantity, item.price)
        )
      );
  
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };