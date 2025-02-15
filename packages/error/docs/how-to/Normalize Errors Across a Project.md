# Normalize Errors Across a Project

## Goal

This guide will show you how to use `normalizeError` from the `@micra/error` package to ensure consistent error handling across your project. By normalizing different error types, you can maintain a standardized structure for all errors, whether they originate as native JavaScript `Error` objects, strings, or custom objects.

## Context

The `normalizeError` function in the `@micra/error` package helps convert various error types into a single, structured `ApplicationError` format. This ensures that all errors in your project follow the same structure, simplifying error handling, logging, and debugging.

## Steps

### Step 1: Install the `@micra/error` package

Ensure you have the `@micra/error` package installed in your project.

```bash
npm install @micra/error
# or
yarn add @micra/error
# or
pnpm install @micra/error
```

### Step 2: Import `normalizeError`

Import the `normalizeError` function from the package.

```ts
import {normalizeError} from '@micra/error/normalizeError';
```

### Step 3: Normalize Different Error Types

#### Normalizing a Native Error

```ts
const nativeError = new Error('Something went wrong');
const normalized = normalizeError(nativeError);
console.log(normalized);
```

#### Normalizing a String

```ts
const stringError = 'Unexpected issue';
const normalized = normalizeError(stringError);
console.log(normalized);
```

#### Normalizing a Custom Object

```ts
const customError = {message: 'Custom error occurred', status: 500};
const normalized = normalizeError(customError);
console.log(normalized);
```

### Step 4: Verify the Normalized Error Structure

Each normalized error will have a consistent structure, including `status`, `title`, `detail`, and `metadata` fields.

```ts
console.log(normalized.toJSON());
/* Output:
{
  "status": 500,
  "title": "Internal Error",
  "detail": "Custom error occurred",
}
*/
```

## Verification

To verify that errors are normalized correctly:

- Use `console.log()` to inspect the output.
- Ensure all error types produce a structured `ApplicationError` instance.

This guide ensures that your project maintains a consistent error structure, making error management more predictable and maintainable.
