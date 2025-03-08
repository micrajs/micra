import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

export function ensureSync(targetPath, options = {type: 'file'}) {
  if (existsSync(targetPath)) return;

  if (options.type === 'dir') {
    mkdirSync(targetPath, {recursive: true});
  } else if (options.type === 'file') {
    // Ensure the parent directory exists.
    const dir = dirname(targetPath);
    mkdirSync(dir, {recursive: true});
    // Create an empty file or one with the specified content.
    writeFileSync(targetPath, options.content || '');
  }
}
