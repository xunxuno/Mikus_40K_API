import { getOrdersByUserId, createOrder } from '../models/orderModel';
import { getOrderItemsByOrderId } from '../models/orderItemModel';
import { getCartItemsByCartId, getTotalPrice } from '../models/CartModel';  // Asegúrate de tener estas funciones en tu modelo de carrito
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

// Crear una nueva orden (asociada a un usuario y los productos del carrito)
export const createNewOrder = async (userId: number, cartId: number) => {
  try {
    // 1. Obtener los productos del carrito
    const cartItems = await getCartItemsByCartId(cartId);
    
    // 2. Calcular el precio total del carrito
    const totalPrice = getTotalPrice(cartItems);

    // 3. Crear una nueva orden
    const order: Order = await createOrder(userId, totalPrice);

    // 4. Crear los ítems de la orden
    await Promise.all(
      cartItems.map(item =>
        createOrderItem(order.id, item.product_id, item.quantity, item.price)
      )
    );

    // 5. Opcional: Vaciar el carrito después de crear la orden
    // Puedes agregar la lógica para vaciar el carrito si deseas

    return order;
  } catch (error) {
    console.error('Error creating new order: ', error);
    throw error;
  }
};
