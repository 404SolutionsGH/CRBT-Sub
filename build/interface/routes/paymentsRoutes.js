"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = require("express");
const paymentsController_1 = require("../controllers/paymentsController");
exports.paymentsRouter = (0, express_1.Router)();
exports.paymentsRouter.post("/start", paymentsController_1.startPaymentController);
exports.paymentsRouter.get("/success", paymentsController_1.sucessfullPaymentController);
exports.paymentsRouter.post("/confirm", paymentsController_1.confirmPaymentController);
