import {describe, it, expect} from 'vitest';
import {globToRegex} from './globToRegex';

describe('globToRegex', () => {
  it('matches exact strings without wildcards', () => {
    const regex = globToRegex('hello');
    expect(regex.test('hello')).toBe(true);
    expect(regex.test('world')).toBe(false);
  });

  it('matches strings with a single * wildcard', () => {
    const regex = globToRegex('hel*o');
    expect(regex.test('hello')).toBe(true);
    expect(regex.test('helxo')).toBe(true);
    expect(regex.test('helooooo')).toBe(true);
  });

  it('matches strings with multiple * wildcards', () => {
    const regex = globToRegex('he*l*o');
    expect(regex.test('hello')).toBe(true);
    expect(regex.test('heabcxlmnopqro')).toBe(true);
    expect(regex.test('hxl')).toBe(false);
  });

  it('escapes special characters correctly', () => {
    const regex = globToRegex('file.name');
    expect(regex.test('file.name')).toBe(true);
    expect(regex.test('filexname')).toBe(false);
  });

  it('handles strings starting or ending with *', () => {
    const regex1 = globToRegex('*hello');
    expect(regex1.test('hello')).toBe(true);
    expect(regex1.test('worldhello')).toBe(true);

    const regex2 = globToRegex('hello*');
    expect(regex2.test('hello')).toBe(true);
    expect(regex2.test('helloworld')).toBe(true);
  });

  it('matches the entire string (anchors)', () => {
    const regex = globToRegex('he*l');
    expect(regex.test('heeeeel')).toBe(true);
    expect(regex.test('aaaheeeeelbbb')).toBe(false);
  });

  it('handles special cases of empty strings', () => {
    const regex = globToRegex('');
    expect(regex.test('')).toBe(true);
    expect(regex.test('anything')).toBe(false);
  });

  it('produces consistent regex patterns for the same glob', () => {
    const regex1 = globToRegex('test*');
    const regex2 = globToRegex('test*');
    expect(regex1.toString()).toEqual(regex2.toString());
  });

  it('matches strings with complex patterns', () => {
    const regex = globToRegex('a*b*c');
    expect(regex.test('abc')).toBe(true);
    expect(regex.test('axxbxxc')).toBe(true);
    expect(regex.test('aabbcc')).toBe(true);
    expect(regex.test('ac')).toBe(false);
    expect(regex.test('ab')).toBe(false);
  });

  it('cache results for the same glob', () => {
    const regex1 = globToRegex('test');

    const regex2 = globToRegex('test');

    expect(regex1).toBe(regex2);
  });
});
