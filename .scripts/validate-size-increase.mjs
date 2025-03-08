import {affectedPackagesFromFileList} from './utilities/affectedPackagesFromFileList.mjs';
import {changedFilesOnCommit} from './utilities/changedFilesOnCommit.mjs';
import {currentGitHash} from './utilities/currentGitHash.mjs';
import {dependencyGraph} from './utilities/dependencyGraph.mjs';
import {filterToImplementationFiles} from './utilities/filterToImplementationFiles.mjs';
import {findAllPackages} from './utilities/findAllPackages.mjs';
import {validateSizeIncrease} from './utilities/validateSizeIncrease.mjs';

const pkgs = findAllPackages();
const commit = currentGitHash();
const graph = dependencyGraph(pkgs);
const changedFiles = changedFilesOnCommit(commit);
const libraryFiles = filterToImplementationFiles(changedFiles);
const affectedPackages = affectedPackagesFromFileList(graph, libraryFiles);

const results = affectedPackages.flatMap(validateSizeIncrease);

if (results.length) console.table(results);
