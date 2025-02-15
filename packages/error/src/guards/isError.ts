import {isRecord} from '@micra/utilities/isRecord';

/**
 * Checks if the given value is a standard `Error` object.
 * This function ensures that the object contains the essential properties of an `Error`.
 *
 * @param maybeError - The value to be checked.
 * @returns True if the value is an `Error`, otherwise false.
 *
 * @example
 * ```typescript
 * isError(new Error('Oops')); // true
 * isError({}); // false
 * ```
 */
export function isError(maybeError: any): maybeError is Error {
  return (
    isRecord(maybeError) &&
    typeof maybeError.message === 'string' &&
    typeof maybeError.stack === 'string'
  );
}
