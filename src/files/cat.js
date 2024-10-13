import fs from "fs";
import * as contants from "../constants.js";

export const catFile = async (filePath) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on('open', () => {
      console.log("Start reading the file");
    });
    const fileData = [];
    readStream.on('data', chunk => fileData.push(chunk.toString()));
    readStream.on('close', () => {
      if (fileData.length) console.log(fileData.join(''));
        resolve();
        return;
      });
    readStream.on('error', (error) => console.log(`${contants.ERROR_COMMAND}${error}`)); 
  });
}