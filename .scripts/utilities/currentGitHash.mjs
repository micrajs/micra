import {execSync} from 'node:child_process';

export function currentGitHash() {
  // Executes the Git command and trims any extra whitespace.
  const shortHash = execSync('git rev-parse --short HEAD', {
    encoding: 'utf-8',
  }).trim();
  return shortHash;
}
