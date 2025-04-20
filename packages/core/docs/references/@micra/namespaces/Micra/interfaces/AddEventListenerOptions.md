[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / AddEventListenerOptions

# Interface: AddEventListenerOptions

Defined in: [event-emitter/index.d.ts:92](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L92)

Defines options for event listeners, such as capture, once, and passive.

## Properties

### capture?

> `optional` **capture**: `boolean`

Defined in: [event-emitter/index.d.ts:96](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L96)

Indicates if the event listener should be invoked during the capture phase.

***

### once?

> `optional` **once**: `boolean`

Defined in: [event-emitter/index.d.ts:101](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L101)

Specifies if the listener should be removed after being invoked once.

***

### passive?

> `optional` **passive**: `boolean`

Defined in: [event-emitter/index.d.ts:106](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/event-emitter/index.d.ts#L106)

Indicates that the listener will never call `preventDefault()`, improving performance.
