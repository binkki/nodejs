import fs from "fs";
import * as contants from "../constants.js";

export const addFile = async (filePath) => {
  try {
    fs.closeSync(fs.openSync(filePath, 'w'));
  }
  catch (error) {
    console.log(`${contants.ERROR_COMMAND}${error}`);
  }    
}