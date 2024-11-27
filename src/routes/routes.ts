import { Router } from 'express';
import { getProducts } from '../controllers/productController';
import { addNewUser, loginUsuario } from '../controllers/userController';
//import {createCart, addToCart} from '../controllers/CartController';
import { verificarToken } from '../middlewares/autenticador';

const router = Router();

router.get('/products', getProducts);
//router.get('/products/:id', getProduct);

/*router.post('/singIn', verificarToken, (req, res) => {
    addNewUser(req, res);
});*/

router.post('/singIn', (req, res) => {
    addNewUser(req, res);
});
router.post('/singUp', (req, res) => {
    loginUsuario(req, res);
});

// Cart Routes
/*router.post('/cart', (req, res) => {
    createCart(req, res);
});

router.post('/cart/items', (req, res) => {
    addToCart(req, res);
});*/


export default router;