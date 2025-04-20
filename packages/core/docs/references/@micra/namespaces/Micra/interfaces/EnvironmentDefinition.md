[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / EnvironmentDefinition

# Interface: EnvironmentDefinition\<Value\>

Defined in: [environment/index.d.ts:15](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L15)

Defines the schema and behavior of an individual environment variable.

## Type Parameters

### Value

`Value` = [`EnvironmentVariableData`](../type-aliases/EnvironmentVariableData.md)

The expected type of the variable after transformation.

## Properties

### default?

> `optional` **default**: `Value`

Defined in: [environment/index.d.ts:26](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L26)

The default value used when no value is explicitly set.

#### Example

```typescript
{
  default: 3000
}
```

***

### required?

> `optional` **required**: `boolean`

Defined in: [environment/index.d.ts:38](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L38)

Marks the variable as required. Will trigger validation if not set.

#### Example

```typescript
{
  required: true
}
```

***

### sensitive?

> `optional` **sensitive**: `boolean`

Defined in: [environment/index.d.ts:50](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L50)

Marks the variable as sensitive. It will be excluded from serialized outputs unless explicitly included.

#### Example

```typescript
{
  sensitive: true
}
```

***

### transform()?

> `optional` **transform**: (`input`) => `Value`

Defined in: [environment/index.d.ts:65](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L65)

Function to transform the raw input into the desired value type.

#### Parameters

##### input

`unknown`

The raw input value.

#### Returns

`Value`

The transformed value.

#### Example

```typescript
{
  transform: (input) => parseInt(String(input), 10)
}
```

***

### validate()?

> `optional` **validate**: (`value`) => `ValidationResult`\<`Value`\>

Defined in: [environment/index.d.ts:83](https://github.com/micrajs/micra/blob/d68b1ba299bb0ba5d2fa49fd403fe8866818f855/packages/core/environment/index.d.ts#L83)

Function to validate the transformed value.

#### Parameters

##### value

`unknown`

The value to validate.

#### Returns

`ValidationResult`\<`Value`\>

A validation result including the final value and any issues.

#### Example

```typescript
{
  validate: (value) => ({
    value,
    issues: value > 10 ? [{ message: 'Must be 10 or less' }] : undefined
  })
}
```
