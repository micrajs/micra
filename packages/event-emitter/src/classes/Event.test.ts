import {describe, it, expect} from 'vitest';
import {Event} from './Event';
import {EVENT_IN_PASSIVE_LISTENER} from '../constants/symbols';

describe('Event', () => {
  it('initializes with provided parameters and defaults', () => {
    const detail = {foo: 'bar'};
    const event = new Event('my-event', {
      detail,
      bubbles: false,
      cancelable: true,
    });

    expect(event.type).toBe('my-event');
    expect(event.detail).toEqual(detail);
    expect(event.bubbles).toBe(false);
    expect(event.cancelable).toBe(true);
    expect(event.defaultPrevented).toBe(false);
    expect(event.target).toBeNull();
    expect(typeof event.timeStamp).toBe('number');
    expect(Date.now() - event.timeStamp).toBeLessThan(50);
    expect(event.eventPhase).toBe(Event.NONE);
    expect(event.currentTarget).toBeNull();
    expect(event.composedPath()).toEqual([]);
  });

  it('marks propagation as stopped when stopPropagation is called', () => {
    const event = new Event('test');

    event.stopPropagation();

    expect(event.propagationStopped).toBe(true);
  });

  it('marks immediate propagation as stopped when stopImmediatePropagation is called', () => {
    const event = new Event('test');

    event.stopImmediatePropagation();

    expect(event.propagationStopped).toBe(true);
    expect(event.immediatePropagationStopped).toBe(true);
  });

  it('sets defaultPrevented when preventDefault is called on a cancelable event in non-passive context', () => {
    const event = new Event('test', {cancelable: true});

    event.preventDefault();

    expect(event.defaultPrevented).toBe(true);
  });

  it("doesn't set defaultPrevented when preventDefault is called on a non-cancelable event", () => {
    const event = new Event('test', {cancelable: false});

    event.preventDefault();

    expect(event.defaultPrevented).toBe(false);
  });

  it("doesn't set defaultPrevented when preventDefault is called in a passive listener", () => {
    const event = new Event('test');
    // Simulate that the event is being handled by a passive listener.
    event[EVENT_IN_PASSIVE_LISTENER] = true;

    event.preventDefault();

    expect(event.defaultPrevented).toBe(false);
  });
});
