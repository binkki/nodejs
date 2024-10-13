import { Transform } from "node:stream";
import { homedir } from "node:os";
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


const appData = {
  userName: "",
  currentDirr: homedir(),
}

const start = () => {
  appData.userName = process.env[contants.USER_NAME_ENV_KEY] || contants.DEFAULT_USER_NAME;
  console.log(`${contants.START_MESSAGE}${appData.userName}`);
  console.log(getCurrentDirectory(appData));
  changeDirectory(appData.currentDirr, appData);
}

const readCommand = new Transform({
  transform(chunk, encoding, callback) {
    const command  = String.fromCharCode.apply(null, new Uint16Array(chunk)).trim();
    if (command === contants.COMMAND_EXIT) {
      process.emit(contants.EXIT_SIGNAL);
    }
    else if (command === contants.COMMAND_UP) {
      changeDirectory(contants.COMMAND_UP_DIRECTORY, appData);
      callback(null, getCurrentDirectory(appData) + contants.EOF);
    }
    else if (command.startsWith(contants.COMMAND_CD)) {
      const newPath = getNewPath(command.replace(contants.COMMAND_CD, '').trim());
      changeDirectory(newPath, appData);
      callback(null, getCurrentDirectory(appData) + contants.EOF);
    } else if (command === contants.COMMAND_LS) {
      lsDirectory(appData)
        .then(() => callback(null, getCurrentDirectory(appData) + contants.EOF));      
    } else if (command.startsWith(contants.COMMAND_CAT)) {
      const newPath = getNewPath(command.replace(contants.COMMAND_CAT, '').trim());
      catFile(newPath)
        .then(() => callback(null, getCurrentDirectory(appData) + contants.EOF))      
    } else if (command.startsWith(contants.COMMAND_ADD)) {
      const newPath = getNewPath(command.replace(contants.COMMAND_ADD, '').trim());
      addFile(newPath)
        .then(() => callback(null, getCurrentDirectory(appData) + contants.EOF))      
    } else if (command.startsWith(contants.COMMAND_DELETE)) {
      const newPath = getNewPath(command.replace(contants.COMMAND_DELETE, '').trim());
      deleteFile(newPath)
        .then(() => callback(null, getCurrentDirectory(appData) + contants.EOF))      
    }    
    else {
      callback(null, contants.WRONG_COMMAND);
    }
  },
});

process.on(contants.EXIT_SIGNAL, function() {
  console.log(contants.EXIT_MESSAGE.replace(contants.EXIT_DEFAULT_USERNAME, appData.userName));
  process.exit();
});

process.stdin.pipe(readCommand).pipe(process.stdout);

start();
