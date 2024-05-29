import { Router } from "express";
import { orderPlaced } from "../controllers/Order.controller.js";


const router = Router()

router.route("/checkout").post(orderPlaced)

export default router;