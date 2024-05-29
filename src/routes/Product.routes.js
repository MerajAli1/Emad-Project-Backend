import { Router } from "express";
import { ProductList, deleteProduct, getProduct, getSingleProduct, updateProduct } from "../controllers/Product.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";
const router = Router()

router.route("/Products").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), ProductList)

router.route("/getProduct").get(getProduct)
router.route("/getProduct/:id").get(getSingleProduct)
router.route("/updateProduct/:id").put(updateProduct)
router.route("/deleteProduct/:id").delete(deleteProduct)

export default router