import { Router } from 'express';
import { getProducts } from '../controllers/productController';
import { addNewUser, loginUsuario, updateUserDetails, getUserDetails } from '../controllers/userController';
import {getOrCreateCartController, addProductToCartController, updateProductQuantityController, removeProductFromCartController, deleteCartController,} from '../controllers/CartController';
import { createOrderFromCartController } from '../controllers/orderController';

const router = Router();

router.get('/products', getProducts);

router.post('/singIn', (req, res) => {
    addNewUser(req, res);
});
router.post('/singUp', (req, res) => {
    loginUsuario(req, res);
});

router.post('/user-details', (req, res) => {
    updateUserDetails(req, res);
});
router.get('/user-details/:userId', getUserDetails);


// Cart Routes
router.post('/cart', (req, res) => {
    getOrCreateCartController(req, res);
});

// Agregar producto al carrito
router.post('/cart/add', (req, res) => {
    addProductToCartController(req, res);
});

// Modificar cantidad de producto en el carrito
router.put('/cart/update-quantity', (req, res) => {
    updateProductQuantityController(req, res);
});

// Eliminar producto del carrito
router.delete('/cart/remove-product', (req, res) => {
    removeProductFromCartController(req, res);
});

// Eliminar carrito completo
router.delete('/cart/clear', (req, res) => {
    deleteCartController(req, res);
});


router.post('/create-order', (req, res) => {
    createOrderFromCartController(req, res);
});


export default router;