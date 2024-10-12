import * as contants from "./constants.js"

let userName = "";

const start = () => {
  userName = process.env[contants.USER_NAME_ENV_KEY] || contants.DEFAULT_USER_NAME;
  console.log(`${contants.START_MESSAGE}${userName}`);
}

process.stdin.pipe(process.stdout);

start();
