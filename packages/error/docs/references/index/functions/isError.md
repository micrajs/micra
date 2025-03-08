[**@micra/error**](../../README.md)

***

[@micra/error](../../README.md) / [index](../README.md) / isError

# Function: isError()

> **isError**(`maybeError`): `maybeError is Error`

Defined in: [guards/isError.ts:16](https://github.com/micrajs/micra/blob/3b7677b14fc2bb80e62464f4fbe424c9f2241a5a/packages/error/src/guards/isError.ts#L16)

Checks if the given value is a standard `Error` object.
This function ensures that the object contains the essential properties of an `Error`.

## Parameters

### maybeError

`any`

The value to be checked.

## Returns

`maybeError is Error`

True if the value is an `Error`, otherwise false.

## Example

```typescript
isError(new Error('Oops')); // true
isError({}); // false
```
