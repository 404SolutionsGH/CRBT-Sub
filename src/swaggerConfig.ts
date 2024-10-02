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
        name: "Service",
        description: "All operations relating to services",
      },
      {
        name: "Songs",
        description: "All operations relating to songs",
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


