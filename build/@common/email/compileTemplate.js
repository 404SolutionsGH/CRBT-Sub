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
exports.compiledHtml = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const compiledHtml = (templateName, injectables) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = (0, path_1.join)(__dirname, `/templates/${templateName}.html`);
    let htmlFile = yield (0, promises_1.readFile)(templatePath, "utf-8");
    Object.keys(injectables).forEach((key) => {
        const placeholder = `{{${key}}}`;
        htmlFile = htmlFile.replace(new RegExp(placeholder, "g"), injectables[key]);
    });
    return htmlFile;
});
exports.compiledHtml = compiledHtml;
