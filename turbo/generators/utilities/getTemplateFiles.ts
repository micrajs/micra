import {getAllFilesRecursivelySync} from './getAllFilesRecursivelySync';

export function getTemplateFiles(basePath: string) {
  return getAllFilesRecursivelySync(basePath).map((templateFile) => ({
    templateFile,
    file: templateFile.replace(basePath, ''),
  }));
}
