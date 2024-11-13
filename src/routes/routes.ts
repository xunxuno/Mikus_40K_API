import { Router } from 'express';
import { getProducts, getProduct } from '../controllers/productController';
import { addNewUser } from '../controllers/userController';
import { verificarToken } from '../middlewares/autenticador';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

router.post('/singUp', verificarToken, (req, res) => {
    addNewUser(req, res);
});
/*
router.post('/singUp', (req, res) => {
    addNewUser(req, res);
});*/


export default router;