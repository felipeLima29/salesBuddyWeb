import { Router } from "express";
import { insertUser } from "../controllers/UserController.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', insertUser);


export default router;