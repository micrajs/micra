import {isRecord} from '@micra/utilities/isRecord';

export function isError(maybeError: any): maybeError is Error {
  return (
    isRecord(maybeError) &&
    typeof maybeError.message === 'string' &&
    typeof maybeError.stack === 'string'
  );
}
