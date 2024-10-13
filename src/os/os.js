import os from 'os';
import * as contants from "../constants.js";

export const getOsInfo = async (command) => {
  return new Promise((resolve) => {
    let result = contants.WRONG_COMMAND;
    if (command.split(' ').length === 1 || command.startsWith('--')) {
      switch (command) {
        case contants.COMMAND_OS_EOL:
          result = JSON.stringify(os.EOL);
          break;
        case contants.COMMAND_OS_CPUS:
          result = os.cpus();
          break;
        case contants.COMMAND_OS_HOMEDIR:
          result = os.homedir();
          break;
        case contants.COMMAND_OS_USERNAME:
          result = os.userInfo().username;
          break;
        case contants.COMMAND_OS_ARCHITECTURE:
          result = os.arch();
          break;
        default:
          break;
      }
    }
    console.log(result);
    resolve();
  });    
}