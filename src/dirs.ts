import fs from 'node:fs';

const BASE_PATH = './';

const ignore = ['node_modules', 'dist', '.git'];

function printDirs(path: string, depth = 0) {
  const dirs = fs.readdirSync(path, { withFileTypes: true });

  dirs.forEach((dir) => {
    if (dir.isDirectory() && !ignore.includes(dir.name)) {
      log(dir.name, depth + 1);
      return printDirs(path + '/' + dir.name, depth + 1);
    }

    log(dir.name, depth + 1);
  });
}

function log(str: string, depth: number) {
  console.log(`${' '.repeat(depth * 2)}${str}`);
}

printDirs(BASE_PATH, 0);
