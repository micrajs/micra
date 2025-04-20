[**@micra/environment**](../README.md)

***

[@micra/environment](../README.md) / Environment

# Class: Environment\<Variables\>

Defined in: [environment/src/classes/Environment.ts:7](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L7)

## Extends

- `EventEmitter`\<`Micra.EnvironmentEventMap`\>

## Type Parameters

### Variables

`Variables` *extends* `Record`\<`string`, `Micra.EnvironmentVariableData`\> = `Record`\<`string`, `Micra.EnvironmentVariableData`\>

## Implements

- `Environment`\<`Variables`\>

## Constructors

### Constructor

> **new Environment**\<`Variables`\>(`partial`, `definitions`, `parent?`): `Environment`\<`Variables`\>

Defined in: [environment/src/classes/Environment.ts:22](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L22)

#### Parameters

##### partial

`Partial`\<`Variables`\> = `{}`

##### definitions

`Partial`\<\{ \[key in string \| number \| symbol\]: EnvironmentDefinition\<Variables\[key\]\> \}\> = `{}`

##### parent?

`Environment`\<`Variables`\>

#### Returns

`Environment`\<`Variables`\>

#### Overrides

`EventEmitter<Micra.EnvironmentEventMap>.constructor`

## Methods

### addChild()

> **addChild**(`child`): `this`

Defined in: event-emitter/dist/classes/EventEmitter.d.ts:19

Reparents a child event emitter to this event emitter. This will allow the child to bubble events up to this event emitter.

#### Parameters

##### child

Child event emitter

`EventEmitter`\<`any`\> | `EventEmitter`\<`Record`\<`string`, `any`\>\>

#### Returns

`this`

This event emitter.

#### Inherited from

`EventEmitter.addChild`

***

### addEventListener()

> **addEventListener**\<`Type`\>(`type`, `listener`, `options?`): () => `void`

Defined in: event-emitter/dist/classes/EventEmitter.d.ts:10

Adds an event listener for a specific event type, with support for glob patterns and optional listener settings.
Returns a function that removes the added listener when called.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

`EventListener`\<`MatchGlobEvents`\<`Type`, `EnvironmentEventMap`\>\>

##### options?

`boolean` | `AddEventListenerOptions`

#### Returns

> (): `void`

##### Returns

`void`

#### Implementation of

`Micra.Environment.addEventListener`

#### Inherited from

`EventEmitter.addEventListener`

***

### define()

> **define**(`maybeKey`, `definition?`): `void`

Defined in: [environment/src/classes/Environment.ts:58](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L58)

Defines the schema and behavior for a single environment variable.

#### Parameters

##### maybeKey

keyof `Variables` | `Record`\<keyof `Variables`, `EnvironmentDefinition`\<`EnvironmentVariableData`\>\>

##### definition?

`EnvironmentDefinition`\<`EnvironmentVariableData`\>

The schema definition.

#### Returns

`void`

#### Example

```typescript
env.define('PORT', {
  default: 3000,
  transform: (v) => parseInt(String(v), 10),
  validate: (v) => ({ value: v, issues: v < 1024 ? [{ message: 'Too low' }] : undefined })
});
```

#### Implementation of

`Micra.Environment.define`

***

### dispatchEvent()

> **dispatchEvent**\<`Type`\>(`event`): `boolean`

Defined in: event-emitter/dist/classes/EventEmitter.d.ts:12

Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.

#### Type Parameters

##### Type

`Type` *extends* keyof `EnvironmentEventMap`

#### Parameters

##### event

`Event`\<`Type`, `EnvironmentEventMap`\[`Type`\]\>

#### Returns

`boolean`

#### Implementation of

`Micra.Environment.dispatchEvent`

#### Inherited from

`EventEmitter.dispatchEvent`

***

### fork()

> **fork**(`overrides`): `Environment`\<`Variables`\>

Defined in: [environment/src/classes/Environment.ts:179](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L179)

Creates a new environment that inherits from the current one and applies overrides.

#### Parameters

##### overrides

`Partial`\<`Variables`\> = `{}`

Values to override in the new environment instance.

#### Returns

`Environment`\<`Variables`\>

A new forked Environment instance.

#### Example

```typescript
const testEnv = env.fork({ DEBUG: false });
```

#### Implementation of

`Micra.Environment.fork`

***

### get()

> **get**\<`Key`\>(`key`, `fallback?`): `Variables`\[`Key`\]

Defined in: [environment/src/classes/Environment.ts:42](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L42)

Retrieves the value of a defined environment variable.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

The name of the variable.

#### Parameters

##### key

`Key`

The name of the variable to retrieve.

##### fallback?

`Variables`\[`Key`\]

#### Returns

`Variables`\[`Key`\]

The current value of the variable, or undefined if unset.

#### Example

```typescript
env.get('PORT'); // 3000
```

#### Implementation of

`Micra.Environment.get`

***

### has()

> **has**\<`Key`\>(`key`): `boolean`

Defined in: [environment/src/classes/Environment.ts:48](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L48)

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

#### Implementation of

`Micra.Environment.has`

***

### missing()

> **missing**\<`Key`\>(`key`): `boolean`

Defined in: [environment/src/classes/Environment.ts:55](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L55)

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

#### Implementation of

`Micra.Environment.missing`

***

### removeEventListener()

> **removeEventListener**\<`Type`\>(`type`, `listener`): `void`

Defined in: event-emitter/dist/classes/EventEmitter.d.ts:11

Removes a previously added event listener for a specific event type.

#### Type Parameters

##### Type

`Type` *extends* `string`

#### Parameters

##### type

`Type`

##### listener

`EventListener`\<`MatchGlobEvents`\<`Type`, `EnvironmentEventMap`\>\>

#### Returns

`void`

#### Implementation of

`Micra.Environment.removeEventListener`

#### Inherited from

`EventEmitter.removeEventListener`

***

### set()

> **set**(`maybeKey`, `value?`): `void`

Defined in: [environment/src/classes/Environment.ts:110](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L110)

Sets a single environment variable to a new value.

#### Parameters

##### maybeKey

keyof `Variables` | `Partial`\<`Variables`\>

##### value?

`Variables`\[keyof `Variables`\]

The value to assign.

#### Returns

`void`

#### Throws

If the variable is not defined or the value fails validation.

#### Example

```typescript
env.set('PORT', 8080);
```

#### Implementation of

`Micra.Environment.set`

***

### toJSON()

> **toJSON**(`options`): `Record`\<`string`, `unknown`\>

Defined in: [environment/src/classes/Environment.ts:183](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L183)

Serializes the environment to a plain object.

#### Parameters

##### options

`EnvironmentSerializeOptions` = `{}`

Control what keys are included or redacted.

#### Returns

`Record`\<`string`, `unknown`\>

A map of variable names to their current values or undefined.

#### Example

```typescript
const data = env.toJSON({ omit: ['SECRET_KEY'] });
```

#### Implementation of

`Micra.Environment.toJSON`

***

### unset()

> **unset**\<`Key`\>(`key`): `void`

Defined in: [environment/src/classes/Environment.ts:140](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L140)

Removes the value of a defined environment variable.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### key

`Key`

The name of the variable to unset.

#### Returns

`void`

#### Example

```typescript
env.unset('DEBUG');
```

#### Implementation of

`Micra.Environment.unset`

***

### validate()

> **validate**(): `void`

Defined in: [environment/src/classes/Environment.ts:146](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/environment/src/classes/Environment.ts#L146)

Validates all defined variables against their schema.

#### Returns

`void`

#### Throws

If any variable fails validation or is required but unset.

#### Example

```typescript
env.validate(); // Throws if invalid
```

#### Implementation of

`Micra.Environment.validate`
