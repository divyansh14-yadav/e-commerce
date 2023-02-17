import express from 'express'

import authController from '../controller/auth.js'
import checkauth from '../middleware/auth.js'


const authRouter = express.Router()


authRouter.post("/register",authController.authRegister)

authRouter.post("/login",authController.authLogin)

// authRouter.post("/logout",authController.Logout)

authRouter.post("/changePassword",checkauth,authController.changePassword)

authRouter.get("/getUserProfile",checkauth,authController.getUser)

authRouter.get("/getUserById/:id",checkauth,authController.getUserById)

authRouter.put("/updateUserProfile/:id",checkauth,authController.updateUser)

authRouter.delete("/deleteUserProfile/:id",checkauth,authController.deleteUser)







export default authRouter