import path from "path";
import fs from "fs";
import * as contants from "./constants.js";

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

export const lsDirectory = async (appData) => {
  const result = [];
  fs.readdirSync(
    appData.currentDirr, 
    {
      withFileTypes: true
    }
  ).forEach((file) => {
    result.push({
      Name: file.name,
      Type: file.isFile() ? contants.LS_TYPE_FILE : contants.LS_TYPE_DIRECTORY
    })
  });
  result.sort((a, b) => {
    if (a.Type < b.Type)
      return -1;
    if (a.Type > b.Type)
      return 1;
    return 0;
  })
  console.table(result);
}