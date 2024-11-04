"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const express_1 = require("express");
const paymentsController_1 = require("../controllers/paymentsController");
exports.paymentsRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/payments/start:
 *   post:
 *     tags:
 *       - Payment GateWays
 *     summary: Initialize Payment with Chapa
 *     description: This endpoint initiates the payment process by generating a link to the Chapa checkout page.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: Account email of the user making the payment.
 *               planId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the plan the user wants to subscribe to.
 *               phoneNumber:
 *                 type: string
 *                 example: "09xxxxxxxx"
 *                 description: Phone number for payment verification.p it must be 10 digits, so it should be in 09xxxxxxxx or 07xxxxxxxx format.
 *     responses:
 *       200:
 *         description: Payment link generated successfully. Redirect the user to the Chapa checkout page.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checkoutUrl:
 *                   type: string
 *                   example: "https://checkout.chapa.co/example"
 *                   description: URL link to the Chapa checkout page.
 *       400:
 *         description: Bad request. Required fields are missing or improperly set.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters."
 *       404:
 *         description: Plan not found. The specified plan does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Requested plan does not exist."
 */
exports.paymentsRouter.post("/start", paymentsController_1.startPaymentController);
exports.paymentsRouter.get("/success", paymentsController_1.sucessfullPaymentController);
exports.paymentsRouter.post("/confirm", paymentsController_1.confirmPaymentController);
