import { getProductById } from '../models/productModel';
import { createCart, findPendingCartByUserId, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart, findCartProduct, getCartItemsByCartId, CartItem} from '../models/CartModel';

export const getOrCreatePendingCart = async (userId: number): Promise<number> => {
    try {
        // Search for a pending cart for the user
        const pendingCart = await findPendingCartByUserId(userId);

        if (pendingCart) {
            // If a pending cart already exists, return its ID
            return pendingCart.id;
        }

        // If there is no pending cart, create a new one
        const newCartId = await createCart(userId);
        return newCartId;
    } catch (error) {
        console.error('Error in getOrCreatePendingCart:', error);
        throw error;
    }
};


// Add a product to the cart
export const addProductToCartService = async (userId: number, productId: number, quantity: number, price: number, product_name: string) => {
  try {
      // Find the pending cart
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Add the product to the cart
      await addItemToCart(pendingCart.id, productId, quantity, price, product_name);
  } catch (error) {
      console.error('Error in addProductToCartService:', error);
      throw error;
  }
};

// Modify the quantity of a product in the cart
export const updateProductQuantityService = async (userId: number, productId: number, quantity: number) => {
  try {
      // Find the pending cart
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Update the quantity of the product in the cart
      await updateCartItemQuantity(pendingCart.id, productId, quantity);
  } catch (error) {
      console.error('Error in updateProductQuantityService:', error);
      throw error;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCartService = async (userId: number, productId: number) => {
  try {
      //Find the pending cart
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Remove product from cart
      await removeItemFromCart(pendingCart.id, productId);
  } catch (error) {
      console.error('Error in removeProductFromCartService:', error);
      throw error;
  }
};

// Delete the entire cart
export const deleteCartService = async (userId: number) => {
  try {
      // Find the pending cart
      const pendingCart = await findPendingCartByUserId(userId);
      if (!pendingCart) {
          throw new Error('No pending cart found for this user.');
      }

      // Remove all products from the cart
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