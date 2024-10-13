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
exports.connectToDatabase = exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const defineAllTables_1 = require("./defineAllTables");
exports.sequelize = new sequelize_1.Sequelize(process.env.DatabaseUri, { dialectOptions: { ssl: { require: true } }, logging: false });
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Establishing Database connection...");
    // connect to the database
    yield exports.sequelize.authenticate();
    console.log("Database connection sucessful");
    // models definition
    console.log("Defining Tables Structures...");
    yield (0, defineAllTables_1.defineAllTables)();
    console.log("Table Structures defined");
    //models syncronization
    console.log("Database syncronising..");
    yield exports.sequelize.sync({ alter: true });
    console.log("Syncronization sucessfull");
});
exports.connectToDatabase = connectToDatabase;
