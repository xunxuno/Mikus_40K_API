import { Request, Response } from 'express';
import { getAllProducts, getProductById } from '../models/product';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.json(products);  // Enviar los productos como respuesta
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const product = await getProductById(Number(id));
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return; // Solo detener la ejecución sin devolver el resultado de res.status
      }
      res.json(product);  // Enviar el producto como respuesta
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener producto' });
    }
  };
  
