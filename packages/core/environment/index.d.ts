import type {ApplicationError} from '../error';
import type {EventEmitter} from '../event-emitter';
import type {ValidationResult} from '../utilities/Validation';

/**
 * Represents the allowed primitive types for environment variable values.
 */
export type EnvironmentVariableData = string | number | boolean | symbol | null | undefined;

/**
 * Defines metadata and behavior for a single environment variable.
 *
 * @template Value The type of the environment variable's value.
 */
export interface EnvironmentDefinition<Value = EnvironmentVariableData> {
  /**
   * A fallback value to use if the variable is not explicitly set.
   */
  default?: Value;

  /**
   * Indicates whether this variable is required.
   * If `true`, validation will fail if the variable is not provided.
   */
  required?: boolean;

  /**
   * Marks the variable as sensitive.
   * Sensitive variables may be excluded from serialization when calling `Environment.toJSON`.
   */
  sensitive?: boolean;

  /**
   * A transformation function to apply to the raw input value.
   * Use this to coerce values into the desired type.
   *
   * @param input The raw value to transform.
   * @returns The transformed value.
   *
   * @example
   * ```ts
   * env.define('API_URL', {
   *  transform: (input) => {
   *    input = String(input);
   *    return input.endsWith('/') ? input : `${input}/`;
   *  },
   * });
   */
  transform?: (input: unknown) => Value;

  /**
   * A validation function that determines whether a given value is acceptable.
   *
   * @param value The value to validate.
   * @returns `true` if the value is valid; otherwise `false`.
   *
   * @example
   * ```ts
   * env.define('PORT', {
   *  validate: (value) => {
   *    if (typeof value !== 'number') {
   *      return {issues: [{message: 'Port must be a number'}]};
   *    }
   *
   *    if (value < 1 || value > 65535) {
   *     return {issues: [{message: 'Port must be between 1 and 65535'}]};
   *    }
   *
   *    return {value};
   *  },
   * });
   */
  validate?: (value: unknown) => ValidationResult<Value>;
}

/**
 * Options for customizing the output of `Environment.toJSON`.
 */
export interface EnvironmentSerializeOptions {
  /**
   * If `true`, includes sensitive variables in the output.
   * Defaults to `false`.
   */
  includeSensitive?: boolean;

  /**
   * An array of variable names to include in the output.
   * If provided, only these variables will be serialized.
   * If not provided, all variables will be included.
   */
  pick?: string[];

  /**
   * A list of variable names to exclude from the output.
   * If provided, these variables will be omitted from the serialized object.
   */
  omit?: string[];
}

/**
 * Defines the shape of emitted events from the Environment API.
 */
export interface EnvironmentEventMap {
  /**
   * Emitted when a variable is changed.
   */
  'environment:changed': void;

  /**
   * Emitted when a validation or transformation error occurs.
   */
  error: {
    /**
     * The error thrown.
     */
    error: ApplicationError;
  };
}

/**
 * The Environment interface provides a type-safe, reactive, and flexible API
 * for managing and validating environment variables in a modular application.
 *
 * @template Variables A map of variable names to their expected types.
 */
export interface Environment<
  Variables extends Record<string, EnvironmentVariableData> = Record<
    string,
    EnvironmentVariableData
  >,
> extends EventEmitter<EnvironmentEventMap> {
  /**
   * Retrieves the value of a variable, or `undefined` if not set.
   *
   * @param name The name of the variable to retrieve.
   * @returns The value of the variable, or `undefined`.
   *
   * @example
   * ```ts
   * const apiUrl = env.get('API_URL');
   * if (apiUrl) {
   *   console.log(`API URL: ${apiUrl}`);
   * } else {
   *   console.log('API URL is not set.');
   * }
   * ```
   */
  get<Name extends keyof Variables>(name: Name): Variables[Name] | undefined;

  /**
   * Retrieves the value of a variable, or returns a fallback if not set.
   *
   * @param name The name of the variable to retrieve.
   * @param fallback A fallback value to return if the variable is not set.
   * @returns The resolved value.
   *
   * @example
   * ```ts
   * const apiUrl = env.get('API_URL', 'https://default.api.com');
   * console.log(`API URL: ${apiUrl}`); // Will log the default if https://default.api.com is not set.
   * ```
   */
  get<Name extends keyof Variables>(name: Name, fallback: Variables[Name]): Variables[Name];

  /**
   * Checks whether a variable has been defined and has a value.
   *
   * @param name The variable name.
   * @returns `true` if the variable is set, otherwise `false`.
   *
   * @example
   * ```ts
   * if (env.has('API_KEY')) {
   *   console.log('API_KEY is set.');
   * }
   */
  has(name: string): boolean;

  /**
   * Checks whether a variable is missing.
   * This is equivalent to `!has(name)`.
   *
   * @param name The variable name.
   * @returns `true` if the variable is missing, otherwise `false`.
   *
   * @example
   * ```ts
   * if (env.missing('API_KEY')) {
   *   throw new Error('API_KEY is required but not set.');
   * }
   */
  missing(name: string): boolean;

  /**
   * Defines metadata and rules for a single environment variable.
   *
   * @param key The variable name.
   * @param definition The environment variable definition.
   *
   * @example
   * ```ts
   * env.define('API_URL', {
   *   default: 'https://api.example.com',
   * });
   * ```
   */
  define<Name extends keyof Variables>(
    key: Name,
    definition: EnvironmentDefinition<Variables[Name]>,
  ): void;

  /**
   * Defines multiple environment variables at once.
   *
   * @param key A map of variable names to their definitions.
   *
   * @example
   * ```ts
   * env.define({
   *   API_URL: {
   *     default: 'https://api.example.com',
   *   },
   *   API_KEY: {
   *     required: true,
   *     sensitive: true,
   *   },
   * });
   * ```
   */
  define<
    Defs extends Partial<{
      [K in keyof Variables]: EnvironmentDefinition<Variables[K]>;
    }>,
  >(key: Defs): void;

  /**
   * Sets the value of a single variable.
   *
   * @param name The variable name.
   * @param value The new value to set.
   *
   * @throws {ApplicationError} If any variables fail validation.
   *
   * @example
   * ```ts
   * env.set('API_URL', 'https://api.example.com');
   * ```
   */
  set<Name extends keyof Variables>(name: Name, value: Variables[Name]): void;

  /**
   * Sets the values of multiple variables at once.
   *
   * @param partial A map of variable names to their values.
   *
   * @throws {ApplicationError} If any variables fail validation.
   *
   * @example
   * ```ts
   * env.set({
   *   API_URL: 'https://api.example.com',
   *   API_KEY: 'my-secret-key',
   * });
   * ```
   */
  set(partial: Partial<Variables>): void;

  /**
   * Removes a variable from the environment.
   *
   * @param name The name of the variable to remove.
   *
   * @example
   * ```ts
   * env.unset('DEBUG');
   * ```
   */
  unset(name: keyof Variables): void;

  /**
   * Validates all defined variables.
   *
   * @throws {ApplicationError} If any variable fails validation or is missing and required.
   *
   * @example
   * ```ts
   * try {
   *   env.define('API_URL', {required: true});
   *   env.validate();
   * } catch (error) {
   *   console.error('Validation failed:', error);
   * }
   * ```
   */
  validate(): void;

  /**
   * Creates a forked environment instance with overridden values.
   * This is useful for isolated testing or contextual overrides.
   *
   * @param overrides A partial map of variable overrides.
   * @returns A new `Environment` instance with the overrides applied.
   *
   * @example
   * ```ts
   * const forkedEnv = env.fork({API_URL: 'https://test.api.com'});
   * console.log(forkedEnv.get('API_URL')); // Outputs: 'https://test.api.com'
   * ```
   */
  fork(overrides: Partial<Variables>): Environment<Variables>;

  /**
   * Serializes the environment to a plain object.
   *
   * @param options Optional serialization options.
   * @returns A plain object containing environment variable values.
   *
   * @example
   * ```ts
   * const serialized = env.toJSON({includeSensitive: true});
   * console.log(serialized);
   * // Outputs: {API_URL: 'https://api.example.com', API_KEY: 'my-secret-key'}
   * ```
   */
  toJSON(options?: EnvironmentSerializeOptions): Record<string, unknown>;
}
