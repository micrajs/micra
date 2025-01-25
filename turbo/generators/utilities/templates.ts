import {join} from 'node:path';

export function templates(...paths: string[]): string {
  return join(__dirname, '..', 'templates', ...paths);
}
