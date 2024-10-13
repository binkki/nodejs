import fs from "fs";
import os from 'os';
import * as contants from "../constants.js";

export const catFile = async (filePath) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on('open', () => {});
    const fileData = [];
    readStream.on('data', chunk => fileData.push(chunk.toString()));
    readStream.on('end', () => {
      if (fileData.length) console.log(fileData.join('') + os.EOL);
    });
    readStream.on('error', (error) => console.log(`${contants.ERROR_COMMAND}${error}`)); 
    readStream.on('close', () => {
      resolve();
    });    
  });
}