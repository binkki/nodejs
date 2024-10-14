import {
  getCurrentDirectory,
} from "../navigation/cd.js";
import { copyFile } from "./cp.js";
import { deleteFile } from "./rm.js";

export const moveFile = async (oldPath, newPath, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return new Promise((resolve) => {
    copyFile(oldPath, newPath, appData)
    .then(() => {
        deleteFile(oldPath, appData)
        .then(() => {
            resolve(currentDirectory);
        })
    });
  });  
}
