import {DepGraph} from 'dependency-graph';

/**
 * Constructs a dependency graph for monorepo packages.
 * Nodes represent package names and edges represent dependencies.
 */
export function dependencyGraph(packages) {
  const graph = new DepGraph();

  // Add each package as a node in the graph.
  packages.forEach((pkg) => {
    graph.addNode(pkg.name, pkg);
  });

  // Add dependencies as edges.
  packages.forEach((pkg) => {
    // Merge dependencies and devDependencies.
    const allDependencies = {...pkg.dependencies, ...pkg.devDependencies};
    Object.keys(allDependencies).forEach((depName) => {
      // Only add dependency if it exists in the monorepo.
      if (graph.hasNode(depName)) {
        // This indicates that package "pkg.name" depends on package "depName".
        graph.addDependency(pkg.name, depName);
      }
    });
  });

  return graph;
}
