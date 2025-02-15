[**@micra/core**](../../../README.md)

***

[@micra/core](../../../README.md) / [Micra](../README.md) / ErrorSerializerOptions

# Interface: ErrorSerializerOptions

Defined in: [error/index.d.ts:54](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L54)

Defines options for serializing an error.

## Properties

### depth?

> `optional` **depth**: `number`

Defined in: [error/index.d.ts:59](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L59)

The maximum depth for serializing nested errors to prevent infinite recursion.

***

### includeStack?

> `optional` **includeStack**: `boolean`

Defined in: [error/index.d.ts:56](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L56)

Whether to include the stack trace in serialization output.
