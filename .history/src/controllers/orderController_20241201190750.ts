import { Request, Response } from 'express';
import { getOrderHistory } from '../services/orderService';

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
