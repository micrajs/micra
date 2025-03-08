import type {Micra} from '@micra/core';
import type {EventOptions} from '../types/EventOptions';
import {
  EVENT_COMPOSED_PATH,
  EVENT_CURRENT_TARGET,
  EVENT_IN_PASSIVE_LISTENER,
  EVENT_PHASE,
} from '../constants/symbols';

export class Event<
  Type extends string | number | symbol = string,
  Detail extends Record<any, any> = {},
> implements Micra.Event<Type, Detail>
{
  static NONE = 0;
  static CAPTURING_PHASE = 1;
  static AT_TARGET = 2;
  static BUBBLING_PHASE = 3;

  type: Type;
  detail: Detail;
  bubbles: boolean;
  cancelable: boolean = false;
  defaultPrevented: boolean = false;
  target: Micra.EventEmitter<any> | null = null;
  timeStamp: number = Date.now();
  immediatePropagationStopped: boolean = false;
  propagationStopped: boolean = false;
  /** @internal */
  [EVENT_PHASE]: number = Event.NONE;
  /** @internal */
  [EVENT_COMPOSED_PATH]: Micra.EventEmitter<any>[] = [];
  /** @internal */
  [EVENT_CURRENT_TARGET]: Micra.EventEmitter<any> | null = null;
  /** @internal */
  [EVENT_IN_PASSIVE_LISTENER]: boolean = false;

  get currentTarget(): Micra.EventEmitter<any> | null {
    return this[EVENT_CURRENT_TARGET] ?? null;
  }

  get eventPhase(): number {
    return this[EVENT_PHASE];
  }

  constructor(type: Type, options: EventOptions<Detail> = {}) {
    const {bubbles = true, cancelable = true, detail = {} as Detail} = options;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
    this.detail = detail;
    this.type = type;
  }

  stopPropagation(): void {
    this.propagationStopped = true;
  }

  stopImmediatePropagation(): void {
    this.immediatePropagationStopped = true;
    this.stopPropagation();
  }

  preventDefault(): void {
    if (this.cancelable && !this[EVENT_IN_PASSIVE_LISTENER]) {
      this.defaultPrevented = true;
    }
  }

  composedPath(): Micra.EventEmitter[] {
    return this[EVENT_COMPOSED_PATH].slice();
  }
}
