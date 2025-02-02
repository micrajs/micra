import * as shell from 'shelljs';
import {root} from './root';

export const formatAction = {
  type: 'run',
  async call() {
    shell.exec('pnpm format', {cwd: root()});
    return 'Formatted project';
  },
};
