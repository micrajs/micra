import type {Micra} from '@micra/core';
import {ApplicationError} from '../classes/ApplicationError';
import {isError} from '../guards/isError';
import {isApplicationError} from '../guards/isApplicationError';
import {APPLICATION_ERROR_IDENTIFIER} from '../constants/symbols';

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
