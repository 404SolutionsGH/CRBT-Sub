import { deleteFileListener } from "./deleteFileListener";
import { saveFileListner } from "./saveFileListener";
import { updateRewardPointsListener } from "./updateRewardPoints";

export const setUpAllEventListners = () => {
  console.log("Setting up all event listeners...");
  saveFileListner();
  deleteFileListener();
  updateRewardPointsListener();
  console.log("Setup done");
};
