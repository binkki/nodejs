let userName = "";

const start = () => {
  userName = process.env["npm_config_username"] || "User";
  console.log(`Welcome to the File Manager, ${userName}`);
}

process.stdin.pipe(process.stdout);

start();
