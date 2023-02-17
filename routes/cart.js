import express from 'express'
import cartController from '../controller/cart.js'
import checkauth from '../middleware/auth.js'


const cartRouter = express.Router()


cartRouter.post('/cart',checkauth,cartController.postCart)

cartRouter.get('/cart/get',checkauth,cartController.getCart)

cartRouter.delete('/cart/delete/',checkauth,cartController.deleteCart)




export default cartRouter