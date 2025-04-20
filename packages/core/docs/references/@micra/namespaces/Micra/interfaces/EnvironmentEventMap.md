[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / EnvironmentEventMap

# Interface: EnvironmentEventMap

Defined in: [environment/index.d.ts:124](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L124)

Defines the events emitted by the environment.

## Properties

### environment:changed

> **environment:changed**: `void`

Defined in: [environment/index.d.ts:128](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L128)

Emitted whenever a variable is added, updated, or removed.

***

### error

> **error**: `object`

Defined in: [environment/index.d.ts:133](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L133)

Emitted when an error occurs during transformation or validation.

#### error

> **error**: [`ApplicationError`](ApplicationError.md)
