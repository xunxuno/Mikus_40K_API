import { Product, getAllProducts } from '../models/productModel';

async function getAllTheproducts(): Promise<Product[]> {
  try {
    return await getAllProducts();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error when fetching products in the service:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error; 
  }
}

export { getAllTheproducts };
