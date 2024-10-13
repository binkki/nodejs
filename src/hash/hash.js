import fs from "fs";
import { createHash } from "node:crypto";
import * as contants from "../constants.js";
import { getNewPath } from "../navigation/cd.js";

export const calculateHash = async (command) => {
  const commandPath = getNewPath(command.replace(contants.COMMAND_HASH, '').trim());
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(commandPath);
    const fileText = [];
    readStream.on('data', chunk => fileText.push(chunk));
    readStream.on('error', (error) => {
      console.log(`${contants.ERROR_COMMAND}${error}`);
    });
    readStream.on('end', () => { 
      const hashText = createHash("sha256").update(fileText.join()).digest('hex');
      console.log(hashText);  
    }); 
    readStream.on('close', () => {
      resolve();
    });    
  });
}