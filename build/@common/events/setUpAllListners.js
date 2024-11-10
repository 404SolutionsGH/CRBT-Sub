"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAllEventListners = void 0;
const deleteFileListener_1 = require("./deleteFileListener");
const saveFileListener_1 = require("./saveFileListener");
const updateRewardPoints_1 = require("./updateRewardPoints");
const setUpAllEventListners = () => {
    console.log("Setting up all event listeners...");
    (0, saveFileListener_1.saveFileListner)();
    (0, deleteFileListener_1.deleteFileListener)();
    (0, updateRewardPoints_1.updateRewardPointsListener)();
    console.log("Setup done");
};
exports.setUpAllEventListners = setUpAllEventListners;
