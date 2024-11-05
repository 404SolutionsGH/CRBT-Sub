import { deleteFileListener } from "./deleteFileListener";
import { saveFileListner } from "./saveFileListener";


export const setUpAllEventListners = () => {
  console.log("Setting up all event listeners...");
   saveFileListner()
   deleteFileListener()
  console.log("Setup done");
};
