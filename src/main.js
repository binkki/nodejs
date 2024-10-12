import { Transform } from "node:stream";
import { homedir } from 'node:os';
import * as contants from "./constants.js";

let userName = "";

const start = () => {
  userName = process.env[contants.USER_NAME_ENV_KEY] || contants.DEFAULT_USER_NAME;
  console.log(`${contants.START_MESSAGE}${userName}`);
  console.log(getCurrentDirectory());
}

const getCurrentDirectory = () => {
  return `${contants.CURRENT_DIRECTORY} ${homedir}`;
}

const readCommand = new Transform({
  transform(chunk, encoding, callback) {
    const command  = String.fromCharCode.apply(null, new Uint16Array(chunk)).trim();
    switch (command) {
      case contants.COMMAND_EXIT:
        process.emit(contants.EXIT_SIGNAL);
        break;
      default:
        callback(null, getCurrentDirectory() + contants.EOF);
    }
  },
});

process.on(contants.EXIT_SIGNAL, function() {
  console.log(contants.EXIT_MESSAGE.replace(contants.EXIT_DEFAULT_USERNAME, userName));
  process.exit();
});

process.stdin.pipe(readCommand).pipe(process.stdout);

start();
