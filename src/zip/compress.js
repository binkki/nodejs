import fs from "fs";
import zlib from 'zlib';
import {
  getCurrentDirectory,
  getNewPath,
} from "../navigation/cd.js";
import * as contants from "../constants.js";

export const compress = async (oldPath, newPath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(getNewPath(oldPath));
    readStream.on('error', (error) => {
      console.log(`${contants.ERROR_COMMAND}${error}`)
      resolve(currentDirectory);
    });
    const writeStream = fs.createWriteStream(getNewPath(newPath));
    writeStream.on('error', (error) => {
      console.log(`${contants.ERROR_COMMAND}${error}`)
      resolve(currentDirectory);
    });
    const brotli = zlib.createBrotliCompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);
    stream.on('error', (error) => console.log(`${contants.ERROR_COMMAND}${error}`));
    stream.on('finish', () => {
      readStream.close();
      writeStream.close();
      stream.close();
    });
    stream.on('close', () => resolve(currentDirectory));
  });
}