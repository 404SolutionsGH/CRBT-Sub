import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectToDatabase } from "./libs/mongoose";
import { errorHandeler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth/authRoutes";
import { userRouter } from "./routes/user/userRoutes";


const server = express();

// middlewares
server.use(express.json());

// routes
server.use("/api/v1/auth",authRouter)
server.use("/api/v1/user",userRouter);


// error handling middlware
server.use(errorHandeler);

const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = async () => {
  try {
    await connectToDatabase(process.env.MongoDbConnectionUrl);

    server.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.log(`ServerStartUpError:${error}`);
  }
};

startServer();
