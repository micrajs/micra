import {describe, it, expect} from 'vitest';
import {ApplicationError} from './ApplicationError';
import {isApplicationError} from '../guards/isApplicationError';

describe('ApplicationError', () => {
  it('should create an error with a message', () => {
    const error = new ApplicationError('Test error');

    expect(error.detail).toBe('Test error');
    expect(error.status).toBe(500);
    expect(error.title).toBe('Application Error');
    expect(error.hasErrors).toBe(false);
  });

  it('should create an error with error options', () => {
    const error = new ApplicationError({
      title: 'Error title',
      status: 400,
      detail: 'Error detail',
    });

    expect(error.title).toBe('Error title');
    expect(error.status).toBe(400);
    expect(error.detail).toBe('Error detail');
    expect(error.hasErrors).toBe(false);
  });

  it('should default to status 500', () => {
    const error = new ApplicationError({title: 'Test error'});

    expect(error.status).toBe(500);
  });

  it('should throw an error for invalid options', () => {
    // @ts-expect-error
    expect(() => new ApplicationError({})).toThrow('Invalid error options provided.');
  });

  it('should add single errors', () => {
    const mainError = new ApplicationError('Main error');
    const subError = new ApplicationError('Sub error');

    mainError.add(subError);

    expect(mainError.errors.length).toBe(1);
    expect(mainError.hasErrors).toBe(true);
  });

  it('should add multiple errors', () => {
    const mainError = new ApplicationError('Main error');
    const error1 = new ApplicationError('Error 1');
    const error2 = new ApplicationError('Error 2');

    mainError.add(error1, error2);

    expect(mainError.errors.length).toBe(2);
  });

  it('should add multiple errors using an array', () => {
    const mainError = new ApplicationError('Main error');
    const error1 = new ApplicationError('Error 1');
    const error2 = new ApplicationError('Error 2');

    mainError.add([error1, error2]);

    expect(mainError.errors.length).toBe(2);
  });

  it('should only add errors in the array if multiple are passed', () => {
    const mainError = new ApplicationError('Main error');
    const error1 = new ApplicationError('Error 1');
    const error2 = new ApplicationError('Error 2');
    const error3 = new ApplicationError('Error 3');

    mainError.add([error1, error2], error3);

    expect(mainError.errors.length).toBe(2);
  });

  it('should normalize regular Error instances', () => {
    const mainError = new ApplicationError('Main error');
    const regularError = new Error('Regular JS error');

    mainError.add(regularError);

    expect(mainError.errors.length).toBe(1);
    expect(isApplicationError(mainError.errors[0])).toBe(true);
    expect(mainError.errors[0].detail).toBe('Regular JS error');
  });

  it('should clear aggregated errors', () => {
    const mainError = new ApplicationError('Main error');
    mainError.add(new ApplicationError('Error 1'), new ApplicationError('Error 2'));

    mainError.clear();

    expect(mainError.errors.length).toBe(0);
    expect(mainError.hasErrors).toBe(false);
  });

  it('should serialize to JSON without stack by default', () => {
    const error = new ApplicationError('Test error');

    const json = error.toJSON();

    expect(json).toEqual({
      detail: 'Test error',
      status: 500,
      title: 'Application Error',
      errors: [],
    });
    expect(json.stack).toBeUndefined();
  });

  it('should serialize with stack when includeStack is true', () => {
    const error = new ApplicationError('Test error');
    const json = error.toJSON({includeStack: true});
    expect(json.stack).toBeDefined();
  });

  it('should serialize nested errors respecting depth', () => {
    const parentError = new ApplicationError('Parent error');
    const childError = new ApplicationError('Child error');
    const grandChildError = new ApplicationError('Grandchild error');

    childError.add(grandChildError);
    parentError.add(childError);
    const json = parentError.toJSON({depth: 1});

    expect(json.errors?.length).toBe(1);
    expect(json.errors?.[0].errors?.length).toBe(0); // Grandchild should not appear due to depth limit
  });

  it('should serialize nested errors without depth limit when depth is large', () => {
    const parentError = new ApplicationError('Parent error');
    const childError = new ApplicationError('Child error');
    const grandChildError = new ApplicationError('Grandchild error');

    childError.add(grandChildError);
    parentError.add(childError);
    const json = parentError.toJSON({depth: 3});

    expect(json.errors?.[0].errors?.[0].detail).toBe('Grandchild error');
  });

  it('should include the stack trace in the serialized output', () => {
    const error = new ApplicationError('Test error');

    const json = error.toJSON({includeStack: true});

    expect(json.stack).toBeDefined();
  });
});
