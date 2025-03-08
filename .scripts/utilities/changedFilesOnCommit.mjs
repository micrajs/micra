import {execSync} from 'node:child_process';

export function changedFilesOnCommit(commit) {
  // Build the Git command
  const command = `git diff-tree --no-commit-id --name-only -r ${commit}`;

  try {
    // Execute the command synchronously. 'utf8' ensures a string is returned.
    const output = execSync(command, {encoding: 'utf8'}).trim();
    // Split the output by newline and filter out empty lines.
    return output.split('\n').filter((line) => line !== '');
  } catch (error) {
    console.error(`Error executing Git command: ${error}`);
    return [];
  }
}
