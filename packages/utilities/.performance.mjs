import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
// import {} from './dist/index.js';

suite
  .add('@micra/utilities:test', () => {})
  .on('cycle', ({target}) => console.log(String(target)))
  .run();
