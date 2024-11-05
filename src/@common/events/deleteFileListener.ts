import { event } from "../constants/objects";
import { isAbsolute, join, resolve } from "path";
import { checkPathExists } from "../helperMethods/path";
import { unlink } from "fs/promises";

export const deleteFileListener = () => {
  event.on("deleteFile", async (fileName: string) => {
    console.log("File is been deleted..");
    const path = join(__dirname, "..", "..", "..", "/songsData", fileName);
    if (await checkPathExists(path)) {
      await unlink(path);
      console.log("File deleted");
    }
  });
};
