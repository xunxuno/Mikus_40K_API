import { getProductById } from '../models/productModel';
import { createCart, findPendingCartByUserId, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart, findCartProduct, getCartItemsByCartId, CartItem} from '../models/CartModel';

export const getOrCreatePendingCart = async (userId: number): Promise<number> => {
    try {
        // Buscar un carrito pendiente para el usuario
        const pendingCart = await findPendingCartByUserId(userId);

        if (pendingCart) {
            // Si ya existe un carrito pendiente, devolver su ID
            return pendingCart.id;
        }

        // Si no existe un carrito pendiente, crear uno nuevo
        const newCartId = await createCart(userId);
        return newCartId;
    } catch (error) {
        console.error('Error in getOrCreatePendingCart:', error);
        throw error;
    }
};


// Agregar un producto al carrito
export const addProductToCartService = async (userId: number, productId: number, quantity: number, price: number) => {
  try {
      // Buscar el carrito pendiente
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Agregar el producto al carrito
      await addItemToCart(pendingCart.id, productId, quantity, price);
  } catch (error) {
      console.error('Error in addProductToCartService:', error);
      throw error;
  }
};

// Modificar la cantidad de un producto en el carrito
export const updateProductQuantityService = async (userId: number, productId: number, quantity: number) => {
  try {
      // Buscar el carrito pendiente
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Actualizar la cantidad del producto en el carrito
      await updateCartItemQuantity(pendingCart.id, productId, quantity);
  } catch (error) {
      console.error('Error in updateProductQuantityService:', error);
      throw error;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCartService = async (userId: number, productId: number) => {
  try {
      // Buscar el carrito pendiente
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Eliminar el producto del carrito
      await removeItemFromCart(pendingCart.id, productId);
  } catch (error) {
      console.error('Error in removeProductFromCartService:', error);
      throw error;
  }
};

// Eliminar el carrito completo
export const deleteCartService = async (userId: number) => {
  try {
      // Buscar el carrito pendiente
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Eliminar todos los productos del carrito
      await clearCart(pendingCart.id);
  } catch (error) {
      console.error('Error in deleteCartService:', error);
      throw error;
  }
};

export const getCartProductQuantity = async (cart_id: number, productId: number): Promise<number> => {
    try {
      const quantity = await findCartProduct(cart_id, productId);
      return quantity ?? 0; // Si no se encuentra el producto, devolvemos 0
    } catch (error) {
      console.error('Error en el servicio al obtener el producto del carrito:', error);
      throw new Error('No se pudo obtener la información del producto en el carrito.');
    }
  };

  export const fetchCartItems = async (cartId: number): Promise<CartItem[]> => {
    try {
      const cartItems = await getCartItemsByCartId(cartId);
      return cartItems;
    } catch (error) {
      console.error(`Error al obtener los elementos del carrito con ID ${cartId}:`, error);
      throw new Error('No se pudieron obtener los elementos del carrito.');
    }
  };