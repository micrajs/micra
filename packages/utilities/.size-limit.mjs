import {sizeLimit} from '../../.size-limit.mjs';

export default sizeLimit(
  // Add submodules
  {path: 'dist/isRecord.js', limit: '55 b'},
);
