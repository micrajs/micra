import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
import {} from './dist/index.mjs';

suite
  .add('@micra/event-emitter:test', () => {})
  .on('cycle', ({target}) => console.log(String(target)))
  .run();
