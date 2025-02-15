# Prevent Infinite Loops During Serialization

## Goal

This guide will show you how to prevent infinite loops during error serialization using the `@micra/error` package by limiting the serialization depth.

## Context

The `ApplicationError` class in the `@micra/error` package provides a `toJSON` method that supports depth control. Limiting the depth ensures that deeply nested errors do not cause infinite loops during serialization.

## Steps

### Step 1: Install the `@micra/error` package

Ensure you have the `@micra/error` package installed in your project.

```bash
pnpm add @micra/error
# or
yarn add @micra/error
# or
npm install @micra/error
```

### Step 2: Import `ApplicationError`

Import the `ApplicationError` class from the package.

```ts
import {ApplicationError} from '@micra/error/ApplicationError';
```

### Step 3: Limit Serialization Depth

Use the `depth` option when calling the `toJSON` method to control how many levels of nested errors are serialized.

```ts
const error = new ApplicationError({
  title: 'Database Error',
  status: 500,
  detail: 'Failed to connect to the database',
});

const nestedError = new ApplicationError({
  title: 'Query Error',
  status: 400,
  detail: 'Invalid query syntax',
});

error.add(nestedError);

console.log(JSON.stringify(error.toJSON({depth: 1}), null, 2));
```

This example limits the serialization to a depth of 1, preventing deeper nested errors from being serialized and avoiding infinite loops.

## Verification

To verify that infinite loops are prevented:

- Run the provided code snippets.
- Adjust the `depth` value to test different levels of serialization.
- Check that the output only includes the specified depth of nested errors.

This guide ensures that error serialization remains safe and controlled, even when handling deeply nested errors.
