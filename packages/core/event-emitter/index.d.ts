import type {GlobToPath} from '../utilities/GlobToPath';

/**
 * Represents an event object with metadata, propagation controls, and a composed path.
 *
 * @template Type - The event type identifier (string, number, or symbol).
 * @template Detail - The structured metadata associated with the event.
 */
export interface Event<
  Type extends string | number | symbol = string,
  Detail extends Record<any, any> = {},
> {
  /**
   * The type of the event, indicating the specific event that occurred.
   */
  readonly type: Type;

  /**
   * Additional data related to the event, providing context for event handlers.
   */
  readonly detail: Detail;

  /**
   * The current phase of the event (e.g., capturing, at target, or bubbling).
   */
  readonly eventPhase: number;

  /**
   * Indicates whether the event bubbles up through the event chain.
   */
  readonly bubbles: boolean;

  /**
   * Indicates whether the event can be canceled using `preventDefault()`.
   */
  readonly cancelable: boolean;

  /**
   * Indicates whether `preventDefault()` was called on the event.
   */
  readonly defaultPrevented: boolean;

  /**
   * The `EventEmitter` currently processing the event.
   */
  readonly currentTarget: EventEmitter | null;

  /**
   * The original `EventEmitter` that dispatched the event.
   */
  readonly target: EventEmitter | null;

  /**
   * The time when the event was created, in milliseconds.
   */
  readonly timeStamp: number;

  /**
   * Indicates whether `stopImmediatePropagation()` was called on the event.
   */
  readonly immediatePropagationStopped: boolean;

  /**
   * Indicates whether `stopPropagation()` was called, halting the event’s propagation.
   */
  readonly propagationStopped: boolean;

  /**
   * Prevents the event from propagating further in the event chain.
   */
  stopPropagation(): void;

  /**
   * Stops the event from propagating and prevents other listeners on the same event from being executed.
   */
  stopImmediatePropagation(): void;

  /**
   * Cancels the event’s default action if it is cancelable.
   */
  preventDefault(): void;

  /**
   * Returns an array representing the path the event follows through the event emitters.
   */
  composedPath(): EventEmitter[];
}

/**
 * Defines options for event listeners, such as capture, once, and passive.
 */
export interface AddEventListenerOptions {
  /**
   * Indicates if the event listener should be invoked during the capture phase.
   */
  capture?: boolean;

  /**
   * Specifies if the listener should be removed after being invoked once.
   */
  once?: boolean;

  /**
   * Indicates that the listener will never call `preventDefault()`, improving performance.
   */
  passive?: boolean;
}

/**
 * A type for event listener functions that handle dispatched events.
 *
 * @template E - The event object type, ensuring type safety.
 */
export interface EventListener<E extends Event<any, any> = Event<any, any>> {
  (event: E): void;
}

/**
 * Matches all events in a given event map against a glob pattern.
 *
 * @template Glob - The glob pattern string to match event types.
 * @template EventMap - A record mapping event types to their corresponding detail objects.
 */
export type MatchGlobEvents<Glob extends string, EventMap extends Record<string, any>> = {
  [K in keyof EventMap]: K extends GlobToPath<Glob> ? Event<K, EventMap[K]> : never;
}[keyof EventMap];

/**
 * Defines an event emitter with methods to add, remove, and dispatch events.
 *
 * @template EventMap - A record that maps event types to their corresponding detail objects.
 */
export interface EventEmitter<EventMap extends Record<string, any> = {}> {
  /**
   * Adds an event listener for a specific event type, with support for glob patterns and optional listener settings.
   * Returns a function that removes the added listener when called.
   */
  addEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
    options?: AddEventListenerOptions | boolean,
  ): () => void;

  /**
   * Removes a previously added event listener for a specific event type.
   */
  removeEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
  ): void;

  /**
   * Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.
   */
  dispatchEvent<Type extends keyof EventMap>(event: Event<Type, EventMap[Type]>): boolean;
}
