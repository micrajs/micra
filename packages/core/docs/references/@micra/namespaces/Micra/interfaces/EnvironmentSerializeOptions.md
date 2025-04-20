[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / EnvironmentSerializeOptions

# Interface: EnvironmentSerializeOptions

Defined in: [environment/index.d.ts:89](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L89)

Options used when serializing the environment to an object.

## Properties

### includeSensitive?

> `optional` **includeSensitive**: `boolean`

Defined in: [environment/index.d.ts:98](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L98)

If true, includes sensitive variables in the output. Defaults to false.

#### Example

```typescript
env.toJSON({ includeSensitive: true });
```

***

### omit?

> `optional` **omit**: `string`[]

Defined in: [environment/index.d.ts:118](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L118)

List of variable names to exclude from the output.

#### Example

```typescript
env.toJSON({ omit: ['SECRET_KEY'] });
```

***

### pick?

> `optional` **pick**: `string`[]

Defined in: [environment/index.d.ts:108](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/environment/index.d.ts#L108)

List of variable names to include in the output. If omitted, all are included.

#### Example

```typescript
env.toJSON({ pick: ['API_URL', 'DEBUG'] });
```
