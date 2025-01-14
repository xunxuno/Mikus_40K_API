import { Product, getAllProducts, searchProductsByName } from '../models/productModel';

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

export const searchProductsByName_ = async (name: string) => {
  if (!name) {
    throw new Error("El nombre del producto no puede estar vacío");
  }

  const products = await searchProductsByName(name);
  return products;
};

export { getAllTheproducts };
