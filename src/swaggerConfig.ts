import dotenv from "dotenv";
dotenv.config();
import swaggerJsdoc from "swagger-jsdoc";

import path from "path";

const option: swaggerJsdoc.Options = {
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
  apis: [path.resolve(__dirname, `./interface/routes/**/*.js`)],
};

export const swaggerSpecs = swaggerJsdoc(option);


