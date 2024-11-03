import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { errorHandler } from "./interface/middlewares/errorHandler";
import { authRouter } from "./interface/routes/authRoutes";
import { userRouter } from "./interface/routes/userRoutes";
import { songsRouter } from "./interface/routes/songsRoutes";
import { serviceRouter } from "./interface/routes/serviceRoutes";
import { connectToDatabase } from "./infrastructure/database/connectDb";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swaggerConfig";
import { setUpAllEventListners } from "./@common/events/setUpAllListners";
import { adminPlanRouter } from "./interface/routes/adminPlanRoute";
import { TempSong } from "./domain/entities/TempSong";
import { Song } from "./domain/entities/Song";
import { encryptPassword } from "./libs/bcrypt";
import { Admin } from "./domain/entities/Admin";
import { adminRouter } from "./interface/routes/adminRoutes";
import { packageRouter } from "./interface/routes/packageRoutes";
import { paymentsRouter } from "./interface/routes/paymentsRoutes";

const server = express();

// setting up swagger-ui
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// middlewares
server.use(express.json());
server.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

// routes
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/admin",adminRouter)
server.use("/api/v1/songs", songsRouter);
server.use("/api/v1/service", serviceRouter);
server.use("/api/v1/admin-plan",adminPlanRouter)
server.use("/api/v1/package",packageRouter)
server.use("/api/v1/payments",paymentsRouter)
// error handling middlware
server.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = async () => {
  try {
    setUpAllEventListners()
    await connectToDatabase()
      const password= await encryptPassword("Admin1234");
      await Admin.create({
        email: "admin@gmail.com",
        firstName: "adminFirstName",
        lastName: "adminLastName",
        password:password,
        adminType: "system",
      });
    server.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.log(`ServerStartUpError:${error}`);
  }
};

startServer();
