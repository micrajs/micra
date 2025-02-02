import {describe, it, expect} from 'vitest';
import {isErrorOptions} from './isErrorOptions';

describe('isErrorOptions', () => {
  it('returns true for a valid ErrorOptions object', () => {
    const validOptions = {
      type: 'ValidationError',
      title: 'Invalid Input',
      detail: 'The username field is required.',
      status: 400,
      instance: 'abc123',
      metadata: {field: 'username'},
    };

    expect(isErrorOptions(validOptions)).toBe(true);
  });

  it('returns true for a minimal valid ErrorOptions object', () => {
    const minimalOptions = {
      type: 'ValidationError',
      title: 'Invalid Input',
    };

    expect(isErrorOptions(minimalOptions)).toBe(true);
  });

  it('returns false for null or undefined', () => {
    expect(isErrorOptions(null)).toBe(false);
    expect(isErrorOptions(undefined)).toBe(false);
  });

  it('returns false for non-object types', () => {
    expect(isErrorOptions('string')).toBe(false);
    expect(isErrorOptions(42)).toBe(false);
    expect(isErrorOptions(false)).toBe(false);
    expect(isErrorOptions(Symbol('test'))).toBe(false);
  });

  it('returns false for objects missing required fields', () => {
    const missingTitle = {
      type: 'ValidationError',
      detail: 'The username field is required.',
    };

    expect(isErrorOptions(missingTitle)).toBe(false);
  });

  it('returns false for invalid field types', () => {
    const invalidType = {
      type: 123, // Should be a string
      title: 'Invalid Input',
    };

    const invalidTitle = {
      type: 'ValidationError',
      title: true, // Should be a string
    };

    const invalidMeta = {
      type: 'ValidationError',
      title: 'Invalid Input',
      metadata: 'Not an object', // Should be a record
    };

    expect(isErrorOptions(invalidType)).toBe(false);
    expect(isErrorOptions(invalidTitle)).toBe(false);
    expect(isErrorOptions(invalidMeta)).toBe(false);
  });

  it('returns true when optional fields are missing or valid', () => {
    const validOptions = {
      type: 'ValidationError',
      title: 'Invalid Input',
    };

    const validWithNulls = {
      type: 'ValidationError',
      title: 'Invalid Input',
      detail: null,
      status: null,
      instance: null,
      metadata: null,
    };

    expect(isErrorOptions(validOptions)).toBe(true);
    expect(isErrorOptions(validWithNulls)).toBe(true);
  });

  it('handles edge cases gracefully', () => {
    expect(isErrorOptions([])).toBe(false);
    expect(isErrorOptions(new Map())).toBe(false);
    expect(isErrorOptions(new Set())).toBe(false);
    expect(isErrorOptions(Object.create(null))).toBe(false);
  });
});
