import { Product, getAllProducts, searchProductsByName, getProductById} from '../models/productModel';

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

export const searchProductsByName_ = async (product_Name: string) => {
  if (!product_Name) {
    throw new Error("El nombre del producto no puede estar vacío");
  }

  const products = await searchProductsByName(product_Name);
  return products;
};

export const fetchProductDetails = async (id: number): Promise<Product | null> => {
  try {
    const product = await getProductById(id);
    return product;
  } catch (error) {
    throw new Error('Error al obtener los detalles del producto');
  }
};
export { getAllTheproducts };
