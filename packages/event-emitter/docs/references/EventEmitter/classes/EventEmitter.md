[**@micra/event-emitter**](../../README.md)

***

[@micra/event-emitter](../../README.md) / [EventEmitter](../README.md) / EventEmitter

# Class: EventEmitter\<EventMap\>

Defined in: [classes/EventEmitter.ts:15](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/event-emitter/src/classes/EventEmitter.ts#L15)

## Type Parameters

### EventMap

`EventMap` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

## Implements

- `EventEmitter`\<`EventMap`\>

## Constructors

### Constructor

> **new EventEmitter**\<`EventMap`\>(): `EventEmitter`\<`EventMap`\>

#### Returns

`EventEmitter`\<`EventMap`\>

## Methods

### addChild()

> **addChild**(`child`): `this`

Defined in: [classes/EventEmitter.ts:137](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/event-emitter/src/classes/EventEmitter.ts#L137)

Reparents a child event emitter to this event emitter. This will allow the child to bubble events up to this event emitter.

#### Parameters

##### child

Child event emitter

`EventEmitter`\<`any`\> | `EventEmitter`\<`Record`\<`string`, `any`\>\>

#### Returns

`this`

This event emitter.

***

### addEventListener()

> **addEventListener**\<`Type`\>(`type`, `listener`, `options`): () => `void`

Defined in: [classes/EventEmitter.ts:23](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/event-emitter/src/classes/EventEmitter.ts#L23)

Adds an event listener for a specific event type, with support for glob patterns and optional listener settings.
Returns a function that removes the added listener when called.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

`EventListener`\<`MatchGlobEvents`\<`Type`, `EventMap`\>\>

##### options

`boolean` | `AddEventListenerOptions`

#### Returns

> (): `void`

##### Returns

`void`

#### Implementation of

`Micra.EventEmitter.addEventListener`

***

### dispatchEvent()

> **dispatchEvent**\<`Type`\>(`event`): `boolean`

Defined in: [classes/EventEmitter.ts:64](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/event-emitter/src/classes/EventEmitter.ts#L64)

Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.

#### Type Parameters

##### Type

`Type` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

[`Event`](../../Event/classes/Event.md)\<`Type`, `EventMap`\[`Type`\]\>

#### Returns

`boolean`

#### Implementation of

`Micra.EventEmitter.dispatchEvent`

***

### removeEventListener()

> **removeEventListener**\<`Type`\>(`type`, `listener`): `void`

Defined in: [classes/EventEmitter.ts:46](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/event-emitter/src/classes/EventEmitter.ts#L46)

Removes a previously added event listener for a specific event type.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

`EventListener`\<`MatchGlobEvents`\<`Type`, `EventMap`\>\>

#### Returns

`void`

#### Implementation of

`Micra.EventEmitter.removeEventListener`
