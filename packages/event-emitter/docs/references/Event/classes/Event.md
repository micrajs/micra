[**@micra/event-emitter**](../../README.md)

***

[@micra/event-emitter](../../README.md) / [Event](../README.md) / Event

# Class: Event\<Type, Detail\>

Defined in: [classes/Event.ts:10](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L10)

## Type Parameters

### Type

`Type` *extends* `string` \| `number` \| `symbol` = `string`

### Detail

`Detail` *extends* `Record`\<`any`, `any`\> = \{ \}

## Implements

- `Event`\<`Type`, `Detail`\>

## Constructors

### Constructor

> **new Event**\<`Type`, `Detail`\>(`type`, `options`): `Event`\<`Type`, `Detail`\>

Defined in: [classes/Event.ts:46](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L46)

#### Parameters

##### type

`Type`

##### options

`EventOptions`\<`Detail`\> = `{}`

#### Returns

`Event`\<`Type`, `Detail`\>

## Properties

### bubbles

> **bubbles**: `boolean`

Defined in: [classes/Event.ts:22](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L22)

Indicates whether the event bubbles up through the event chain.

#### Implementation of

`Micra.Event.bubbles`

***

### cancelable

> **cancelable**: `boolean` = `false`

Defined in: [classes/Event.ts:23](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L23)

Indicates whether the event can be canceled using `preventDefault()`.

#### Implementation of

`Micra.Event.cancelable`

***

### defaultPrevented

> **defaultPrevented**: `boolean` = `false`

Defined in: [classes/Event.ts:24](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L24)

Indicates whether `preventDefault()` was called on the event.

#### Implementation of

`Micra.Event.defaultPrevented`

***

### detail

> **detail**: `Detail`

Defined in: [classes/Event.ts:21](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L21)

Additional data related to the event, providing context for event handlers.

#### Implementation of

`Micra.Event.detail`

***

### immediatePropagationStopped

> **immediatePropagationStopped**: `boolean` = `false`

Defined in: [classes/Event.ts:27](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L27)

Indicates whether `stopImmediatePropagation()` was called on the event.

#### Implementation of

`Micra.Event.immediatePropagationStopped`

***

### propagationStopped

> **propagationStopped**: `boolean` = `false`

Defined in: [classes/Event.ts:28](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L28)

Indicates whether `stopPropagation()` was called, halting the event’s propagation.

#### Implementation of

`Micra.Event.propagationStopped`

***

### target

> **target**: `null` \| `EventEmitter`\<`any`\> = `null`

Defined in: [classes/Event.ts:25](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L25)

The original `EventEmitter` that dispatched the event.

#### Implementation of

`Micra.Event.target`

***

### timeStamp

> **timeStamp**: `number`

Defined in: [classes/Event.ts:26](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L26)

The time when the event was created, in milliseconds.

#### Implementation of

`Micra.Event.timeStamp`

***

### type

> **type**: `Type`

Defined in: [classes/Event.ts:20](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L20)

The type of the event, indicating the specific event that occurred.

#### Implementation of

`Micra.Event.type`

***

### AT\_TARGET

> `static` **AT\_TARGET**: `number` = `2`

Defined in: [classes/Event.ts:17](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L17)

***

### BUBBLING\_PHASE

> `static` **BUBBLING\_PHASE**: `number` = `3`

Defined in: [classes/Event.ts:18](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L18)

***

### CAPTURING\_PHASE

> `static` **CAPTURING\_PHASE**: `number` = `1`

Defined in: [classes/Event.ts:16](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L16)

***

### NONE

> `static` **NONE**: `number` = `0`

Defined in: [classes/Event.ts:15](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L15)

## Accessors

### currentTarget

#### Get Signature

> **get** **currentTarget**(): `null` \| `EventEmitter`\<`any`\>

Defined in: [classes/Event.ts:38](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L38)

The `EventEmitter` currently processing the event.

##### Returns

`null` \| `EventEmitter`\<`any`\>

#### Implementation of

`Micra.Event.currentTarget`

***

### eventPhase

#### Get Signature

> **get** **eventPhase**(): `number`

Defined in: [classes/Event.ts:42](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L42)

The current phase of the event (e.g., capturing, at target, or bubbling).

##### Returns

`number`

#### Implementation of

`Micra.Event.eventPhase`

## Methods

### composedPath()

> **composedPath**(): `EventEmitter`\<`Record`\<`string`, `any`\>\>[]

Defined in: [classes/Event.ts:69](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L69)

Returns an array representing the path the event follows through the event emitters.

#### Returns

`EventEmitter`\<`Record`\<`string`, `any`\>\>[]

#### Implementation of

`Micra.Event.composedPath`

***

### preventDefault()

> **preventDefault**(): `void`

Defined in: [classes/Event.ts:63](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L63)

Cancels the event’s default action if it is cancelable.

#### Returns

`void`

#### Implementation of

`Micra.Event.preventDefault`

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Defined in: [classes/Event.ts:58](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L58)

Stops the event from propagating and prevents other listeners on the same event from being executed.

#### Returns

`void`

#### Implementation of

`Micra.Event.stopImmediatePropagation`

***

### stopPropagation()

> **stopPropagation**(): `void`

Defined in: [classes/Event.ts:54](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/event-emitter/src/classes/Event.ts#L54)

Prevents the event from propagating further in the event chain.

#### Returns

`void`

#### Implementation of

`Micra.Event.stopPropagation`
