import { Router } from 'express';
import { getProducts, getProduct } from '../controllers/productController';
import { addNewUser, loginUsuario } from '../controllers/userController';
import { verificarToken } from '../middlewares/autenticador';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

/*router.post('/singIn', verificarToken, (req, res) => {
    addNewUser(req, res);
});*/

router.post('/singIn', (req, res) => {
    addNewUser(req, res);
});
router.post('/singUp', verificarToken, (req, res) => {
    loginUsuario(req, res);
});

export default router;