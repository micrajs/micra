// Based on https://github.com/standard-schema/standard-schema

/** The result interface of the validate function. */
export type ValidationResult<Output> =
  | ValidationSuccessResult<Output>
  | ValidationFailureResult;

/** The result interface if validation succeeds. */
export interface ValidationSuccessResult<Output> {
  /** The typed output value. */
  readonly value: Output;
  /** The non-existent issues. */
  readonly issues?: undefined;
}

/** The result interface if validation fails. */
export interface ValidationFailureResult {
  /** The issues of failed validation. */
  readonly issues: ReadonlyArray<ValidationIssue>;
}

/** The issue interface of the failure output. */
export interface ValidationIssue {
  /** The error message of the issue. */
  readonly message: string;
  /** The path of the issue, if any. */
  readonly path?: ReadonlyArray<PropertyKey> | undefined;
}
