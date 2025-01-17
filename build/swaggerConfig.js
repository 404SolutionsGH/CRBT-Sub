"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRBT Backend Documentation",
            version: "1.0.0",
            description: "This is the documenation on how to interact with CRBT backend service",
        },
        servers: [{ url: `${process.env.BaseUrl}` }],
        tags: [
            {
                name: "Account",
                description: "All operations relating to account",
            },
            {
                name: "Songs",
                description: "All operations relating to songs",
            },
            {
                name: "MerchantPlans",
                description: "All operations relating to plans merchants subscribe to.",
            },
            {
                name: "Admins",
                description: "All operations relating to Admin user management",
            },
            {
                name: "Packages",
                description: "All operations relating to getting packages and their category",
            },
            {
                name: "Payment GateWays",
                description: "All operations relating to payent of plans",
            },
            {
                name: "Ads",
                description: "All operations relating to ads.",
            },
            {
                name: "Roles",
                description: "All operations relating to roles.",
            },
            {
                name: "Reports",
                description: "All operations relating to reports",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [path_1.default.resolve(__dirname, `./interface/routes/**/*.js`)],
};
exports.swaggerSpecs = (0, swagger_jsdoc_1.default)(option);
