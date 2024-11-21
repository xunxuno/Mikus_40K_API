import { Request, Response } from 'express';
import { getAllTheproducts } from '../services/productServices';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllTheproducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products in controller:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

  
