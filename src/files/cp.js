import fs from "fs";
import {
  getCurrentDirectory,
} from "../navigation/cd.js";

export const copyFile = async (oldPath, newPath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  const result = "";
  return new Promise((resolve) => {
    try {
      const readSream = fs.createReadStream();
      const writeStream = fs.createWriteStream();
      readSream.pipe(writeStream);
    }
    catch (error) {
      result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
    }
    resolve(result + currentDirectory);
  });
} 