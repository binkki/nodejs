import fs from "fs";
import * as contants from "../constants.js";

export const addFile = async (filePath) => {
  fs.open(filePath, 'w', (error) => {
    if (error) {
      console.log(`${contants.ERROR_COMMAND}${error}`);
    }
  });
}