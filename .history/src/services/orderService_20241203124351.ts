import { createOrder, getOrdersByUserId  } from '../models/orderModel';
import { createOrderItem } from '../models/orderItemModel';
import { getCartItemsByCartId, getTotalPrice, updateCartState } from '../models/CartModel';


export const createOrderFromCartService = async (userId: number, cartId: number) => {
    try {
        // 1. Obtener ítems del carrito
        const cartItems = await getCartItemsByCartId(cartId);

        if (cartItems.length === 0) {
            throw new Error('The cart is empty.');
        }

        // 2. Calcular el precio total
        const totalPrice = getTotalPrice(cartItems);

        // 3. Crear una nueva orden
        const order = await createOrder(userId, totalPrice);

        // 4. Crear ítems de la orden
        await Promise.all(
            cartItems.map(item =>
                createOrderItem(order.id, item.product_id, item.quantity, item.price)
            )
        );

        // 5. Finalizar el carrito
        await updateCartState(cartId, 'finalizado');

        return order;
    } catch (error) {
        console.error('Error in service createOrderFromCartService:', error);
        throw error;
    }
};

export const getOrdersByUserId_ = async (userId: number): Promise<Order[]> => {
    try {
      return await getOrdersByUserId(userId); // Usa la función ya definida
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error al obtener órdenes para el usuario con ID ${userId}:`, error.message);
      } else {
        console.error(`Error desconocido al obtener órdenes para el usuario con ID ${userId}`);
      }
      throw error;
    }
  };