"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRouter = void 0;
const express_1 = require("express");
const verifyJwt_1 = require("../middlewares/verifyJwt");
const reportController_1 = require("../controllers/reportController");
const checkForSuperAdmin_1 = require("../middlewares/checkForSuperAdmin");
exports.reportsRouter = (0, express_1.Router)();
exports.reportsRouter.post("/", verifyJwt_1.verifyJwt, reportController_1.createReportController);
// reportsRouter.put("/:id", verifyJwt, updateReportController);
exports.reportsRouter.get("/all", verifyJwt_1.verifyJwt, checkForSuperAdmin_1.isSuperAdminAccount, reportController_1.getReportsController);
exports.reportsRouter.get("/:id", verifyJwt_1.verifyJwt, reportController_1.getReportController);
exports.reportsRouter.delete("/:id", verifyJwt_1.verifyJwt, reportController_1.deleteReportController);
