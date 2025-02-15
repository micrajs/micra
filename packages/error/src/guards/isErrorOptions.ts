import type {Micra} from '@micra/core';
import {isRecord} from '@micra/utilities/isRecord';

/**
 * Checks if the given value is a valid `Micra.ErrorOptions` object.
 * Validates that the object matches the structure expected for `Micra.ErrorOptions`.
 *
 * @param maybeOptions - The value to be checked.
 * @returns True if the value conforms to `Micra.ErrorOptions`, otherwise false.
 *
 * @example
 * ```typescript
 * isErrorOptions({ title: 'Validation Error', status: 400 }); // true
 * ```
 */
export function isErrorOptions(maybeOptions: any): maybeOptions is Micra.ErrorOptions {
  return (
    isRecord(maybeOptions) &&
    typeof maybeOptions.title === 'string' &&
    (maybeOptions.type == null || typeof maybeOptions.type === 'string') &&
    (maybeOptions.detail == null || typeof maybeOptions.detail === 'string') &&
    (maybeOptions.status == null || typeof maybeOptions.status === 'number') &&
    (maybeOptions.instance == null || typeof maybeOptions.instance === 'string') &&
    (maybeOptions.metadata == null || isRecord(maybeOptions.metadata))
  );
}
