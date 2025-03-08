[**@micra/error**](../../README.md)

***

[@micra/error](../../README.md) / [index](../README.md) / isErrorOptions

# Function: isErrorOptions()

> **isErrorOptions**(`maybeOptions`): `maybeOptions is ErrorOptions`

Defined in: [guards/isErrorOptions.ts:16](https://github.com/micrajs/micra/blob/3b7677b14fc2bb80e62464f4fbe424c9f2241a5a/packages/error/src/guards/isErrorOptions.ts#L16)

Checks if the given value is a valid `Micra.ErrorOptions` object.
Validates that the object matches the structure expected for `Micra.ErrorOptions`.

## Parameters

### maybeOptions

`any`

The value to be checked.

## Returns

`maybeOptions is ErrorOptions`

True if the value conforms to `Micra.ErrorOptions`, otherwise false.

## Example

```typescript
isErrorOptions({ title: 'Validation Error', status: 400 }); // true
```
