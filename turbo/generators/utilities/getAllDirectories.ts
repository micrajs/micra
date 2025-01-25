import {readdirSync, statSync} from 'node:fs';

export function getAllDirectories(path: string): string[] {
  try {
    // Get all items (files and directories) in the given path
    const items = readdirSync(path);
    // Filter out only the directories
    return items.filter((item) => statSync(`${path}/${item}`).isDirectory());
  } catch (error) {
    console.error(`Error occurred while retrieving directories: ${error}`);
  }

  return [];
}
