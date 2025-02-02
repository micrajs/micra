import {sizeLimit} from '../../.size-limit.mjs';

export default sizeLimit(
  // Add submodules
  {path: 'dist/isRecord.js', limit: '55 b'},
  {path: 'dist/index.js', limit: '100 b'},
);
