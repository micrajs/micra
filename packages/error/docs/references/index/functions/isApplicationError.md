[**@micra/error**](../../README.md)

***

[@micra/error](../../README.md) / [index](../README.md) / isApplicationError

# Function: isApplicationError()

> **isApplicationError**(`maybeError`): `maybeError is ApplicationError`

Defined in: [guards/isApplicationError.ts:19](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/error/src/guards/isApplicationError.ts#L19)

Checks if the given value is an `Micra.ApplicationError`.
This function verifies that the object adheres to the `Micra.ApplicationError` interface.

## Parameters

### maybeError

`any`

The value to be checked.

## Returns

`maybeError is ApplicationError`

True if the value is an `Micra.ApplicationError`, otherwise false.

## Example

```typescript
const error = new ApplicationError('Something went wrong');
isApplicationError(error); // true
```
