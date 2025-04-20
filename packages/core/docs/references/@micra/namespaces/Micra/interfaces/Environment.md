[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / Environment

# Interface: Environment\<Variables\>

Defined in: [environment/index.d.ts:144](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L144)

Represents a structured, type-safe environment with schema-based definitions,
runtime validation, transformation, and serialization support.

## Extends

- [`EventEmitter`](EventEmitter.md)\<[`EnvironmentEventMap`](EnvironmentEventMap.md)\>

## Type Parameters

### Variables

`Variables` *extends* `Record`\<`string`, [`EnvironmentVariableData`](../type-aliases/EnvironmentVariableData.md)\> = `Record`\<`string`, [`EnvironmentVariableData`](../type-aliases/EnvironmentVariableData.md)\>

The shape of the variable map for this environment.

## Methods

### addEventListener()

> **addEventListener**\<`Type`\>(`type`, `listener`, `options?`): () => `void`

Defined in: [event-emitter/index.d.ts:138](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L138)

Adds an event listener for a specific event type, with support for glob patterns and optional listener settings.
Returns a function that removes the added listener when called.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

[`EventListener`](EventListener.md)\<[`MatchGlobEvents`](../type-aliases/MatchGlobEvents.md)\<`Type`, [`EnvironmentEventMap`](EnvironmentEventMap.md)\>\>

##### options?

`boolean` | [`AddEventListenerOptions`](AddEventListenerOptions.md)

#### Returns

> (): `void`

##### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`addEventListener`](EventEmitter.md#addeventlistener)

***

### define()

#### Call Signature

> **define**\<`Key`\>(`key`, `definition`): `void`

Defined in: [environment/index.d.ts:228](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L228)

Defines the schema and behavior for a single environment variable.

##### Type Parameters

###### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

##### Parameters

###### key

`Key`

The name of the variable.

###### definition

[`EnvironmentDefinition`](EnvironmentDefinition.md)\<`Variables`\[`Key`\]\>

The schema definition.

##### Returns

`void`

##### Example

```typescript
env.define('PORT', {
  default: 3000,
  transform: (v) => parseInt(String(v), 10),
  validate: (v) => ({ value: v, issues: v < 1024 ? [{ message: 'Too low' }] : undefined })
});
```

#### Call Signature

> **define**\<`Defs`\>(`key`): `void`

Defined in: [environment/index.d.ts:248](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L248)

Defines multiple variables using a map of schema definitions.

##### Type Parameters

###### Defs

`Defs` *extends* `Partial`\<\{ \[K in string \| number \| symbol\]: EnvironmentDefinition\<Variables\[K\]\> \}\>

The shape of the variable definitions.

##### Parameters

###### key

`Defs`

A map of variable names to their definitions.

##### Returns

`void`

##### Example

```typescript
env.define({
  API_URL: { required: true },
  DEBUG: { default: false }
});
```

***

### dispatchEvent()

> **dispatchEvent**\<`Type`\>(`event`): `boolean`

Defined in: [event-emitter/index.d.ts:155](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L155)

Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.

#### Type Parameters

##### Type

`Type` *extends* keyof [`EnvironmentEventMap`](EnvironmentEventMap.md)

#### Parameters

##### event

[`Event`](Event.md)\<`Type`, [`EnvironmentEventMap`](EnvironmentEventMap.md)\[`Type`\]\>

#### Returns

`boolean`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`dispatchEvent`](EventEmitter.md#dispatchevent)

***

### fork()

> **fork**(`overrides`): `Environment`\<`Variables`\>

Defined in: [environment/index.d.ts:323](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L323)

Creates a new environment that inherits from the current one and applies overrides.

#### Parameters

##### overrides

`Partial`\<`Variables`\>

Values to override in the new environment instance.

#### Returns

`Environment`\<`Variables`\>

A new forked Environment instance.

#### Example

```typescript
const testEnv = env.fork({ DEBUG: false });
```

***

### get()

#### Call Signature

> **get**\<`Key`\>(`key`): `Variables`\[`Key`\]

Defined in: [environment/index.d.ts:163](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L163)

Retrieves the value of a defined environment variable.

##### Type Parameters

###### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

##### Parameters

###### key

`Key`

The name of the variable to retrieve.

##### Returns

`Variables`\[`Key`\]

The current value of the variable, or undefined if unset.

##### Example

```typescript
env.get('PORT'); // 3000
```

#### Call Signature

> **get**\<`Key`\>(`key`, `fallback`): `Variables`\[`Key`\]

Defined in: [environment/index.d.ts:179](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L179)

Retrieves the value of a defined variable, falling back to a default if unset.

##### Type Parameters

###### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

##### Parameters

###### key

`Key`

The name of the variable to retrieve.

###### fallback

`Variables`\[`Key`\]

The fallback value if the variable is not set.

##### Returns

`Variables`\[`Key`\]

The current value or the fallback.

##### Example

```typescript
env.get('PORT', 8080); // Uses 8080 if PORT is not set
```

***

### has()

> **has**\<`Key`\>(`key`): `boolean`

Defined in: [environment/index.d.ts:194](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L194)

Checks if a variable has been explicitly set.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

#### Parameters

##### key

`Key`

The variable name to check.

#### Returns

`boolean`

True if the variable has been set.

#### Example

```typescript
env.has('DEBUG'); // true or false
```

***

### missing()

> **missing**\<`Key`\>(`key`): `boolean`

Defined in: [environment/index.d.ts:209](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L209)

Checks if a variable is missing (i.e., undefined and no default value).

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

#### Parameters

##### key

`Key`

The variable name to check.

#### Returns

`boolean`

True if the variable is missing.

#### Example

```typescript
env.missing('API_URL'); // true if not defined and no default
```

***

### removeEventListener()

> **removeEventListener**\<`Type`\>(`type`, `listener`): `void`

Defined in: [event-emitter/index.d.ts:147](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L147)

Removes a previously added event listener for a specific event type.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

[`EventListener`](EventListener.md)\<[`MatchGlobEvents`](../type-aliases/MatchGlobEvents.md)\<`Type`, [`EnvironmentEventMap`](EnvironmentEventMap.md)\>\>

#### Returns

`void`

#### Inherited from

[`EventEmitter`](EventEmitter.md).[`removeEventListener`](EventEmitter.md#removeeventlistener)

***

### set()

#### Call Signature

> **set**\<`Key`\>(`key`, `value`): `void`

Defined in: [environment/index.d.ts:269](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L269)

Sets a single environment variable to a new value.

##### Type Parameters

###### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

##### Parameters

###### key

`Key`

The name of the variable.

###### value

`Variables`\[`Key`\]

The value to assign.

##### Returns

`void`

##### Throws

If the variable is not defined or the value fails validation.

##### Example

```typescript
env.set('PORT', 8080);
```

#### Call Signature

> **set**(`partial`): `void`

Defined in: [environment/index.d.ts:286](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L286)

Sets multiple environment variables in bulk.

##### Parameters

###### partial

`Partial`\<`Variables`\>

An object mapping variable names to values.

##### Returns

`void`

##### Throws

If any value fails validation.

##### Example

```typescript
env.set({
  DEBUG: true,
  API_URL: 'https://example.com'
});
```

***

### toJSON()

> **toJSON**(`options?`): `Record`\<`string`, `unknown`\>

Defined in: [environment/index.d.ts:336](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L336)

Serializes the environment to a plain object.

#### Parameters

##### options?

[`EnvironmentSerializeOptions`](EnvironmentSerializeOptions.md)

Control what keys are included or redacted.

#### Returns

`Record`\<`string`, `unknown`\>

A map of variable names to their current values or undefined.

#### Example

```typescript
const data = env.toJSON({ omit: ['SECRET_KEY'] });
```

***

### unset()

> **unset**(`key`): `void`

Defined in: [environment/index.d.ts:298](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L298)

Removes the value of a defined environment variable.

#### Parameters

##### key

keyof `Variables`

The name of the variable to unset.

#### Returns

`void`

#### Example

```typescript
env.unset('DEBUG');
```

***

### validate()

> **validate**(): `void`

Defined in: [environment/index.d.ts:310](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L310)

Validates all defined variables against their schema.

#### Returns

`void`

#### Throws

If any variable fails validation or is required but unset.

#### Example

```typescript
env.validate(); // Throws if invalid
```
