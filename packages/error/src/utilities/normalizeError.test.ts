import {describe, it, expect} from 'vitest';
import {normalizeError} from './normalizeError';
import {isApplicationError} from '../guards/isApplicationError';

describe('normalizeError', () => {
  it('should return a normalized error if a raw error is provided', () => {
    const rawError = new Error('Test error');
    const error = normalizeError(rawError);

    expect(error).toBe(rawError);
    expect(isApplicationError(error)).toBe(true);
  });

  it('should return a normalized error if non-standard value is provided', () => {
    const value = 'Test error';
    const error = normalizeError(value);

    expect(error).toBeInstanceOf(Error);
    expect(isApplicationError(error)).toBe(true);
  });
});
