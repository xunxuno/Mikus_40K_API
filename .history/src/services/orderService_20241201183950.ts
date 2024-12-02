import { getOrdersByUserId, Order} from '../models/orderModel';
import { getOrderItemsByOrderId, OrderItem } from '../models/orderItemModel';

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
