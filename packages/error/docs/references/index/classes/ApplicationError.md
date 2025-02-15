[**@micra/error**](../../README.md)

***

[@micra/error](../../README.md) / [index](../README.md) / ApplicationError

# Class: ApplicationError

Defined in: [classes/ApplicationError.ts:9](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L9)

Represents a structured error in the application. Supports metadata, nested error aggregation, and serialization.

## Extends

- `Error`

## Implements

- `ApplicationError`

## Constructors

### new ApplicationError()

> **new ApplicationError**(`messageOrDetails`): [`ApplicationError`](ApplicationError.md)

Defined in: [classes/ApplicationError.ts:43](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L43)

Creates a new instance of ApplicationError.

#### Parameters

##### messageOrDetails

The error message or error details.

`string` | `ErrorOptions`

#### Returns

[`ApplicationError`](ApplicationError.md)

A new instance of ApplicationError.

#### Example

```typescript
// With a message
throw new ApplicationError('An error occurred.');
// With details
throw new ApplicationError({
 status: 400,
 title: 'Bad Request',
 detail: 'The request was invalid.',
 metadata: {requestId: '12345'},
});
```

#### Overrides

`Error.constructor`

## Properties

### detail?

> `optional` **detail**: `string`

Defined in: [classes/ApplicationError.ts:10](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L10)

A human-readable explanation of the error.

#### Implementation of

`Micra.ApplicationError.detail`

***

### errors

> **errors**: `ApplicationError`[] = `[]`

Defined in: [classes/ApplicationError.ts:16](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L16)

A collection of nested errors related to this error.

#### Implementation of

`Micra.ApplicationError.errors`

***

### instance?

> `optional` **instance**: `string`

Defined in: [classes/ApplicationError.ts:11](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L11)

A URI reference identifying the specific instance of the error.

#### Implementation of

`Micra.ApplicationError.instance`

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `any`\>

Defined in: [classes/ApplicationError.ts:12](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L12)

Additional metadata related to the error.

#### Implementation of

`Micra.ApplicationError.metadata`

***

### status

> **status**: `number`

Defined in: [classes/ApplicationError.ts:13](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L13)

HTTP status code associated with the error.

#### Implementation of

`Micra.ApplicationError.status`

***

### title

> **title**: `string`

Defined in: [classes/ApplicationError.ts:14](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L14)

A short, human-readable title describing the error type.

#### Implementation of

`Micra.ApplicationError.title`

***

### type?

> `optional` **type**: `string`

Defined in: [classes/ApplicationError.ts:15](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L15)

A URI reference identifying the error type.

#### Implementation of

`Micra.ApplicationError.type`

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [classes/ApplicationError.ts:20](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L20)

Indicates whether there are any aggregated errors.

##### Returns

`boolean`

#### Implementation of

`Micra.ApplicationError.hasErrors`

## Methods

### add()

> **add**(`maybeList`?, ...`rest`?): `void`

Defined in: [classes/ApplicationError.ts:61](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L61)

Adds one or more errors to the error aggregation.
Converts raw `Error` instances to `ApplicationError` for consistency.

#### Parameters

##### maybeList?

`unknown`

##### rest?

...`unknown`[]

#### Returns

`void`

#### Implementation of

`Micra.ApplicationError.add`

***

### clear()

> **clear**(): `void`

Defined in: [classes/ApplicationError.ts:67](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L67)

Clears all aggregated errors.

#### Returns

`void`

#### Implementation of

`Micra.ApplicationError.clear`

***

### toJSON()

> **toJSON**(`options`): `SerializedError`

Defined in: [classes/ApplicationError.ts:71](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/error/src/classes/ApplicationError.ts#L71)

Serializes the error into a structured JSON format.

#### Parameters

##### options

`ErrorSerializerOptions` = `{}`

Options to control serialization output.

#### Returns

`SerializedError`

A structured error object.

#### Implementation of

`Micra.ApplicationError.toJSON`
