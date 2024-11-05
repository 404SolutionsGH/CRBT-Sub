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
exports.createFileNameAndSave = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const randomData_1 = require("./randomData");
const path_1 = require("path");
const objects_1 = require("../constants/objects");
const path_2 = require("./path");
const createFileNameAndSave = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { getRandomString } = new randomData_1.RandomData();
    const isNameUnique = false;
    let fileName = "";
    while (!isNameUnique) {
        fileName = `${getRandomString(20)}${file.exetension}`;
        const path = (0, path_1.join)(__dirname, "..", "..", "..", "/songsData", fileName);
        // const path = `${__dirname.replace("\\build\\useCases\\song", `\\songsData\\${fileName}`)}`;
        // check if the file exist
        if (!(yield (0, path_2.checkPathExists)(path))) {
            // emit the File path and buffer for storage
            objects_1.event.emit("saveFile", file.data, path);
            break;
        }
    }
    return fileName;
});
exports.createFileNameAndSave = createFileNameAndSave;
