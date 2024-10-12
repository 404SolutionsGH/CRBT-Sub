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
const errorHandler_1 = require("./interface/middlewares/errorHandler");
const authRoutes_1 = require("./interface/routes/authRoutes");
const userRoutes_1 = require("./interface/routes/userRoutes");
const songsRoutes_1 = require("./interface/routes/songsRoutes");
const serviceRoutes_1 = require("./interface/routes/serviceRoutes");
const connectDb_1 = require("./infrastructure/database/connectDb");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = require("./swaggerConfig");
const setUpAllListners_1 = require("./@common/events/setUpAllListners");
const adminPlanRoute_1 = require("./interface/routes/adminPlanRoute");
const server = (0, express_1.default)();
// setting up swagger-ui
server.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.swaggerSpecs));
// middlewares
server.use(express_1.default.json());
server.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// routes
server.use("/api/v1/auth", authRoutes_1.authRouter);
server.use("/api/v1/user", userRoutes_1.userRouter);
server.use("/api/v1/songs", songsRoutes_1.songsRouter);
server.use("/api/v1/service", serviceRoutes_1.serviceRouter);
server.use("/api/v1/admin-plan", adminPlanRoute_1.adminPlanRouter);
// error handling middlware
server.use(errorHandler_1.errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, setUpAllListners_1.setUpAllEventListners)();
        yield (0, connectDb_1.connectToDatabase)();
        // await TempSong.truncate();
        // await Song.truncate();
        // console.log("data deleted");
        // await Admin.truncate();
        // const password= await encryptPassword("Admin1234");
        // await Admin.create({
        //   email: "admin@gmail.com",
        //   firstName: "adminFirstName",
        //   lastName: "adminLastName",
        //   password:password,
        //   adminType: "system",
        // });
        server.listen(port, () => {
            console.log(`Server  is listening on ${port} `);
        });
    }
    catch (error) {
        console.log(`ServerStartUpError:${error}`);
    }
});
startServer();
