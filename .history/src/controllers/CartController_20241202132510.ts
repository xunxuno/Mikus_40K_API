//import {SecureData} from '../models/secureDataModel';
import { Request, Response } from 'express';
import { getOrCreatePendingCart, addProductToCartService, updateProductQuantityService, removeProductFromCartService, deleteCartService, } from '../services/CartService';

export const getOrCreateCartController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Obtener o crear el carrito pendiente
        const cartId = await getOrCreatePendingCart(userId);

        res.status(200).json({ cartId });
    } catch (error) {
        console.error('Error in getOrCreateCartController:', error);
        res.status(500).json({ message: 'Error retrieving or creating cart', error });
    }
};

// Agregar producto al carrito
export const addProductToCartController = async (req: Request, res: Response) => {
  try {
      const { userId, productId, quantity, price } = req.body;

      if (!userId || !productId || !quantity || !price) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      await addProductToCartService(userId, productId, quantity, price);

      res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
      console.error('Error in addProductToCartController:', error);
      res.status(500).json({ message: 'Error adding product to cart', error });
  }
};

// Modificar cantidad de un producto en el carrito
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

// Eliminar producto del carrito
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

// Eliminar carrito completo
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