import { Router } from "express";
import { deleteUsers, getUserId, insertUser, listAllUser, updateUser } from "../controllers/UserController.js";
import { insertSale, listAllSales } from "../controllers/SaleController.js";
import { login } from "../controllers/authController.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', insertUser);
router.get('/listAllUser', listAllUser);
router.get('/getUserId/:id', getUserId);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUsers', deleteUsers);

// Rotas de Vendas
router.post('/insertSale', insertSale);
router.get('/listAllSales', listAllSales);

// Rotas de autenticação
router.post('/login', login);
export default router;