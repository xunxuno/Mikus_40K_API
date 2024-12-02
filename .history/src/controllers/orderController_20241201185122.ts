import { Request, Response } from 'express';
import { getOrderHistory } from '../services/orderService';

export const getOrderHistoryController = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const orderHistory = await getOrderHistory(Number(userId));
    res.status(200).json(orderHistory);
    console.log(orderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting purchase history.' });
  }
};
