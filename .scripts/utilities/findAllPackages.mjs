import {execSync} from 'child_process';
import {parsePackageJson} from './parsePackageJson.mjs';
import {packageSubmodules} from './packageSubmodules.mjs';

export function findAllPackages() {
  const command = 'pnpm list -r --depth -1 --json';
  const output = execSync(command, {encoding: 'utf-8'});
  const packages = JSON.parse(output);
  packages.shift(); // Remove the root package.
  return packages.map((basePkg) => {
    const pkg = {...basePkg, ...parsePackageJson(basePkg.path)};
    pkg.submodules = packageSubmodules(pkg);
    return pkg;
  });
}
