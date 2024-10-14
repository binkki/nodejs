import { Transform } from "node:stream";
import os from 'os';
import * as contants from "./constants.js";
import { 
  getCurrentDirectory,
  changeDirectory,
  getNewPath,
} from "./navigation/cd.js";
import { lsDirectory } from "./navigation/ls.js";
import { catFile } from "./files/cat.js";
import { addFile } from "./files/add.js";
import { deleteFile } from "./files/rm.js";
import { renameFile } from "./files/rn.js";
import { copyFile } from "./files/cp.js";
import { moveFile } from "./files/mv.js";
import { getOsInfo } from "./os/os.js";
import { calculateHash } from "./hash/hash.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";


const appData = {
  userName: "",
  currentDirr: os.homedir(),
}

const start = () => {
  appData.userName = process.env[contants.USER_NAME_ENV_KEY] || contants.DEFAULT_USER_NAME;
  console.log(
    `${contants.START_MESSAGE}${appData.userName}`
    + os.EOL
    + getCurrentDirectory(appData).trim()
  );
  changeDirectory(appData.currentDirr, appData);
}

const parseCommandOptions = (commandOptions) => {
  const result = [];
  let isQuoteOpen = false;
  let isDoubleQouteOpen = false;
  let isEscape = false;
  let filePath = "";
  commandOptions.forEach((x) => {
    switch (x) {
      case contants.SPACE_CHARACTER:
        if (isDoubleQouteOpen || isQuoteOpen || isEscape) filePath += x;
        else if (filePath) {
          result.push(filePath);
          filePath = "";
        }
        isEscape = false;  
        break;
      case contants.ESCAPE_CHARACTER:
        if (isEscape) {
          isEscape = false;
          filePath += x;
        } else isEscape = true;
        break;
      case contants.QUOTE_CHARACTER:
        if (isEscape) {
          filePath += x;
        }
        else if (isQuoteOpen) {
          result.push(filePath);
          filePath = "";
          isQuoteOpen = false;
        }
        else isQuoteOpen = true;
        isEscape = false;
        break;
      case contants.DOUBLEQUOTE_CHARACTER:
        if (isEscape) {
          filePath += x;
        }
        else if (isDoubleQouteOpen) {
          result.push(filePath);
          filePath = "";
          isDoubleQouteOpen = false;
        }
        else isDoubleQouteOpen = true;
        isEscape = false;
        break;
      default:
        filePath += x;
        isEscape = false;
    }
  });
  if (filePath && !isDoubleQouteOpen && !isQuoteOpen) result.push(filePath);
  return result;
}

const validateCommand = (command) => {
  const commandName = command.split(' ')[0];
  const commandOptions = parseCommandOptions(command.replace(commandName, "").split(""));
  const validateCommand = 
    (contants.notOptionsCommand.includes(commandName) && commandOptions.length === 0)
    || (contants.oneOptionCommand.includes(commandName) && commandOptions.length === 1)
    || (contants.twoOptionsCommand.includes(commandName) && commandOptions.length === 2);
  return {
    command: commandName,
    options: commandOptions,
    validation: validateCommand
  }
}

const runCommand = async (commandName, commandOptions) => {
  return new Promise((resolve) => {
    const result = "";
    if (commandName === contants.COMMAND_UP || commandName === contants.COMMAND_CD) {
      changeDirectory(
        commandName === contants.COMMAND_UP
        ? contants.COMMAND_UP_DIRECTORY
        : getNewPath(commandOptions.join(' ')).trim(),
        appData
      ).then((data) => resolve(data));
    };
    if (commandName === contants.COMMAND_LS)
      lsDirectory(appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_CAT)
      catFile(commandOptions.join(' '), appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_ADD)
      addFile(commandOptions.join(' '), appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_DELETE)
      deleteFile(commandOptions.join(' '), appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_RENAME)
      renameFile(commandOptions[0], commandOptions[1], appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_COPY)
      copyFile(commandOptions[0], commandOptions[1], appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_MOVE)
      moveFile(commandOptions[0], commandOptions[1], appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_OS)
      getOsInfo(commandOptions[0], appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_HASH)
      calculateHash(commandOptions.join(' '), appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_COMPRESS)
      compress(commandOptions[0], commandOptions[1], appData).then((data) => resolve(data));
    if (commandName === contants.COMMAND_DECOMPRESS)
      decompress(commandOptions[0], commandOptions[1], appData).then((data) => resolve(data));
  });
}

const close = () => {
  process.emit(contants.EXIT_SIGNAL);
}

const readCommand = new Transform({
  transform(chunk, encoding, callback) {
    const validationResult = validateCommand(String.fromCharCode.apply(null, new Uint16Array(chunk)).trim());
    const invalidCommand = contants.WRONG_COMMAND + os.EOL;
    if (validationResult.validation) {
      if (validationResult.command === contants.COMMAND_EXIT) close();
      runCommand(validationResult.command, validationResult.options)
      .then((data) => callback(null, data));
    } else {
      callback(null, invalidCommand + getCurrentDirectory(appData));
    }
  },
});

process.on(contants.EXIT_SIGNAL, function() {
  console.log(os.EOL + contants.EXIT_MESSAGE.replace(contants.EXIT_DEFAULT_USERNAME, appData.userName));
  process.exit();
});

process.stdin.pipe(readCommand).pipe(process.stdout);

start();
