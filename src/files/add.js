import fs from "fs";
import os from 'os';
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";

export const addFile = async (filePath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  let result = "";
  fs.open(getNewPath(filePath), 'a', (error, fd) => {
    if (error) {
      result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
    } else {
      fs.close(fd);
    }    
  });
  return result + currentDirectory;
}