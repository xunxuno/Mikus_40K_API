import { Request, Response } from 'express';
import * as CartService from '../services/CartService';
import { RequestWithUser , getUserByEmail} from '../models/userModel';
import {SecureData} from '../models/secureDataModel';

const getUserIdFromRequest = (req: RequestWithUser): number | null => req.user?.id || null;

export const getOrCreateCart = async (req: Request, res: Response) => {
  const { secureData } = req.body as { secureData: SecureData };

  try {
    if (!secureData || !secureData.email) {
      return res.status(400).json({ mensaje: 'SecureData with email is required' });
    }
    const user = await getUserByEmail(secureData.email);
    if (!user || user.id === undefined) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado o no válido' });
    }
    const userId = user.id;

    const cart = await CartService.createCart(userId);

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener o crear el carrito:', error);
    return res.status(500).json({ error: 'Error al obtener o crear el carrito' });
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { secureData } = req.body as { secureData: SecureData }; // Extract SecureData
    const { productId, quantity } = req.body;

    if (!secureData || !secureData.email) {
      return res.status(400).json({ mensaje: 'SecureData with email is required' });
    }

    const user = await getUserByEmail(secureData.email);
    if (!user || user.id === undefined) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const userId = user.id;
    const cart = await CartService.createCart(userId);
    await CartService.addProductToCart(cart.id, productId, quantity);

    res.status(200).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

