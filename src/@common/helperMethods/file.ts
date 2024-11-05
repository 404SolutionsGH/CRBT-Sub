import dotenv from "dotenv";
dotenv.config();
import { File } from "../customDataTypes/File";
import { RandomData } from "./randomData";
import { isAbsolute, join, resolve } from "path";
import fs, { access } from "fs/promises";
import { event } from "../constants/objects";
import { checkPathExists } from "./path";




export const createFileNameAndSave = async (file: File) => {
  const { getRandomString } = new RandomData();
  const isNameUnique = false;
  let fileName: string=""
  while (!isNameUnique) {
    fileName = `${getRandomString(20)}${file.exetension}`;
    const path = join(__dirname, "..", "..", "..", "/songsData", fileName);
    // const path = `${__dirname.replace("\\build\\useCases\\song", `\\songsData\\${fileName}`)}`;

    // check if the file exist
    if (!(await checkPathExists(path))) {
      // emit the File path and buffer for storage
      event.emit("saveFile", file.data, path);
      break;
    }
  }
  return fileName;
};
