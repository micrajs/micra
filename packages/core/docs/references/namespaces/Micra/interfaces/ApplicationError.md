[**@micra/core**](../../../README.md)

***

[@micra/core](../../../README.md) / [Micra](../README.md) / ApplicationError

# Interface: ApplicationError

Defined in: [error/index.d.ts:5](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L5)

Represents a structured error in the application.
Supports metadata, nested error aggregation, and serialization.

## Properties

### detail?

> `optional` **detail**: `string`

Defined in: [error/index.d.ts:7](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L7)

A human-readable explanation of the error.

***

### errors

> `readonly` **errors**: [`ApplicationError`](ApplicationError.md)[]

Defined in: [error/index.d.ts:25](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L25)

A collection of nested errors related to this error.

***

### hasErrors

> `readonly` **hasErrors**: `boolean`

Defined in: [error/index.d.ts:28](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L28)

Indicates whether there are any aggregated errors.

***

### instance?

> `optional` **instance**: `string`

Defined in: [error/index.d.ts:10](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L10)

A URI reference identifying the specific instance of the error.

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `any`\>

Defined in: [error/index.d.ts:13](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L13)

Additional metadata related to the error.

***

### status

> **status**: `number`

Defined in: [error/index.d.ts:16](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L16)

HTTP status code associated with the error.

***

### title

> **title**: `string`

Defined in: [error/index.d.ts:19](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L19)

A short, human-readable title describing the error type.

***

### type?

> `optional` **type**: `string`

Defined in: [error/index.d.ts:22](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L22)

A URI reference identifying the error type.

## Methods

### add()

#### Call Signature

> **add**(`errors`): `void`

Defined in: [error/index.d.ts:36](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L36)

Adds one or more errors to the error aggregation.
Converts raw `Error` instances to `ApplicationError` for consistency.

##### Parameters

###### errors

(`Error` \| [`ApplicationError`](ApplicationError.md))[]

The errors to aggregate.

##### Returns

`void`

#### Call Signature

> **add**(...`errors`): `void`

Defined in: [error/index.d.ts:37](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L37)

##### Parameters

###### errors

...(`Error` \| [`ApplicationError`](ApplicationError.md))[]

##### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [error/index.d.ts:40](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L40)

Clears all aggregated errors.

#### Returns

`void`

***

### toJSON()

> **toJSON**(`options`?): [`SerializedError`](SerializedError.md)

Defined in: [error/index.d.ts:48](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L48)

Serializes the error into a structured JSON format.

#### Parameters

##### options?

[`ErrorSerializerOptions`](ErrorSerializerOptions.md)

Options to control serialization output.

#### Returns

[`SerializedError`](SerializedError.md)

A structured error object.
