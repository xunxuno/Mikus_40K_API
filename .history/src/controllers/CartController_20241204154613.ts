//import {SecureData} from '../models/secureDataModel';
import { Request, Response } from 'express';
import { getOrCreatePendingCart, addProductToCartService, updateProductQuantityService, removeProductFromCartService, deleteCartService, getCartProductQuantity, fetchCartItems} from '../services/CartService';

export const getOrCreateCartController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Get or create the pending cart
        const cartId = await getOrCreatePendingCart(userId);

        res.status(200).json({ cartId });
    } catch (error) {
        console.error('Error in getOrCreateCartController:', error);
        res.status(500).json({ message: 'Error retrieving or creating cart', error });
    }
};

// Add product to cart
export const addProductToCartController = async (req: Request, res: Response) => {
  try {
      const { userId, productId, quantity, price, product_name } = req.body;

      if (!userId || !productId || !quantity || !price || !product_name) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      await addProductToCartService(userId, productId, quantity, price, product_name);

      res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
      console.error('Error in addProductToCartController:', error);
      res.status(500).json({ message: 'Error adding product to cart', error });
  }
};

// Modify the quantity of a product in the cart
export const updateProductQuantityController = async (req: Request, res: Response) => {
  try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      await updateProductQuantityService(userId, productId, quantity);

      res.status(200).json({ message: 'Product quantity updated' });
  } catch (error) {
      console.error('Error in updateProductQuantityController:', error);
      res.status(500).json({ message: 'Error updating product quantity', error });
  }
};

// Remove product from cart
export const removeProductFromCartController = async (req: Request, res: Response) => {
  try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      await removeProductFromCartService(userId, productId);

      res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
      console.error('Error in removeProductFromCartController:', error);
      res.status(500).json({ message: 'Error removing product from cart', error });
  }
};

// Delete entire cart
export const deleteCartController = async (req: Request, res: Response) => {
  try {
      const { userId } = req.body;

      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      await deleteCartService(userId);

      res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
      console.error('Error in deleteCartController:', error);
      res.status(500).json({ message: 'Error deleting cart', error });
  }
};

export const getCartProductByUserId = async (req: Request, res: Response): Promise<void> => {
    const { cart_id, productId } = req.params;
  
    try {
      const quantity = await getCartProductQuantity(Number(cart_id), Number(productId));
      res.status(200).json({ quantity });
    } catch (error) {
      console.error('Error en el controlador al obtener producto del carrito:', error);
      res.status(500).json({ message: 'Error al obtener el producto en el carrito.' });
    }
  };

  export const getCartItems = async (req: Request, res: Response): Promise<void> => {
    const { cartId } = req.params;
  
    if (!cartId) {
      res.status(400).json({ error: 'Se requiere el ID del carrito.' });
      return;
    }
  
    try {
      const cartItems = await fetchCartItems(Number(cartId));
      res.status(200).json(cartItems);
    } catch (error: any) {
      console.error('Error al obtener los elementos del carrito:', error.message);
      res.status(500).json({ error: 'No se pudieron obtener los elementos del carrito.' });
    }
  };