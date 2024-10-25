import { Router } from 'express';
import { getProducts, getProduct } from '../controllers/productController';
import { addUser } from '../controllers/userController';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

router.post('/users', addUser);

export default router;