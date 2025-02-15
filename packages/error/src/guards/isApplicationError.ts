import type {Micra} from '@micra/core';
import {APPLICATION_ERROR_IDENTIFIER} from '../constants/symbols';
import {isError} from './isError';
import {isErrorOptions} from './isErrorOptions';

/**
 * Checks if the given value is an `Micra.ApplicationError`.
 * This function verifies that the object adheres to the `Micra.ApplicationError` interface.
 *
 * @param maybeError - The value to be checked.
 * @returns True if the value is an `Micra.ApplicationError`, otherwise false.
 *
 * @example
 * ```typescript
 * const error = new ApplicationError('Something went wrong');
 * isApplicationError(error); // true
 * ```
 */
export function isApplicationError(maybeError: any): maybeError is Micra.ApplicationError {
  return (
    isError(maybeError) &&
    isErrorOptions(maybeError) &&
    APPLICATION_ERROR_IDENTIFIER in maybeError &&
    maybeError[APPLICATION_ERROR_IDENTIFIER] === true &&
    'add' in maybeError &&
    typeof maybeError.add === 'function' &&
    'clear' in maybeError &&
    typeof maybeError.clear === 'function' &&
    'hasErrors' in maybeError &&
    typeof maybeError.hasErrors === 'boolean' &&
    'toJSON' in maybeError &&
    typeof maybeError.toJSON === 'function' &&
    'errors' in maybeError &&
    Array.isArray(maybeError.errors) &&
    maybeError.errors.every(isApplicationError)
  );
}
