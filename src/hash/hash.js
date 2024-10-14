import fs from "fs";
import os from "os";
import { createHash } from "node:crypto";
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";

export const calculateHash = async (filePath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  let result = "";
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(getNewPath(filePath));
    const fileText = [];
    readStream.on('data', chunk => fileText.push(chunk));
    readStream.on('error', (error) => {
      result = `${contants.ERROR_COMMAND}${error}` + os.EOL;
    });
    readStream.on('end', () => { 
      result = createHash("sha256").update(fileText.join()).digest('hex') + os.EOL; 
    }); 
    readStream.on('close', () => {
      resolve(result + currentDirectory);
    });    
  });
}