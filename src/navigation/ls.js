
import fs from "fs";
import * as contants from "../constants.js";

export const lsDirectory = async (appData) => {
    const result = [];
    try {
      fs.readdirSync(
        appData.currentDirr, 
        {
          withFileTypes: true
        }
      ).forEach((file) => {
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
    catch (error) {
        console.log(`${contants.ERROR_COMMAND}${error}`);
    }    
  }