import type {Micra} from '@micra/core';
import type {ValidationResult} from '@micra/core/utilities/Validation';
import {ApplicationError} from '@micra/error';
import {Event, EventEmitter} from '@micra/event-emitter';
import {isRecord} from '@micra/utilities/isRecord';

export class Environment<
    Variables extends Record<string, Micra.EnvironmentVariableData> = Record<
      string,
      Micra.EnvironmentVariableData
    >,
  >
  extends EventEmitter<Micra.EnvironmentEventMap>
  implements Micra.Environment<Variables>
{
  private _parent?: Environment<Variables>;
  private _values: Partial<Variables> = {};
  private _definitions: Partial<{
    [key in keyof Variables]: Micra.EnvironmentDefinition<Variables[key]>;
  }> = {};

  constructor(
    partial: Partial<Variables> = {},
    definitions: Partial<{
      [key in keyof Variables]: Micra.EnvironmentDefinition<Variables[key]>;
    }> = {},
    parent?: Environment<Variables>,
  ) {
    super();
    this._values = partial;
    this._definitions = definitions;
    if (parent) {
      this._parent = parent;
      this._parent.addEventListener('error', (event: any) => {
        if (!(event.detail.name in this._definitions)) this.dispatchEvent(event);
      });
      this._parent.addEventListener('environment:changed', (event: any) => {
        if (!(event.detail.name in this._definitions)) this.dispatchEvent(event);
      });
    }
  }
  get<Key extends keyof Variables>(key: Key, fallback?: Variables[Key]): Variables[Key] {
    return (this._values[key] ??
      this._parent?.get(key, fallback) ??
      fallback ??
      this._definitions[key]?.default) as Variables[Key];
  }
  has<Key extends keyof Variables>(key: Key): boolean {
    return (
      key in this._values ||
      (this._definitions[key] && 'default' in this._definitions[key]) ||
      Boolean(this._parent?.has(key))
    );
  }
  missing<Key extends keyof Variables>(key: Key): boolean {
    return !this.has(key);
  }
  define(
    maybeKey: keyof Variables | Record<keyof Variables, Micra.EnvironmentDefinition>,
    definition?: Micra.EnvironmentDefinition,
  ): void {
    const definitions =
      typeof maybeKey === 'string'
        ? {[maybeKey]: isRecord(definition) ? definition : {}}
        : maybeKey;

    for (const [key, definition] of Object.entries(definitions) as [
      keyof Variables,
      Micra.EnvironmentDefinition,
    ][]) {
      const current = this._definitions[key];
      const next = {...current, ...definition};
      if (definition.default != undefined) {
        next.default = next.transform?.(next.default) ?? next.default;
        const result: ValidationResult<any> = next.validate?.(next.default) ?? {
          value: next.default,
        };
        if (result.issues) {
          const error = new ApplicationError({
            status: 500,
            title: 'Environment error',
            detail: `Invalid default value for environment variable ${String(key)}`,
            metadata: {...result, key},
          });
          this.dispatchEvent(new Event('error', {detail: {error}}));
          throw error;
        }
      }
      this._definitions[key] = next;
      if (key in this._values) {
        const nextValue = next.transform?.(this._values[key]) ?? this._values[key];
        const result: ValidationResult<any> = next.validate?.(nextValue) ?? {
          value: nextValue,
        };
        if (result.issues) {
          const error = new ApplicationError({
            status: 500,
            title: 'Environment error',
            detail: `Invalid default value for environment variable ${String(key)}`,
            metadata: {...result, key},
          });
          this.dispatchEvent(new Event('error', {detail: {error}}));
          throw error;
        }
        this._values[key] = nextValue;
        this.dispatchEvent(new Event('environment:changed'));
      }
    }
  }
  set(maybeKey: keyof Variables | Partial<Variables>, value?: Variables[keyof Variables]): void {
    const values = typeof maybeKey === 'string' ? {[maybeKey]: value} : maybeKey;
    for (const [key, value] of Object.entries(values) as [
      keyof Variables,
      Variables[keyof Variables],
    ][]) {
      const definition = this._definitions[key];
      if (definition) {
        const nextValue = definition.transform?.(value) ?? value;
        const result: ValidationResult<any> = definition.validate?.(nextValue) ?? {
          value: nextValue,
        };
        if (result.issues) {
          const error = new ApplicationError({
            status: 500,
            title: 'Environment error',
            detail: `Invalid value for environment variable ${String(key)}`,
            metadata: {...result, key},
          });
          this.dispatchEvent(new Event('error', {detail: {error}}));
          throw error;
        }
        this._values[key] = nextValue;
      } else {
        this._values[key] = value;
        this._definitions[key] = {};
      }
      this.dispatchEvent(new Event('environment:changed'));
    }
  }
  unset<Key extends keyof Variables>(key: Key): void {
    if (this._definitions[key]) {
      delete this._values[key];
      this.dispatchEvent(new Event('environment:changed'));
    }
  }
  validate(): void {
    const error = new ApplicationError({
      status: 500,
      title: 'Environment error',
      detail: `Invalid environment configuration.`,
    });
    for (const [key, definition] of Object.entries(this._definitions) as [
      keyof Variables,
      Micra.EnvironmentDefinition<Variables[keyof Variables]>,
    ][]) {
      if (key in this._values || definition.required) {
        const value = this._values[key];
        const result: ValidationResult<any> = definition.validate?.(value) ?? {
          value,
        };
        if (result.issues || (result.value === undefined && definition.required)) {
          error.add(
            new ApplicationError({
              status: 500,
              title: 'Environment error',
              detail: `Invalid value for environment variable ${String(key)}`,
              metadata: {...result, key},
            }),
          );
        }
      }
    }

    if (error.hasErrors) {
      this.dispatchEvent(new Event('error', {detail: {error}}));
      throw error;
    }
  }
  fork(overrides: Partial<Variables> = {}): Micra.Environment<Variables> {
    const forked = new Environment<Variables>(overrides, undefined, this);
    return forked;
  }
  toJSON(options: Micra.EnvironmentSerializeOptions = {}): Record<string, unknown> {
    // resolve keys
    const {pick, omit, includeSensitive = false} = options;
    return Object.keys(this._definitions).reduce((list, key) => {
      if (pick && !pick.includes(key)) return list;
      if (omit && omit.includes(key)) return list;

      const value = this._values[key];
      const definition = this._definitions[key];
      if (definition?.sensitive && !includeSensitive) return list;
      list[key] = value ?? definition?.default ?? list[key];
      return list;
    }, this._parent?.toJSON(options) ?? {});
  }
}
