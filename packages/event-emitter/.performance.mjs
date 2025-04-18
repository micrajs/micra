import Benchmark from 'benchmark';
const suite = new Benchmark.Suite();
import {EventEmitter, Event} from './dist/index.js';

suite.add('@micra/event-emitter: base dispatch event overhead', () => {
  const emitter = new EventEmitter();
  emitter.dispatchEvent(new Event('test'));
});

suite.add('@micra/event-emitter: dispatch event single listener', () => {
  const emitter = new EventEmitter();
  emitter.addEventListener('test', () => {});
  emitter.dispatchEvent(new Event('test'));
});

suite.add('@micra/event-emitter: dispatch event to multiple listeners', () => {
  const emitter = new EventEmitter();
  emitter.addEventListener('test', () => {});
  emitter.addEventListener('test', () => {});
  emitter.addEventListener('test', () => {});
  emitter.dispatchEvent(new Event('test'));
});

suite.add('@micra/event-emitter: dispatch event single wildcard listener', () => {
  const emitter = new EventEmitter();
  emitter.addEventListener('test', () => {});
  emitter.dispatchEvent(new Event('test'));
});

suite.add('@micra/event-emitter: dispatch event to multiple wildcard listeners', () => {
  const emitter = new EventEmitter();
  emitter.addEventListener('*', () => {});
  emitter.addEventListener('*', () => {});
  emitter.addEventListener('*', () => {});
  emitter.dispatchEvent(new Event('test'));
});

suite.add('@micra/event-emitter: propagation chain', () => {
  const chain = [];
  for (let i = 0; i < 5; i++) {
    // Create a new emitter and add it to the chain.
    const emitter = new EventEmitter();

    // Add a listener on the first and last emitter.
    emitter.addEventListener('test', () => {});
    emitter.addEventListener('test', () => {}, true);

    // Assign parent to the emitter
    const parent = chain[chain.length - 1];
    if (parent) parent.addChild(emitter);

    // Add the emitter to the chain.
    chain.push(emitter);
  }

  // Dispatch the event from the bottom of the chain.
  chain[chain.length - 1].dispatchEvent(new Event('test', {bubbles: true}));
});

suite.on('cycle', ({target}) => console.log(String(target))).run();
