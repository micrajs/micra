import {normalize, join} from 'path/posix';

export function affectedPackagesFromFileList(dependencyGraph, changedFiles) {
  const directlyChanged = new Set();

  // Determine direct changes by checking if any changed file is inside the package directory.
  dependencyGraph.overallOrder().forEach((pkgName) => {
    const pkg = dependencyGraph.getNodeData(pkgName);
    for (const file of changedFiles) {
      // Normalize paths for consistency across environments.
      const normalizedPkgDir = normalize(pkg.path);
      const normalizedFile = join(process.cwd(), normalize(file));
      if (normalizedFile.startsWith(normalizedPkgDir)) {
        directlyChanged.add(pkg);
        break; // No need to check other files for this package.
      }
    }
  });

  // Collect all affected packages by traversing the dependency graph.
  const affected = new Set(directlyChanged);

  // For each directly changed package, add all packages that depend on it.
  directlyChanged.forEach((changedPkg) =>
    dependencyGraph
      .dependentsOf(changedPkg.name)
      .forEach((pkg) => affected.add(dependencyGraph.getNodeData(pkg))),
  );

  return Array.from(affected);
}
