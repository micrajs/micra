import {sizeLimit} from '../../.size-limit.mjs';

export default sizeLimit(
  // Add submodules
  {path: 'dist/Event.js', limit: '558 b'},
  {path: 'dist/EventEmitter.js', limit: '1529 b'},
  {path: 'dist/index.js', limit: '1529 b'},
);
