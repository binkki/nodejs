import { unlink } from "node:fs/promises";
import * as contants from "../constants.js";

export const deleteFile = async (filePath) => {
  return unlink(filePath)
    .catch((error) => {
      console.log(`${contants.ERROR_COMMAND}${error}`);
    });
}