import type {Micra} from '@micra/core';
import {APPLICATION_ERROR_IDENTIFIER} from '../constants/symbols';
import {isErrorOptions} from '../guards/isErrorOptions';
import {normalizeError} from '../utilities/normalizeError';

export class ApplicationError extends Error implements Micra.ApplicationError {
  public detail?: string | undefined;
  public instance?: string | undefined;
  public metadata?: Record<string, any> | undefined;
  public status: number;
  public title: string;
  public type?: string | undefined;
  public errors: Micra.ApplicationError[] = [];
  public [APPLICATION_ERROR_IDENTIFIER] = true;

  public get hasErrors(): boolean {
    return this.errors.length > 0;
  }

  constructor(messageOrDetails: string | Micra.ErrorOptions) {
    const options =
      typeof messageOrDetails === 'string'
        ? {status: 500, title: 'Application Error', detail: messageOrDetails}
        : Object.assign(Object.create(null), messageOrDetails);

    if (!isErrorOptions(options)) throw new ApplicationError('Invalid error options provided.');

    super(options.detail);
    this.title = options.title;
    this.detail = options.detail;
    this.instance = options.instance;
    this.metadata = options.metadata;
    this.status = options.status || 500;
    this.type = options.type;
  }

  add(maybeList?: unknown, ...rest: unknown[]): void {
    (Array.isArray(maybeList) ? maybeList : [maybeList].concat(rest)).forEach((error) =>
      this.errors.push(normalizeError(error)),
    );
  }

  clear(): void {
    this.errors = [];
  }

  toJSON({depth = 5, includeStack}: Micra.ErrorSerializerOptions = {}): Micra.SerializedError {
    return {
      title: this.title,
      detail: this.detail,
      instance: this.instance,
      metadata: this.metadata,
      status: this.status,
      type: this.type,
      stack: includeStack ? this.stack : undefined,
      errors:
        depth > 0 ? this.errors.map((error) => error.toJSON({includeStack, depth: depth - 1})) : [],
    };
  }
}
