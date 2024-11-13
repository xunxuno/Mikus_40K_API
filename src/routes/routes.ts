import { Router } from 'express';
import { getProducts, getProduct } from '../controllers/productController';
import { addNewUser } from '../controllers/userController';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

//router.post('/users', addNewUser);

export default router;