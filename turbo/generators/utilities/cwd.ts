import {join} from 'node:path';

export function cwd(...paths: string[]): string {
  return join(process.cwd(), ...paths);
}
