import { Router } from "express";
import { getUserId, insertUser, listAllUser } from "../controllers/UserController.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: "Consumo bem sucedido!"})
})
router.post('/insertUser', insertUser);
router.get('/listAllUser', listAllUser);
router.get('/getUserId/:id', getUserId);


export default router;