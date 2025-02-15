[**@micra/error**](../../README.md)

***

[@micra/error](../../README.md) / [index](../README.md) / normalizeError

# Function: normalizeError()

> **normalizeError**(`value`): `ApplicationError`

Defined in: [utilities/normalizeError.ts:22](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/utilities/normalizeError.ts#L22)

Converts a given value into an `ApplicationError`.
If the value is already an `ApplicationError`, it is returned as-is.
If it's a standard `Error`, it is converted into an `ApplicationError`.
Otherwise, a new `ApplicationError` is created with the provided value as metadata.

## Parameters

### value

`any`

The value to normalize into an `ApplicationError`.

## Returns

`ApplicationError`

An instance of `ApplicationError`.

## Example

```typescript
const error = normalizeError(new Error('Something went wrong')); // Converted into an ApplicationError
const customError = normalizeError('Unexpected issue'); // Wraps string into an ApplicationError
```
