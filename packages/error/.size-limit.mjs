import {sizeLimit} from '../../.size-limit.mjs';

export default sizeLimit(
  // Add submodules
  {path: 'dist/normalizeError.js', limit: '950 b'},
  {path: 'dist/isErrorOptions.js', limit: '251 b'},
  {path: 'dist/isError.js', limit: '200 b'},
  {path: 'dist/isApplicationError.js', limit: '381 b'},
  {path: 'dist/ApplicationError.js', limit: '950 b'},
  {path: 'dist/index.js', limit: '956 b'},
);
