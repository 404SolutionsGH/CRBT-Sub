"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageRouter = void 0;
const express_1 = require("express");
const packageController_1 = require("../controllers/packageController");
exports.packageRouter = (0, express_1.Router)();
exports.packageRouter.get("/", packageController_1.getPackagesController);
exports.packageRouter.get("/:id", packageController_1.getPackageController);
