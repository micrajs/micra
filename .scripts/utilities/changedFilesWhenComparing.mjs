import {execSync} from 'node:child_process';

export function changedFilesWhenComparing(baseBranch, headBranch) {
  // Use the '--name-only' flag to list only file names
  const command = `git diff --name-only ${baseBranch} ${headBranch}`;
  const output = execSync(command, {encoding: 'utf8'}).trim();

  return output
    .split('\n')
    .map((file) => file.trim())
    .filter((file) => file);
}
