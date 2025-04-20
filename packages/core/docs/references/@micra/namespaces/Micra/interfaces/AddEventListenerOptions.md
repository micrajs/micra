[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / AddEventListenerOptions

# Interface: AddEventListenerOptions

Defined in: [event-emitter/index.d.ts:92](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L92)

Defines options for event listeners, such as capture, once, and passive.

## Properties

### capture?

> `optional` **capture**: `boolean`

Defined in: [event-emitter/index.d.ts:96](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L96)

Indicates if the event listener should be invoked during the capture phase.

***

### once?

> `optional` **once**: `boolean`

Defined in: [event-emitter/index.d.ts:101](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L101)

Specifies if the listener should be removed after being invoked once.

***

### passive?

> `optional` **passive**: `boolean`

Defined in: [event-emitter/index.d.ts:106](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L106)

Indicates that the listener will never call `preventDefault()`, improving performance.
