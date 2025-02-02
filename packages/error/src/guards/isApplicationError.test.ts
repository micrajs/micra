import {describe, it, expect} from 'vitest';
import {isApplicationError} from './isApplicationError';
import {ApplicationError} from '../classes/ApplicationError';

describe('isApplicationError', () => {
  it('returns true for a valid ApplicationError instance', () => {
    const error = new ApplicationError('Application error');

    expect(isApplicationError(error)).toBe(true);
  });

  it('returns false for a standard Error object', () => {
    const error = new Error('Standard error');

    expect(isApplicationError(error)).toBe(false);
  });

  it('returns false for null or undefined', () => {
    expect(isApplicationError(null)).toBe(false);
    expect(isApplicationError(undefined)).toBe(false);
  });

  it('returns false for a plain object without error properties', () => {
    const obj = {foo: 'bar'};

    expect(isApplicationError(obj)).toBe(false);
  });

  it('returns false for an object that mimics some error properties but is not a valid ApplicationError', () => {
    const obj = {
      message: 'Not an ApplicationError',
      stack: 'Stack trace',
      status: 500,
    };

    expect(isApplicationError(obj)).toBe(false);
  });

  it('returns false for objects missing the APPLICATION_ERROR_IDENTIFIER', () => {
    const obj = {
      message: 'Not an ApplicationError',
      stack: 'Stack trace',
      status: 500,
      serialize: () => {},
    };

    expect(isApplicationError(obj)).toBe(false);
  });

  it('handles edge cases gracefully', () => {
    expect(isApplicationError(42)).toBe(false);
    expect(isApplicationError('string')).toBe(false);
    expect(isApplicationError(Symbol('test'))).toBe(false);
    expect(isApplicationError(() => {})).toBe(false);
  });
});
