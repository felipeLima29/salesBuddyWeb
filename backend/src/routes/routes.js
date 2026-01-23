import { Router } from "express";
import { deleteUsers, getUserId, insertUser, listAllUser, updateUser } from "../controllers/UserController.js";
import { insertSale, listAllSales } from "../controllers/SaleController.js";
import { login } from "../controllers/authController.js";
import middleware from "../middlewares/auth.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', middleware, insertUser);
router.get('/listAllUser', middleware, listAllUser);
router.get('/getUserId/:id', middleware, getUserId);
router.put('/updateUser/:id', middleware, updateUser);
router.delete('/deleteUsers', middleware, deleteUsers);

// Rotas de Vendas
router.post('/insertSale', insertSale);
router.get('/listAllSales', listAllSales);

// Rotas de autenticação
router.post('/login', login);
export default router;