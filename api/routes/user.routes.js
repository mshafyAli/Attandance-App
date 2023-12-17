import  express  from "express";
import { test, updatedUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from  '../utills/verifyUser.js'

const router = express.Router();

router.get('/', test)
router.post('/update/:id', verifyToken,updatedUser)
router.delete('/delete/:id', verifyToken,deleteUser)

export default router