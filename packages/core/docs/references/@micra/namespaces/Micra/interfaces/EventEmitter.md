[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / EventEmitter

# Interface: EventEmitter\<EventMap\>

Defined in: [event-emitter/index.d.ts:133](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L133)

Defines an event emitter with methods to add, remove, and dispatch events.

## Extended by

- [`Environment`](Environment.md)

## Type Parameters

### EventMap

`EventMap` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

A record that maps event types to their corresponding detail objects.

## Methods

### addEventListener()

> **addEventListener**\<`Type`\>(`type`, `listener`, `options?`): () => `void`

Defined in: [event-emitter/index.d.ts:138](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L138)

Adds an event listener for a specific event type, with support for glob patterns and optional listener settings.
Returns a function that removes the added listener when called.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

[`EventListener`](EventListener.md)\<[`MatchGlobEvents`](../type-aliases/MatchGlobEvents.md)\<`Type`, `EventMap`\>\>

##### options?

`boolean` | [`AddEventListenerOptions`](AddEventListenerOptions.md)

#### Returns

> (): `void`

##### Returns

`void`

***

### dispatchEvent()

> **dispatchEvent**\<`Type`\>(`event`): `boolean`

Defined in: [event-emitter/index.d.ts:155](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L155)

Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.

#### Type Parameters

##### Type

`Type` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

[`Event`](Event.md)\<`Type`, `EventMap`\[`Type`\]\>

#### Returns

`boolean`

***

### removeEventListener()

> **removeEventListener**\<`Type`\>(`type`, `listener`): `void`

Defined in: [event-emitter/index.d.ts:147](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L147)

Removes a previously added event listener for a specific event type.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

[`EventListener`](EventListener.md)\<[`MatchGlobEvents`](../type-aliases/MatchGlobEvents.md)\<`Type`, `EventMap`\>\>

#### Returns

`void`
