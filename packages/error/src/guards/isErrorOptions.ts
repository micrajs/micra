import type {Micra} from '@micra/core';
import {isRecord} from '@micra/utilities/isRecord';

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
