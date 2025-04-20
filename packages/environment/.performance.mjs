import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
import {Environment} from './dist/index.js';

const env = new Environment({
  STATIC_KEY: 'static',
  NUMERIC: 123,
  BOOLEAN: true,
});

env.define('TRANSFORMED', {
  transform: (v) => Number(v),
});

env.define('VALIDATED', {
  validate: (v) => typeof v === 'string' && v.length > 3,
});

const values = {};
for (let i = 0; i < 1000; i++) values[`KEY_${i}`] = `value_${i}`;

//
// 🔁 Repeated get() calls
//
suite.add('@micra/environment:get known key', () => {
  env.get('STATIC_KEY');
});

suite.add('@micra/environment:get with fallback', () => {
  env.get('UNKNOWN', 'default');
});

//
// ⚙️ Value Transformation + Validation
//
suite.add('@micra/environment:set with transform', () => {
  env.set('TRANSFORMED', '42');
});

suite.add('@micra/environment:set with validation', () => {
  env.set('VALIDATED', 'longEnough');
});

//
// 📦 Bulk set()
//
suite.add('@micra/environment:set bulk 1000 keys', () => {
  env.set(values);
});

//
// 📦 Serialization
//
suite.add('@micra/environment:toJSON()', () => {
  env.toJSON();
});

suite.add('@micra/environment:toJSON({ omit })', () => {
  env.toJSON({omit: ['STATIC_KEY']});
});

//
// 🔍 Existence Checks
//
suite.add('@micra/environment:has existing', () => {
  env.has('STATIC_KEY');
});

suite.add('@micra/environment:missing non-existing', () => {
  env.missing('UNDEFINED_KEY');
});

//
// 🌱 Forking environments
//
suite.add('@micra/environment:fork()', () => {
  const forked = env.fork({STATIC_KEY: 'forked'});
  forked.get('STATIC_KEY');
});

//
// 🚨 Event emissions
//
suite.add('@micra/environment:set emits change event', () => {
  env.addEventListener('change', () => {});
  env.addEventListener('error', () => {});
  env.set('STATIC_KEY', 'new');
});

//
// 📋 Run Benchmarks
//
suite.on('cycle', ({target}) => console.log(String(target))).run();
