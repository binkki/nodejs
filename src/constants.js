export const DEFAULT_USER_NAME = "User";
export const USER_NAME_ENV_KEY = "npm_config_username";
export const START_MESSAGE = "Welcome to the File Manager, ";

export const WRONG_COMMAND = "Invalid input";
export const ERROR_COMMAND = "Operation failed: ";

export const COMMAND_EXIT = ".exit";
export const EXIT_DEFAULT_USERNAME = "Username";
export const EXIT_MESSAGE = "Thank you for using File Manager, Username, goodbye!";
export const EXIT_SIGNAL = "SIGINT";

export const CURRENT_DIRECTORY = "You are currently in";
export const COMMAND_UP = "up";
export const COMMAND_UP_DIRECTORY = "..";
export const COMMAND_CD = "cd";
export const COMMAND_LS = "ls";
export const LS_TYPE_FILE = "file";
export const LS_TYPE_DIRECTORY = "directory";

export const WIN_PLATFORM = "win32";
export const LINUX_HOME_DRIVE = "~";

export const COMMAND_CAT = "cat";
export const COMMAND_ADD = "add";
export const COMMAND_DELETE = "rm";
export const COMMAND_OS = "os";
export const COMMAND_OS_EOL = "--EOL";
export const COMMAND_OS_CPUS = "--cpus";
export const COMMAND_OS_HOMEDIR = "--homedir";
export const COMMAND_OS_USERNAME = "--username";
export const COMMAND_OS_ARCHITECTURE = "--architecture";
export const COMMAND_HASH = "hash";
export const COMMAND_RENAME = "rn";
export const COMMAND_COPY = "cp";
export const COMMAND_MOVE = "mv";
export const COMMAND_COMPRESS = "compress";
export const COMMAND_DECOMPRESS = "decompress";

export const notOptionsCommand = [
  COMMAND_UP,
  COMMAND_LS,
  COMMAND_EXIT
];
export const oneOptionCommand = [
  COMMAND_CD,
  COMMAND_CAT,
  COMMAND_ADD,
  COMMAND_DELETE,
  COMMAND_OS,
  COMMAND_HASH
];
export const twoOptionsCommand = [
  COMMAND_RENAME,
  COMMAND_COPY,
  COMMAND_MOVE,
  COMMAND_COMPRESS,
  COMMAND_DECOMPRESS,
];

export const ESCAPE_CHARACTER = process.platform === WIN_PLATFORM
  ? '`'
  : '\\';
export const QUOTE_CHARACTER = "'";
export const DOUBLEQUOTE_CHARACTER = '"';
export const SPACE_CHARACTER = " ";