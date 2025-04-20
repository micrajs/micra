[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / Event

# Interface: Event\<Type, Detail\>

Defined in: [event-emitter/index.d.ts:9](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L9)

Represents an event object with metadata, propagation controls, and a composed path.

## Type Parameters

### Type

`Type` *extends* `string` \| `number` \| `symbol` = `string`

The event type identifier (string, number, or symbol).

### Detail

`Detail` *extends* `Record`\<`any`, `any`\> = \{ \}

The structured metadata associated with the event.

## Properties

### bubbles

> `readonly` **bubbles**: `boolean`

Defined in: [event-emitter/index.d.ts:31](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L31)

Indicates whether the event bubbles up through the event chain.

***

### cancelable

> `readonly` **cancelable**: `boolean`

Defined in: [event-emitter/index.d.ts:36](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L36)

Indicates whether the event can be canceled using `preventDefault()`.

***

### currentTarget

> `readonly` **currentTarget**: [`EventEmitter`](EventEmitter.md)\<`Record`\<`string`, `any`\>\>

Defined in: [event-emitter/index.d.ts:46](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L46)

The `EventEmitter` currently processing the event.

***

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Defined in: [event-emitter/index.d.ts:41](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L41)

Indicates whether `preventDefault()` was called on the event.

***

### detail

> `readonly` **detail**: `Detail`

Defined in: [event-emitter/index.d.ts:21](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L21)

Additional data related to the event, providing context for event handlers.

***

### eventPhase

> `readonly` **eventPhase**: `number`

Defined in: [event-emitter/index.d.ts:26](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L26)

The current phase of the event (e.g., capturing, at target, or bubbling).

***

### immediatePropagationStopped

> `readonly` **immediatePropagationStopped**: `boolean`

Defined in: [event-emitter/index.d.ts:61](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L61)

Indicates whether `stopImmediatePropagation()` was called on the event.

***

### propagationStopped

> `readonly` **propagationStopped**: `boolean`

Defined in: [event-emitter/index.d.ts:66](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L66)

Indicates whether `stopPropagation()` was called, halting the event’s propagation.

***

### target

> `readonly` **target**: [`EventEmitter`](EventEmitter.md)\<`Record`\<`string`, `any`\>\>

Defined in: [event-emitter/index.d.ts:51](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L51)

The original `EventEmitter` that dispatched the event.

***

### timeStamp

> `readonly` **timeStamp**: `number`

Defined in: [event-emitter/index.d.ts:56](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L56)

The time when the event was created, in milliseconds.

***

### type

> `readonly` **type**: `Type`

Defined in: [event-emitter/index.d.ts:16](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L16)

The type of the event, indicating the specific event that occurred.

## Methods

### composedPath()

> **composedPath**(): [`EventEmitter`](EventEmitter.md)\<`Record`\<`string`, `any`\>\>[]

Defined in: [event-emitter/index.d.ts:86](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L86)

Returns an array representing the path the event follows through the event emitters.

#### Returns

[`EventEmitter`](EventEmitter.md)\<`Record`\<`string`, `any`\>\>[]

***

### preventDefault()

> **preventDefault**(): `void`

Defined in: [event-emitter/index.d.ts:81](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L81)

Cancels the event’s default action if it is cancelable.

#### Returns

`void`

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Defined in: [event-emitter/index.d.ts:76](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L76)

Stops the event from propagating and prevents other listeners on the same event from being executed.

#### Returns

`void`

***

### stopPropagation()

> **stopPropagation**(): `void`

Defined in: [event-emitter/index.d.ts:71](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L71)

Prevents the event from propagating further in the event chain.

#### Returns

`void`
