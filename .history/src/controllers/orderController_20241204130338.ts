import { Request, Response } from 'express';
import { createOrderFromCartService, getOrdersByUserId_ , getOrderHistoryForUser} from '../services/orderService';

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

export const fetchOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId, 10);
  
    if (isNaN(userId)) {
      res.status(400).json({ error: 'El ID del usuario debe ser un número válido.' });
      return;
    }
  
    try {
      const orders = await getOrdersByUserId_(userId);
  
      if (orders.length === 0) {
        res.status(404).json({ message: 'No se encontraron órdenes para este usuario.' });
        return;
      }
  
      res.status(200).json(orders);
    } catch (error: unknown) {
      console.error('Error en el controlador al obtener órdenes:', error);
      res.status(500).json({ error: 'Hubo un problema al obtener las órdenes.' });
    }
  };
  


export const getOrderHistoryController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Llamada al servicio
    const orderHistory = await getOrderHistoryForUser(userId);

    res.status(200).json(orderHistory);
  } catch (error) {
    console.error('Error in getOrderHistoryController:', error);
    res.status(500).json({ message: 'Error fetching order history', error });
  }
};