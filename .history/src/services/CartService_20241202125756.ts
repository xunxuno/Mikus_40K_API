import { getProductById } from '../models/productModel';
import { createCart, findPendingCartByUserId } from '../models/CartModel';

export const getOrCreatePendingCart = async (userId: number): Promise<number> => {
    try {
        // Buscar un carrito pendiente para el usuario
        const pendingCart = await findPendingCartByUserId(userId);

        if (pendingCart) {
            // Si ya existe un carrito pendiente, devolver su ID
            return pendingCart.id;
        }

        // Si no existe un carrito pendiente, crear uno nuevo
        const newCartId = await createCart(userId);
        return newCartId;
    } catch (error) {
        console.error('Error in getOrCreatePendingCart:', error);
        throw error;
    }
};
