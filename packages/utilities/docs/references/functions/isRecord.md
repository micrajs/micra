[**@micra/utilities**](../README.md)

***

[@micra/utilities](../README.md) / isRecord

# Function: isRecord()

> **isRecord**(`maybeRecord`): `maybeRecord is Record<any, any>`

Defined in: [isRecord.ts:15](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/utilities/src/isRecord.ts#L15)

Checks if the given value is a record (plain object) and not null, undefined, or an array.

## Parameters

### maybeRecord

`any`

The value to be checked.

## Returns

`maybeRecord is Record<any, any>`

A boolean indicating whether the value is a record.

## Example

```ts
isRecord({ key: 'value' }); // true
isRecord(null); // false
isRecord([1, 2, 3]); // false
isRecord('string'); // false
```
