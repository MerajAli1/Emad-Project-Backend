import CookieParser from "cookieparser"
import cors from "cors"
import express, { urlencoded } from "express"
const app = express()


app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit: "16kb"}))
app.use(express.static("public"))

// app.use(CookieParser())
//Routes..
import ProductRouter from "./routes/Product.routes.js"
import orderRouter from "./routes/Order.routes.js"
app.use("/api/v1",ProductRouter)
app.use("/api/v1",orderRouter)
// http://localhost:8000/api/v1/Products

export {app}