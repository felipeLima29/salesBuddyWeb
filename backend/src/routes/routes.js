import { Router } from "express";
import { changePassword, deleteUsers, getUserId, insertUser, listAllUser, resetPassword, updateUser } from "../controllers/UserController.js";
import { insertSale, listAllSales, listSale, sendReceipt } from "../controllers/SaleController.js";
import { login } from "../controllers/authController.js";
import middleware from "../middlewares/auth.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', middleware, insertUser);
router.get('/listAllUser', middleware, listAllUser);
router.get('/getUserId/:id', middleware, getUserId);
router.put('/updateUser/:id', middleware, updateUser);
router.delete('/deleteUsers', middleware, deleteUsers);
router.put('/forgotPassword', middleware, resetPassword);
router.put('/changePassword', middleware, changePassword);

// Rotas de Vendas
router.post('/insertSale', middleware, insertSale);
router.get('/listAllSales', middleware, listAllSales);
router.post('/sendReceipt', middleware, upload.single('receipt'), sendReceipt);
router.get('/listSale/:id', middleware, listSale);

// Rotas de autenticação
router.post('/login', login);
export default router;