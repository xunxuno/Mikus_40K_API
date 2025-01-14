import * as CartModel from '../models/CartModel';
import { getProductById } from '../models/productModel';

export const getOrCreateCart = async (userId: number) => {
  const existingCart = await CartModel.findCartByUserId(userId);

  if (existingCart && existingCart.length > 0) {
    return existingCart[0];
  }

  const cartId = await CartModel.createCart(userId);
  return { id: cartId, user_id: userId };
};

export const addProductToCart = async (cartId: number, productId: number, quantity: number) => {
  const product = await getProductById(productId);
  if (!product) throw new Error('Producto no encontrado');

  const price = product.price;
  await CartModel.addItemToCart(cartId, productId, quantity, price);
};

