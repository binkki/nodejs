import fs from "fs";
import path from "path";
import os from 'os';
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
  getNewPath,
  getPathOptions,
} from "../navigation/cd.js";

export const renameFile = async (oldPath, newName, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  let result = "";
  return new Promise((resolve) => {
    try {
      const newPathOptions = getPathOptions(oldPath);
      fs.rename(
        getNewPath(oldPath),
        path.resolve(newPathOptions.root, newPathOptions.dir, newName),
        (error) => {
          if (error) {
            result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
          }
        }
      )
    }
    catch (error) {
      result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
    }
    resolve(result + currentDirectory);
  });
}