import express from 'express'
import checkauth from '../middleware/auth.js'
import upload from '../imagePath/image.js'

import productController from '../controller/product.js'

const productRouter = express.Router()


productRouter.post("/post",upload,checkauth,productController.postProduct)

productRouter.get("/get",checkauth,productController.getProducts)

productRouter.get("/dashGetProduct",productController.dashProduct)

productRouter.get("/paginate",productController.pagination)

productRouter.get("/search",productController.search)

productRouter.get("/get/:id",checkauth,productController.getProduct)

productRouter.delete("/delete/:id",checkauth,productController.deleteProduct)

productRouter.put("/update/:id",upload,checkauth,productController.updateProduct)






export default productRouter