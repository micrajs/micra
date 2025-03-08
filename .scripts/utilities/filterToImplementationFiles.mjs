export function filterToImplementationFiles(changedFiles) {
  return changedFiles
    .filter(
      (file) => file.endsWith('/package.json') || /\/src\/.*\.ts$/.test(file),
    )
    .map((file) => file);
}
