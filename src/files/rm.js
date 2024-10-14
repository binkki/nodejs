import { unlink } from "node:fs/promises";
import os from 'os';
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";

export const deleteFile = async (filePath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return unlink(getNewPath(filePath))
    .then(() => currentDirectory)
    .catch((error) => `${contants.ERROR_COMMAND}${error}` + os.EOL + currentDirectory);
}