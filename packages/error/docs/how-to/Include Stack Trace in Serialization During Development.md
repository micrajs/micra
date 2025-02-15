# Include Stack Trace in Serialization During Development

## Goal

This guide will show you how to include stack traces in error serialization during development using the `@micra/error` package. Including stack traces helps with debugging by providing detailed information about where errors occur.

## Context

The `ApplicationError` class in the `@micra/error` package provides a `toJSON` method that can include stack traces when configured. This is especially useful in development environments to diagnose and resolve issues quickly.

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

### Step 3: Enable Stack Trace in Serialization

To include stack traces during development, pass the `includeStack` option when calling the `toJSON` method and use environment checks to ensure it only applies in development:

```ts
const includeStack = process.env.NODE_ENV === 'development';
const error = new ApplicationError({
  title: 'Development Error',
  status: 500,
  detail: 'Something went wrong during development',
});

console.log(JSON.stringify(error.toJSON({includeStack}), null, 2));
```

## Verification

To verify that stack traces are included during development:

- Run the provided code snippets in your development environment.
- Check that the serialized output contains the `stack` field.

This guide ensures that stack traces are available for debugging during development while keeping production error outputs clean and secure.
