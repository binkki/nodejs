import path from "path";
import * as contants from "../constants.js";

export const getCurrentDirectory = (appData) => {
  return `${contants.CURRENT_DIRECTORY} ${appData.currentDirr}`;
}

export const changeDirectory = (newDirectory, appData) => {
  try {
    process.chdir(newDirectory);
    appData.currentDirr = process.cwd();
  }
  catch (error) {
    console.log(`${contants.ERROR_COMMAND}${error}`);
  }
}

const getPathOptions = (newPath) => {
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