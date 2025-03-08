import {existsSync, writeFileSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {ensureSync} from './ensureSync.mjs';

export function getSizeMetrics(pkg) {
  const path = join(pkg.path, '.metrics', 'size.json');

  if (!existsSync(path)) {
    const sizeData = pkg.submodules.reduce((data, definition) => {
      data[definition.submodule] = {mjs: [], cjs: []};
      return data;
    }, {});

    ensureSync(path, {
      type: 'file',
      content: JSON.stringify(sizeData, null, 2),
    });

    return sizeData;
  }

  return JSON.parse(readFileSync(path, 'utf-8'));
}
