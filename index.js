import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
// import router from "./routes/employ.js"
// import userrouter from "./routes/user.js"
import authrouter from "./routes/auth.js"
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import fileUpload from 'express-fileupload'
import *as path from 'path'



dotenv.config()
const index=express();

// midleware
index.use(express.json());
index.use(express.urlencoded({extended:true}));

mongoose.set('strictQuery',true);

// routes
index.use("/api/v1",orderRouter)
index.use("/api/v1",cartRouter)
index.use("/api/v1",authrouter)
index.use("/api/v1",productRouter)

index.use('/image', express.static('images'));

index.set('views', path.join('views'))
index.set('view engine', 'ejs')

const PORT=process.env.PORT||8000
// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})
 
// server port
index.listen(PORT,()=>{
    console.log("server started at port http://localhost:8000");
})