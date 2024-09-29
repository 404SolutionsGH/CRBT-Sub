import { saveFileListner } from "./saveFileListener";


export const setUpAllEventListners = () => {
  console.log("Setting upp all event listeners...");
   saveFileListner()
  console.log("Setup done");
};
