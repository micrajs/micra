import {describe, it, expect, vi} from 'vitest';
import {EventEmitter} from './EventEmitter';
import {Event} from './Event';
import {EVENT_PHASE} from '../constants/symbols';

describe('EventEmitter', () => {
  it('adds an event listener at capturing phase if options is true', () => {
    const listener = vi.fn();
    const root = new EventEmitter();
    const child = new EventEmitter();
    root.addChild(child);

    root.addEventListener('test', listener, true);
    child.dispatchEvent(new Event('test'));

    expect(listener).toHaveBeenCalled();
  });

  it('dispatches an event with no listeners and returns true', () => {
    const event = new Event('test');
    const emitter = new EventEmitter();

    const result = emitter.dispatchEvent(event);

    expect(result).toBe(true);
  });

  it('calls an at-target listener', () => {
    const listener = vi.fn();
    const event = new Event('test');
    const emitter = new EventEmitter();

    emitter.addEventListener('test', listener);
    emitter.dispatchEvent(event);

    expect(listener).toHaveBeenCalled();
  });

  it('invokes capturing, at-target, and bubbling listeners in correct order', () => {
    const listener = vi.fn();
    const event = new Event('test');
    const root = new EventEmitter();
    const child = new EventEmitter();
    const target = new EventEmitter();
    root.addChild(child);
    child.addChild(target);
    root.addEventListener('test', () => listener('root capturing'), {
      capture: true,
    });
    root.addEventListener('test', () => listener('root bubbling'));
    child.addEventListener('test', () => listener('child capturing'), {
      capture: true,
    });
    child.addEventListener('test', () => listener('child bubbling'));
    target.addEventListener('test', () => listener('target capturing'), {
      capture: true,
    });
    target.addEventListener('test', () => listener('target bubbling'));

    target.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(6);
    expect(listener).toHaveBeenNthCalledWith(1, 'root capturing');
    expect(listener).toHaveBeenNthCalledWith(2, 'child capturing');
    expect(listener).toHaveBeenNthCalledWith(3, 'target capturing');
    expect(listener).toHaveBeenNthCalledWith(4, 'target bubbling');
    expect(listener).toHaveBeenNthCalledWith(5, 'child bubbling');
    expect(listener).toHaveBeenNthCalledWith(6, 'root bubbling');
  });

  it('stops propagation when stopPropagation is called in a capturing listener', () => {
    const listener = vi.fn();
    const event = new Event('test');
    const root = new EventEmitter();
    const child = new EventEmitter();
    const target = new EventEmitter();
    root.addChild(child);
    child.addChild(target);
    root.addEventListener('test', () => listener('root capturing'), {
      capture: true,
    });
    target.addEventListener('test', () => listener('target listener'));
    child.addEventListener('test', () => listener('child bubbling'));
    root.addEventListener('test', () => listener('root bubbling'));

    // Stop propagation in the capturing phase.
    child.addEventListener<string>(
      'test',
      (evt) => {
        listener('child capturing');
        evt.stopPropagation();
      },
      {capture: true},
    );
    target.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(3);
    expect(listener).toHaveBeenNthCalledWith(1, 'root capturing');
    expect(listener).toHaveBeenNthCalledWith(2, 'child capturing');
    expect(listener).toHaveBeenNthCalledWith(3, 'target listener');
  });

  it('stops immediate propagation when stopImmediatePropagation is called', () => {
    const listener = vi.fn();
    const emitter = new EventEmitter();
    const event = new Event('test', {bubbles: false});
    emitter.addEventListener<string>('test', (evt) => {
      listener('first listener');
      evt.stopImmediatePropagation();
    });
    emitter.addEventListener('test', () => listener('second listener'));

    emitter.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenNthCalledWith(1, 'first listener');
  });

  it('removes once listeners after invocation', () => {
    const listener = vi.fn();
    const emitter = new EventEmitter();

    emitter.addEventListener('test', listener, {once: true});
    emitter.dispatchEvent(new Event('test'));
    emitter.dispatchEvent(new Event('test'));

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('sets defaultPrevented when preventDefault is called in a non-passive listener', () => {
    const emitter = new EventEmitter();
    const event = new Event('test', {bubbles: false, cancelable: true});
    emitter.addEventListener<string>('test', (evt) => evt.preventDefault());

    const result = emitter.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(result).toBe(false);
  });

  it('only calls target listeners for a non-bubbling event', () => {
    const listener = vi.fn();
    const root = new EventEmitter();
    const child = new EventEmitter();
    const target = new EventEmitter();
    root.addChild(child);
    child.addChild(target);
    const event = new Event('test', {bubbles: false});
    root.addEventListener('test', () => listener('root listener'), {
      capture: true,
    });
    child.addEventListener('test', () => listener('child listener'), {
      capture: true,
    });
    target.addEventListener('test', () => listener('target listener'));

    target.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenNthCalledWith(1, 'target listener');
  });

  it('matches listeners registered with glob patterns', () => {
    const listener = vi.fn();
    const emitter = new EventEmitter();
    emitter.addEventListener('test*', listener);

    emitter.dispatchEvent(new Event('testEvent'));

    expect(listener).toHaveBeenCalled();
  });

  it('does not dispatch events that are already being dispatched', () => {
    const event = new Event('test');
    const emitter = new EventEmitter();
    event[EVENT_PHASE] = Event.CAPTURING_PHASE;

    expect(() => emitter.dispatchEvent(event)).toThrowError();
  });
});
