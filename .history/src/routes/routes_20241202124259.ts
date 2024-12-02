import { Router } from 'express';
import { getProducts } from '../controllers/productController';
import { addNewUser, loginUsuario } from '../controllers/userController';
import {getOrCreateCart, addProductToCart} from '../controllers/CartController';
import { createOrderFromCartController } from '../controllers/orderController';

const router = Router();

router.get('/products', getProducts);

router.post('/singIn', (req, res) => {
    addNewUser(req, res);
});
router.post('/singUp', (req, res) => {
    loginUsuario(req, res);
});

// Cart Routes
router.post('/cart', (req, res) => {
    getOrCreateCart(req, res);
});

router.post('/cart/items', (req, res) => {
    addProductToCart(req, res);
});

router.post('/create-order', (req, res) => {
    createOrderFromCartController(req, res);
});


export default router;