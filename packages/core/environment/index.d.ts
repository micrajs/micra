import type {ApplicationError} from '../error';
import type {EventEmitter} from '../event-emitter';
import type {ValidationResult} from '../utilities/Validation';

/**
 * Represents valid environment variable values.
 */
export type EnvironmentVariableData =
  | string
  | number
  | boolean
  | symbol
  | null
  | undefined;

/**
 * Defines the schema and behavior of an individual environment variable.
 *
 * @template Value The expected type of the variable after transformation.
 */
export interface EnvironmentDefinition<Value = EnvironmentVariableData> {
  /**
   * The default value used when no value is explicitly set.
   *
   * @example
   * ```typescript
   * {
   *   default: 3000
   * }
   * ```
   */
  default?: Value;

  /**
   * Marks the variable as required. Will trigger validation if not set.
   *
   * @example
   * ```typescript
   * {
   *   required: true
   * }
   * ```
   */
  required?: boolean;

  /**
   * Marks the variable as sensitive. It will be excluded from serialized outputs unless explicitly included.
   *
   * @example
   * ```typescript
   * {
   *   sensitive: true
   * }
   * ```
   */
  sensitive?: boolean;

  /**
   * Function to transform the raw input into the desired value type.
   *
   * @param input The raw input value.
   * @returns The transformed value.
   *
   * @example
   * ```typescript
   * {
   *   transform: (input) => parseInt(String(input), 10)
   * }
   * ```
   */
  transform?: (input: unknown) => Value;

  /**
   * Function to validate the transformed value.
   *
   * @param value The value to validate.
   * @returns A validation result including the final value and any issues.
   *
   * @example
   * ```typescript
   * {
   *   validate: (value) => ({
   *     value,
   *     issues: value > 10 ? [{ message: 'Must be 10 or less' }] : undefined
   *   })
   * }
   * ```
   */
  validate?: (value: unknown) => ValidationResult<Value>;
}

/**
 * Options used when serializing the environment to an object.
 */
export interface EnvironmentSerializeOptions {
  /**
   * If true, includes sensitive variables in the output. Defaults to false.
   *
   * @example
   * ```typescript
   * env.toJSON({ includeSensitive: true });
   * ```
   */
  includeSensitive?: boolean;

  /**
   * List of variable names to include in the output. If omitted, all are included.
   *
   * @example
   * ```typescript
   * env.toJSON({ pick: ['API_URL', 'DEBUG'] });
   * ```
   */
  pick?: string[];

  /**
   * List of variable names to exclude from the output.
   *
   * @example
   * ```typescript
   * env.toJSON({ omit: ['SECRET_KEY'] });
   * ```
   */
  omit?: string[];
}

/**
 * Defines the events emitted by the environment.
 */
export interface EnvironmentEventMap {
  /**
   * Emitted whenever a variable is added, updated, or removed.
   */
  'environment:changed': void;

  /**
   * Emitted when an error occurs during transformation or validation.
   */
  error: {
    error: ApplicationError;
  };
}

/**
 * Represents a structured, type-safe environment with schema-based definitions,
 * runtime validation, transformation, and serialization support.
 *
 * @template Variables The shape of the variable map for this environment.
 */
export interface Environment<
  Variables extends Record<string, EnvironmentVariableData> = Record<
    string,
    EnvironmentVariableData
  >,
> extends EventEmitter<EnvironmentEventMap> {
  /**
   * Retrieves the value of a defined environment variable.
   *
   * @template Key The name of the variable.
   *
   * @param key The name of the variable to retrieve.
   * @returns The current value of the variable, or undefined if unset.
   *
   * @example
   * ```typescript
   * env.get('PORT'); // 3000
   * ```
   */
  get<Key extends keyof Variables>(key: Key): Variables[Key] | undefined;

  /**
   * Retrieves the value of a defined variable, falling back to a default if unset.
   *
   * @template Key The name of the variable.
   *
   * @param key The name of the variable to retrieve.
   * @param fallback The fallback value if the variable is not set.
   * @returns The current value or the fallback.
   *
   * @example
   * ```typescript
   * env.get('PORT', 8080); // Uses 8080 if PORT is not set
   * ```
   */
  get<Key extends keyof Variables>(
    key: Key,
    fallback: Variables[Key],
  ): Variables[Key];

  /**
   * Checks if a variable has been explicitly set.
   *
   * @template Key The name of the variable.
   *
   * @param key The variable name to check.
   * @returns True if the variable has been set.
   *
   * @example
   * ```typescript
   * env.has('DEBUG'); // true or false
   * ```
   */
  has<Key extends keyof Variables>(key: Key): boolean;

  /**
   * Checks if a variable is missing (i.e., undefined and no default value).
   *
   * @template Key The name of the variable.
   *
   * @param key The variable name to check.
   * @returns True if the variable is missing.
   *
   * @example
   * ```typescript
   * env.missing('API_URL'); // true if not defined and no default
   * ```
   */
  missing<Key extends keyof Variables>(key: Key): boolean;

  /**
   * Defines the schema and behavior for a single environment variable.
   *
   * @template Key The name of the variable.
   *
   * @param key The name of the variable.
   * @param definition The schema definition.
   *
   * @example
   * ```typescript
   * env.define('PORT', {
   *   default: 3000,
   *   transform: (v) => parseInt(String(v), 10),
   *   validate: (v) => ({ value: v, issues: v < 1024 ? [{ message: 'Too low' }] : undefined })
   * });
   * ```
   */
  define<Key extends keyof Variables>(
    key: Key,
    definition: EnvironmentDefinition<Variables[Key]>,
  ): void;

  /**
   * Defines multiple variables using a map of schema definitions.
   *
   * @template Defs The shape of the variable definitions.
   *
   * @param key A map of variable names to their definitions.
   *
   * @example
   * ```typescript
   * env.define({
   *   API_URL: { required: true },
   *   DEBUG: { default: false }
   * });
   * ```
   */
  define<
    Defs extends Partial<{
      [K in keyof Variables]: EnvironmentDefinition<Variables[K]>;
    }>,
  >(
    key: Defs,
  ): void;

  /**
   * Sets a single environment variable to a new value.
   *
   * @template Key The name of the variable.
   *
   * @param key The name of the variable.
   * @param value The value to assign.
   *
   * @throws {ApplicationError} If the variable is not defined or the value fails validation.
   *
   * @example
   * ```typescript
   * env.set('PORT', 8080);
   * ```
   */
  set<Key extends keyof Variables>(key: Key, value: Variables[Key]): void;

  /**
   * Sets multiple environment variables in bulk.
   *
   * @param partial An object mapping variable names to values.
   *
   * @throws {ApplicationError} If any value fails validation.
   *
   * @example
   * ```typescript
   * env.set({
   *   DEBUG: true,
   *   API_URL: 'https://example.com'
   * });
   * ```
   */
  set(partial: Partial<Variables>): void;

  /**
   * Removes the value of a defined environment variable.
   *
   * @param key The name of the variable to unset.
   *
   * @example
   * ```typescript
   * env.unset('DEBUG');
   * ```
   */
  unset(key: keyof Variables): void;

  /**
   * Validates all defined variables against their schema.
   *
   * @throws {ApplicationError} If any variable fails validation or is required but unset.
   *
   * @example
   * ```typescript
   * env.validate(); // Throws if invalid
   * ```
   */
  validate(): void;

  /**
   * Creates a new environment that inherits from the current one and applies overrides.
   *
   * @param overrides Values to override in the new environment instance.
   * @returns A new forked Environment instance.
   *
   * @example
   * ```typescript
   * const testEnv = env.fork({ DEBUG: false });
   * ```
   */
  fork(overrides: Partial<Variables>): Environment<Variables>;

  /**
   * Serializes the environment to a plain object.
   *
   * @param options Control what keys are included or redacted.
   * @returns A map of variable names to their current values or undefined.
   *
   * @example
   * ```typescript
   * const data = env.toJSON({ omit: ['SECRET_KEY'] });
   * ```
   */
  toJSON(options?: EnvironmentSerializeOptions): Record<string, unknown>;
}
