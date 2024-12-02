import { getOrdersByUserId, createOrder } from '../models/orderModel';
import { getOrderItemsByOrderId } from '../models/orderItemModel';
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
export const createNewOrder = async (userId: number, totalPrice: number) => {
  try {
    // Crear una nueva orden
    const order: Order = await createOrder(userId, totalPrice);

    // Aquí podrías agregar la lógica para agregar productos del carrito a la nueva orden,
    // o puedes manejarlo en otra función dependiendo de cómo implementes la gestión del carrito.

    return order;
  } catch (error) {
    console.error('Error creating new order: ', error);
    throw error;
  }
};
