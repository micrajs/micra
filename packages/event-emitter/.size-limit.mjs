import {sizeLimit} from '../../.size-limit.mjs';

export default sizeLimit(
  // Add submodules
  {path: 'dist/index.js', limit: '13 b'},
);
