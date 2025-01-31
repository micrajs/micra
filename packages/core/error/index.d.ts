/**
 * Represents a structured error in the application.
 * Supports metadata, nested error aggregation, and serialization.
 */
export interface ApplicationError {
  /** A human-readable explanation of the error. */
  detail?: string;

  /** A URI reference identifying the specific instance of the error. */
  instance?: string;

  /** Additional metadata related to the error. */
  metadata?: Record<string, any>;

  /** HTTP status code associated with the error. */
  status: number;

  /** A short, human-readable title describing the error type. */
  title: string;

  /** A URI reference identifying the error type. */
  type?: string;

  /** A collection of nested errors related to this error. */
  readonly errors: ApplicationError[];

  /** Indicates whether there are any aggregated errors. */
  readonly hasErrors: boolean;

  /**
   * Adds one or more errors to the error aggregation.
   * Converts raw `Error` instances to `ApplicationError` for consistency.
   *
   * @param errors - The errors to aggregate.
   */
  add(errors: (ApplicationError | Error)[]): void;
  add(...errors: (ApplicationError | Error)[]): void;

  /** Clears all aggregated errors. */
  clear(): void;

  /**
   * Serializes the error into a structured JSON format.
   *
   * @param options - Options to control serialization output.
   * @returns A structured error object.
   */
  toJSON(options?: ErrorSerializerOptions): SerializedError;
}

/**
 * Defines options for serializing an error.
 */
export interface ErrorSerializerOptions {
  /** Whether to include the stack trace in serialization output. */
  includeStack?: boolean;

  /** The maximum depth for serializing nested errors to prevent infinite recursion. */
  depth?: number;
}

/**
 * Represents the core structure of an error message.
 * This ensures consistency and predictability in error reporting.
 */
export interface ErrorDetail {
  /**
   * HTTP status code representing the error.
   * Used to indicate the nature of the failure.
   *
   * @default 500
   *
   * @example 400 // Bad Request
   * @example 404 // Not Found
   * @example 500 // Internal Server Error
   */
  status: number;

  /**
   * A short, human-readable title describing the error type.
   * Should provide a clear summary of the error.
   *
   * @example "Validation Error"
   * @example "Resource Not Found"
   * @example "Internal Server Error"
   */
  title: string;

  /**
   * A human-readable explanation of the error.
   * Gives more details on why the error occurred.
   *
   * @example "The provided email format is invalid."
   * @example "The requested user was not found in the database."
   */
  detail?: string;

  /**
   * A URI reference identifying the specific instance of the error.
   * Useful for providing a traceable reference to a failing request or resource.
   *
   * @example "/users/1234" // The request affected user ID 1234
   * @example "/orders/5678" // The issue pertains to order ID 5678
   */
  instance?: string;

  /**
   * A URI reference identifying the type of error.
   * Can point to documentation or predefined problem types.
   *
   * @example "https://example.com/errors/invalid-request"
   * @example "https://example.com/errors/resource-not-found"
   */
  type?: string;

  /**
   * Additional metadata related to the error.
   * Can be used to store extra context, such as validation fields or debug information.
   *
   * @example { "field": "email", "reason": "invalid format" }
   * @example { "attemptedValue": "username@.com", "validation": "regex" }
   */
  metadata?: Record<string, any>;
}

/**
 * Represents a serialized version of an error, including stack trace and nested errors.
 */
export interface SerializedError extends ErrorDetail {
  /** Stack trace of the error, if available. */
  stack?: string;

  /** Serialized representation of nested errors. */
  errors?: SerializedError[];
}

/**
 * Defines the properties available when creating an `ApplicationError`.
 * Allows partial definition of `ErrorDetail`, with a required `title`.
 */
export interface ErrorOptions extends Partial<ErrorDetail> {
  /** A short, human-readable title describing the error type. */
  title: string;
}
