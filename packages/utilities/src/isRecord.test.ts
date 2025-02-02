import {describe, it, expect} from 'vitest';
import {isRecord} from './isRecord';

describe('isRecord', () => {
  it('should return true for objects', () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord({key: 'value'})).toBe(true);
    expect(isRecord(new Object())).toBe(true); // Object created with constructor
  });

  it('should return false for non-objects', () => {
    expect(isRecord(null)).toBe(false);
    expect(isRecord(undefined)).toBe(false);
    expect(isRecord('string')).toBe(false);
    expect(isRecord(123)).toBe(false);
    expect(isRecord(true)).toBe(false);
    expect(isRecord([])).toBe(false);
    expect(isRecord(function () {})).toBe(false);
    expect(isRecord(Symbol())).toBe(false);
  });

  it('should return false for arrays', () => {
    expect(isRecord([])).toBe(false);
    expect(isRecord([1, 2, 3])).toBe(false);
    expect(isRecord(new Array())).toBe(false);
  });
});
