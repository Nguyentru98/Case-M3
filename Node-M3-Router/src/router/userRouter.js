import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/users': userController.showAll,
    '/add-cart': userController.addCart,
    '/show-cart': userController.showCart,
}

export default userRouter;
