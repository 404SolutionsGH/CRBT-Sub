"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAllEventListners = void 0;
const saveFileListener_1 = require("./saveFileListener");
const setUpAllEventListners = () => {
    console.log("Setting upp all event listeners...");
    (0, saveFileListener_1.saveFileListner)();
    console.log("Setup done");
};
exports.setUpAllEventListners = setUpAllEventListners;
