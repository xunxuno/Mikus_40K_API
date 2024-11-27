import { Request, Response } from 'express';
import * as CartService from '../services/CartService';
import { RequestWithUser } from '../models/userModel';

const getUserIdFromRequest = (req: RequestWithUser): number | null => req.user?.id || null;

export const getOrCreateCart = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const cart = await CartService.getOrCreateCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener o crear el carrito' });
  }
};

export const addProductToCart = async (req: RequestWithUser, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const cart = await CartService.getOrCreateCart(userId);
    await CartService.addProductToCart(cart.id, productId, quantity);

    res.status(200).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

export const clearUserCart = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    const cart = await CartService.getOrCreateCart(userId);
    await CartService.clearUserCart(cart.id);

    res.status(200).json({ mensaje: 'Carrito limpiado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
};
