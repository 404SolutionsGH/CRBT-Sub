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
import { Admin } from "./domain/entities/Admin";
import { encryptPassword } from "./libs/bcrypt";

const server = express();

// setting up swagger-ui
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// middlewares
server.use(express.json());
server.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

// routes
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/songs", songsRouter);
server.use("/api/v1/service", serviceRouter);
server.use("/api/v1/admin-plan",adminPlanRouter)
// error handling middlware
server.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = async () => {
  try {
    setUpAllEventListners()
    await connectToDatabase()
      await connectToDatabase();
      await TempSong.truncate();
      await Song.truncate();
      console.log("data deleted");
      await Admin.truncate()
      await Admin.create({
        email: "admin@gmail.com",
        firstName: "adminFirstName",
        lastName: "adminLastName",
        password: await encryptPassword("Admin1234"),
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
