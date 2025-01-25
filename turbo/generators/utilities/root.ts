import {join} from 'node:path';

export function root(...paths: string[]): string {
  return join(__dirname, '..', '..', '..', ...paths);
}
