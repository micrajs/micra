import {join} from 'node:path';

export function packageSubmodules(pkg) {
  const results = [];
  const isModule = pkg.type === 'module';
  const isCommonJS = pkg.type == null || pkg.type === 'commonjs';

  if (!pkg.exports) {
    if (pkg.main) {
      results.push({
        submodule: pkg.name,
        mjs: isModule ? join(pkg.path, pkg.main) : undefined,
        cjs: isCommonJS ? join(pkg.path, pkg.main) : undefined,
      });
    }

    return results;
  }

  if (typeof pkg.exports === 'string') {
    results.push({
      submodule: pkg.name,
      mjs: isModule ? join(pkg.path, pkg.exports) : undefined,
      cjs: isCommonJS ? join(pkg.path, pkg.exports) : undefined,
    });
    return results;
  }

  for (const [submodule, exportValue] of Object.entries(pkg.exports)) {
    if (typeof exportValue === 'string') {
      results.push({
        submodule: join(pkg.name, submodule),
        mjs: isModule ? join(pkg.path, exportValue) : undefined,
        cjs: isCommonJS ? join(pkg.path, exportValue) : undefined,
      });
    } else if (typeof exportValue === 'object' && exportValue !== null) {
      if (exportValue.default) {
        results.push({
          submodule: join(pkg.name, submodule),
          mjs: isModule ? join(pkg.name, exportValue.default) : undefined,
          cjs: isCommonJS ? join(pkg.name, exportValue.default) : undefined,
        });
      } else if (exportValue.import || exportValue.require) {
        results.push({
          submodule: join(pkg.name, submodule),
          mjs: exportValue.import
            ? join(pkg.path, exportValue.import)
            : undefined,
          cjs: exportValue.require
            ? join(pkg.path, exportValue.require)
            : undefined,
        });
      }
    }
  }

  return results;
}
