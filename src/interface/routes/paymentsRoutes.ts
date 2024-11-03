import { Router } from "express";
import { confirmPaymentController, startPaymentController, sucessfullPaymentController } from "../controllers/paymentsController";


export const paymentsRouter = Router();

paymentsRouter.post("/start",startPaymentController)

paymentsRouter.get("/success", sucessfullPaymentController);

paymentsRouter.post("/confirm",confirmPaymentController)
