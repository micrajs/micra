import {describe, it, expect} from 'vitest';
import {isError} from './isError';
import {ApplicationError} from '../classes/ApplicationError';

describe('isError', () => {
  it('returns true for a standard Error object', () => {
    const error = new Error('Standard error');

    expect(isError(error)).toBe(true);
  });

  it('returns true for Application Errors', () => {
    const error = new ApplicationError('Custom error');

    expect(isError(error)).toBe(true);
  });

  it('returns true for a custom Error instance', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }

    const error = new CustomError('Custom error');

    expect(isError(error)).toBe(true);
  });

  it('returns false for null or undefined', () => {
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });

  it('returns false for non-object types', () => {
    expect(isError('string')).toBe(false);
    expect(isError(42)).toBe(false);
    expect(isError(Symbol('test'))).toBe(false);
    expect(isError(() => {})).toBe(false);
  });

  it('returns false for a plain object without error properties', () => {
    const obj = {foo: 'bar'};

    expect(isError(obj)).toBe(false);
  });

  it('returns false for objects missing a valid message or stack', () => {
    const obj1 = {message: 'Missing stack'};
    const obj2 = {stack: 'Missing message'};
    const obj3 = {message: 42, stack: 'Valid stack'}; // Invalid message type
    const obj4 = {message: 'Valid message', stack: 42}; // Invalid stack type

    expect(isError(obj1)).toBe(false);
    expect(isError(obj2)).toBe(false);
    expect(isError(obj3)).toBe(false);
    expect(isError(obj4)).toBe(false);
  });

  it('handles edge cases gracefully', () => {
    expect(isError([])).toBe(false);
    expect(isError(new Map())).toBe(false);
    expect(isError(new Set())).toBe(false);
    expect(isError(Object.create(null))).toBe(false);
  });
});
