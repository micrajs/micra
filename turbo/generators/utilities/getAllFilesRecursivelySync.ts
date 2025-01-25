import {readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';

export function getAllFilesRecursivelySync(dir: string): string[] {
  let files: string[] = [];

  // Get all items (files and directories) in the current directory
  for (const item of readdirSync(dir)) {
    const itemPath = join(dir, item);
    const stat = statSync(itemPath);

    files = stat.isDirectory()
      ? // If it's a directory, recursively call getAllFilesRecursivelySync
        files.concat(getAllFilesRecursivelySync(itemPath))
      : // If it's a file, add its path to the files array
        files.concat(itemPath);
  }

  return files;
}
