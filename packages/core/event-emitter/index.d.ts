import type {GlobToPath} from '../utilities/GlobToPath';

export interface Event<
  Type extends string | number | symbol = string,
  Detail extends Record<any, any> = {},
> {
  readonly type: Type;
  readonly detail: Detail;
  readonly eventPhase: number;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly defaultPrevented: boolean;
  readonly currentTarget: EventEmitter | null;
  readonly target: EventEmitter | null;
  readonly timeStamp: number;
  readonly immediatePropagationStopped: boolean;
  readonly propagationStopped: boolean;
  stopPropagation(): void;
  stopImmediatePropagation(): void;
  preventDefault(): void;
  composedPath(): EventEmitter[];
}

export interface AddEventListenerOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}

export interface EventListener<E extends Event<any, any> = Event<any, any>> {
  (event: E): void;
}

export type MatchGlobEvents<
  Glob extends string,
  EventMap extends Record<string, any>,
> = {
  [K in keyof EventMap]: K extends GlobToPath<Glob>
    ? Event<K, EventMap[K]>
    : never;
}[keyof EventMap];

export interface EventEmitter<EventMap extends Record<string, any> = {}> {
  addEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
    options?: AddEventListenerOptions | boolean,
  ): () => void;
  removeEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
  ): void;
  dispatchEvent<Type extends keyof EventMap>(
    event: Event<Type, EventMap[Type]>,
  ): boolean;
}
