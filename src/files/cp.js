import fs from "fs";
import os from "os";
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";
import * as contants from "../constants.js";

export const copyFile = async (oldPath, newPath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return new Promise((resolve) => {
    read(oldPath).then((readResult) => {
      if (readResult.error !== "") {
        resolve(readResult.error + os.EOL + currentDirectory);
      } else {
        const writeStream = fs.createWriteStream(getNewPath(newPath), { flags: "a" });
        writeStream.write(readResult.data);
        writeStream.close();
        writeStream.on('error', (error) => console.log(`${contants.ERROR_COMMAND}${error}`));
        writeStream.on('close', () => resolve(currentDirectory));
      }
    });
  });  
}

const read = async (filePath) => {
  let streamError = "";
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(getNewPath(filePath));
    const streamData = [];
    readStream.on('data', (chunk) => streamData.push(chunk));
    readStream.on('close', () => resolve({
      data: streamData.join(''),
      error: streamError,
    }));
    readStream.on('error', (error) => {
      streamError = `${contants.ERROR_COMMAND}${error}`
      console.log(streamError);
    });
  });  
};
