import fs from "fs";
import os from 'os';
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";

export const catFile = async (filePath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(getNewPath(filePath));
    readStream.on('open', () => {});
    const fileData = [];
    readStream.on('data', chunk => fileData.push(chunk.toString()));
    readStream.on('end', () => {
      if (fileData.length) console.log(fileData.join('') + os.EOL);
    });
    readStream.on('error', (error) => console.log(`${contants.ERROR_COMMAND}${error}`)); 
    readStream.on('close', () => {
      resolve(currentDirectory);
    });    
  });
}