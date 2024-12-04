import { createOrder, getOrdersByUserId, Order  } from '../models/orderModel';
import { createOrderItem , getOrderItemsByOrderId} from '../models/orderItemModel';
import { getCartItemsByCartId, getTotalPrice, updateCartState } from '../models/CartModel';


export const createOrderFromCartService = async (userId: number, cartId: number) => {
    try {
        // 1. Get items from the cart
        const cartItems = await getCartItemsByCartId(cartId);

        if (cartItems.length === 0) {
            throw new Error('The cart is empty.');
        }

        // 2. Calculate the total price
        const totalPrice = getTotalPrice(cartItems);

        // 3. Create a new order
        const order = await createOrder(userId, totalPrice);

        // 4. Create order items
        await Promise.all(
            cartItems.map(item =>
                createOrderItem(order.id, item.product_id, item.quantity, item.price)
            )
        );

        // 5. Finalize the cart
        await updateCartState(cartId, 'finalizado');

        return order;
    } catch (error) {
        console.error('Error in service createOrderFromCartService:', error);
        throw error;
    }
};

export const getOrdersByUserId_ = async (userId: number): Promise<Order[]> => {
    try {
      return await getOrdersByUserId(userId); // Use the already defined function
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error al obtener órdenes para el usuario con ID ${userId}:`, error.message);
      } else {
        console.error(`Error desconocido al obtener órdenes para el usuario con ID ${userId}`);
      }
      throw error;
    }
  };

  export const getOrderHistoryForUser = async (userId: number): Promise<any[]> => {
    try {
      // 1. Get user orders
      const orders = await getOrdersByUserId(userId);
  
      // 2. Get the items of each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await getOrderItemsByOrderId(order.id);
          return {
            ...order,
            items,
          };
        })
      );
  
      return ordersWithItems;
    } catch (error) {
      console.error('Error fetching order history:', error);
      throw error;
    }
  };
  