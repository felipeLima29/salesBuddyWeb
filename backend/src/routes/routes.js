import { Router } from "express";
import { insertUser, listAllUser } from "../controllers/UserController.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', insertUser);
router.get('/listAllUser', listAllUser);


export default router;