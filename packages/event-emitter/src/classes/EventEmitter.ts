import type {Micra} from '@micra/core';
import {ApplicationError} from '@micra/error/ApplicationError';
import {
  EVENT_COMPOSED_PATH,
  EVENT_CURRENT_TARGET,
  EVENT_EMITTER_LISTENERS,
  EVENT_EMITTER_PARENT,
  EVENT_IN_PASSIVE_LISTENER,
  EVENT_PHASE,
} from '../constants/symbols';
import type {EventListenerDefinition} from '../types/EventListenerDefinition';
import {globToRegex} from '../utilities/globToRegex';
import {Event} from './Event';

export class EventEmitter<EventMap extends Record<string, any> = Record<string, any>>
  implements Micra.EventEmitter<EventMap>
{
  /** @internal */
  [EVENT_EMITTER_PARENT]: EventEmitter<any> | null = null;
  /** @internal */
  [EVENT_EMITTER_LISTENERS]: Map<string | RegExp, EventListenerDefinition[]> = new Map();

  addEventListener<Type extends string>(
    type: Type,
    listener: Micra.EventListener<Micra.MatchGlobEvents<Type, EventMap>>,
    options: Micra.AddEventListenerOptions | boolean = {},
  ): () => void {
    const typeOrRegExp: string | RegExp = type.includes('*') ? globToRegex(type) : type;
    const definitions = this[EVENT_EMITTER_LISTENERS].get(typeOrRegExp);
    if (definitions?.find((definition) => definition.listener === listener) == null) {
      const definition = {
        ...(typeof options === 'boolean' ? {capture: options} : options),
        type,
        listener,
      };
      if (definitions) {
        definitions.push(definition);
      } else {
        this[EVENT_EMITTER_LISTENERS].set(typeOrRegExp, [definition]);
      }
    }

    return () => this.removeEventListener(type, listener);
  }

  removeEventListener<Type extends string>(
    type: Type,
    listener: Micra.EventListener<Micra.MatchGlobEvents<Type, EventMap>>,
  ): void {
    const typeOrRegExp: string | RegExp = type.includes('*') ? globToRegex(type) : type;

    if (this[EVENT_EMITTER_LISTENERS].has(typeOrRegExp)) {
      const newDefinitions = this[EVENT_EMITTER_LISTENERS]
        .get(typeOrRegExp)!
        .filter((def) => def.listener !== listener);
      if (newDefinitions.length) {
        this[EVENT_EMITTER_LISTENERS].set(typeOrRegExp, newDefinitions);
      } else {
        this[EVENT_EMITTER_LISTENERS].delete(typeOrRegExp);
      }
    }
  }

  dispatchEvent<Type extends keyof EventMap>(event: Event<Type, EventMap[Type]>): boolean {
    if (event[EVENT_PHASE] !== Event.NONE)
      throw new ApplicationError({
        title: 'Invalid Event Dispatched',
        detail: 'Event is already being dispatched',
        metadata: {event},
      });

    event[EVENT_COMPOSED_PATH] = [this as EventEmitter<any>];
    if (event.bubbles) {
      let target: EventEmitter<any> | null = this[EVENT_EMITTER_PARENT];
      while (target) {
        event[EVENT_COMPOSED_PATH].push(target);
        target = target[EVENT_EMITTER_PARENT];
      }
    }

    const stringifiedType = String(event.type);
    const path = event[EVENT_COMPOSED_PATH] as EventEmitter<any>[];
    const listeners = path.reduce((list: EventListenerDefinition[][], currentTarget, index) => {
      for (const [type, definitions] of currentTarget[EVENT_EMITTER_LISTENERS].entries()) {
        if (
          (typeof type === 'string' && type === event.type) ||
          (type instanceof RegExp && type.test(stringifiedType))
        ) {
          list[index] ||= [];
          list[index].push(...definitions);
        }
      }

      return list;
    }, []);

    // Capture phase
    if (event.bubbles) {
      event[EVENT_PHASE] = Event.CAPTURING_PHASE;
      for (let i = path.length - 1; i > 0; i--) {
        event[EVENT_CURRENT_TARGET] = path[i];
        this.callListeners(event, listeners[i] ?? []);
        if (event.eventPhase === Event.NONE) return !event.defaultPrevented;
        if (event.propagationStopped) break;
      }
    }

    // At target phase
    event[EVENT_PHASE] = Event.AT_TARGET;
    event[EVENT_CURRENT_TARGET] = path[0];
    this.callListeners(event, listeners[0] ?? []);

    // Bubbling phase
    if (event.bubbles && event.eventPhase !== Event.NONE && !event.propagationStopped) {
      event[EVENT_PHASE] = Event.BUBBLING_PHASE;
      for (let i = 1; i < path.length; i++) {
        event[EVENT_CURRENT_TARGET] = path[i];
        this.callListeners(event, listeners[i] ?? []);
        if (event.eventPhase === Event.NONE) return !event.defaultPrevented;
        if (event.propagationStopped) break;
      }
    }

    event[EVENT_PHASE] = Event.NONE;
    event[EVENT_CURRENT_TARGET] = null;
    event[EVENT_COMPOSED_PATH].length = 0;

    return !event.defaultPrevented;
  }

  reparent(parent: EventEmitter<any>): this {
    this[EVENT_EMITTER_PARENT] = parent;
    return this;
  }

  private callListeners(
    event: Event<any, any>,
    definitions: EventListenerDefinition[],
  ): void | boolean {
    for (const definition of definitions) {
      if (
        event.eventPhase === Event.AT_TARGET ||
        (event.eventPhase === Event.CAPTURING_PHASE && definition.capture) ||
        (event.eventPhase === Event.BUBBLING_PHASE && !definition.capture)
      ) {
        event[EVENT_IN_PASSIVE_LISTENER] = definition.passive ?? false;
        definition.listener.call(event[EVENT_CURRENT_TARGET], event);
        if (definition.once)
          event[EVENT_CURRENT_TARGET]?.removeEventListener(definition.type, definition.listener);
        if (event.immediatePropagationStopped) {
          event[EVENT_PHASE] = Event.NONE;
          event[EVENT_CURRENT_TARGET] = null;
          event[EVENT_COMPOSED_PATH].length = 0;
        }
        if (event.eventPhase === Event.NONE) return;
        if (event.propagationStopped) break;
      }
    }
  }
}
