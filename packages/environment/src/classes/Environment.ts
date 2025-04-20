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
      this._handleParentEvent = this._handleParentEvent.bind(this);
      this._parent.addEventListener('error', this._handleParentEvent);
      this._parent.addEventListener('environment:changed', this._handleParentEvent);
    }
  }

  private _handleParentEvent = (event: any): void => {
    if (!(event.detail.name in this._definitions)) {
      this.dispatchEvent(event);
    }
  };

  private _validateValue<Key extends keyof Variables>(
    key: Key,
    value: any,
    definition?: Micra.EnvironmentDefinition<Variables[Key]>,
    errorMessage = 'Invalid value',
  ): Variables[Key] {
    if (!definition) return value;

    const transformedValue = definition.transform?.(value) ?? value;
    const result: ValidationResult<any> = definition.validate?.(transformedValue) ?? {
      value: transformedValue,
    };

    if (result.issues) {
      const error = new ApplicationError({
        status: 500,
        title: 'Environment error',
        detail: `${errorMessage} for environment variable ${String(key)}`,
        metadata: {...result, key},
      });
      this.dispatchEvent(new Event('error', {detail: {error}}));
      throw error;
    }

    return transformedValue;
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
      const current = this._definitions[key] || {};

      // Update definition properties without creating a new object
      Object.assign(current, definition);
      this._definitions[key] = current;

      if (current.default !== undefined) {
        current.default = this._validateValue(
          key,
          current.default,
          current,
          'Invalid default value',
        );
      }

      if (key in this._values) {
        this._values[key] = this._validateValue(key, this._values[key], current);
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
        this._values[key] = this._validateValue(key, value, definition);
      } else {
        this._values[key] = value;
        this._definitions[key] = {};
      }

      this.dispatchEvent(new Event('environment:changed'));
    }
  }

  unset<Key extends keyof Variables>(key: Key): void {
    if (this._definitions[key] && key in this._values) {
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

    for (const [key, definition] of Object.entries(this._definitions)) {
      if (key in this._values || definition.required) {
        const value = this._values[key];
        if (value === undefined && definition.required) {
          error.add(
            new ApplicationError({
              status: 500,
              title: 'Environment error',
              detail: `Invalid value for environment variable ${String(key)}.`,
              metadata: {
                key,
                value,
                issues: [{message: 'Required value is missing'}],
              },
            }),
          );
          continue;
        }

        const {issues} = definition.validate?.(value) ?? {
          value,
        };
        if (issues) {
          error.add(
            new ApplicationError({
              status: 500,
              title: 'Environment error',
              detail: `Invalid value for environment variable ${String(key)}.`,
              metadata: {key, issues, value},
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
    return new Environment<Variables>(overrides, undefined, this);
  }

  toJSON(options: Micra.EnvironmentSerializeOptions = {}): Record<string, unknown> {
    const {pick, omit, includeSensitive = false} = options;
    const parentJSON = this._parent?.toJSON(options) ?? {};

    // Only iterate through keys that meet our criteria
    return Object.keys(this._definitions).reduce((result, key) => {
      if ((pick && !pick.includes(key)) || (omit && omit.includes(key))) return result;

      const definition = this._definitions[key];
      if (definition?.sensitive && !includeSensitive) return result;

      const value = this._values[key] ?? definition?.default;
      if (value !== undefined) {
        result[key] = value;
      }

      return result;
    }, parentJSON);
  }
}
