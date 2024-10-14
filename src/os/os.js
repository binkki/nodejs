import os from 'os';
import * as contants from "../constants.js";
import {
  getCurrentDirectory,
} from "../navigation/cd.js";

export const getOsInfo = async (command, appData) => {
  const currentDirectory = getCurrentDirectory(appData);
  return new Promise((resolve) => {
    let result = contants.WRONG_COMMAND;
    if (command.split(' ').length === 1 || command.startsWith('--')) {
      switch (command) {
        case contants.COMMAND_OS_EOL:
          result = JSON.stringify(os.EOL) + os.EOL + currentDirectory;
          break;
        case contants.COMMAND_OS_CPUS:
          const cpusCount = os.cpus().length + os.EOL;
          const cpusInfo = [];
          os.cpus().forEach((x) => {
            cpusInfo.push(`model: ${x.model}\nspeed: ${x.speed / 1000}GHz\n`);
          })
          result = cpusCount + cpusInfo.join('') + currentDirectory;
          break;
        case contants.COMMAND_OS_HOMEDIR:
          result = os.homedir() + os.EOL + currentDirectory;
          break;
        case contants.COMMAND_OS_USERNAME:
          result = os.userInfo().username + os.EOL + currentDirectory;
          break;
        case contants.COMMAND_OS_ARCHITECTURE:
          result = os.arch() + os.EOL + currentDirectory;
          break;
        default:
          result = contants.WRONG_COMMAND + os.EOL + currentDirectory
          break;
      }
    }
    resolve(result);
  });    
}