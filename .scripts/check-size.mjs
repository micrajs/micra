import {affectedPackagesFromFileList} from './utilities/affectedPackagesFromFileList.mjs';
import {changedFilesOnCommit} from './utilities/changedFilesOnCommit.mjs';
import {currentGitHash} from './utilities/currentGitHash.mjs';
import {dependencyGraph} from './utilities/dependencyGraph.mjs';
import {filterToImplementationFiles} from './utilities/filterToImplementationFiles.mjs';
import {findAllPackages} from './utilities/findAllPackages.mjs';
import {registerSizeDataForPackage} from './utilities/registerSizeDataForPackage.mjs';

const pkgs = findAllPackages();
const commit = currentGitHash();
// const graph = dependencyGraph(pkgs);
// const changedFiles = changedFilesOnCommit(commit);
// const libraryFiles = filterToImplementationFiles(changedFiles);
// const affectedPackages = affectedPackagesFromFileList(graph, libraryFiles);

pkgs.forEach((pkg) => registerSizeDataForPackage(pkg, commit));
