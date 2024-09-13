"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("./libs/mongoose");
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = require("./routes/auth/authRoutes");
const userRoutes_1 = require("./routes/user/userRoutes");
const songsRoutes_1 = require("./routes/songs/songsRoutes");
const serviceRoutes_1 = require("./routes/services/serviceRoutes");
const server = (0, express_1.default)();
// middlewares
server.use(express_1.default.json());
server.use((0, cors_1.default)());
// routes
server.use("/api/v1/auth", authRoutes_1.authRouter);
server.use("/api/v1/user", userRoutes_1.userRouter);
server.use("/api/v1/songs", songsRoutes_1.songsRouter);
server.use("/api/v1/service", serviceRoutes_1.serviceRouter);
// error handling middlware
server.use(errorHandler_1.errorHandeler);
const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connectToDatabase)(process.env.MongoDbConnectionUrl);
        server.listen(port, () => {
            console.log(`Server  is listening on ${port} `);
        });
    }
    catch (error) {
        console.log(`ServerStartUpError:${error}`);
    }
});
startServer();
