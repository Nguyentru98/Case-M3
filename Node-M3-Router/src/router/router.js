import fs from 'fs'
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";


let router = {
    '/': homeController.showIndex,
    '/Increase': homeController.showPriceIncrease,
    '/Reduced': homeController.showPriceReduced,
    '/err': homeController.showErr,

}
router = {...router, ...productRouter,};
router = {...router, ...userRouter};
export default router;
