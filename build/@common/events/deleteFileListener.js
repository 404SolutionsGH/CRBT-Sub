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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileListener = void 0;
const objects_1 = require("../constants/objects");
const path_1 = require("path");
const path_2 = require("../helperMethods/path");
const promises_1 = require("fs/promises");
const deleteFileListener = () => {
    objects_1.event.on("deleteFile", (fileName) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("File is been deleted..");
        const path = (0, path_1.join)(__dirname, "..", "..", "..", "/songsData", fileName);
        if (yield (0, path_2.checkPathExists)(path)) {
            yield (0, promises_1.unlink)(path);
            console.log("File deleted");
        }
    }));
};
exports.deleteFileListener = deleteFileListener;
