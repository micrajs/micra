import {writeFileSync} from 'fs';
import {join} from 'node:path';
import {getSizeForEntryPoint} from './getSizeForEntryPoint.mjs';
import {getSizeMetrics} from './getSizeMetrics.mjs';

export function registerSizeDataForPackage(pkg, commit) {
  const metrics = getSizeMetrics(pkg);
  pkg.submodules.forEach((definition) => {
    const data = metrics[definition.submodule];

    // Skip if the commit is already in the data.
    for (const entry of data.mjs) if (entry.commit === commit) return;

    data.mjs.push({commit, ...getSizeForEntryPoint(definition.mjs)});
    data.cjs.push({commit, ...getSizeForEntryPoint(definition.cjs)});
  });

  writeFileSync(
    join(pkg.path, '.metrics', 'size.json'),
    JSON.stringify(metrics, null, 2),
  );
}
