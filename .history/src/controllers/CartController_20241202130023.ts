//import {SecureData} from '../models/secureDataModel';
import { Request, Response } from 'express';
import { getOrCreatePendingCart } from '../services/CartService';

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
