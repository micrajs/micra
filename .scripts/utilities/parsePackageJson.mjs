import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export function parsePackageJson(path) {
  return JSON.parse(readFileSync(join(path, 'package.json'), 'utf-8'));
}
