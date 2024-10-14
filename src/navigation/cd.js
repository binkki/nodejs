import path from "path";
import os from 'os';
import * as contants from "../constants.js";

export const getCurrentDirectory = (appData) => {
  return `${contants.CURRENT_DIRECTORY} ${appData.currentDirr}` + os.EOL;
}

export const changeDirectory = async (newDirectory, appData) => {
  return new Promise((resolve) => {
    let result = "";
    try {
      process.chdir(newDirectory);
      appData.currentDirr = process.cwd();
    }
    catch (error) {
      result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
    }
    resolve(result + getCurrentDirectory(appData));
  });
}

export const getPathOptions = (newPath) => {
  return process.platform === contants.WIN_PLATFORM
    ? path.parse(newPath)
    : contants.LINUX_HOME_DRIVE;
}

export const getNewPath = (newPath) => {
  const rootOptions = getPathOptions(process.cwd());
  return path.isAbsolute(newPath)
    ? path.resolve(rootOptions.root, newPath)
    : path.join(process.cwd(), newPath);
}