
import fs from "fs";
import os from "os";
import * as contants from "../constants.js";
import { getCurrentDirectory } from "./cd.js";

export const lsDirectory = async (appData) => {
    const result = [];
    const currentDirectory = getCurrentDirectory(appData);
    return new Promise((resolve) => {
      fs.readdir(
        appData.currentDirr, 
        {
          withFileTypes: true
        },
        (error, files) => {
          if (error) {
            resolve(`${contants.ERROR_COMMAND}${error}` + os.EOL + currentDirectory);
          } else {
            files.forEach((file) => {
              result.push({
                Name: file.name,
                Type: file.isFile() ? contants.LS_TYPE_FILE : contants.LS_TYPE_DIRECTORY
              });
            });
            result.sort((a, b) => {
              const typeCompare = a.Type.localeCompare(b.Type);
              return typeCompare
                ? typeCompare
                : a.Name.localeCompare(b.Name);
            })
            console.table(result);
          }
          resolve(currentDirectory);
        }
      )
    });
  }