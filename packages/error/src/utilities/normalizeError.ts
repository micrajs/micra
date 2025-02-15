import type {Micra} from '@micra/core';
import {ApplicationError} from '../classes/ApplicationError';
import {isError} from '../guards/isError';
import {isApplicationError} from '../guards/isApplicationError';
import {APPLICATION_ERROR_IDENTIFIER} from '../constants/symbols';

/**
 * Converts a given value into an `ApplicationError`.
 * If the value is already an `ApplicationError`, it is returned as-is.
 * If it's a standard `Error`, it is converted into an `ApplicationError`.
 * Otherwise, a new `ApplicationError` is created with the provided value as metadata.
 *
 * @param value - The value to normalize into an `ApplicationError`.
 * @returns An instance of `ApplicationError`.
 *
 * @example
 * ```typescript
 * const error = normalizeError(new Error('Something went wrong')); // Converted into an ApplicationError
 * const customError = normalizeError('Unexpected issue'); // Wraps string into an ApplicationError
 * ```
 */
export function normalizeError(value: any): Micra.ApplicationError {
  if (isApplicationError(value)) return value;

  if (isError(value)) {
    Object.defineProperties(value, {
      [APPLICATION_ERROR_IDENTIFIER]: {value: true},
      add: {value: ApplicationError.prototype.add},
      clear: {value: ApplicationError.prototype.clear},
      toJSON: {value: ApplicationError.prototype.toJSON},
      status: {value: 500},
      type: {value: 'ApplicationError'},
      title: {value: 'Internal Error'},
      detail: {value: value.message},
      errors: {value: [], writable: true},
      hasErrors: {
        get() {
          return this.errors.length > 0;
        },
      },
    });

    return value as unknown as Micra.ApplicationError;
  }

  return new ApplicationError({
    type: 'InternalError',
    title: 'Non-standard value thrown while running application',
    status: 500,
    metadata: {value},
  });
}
