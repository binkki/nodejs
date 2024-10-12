import { Transform } from "node:stream";
import { homedir } from 'node:os';
import * as contants from "./constants.js";

let userName = "";
let currentDirr = homedir();

const start = () => {
  userName = process.env[contants.USER_NAME_ENV_KEY] || contants.DEFAULT_USER_NAME;
  console.log(`${contants.START_MESSAGE}${userName}`);
  console.log(getCurrentDirectory());
  process.chdir(currentDirr);
}

const getCurrentDirectory = () => {
  return `${contants.CURRENT_DIRECTORY} ${currentDirr}`;
}

const changeDirectory = (newDirectory) => {
  try {
    process.chdir(newDirectory);
    currentDirr = process.cwd();
  }
  catch (error) {
    console.log(`${contants.ERROR_COMMAND}${error}`);
  }
}

const readCommand = new Transform({
  transform(chunk, encoding, callback) {
    const command  = String.fromCharCode.apply(null, new Uint16Array(chunk)).trim();
    switch (command) {
      case contants.COMMAND_EXIT:
        process.emit(contants.EXIT_SIGNAL);
        break;
      case contants.COMMAND_UP:
        changeDirectory(contants.COMMAND_UP_DIRECTORY);
        callback(null, getCurrentDirectory() + contants.EOF);
        break;
      default:
        callback(null, contants.WRONG_COMMAND);
    }
  },
});

process.on(contants.EXIT_SIGNAL, function() {
  console.log(contants.EXIT_MESSAGE.replace(contants.EXIT_DEFAULT_USERNAME, userName));
  process.exit();
});

process.stdin.pipe(readCommand).pipe(process.stdout);

start();
