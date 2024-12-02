import { Request, Response } from 'express';
import { getOrderHistory, createNewOrder  } from '../services/orderService';

export const getOrderHistoryController = async (req: Request, res: Response) => {
  const userId = req.params.userId;  // Suponiendo que el userId se pasa como parámetro en la URL

  try {
    const ordersWithItems = await getOrderHistory(Number(userId));  // Llamar al servicio
    res.status(200).json(ordersWithItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial de compras.' });
  }
};

export const createOrderController = async (req: Request, res: Response) => {
    const { userId, cartId } = req.body;
  
    // Validar entrada
    if (!userId || !cartId) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos: userId o cartId' });
    }
  
    try {
      // Crear una nueva orden
      const order = await createNewOrder(userId, cartId);
  
      // Responder con la orden creada
      res.status(201).json({ message: 'Orden creada exitosamente', order });
    } catch (error) {
      console.error('Error en createOrderController:', error);
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  };
