import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/Db.js";

const PORT = 8003

dotenv.config({
    path : './env'
})


connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server is running on port",PORT);
    })
})
.catch((error)=>{
        console.log("mongoDB connection failed....",error);
})