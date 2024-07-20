"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userControllers_1 = require("./userControllers");
const verifyJwt_1 = require("../../middleware/verifyJwt");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.put("/update-account-info", verifyJwt_1.verifyJwt, userControllers_1.accountUpdateControler);
