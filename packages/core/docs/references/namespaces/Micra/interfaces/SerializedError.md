[**@micra/core**](../../../README.md)

***

[@micra/core](../../../README.md) / [Micra](../README.md) / SerializedError

# Interface: SerializedError

Defined in: [error/index.d.ts:129](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L129)

Represents a serialized version of an error, including stack trace and nested errors.

## Extends

- [`ErrorDetail`](ErrorDetail.md)

## Properties

### detail?

> `optional` **detail**: `string`

Defined in: [error/index.d.ts:96](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L96)

A human-readable explanation of the error.
Gives more details on why the error occurred.

#### Examples

```ts
"The provided email format is invalid."
```

```ts
"The requested user was not found in the database."
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`detail`](ErrorDetail.md#detail)

***

### errors?

> `optional` **errors**: [`SerializedError`](SerializedError.md)[]

Defined in: [error/index.d.ts:134](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L134)

Serialized representation of nested errors.

***

### instance?

> `optional` **instance**: `string`

Defined in: [error/index.d.ts:105](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L105)

A URI reference identifying the specific instance of the error.
Useful for providing a traceable reference to a failing request or resource.

#### Examples

```ts
"/users/1234" // The request affected user ID 1234
```

```ts
"/orders/5678" // The issue pertains to order ID 5678
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`instance`](ErrorDetail.md#instance)

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `any`\>

Defined in: [error/index.d.ts:123](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L123)

Additional metadata related to the error.
Can be used to store extra context, such as validation fields or debug information.

#### Examples

```ts
{ "field": "email", "reason": "invalid format" }
```

```ts
{ "attemptedValue": "username@.com", "validation": "regex" }
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`metadata`](ErrorDetail.md#metadata)

***

### stack?

> `optional` **stack**: `string`

Defined in: [error/index.d.ts:131](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L131)

Stack trace of the error, if available.

***

### status

> **status**: `number`

Defined in: [error/index.d.ts:77](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L77)

HTTP status code representing the error.
Used to indicate the nature of the failure.

#### Default

```ts
500
```

#### Examples

```ts
400 // Bad Request
```

```ts
404 // Not Found
```

```ts
500 // Internal Server Error
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`status`](ErrorDetail.md#status)

***

### title

> **title**: `string`

Defined in: [error/index.d.ts:87](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L87)

A short, human-readable title describing the error type.
Should provide a clear summary of the error.

#### Examples

```ts
"Validation Error"
```

```ts
"Resource Not Found"
```

```ts
"Internal Server Error"
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`title`](ErrorDetail.md#title)

***

### type?

> `optional` **type**: `string`

Defined in: [error/index.d.ts:114](https://github.com/micrajs/micra/blob/de3b06bdb3a3f670052250f7e0da7885aa7e590a/packages/core/error/index.d.ts#L114)

A URI reference identifying the type of error.
Can point to documentation or predefined problem types.

#### Examples

```ts
"https://example.com/errors/invalid-request"
```

```ts
"https://example.com/errors/resource-not-found"
```

#### Inherited from

[`ErrorDetail`](ErrorDetail.md).[`type`](ErrorDetail.md#type)
