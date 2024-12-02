import { Request, Response } from 'express';
import { createOrderFromCartService } from '../services/orderService';

export const createOrderFromCartController = async (req: Request, res: Response) => {
    const { userId, cartId } = req.body;

    try {
        // Llamar al servicio para crear la orden
        const order = await createOrderFromCartService(userId, cartId);

        res.status(201).json({
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' });  
      console.error('Error creating order in controller:', error);
    }
};

  