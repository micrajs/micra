# Implement Centralized Error Handling in an Application

## Goal

This guide will show you how to integrate `@micra/error` into an Express.js or Fastify project for centralized error management, ensuring consistent error handling and formatting across your application.

## Context

The `@micra/error` package provides structured error handling through `ApplicationError`. Integrating it into your web framework’s middleware ensures all errors are processed uniformly.

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

### Step 2: Import `ApplicationError` and `normalizeError`

Import the necessary utilities from the package.

```ts
import {ApplicationError, normalizeError} from '@micra/error';
```

### Step 3: Create Error Handling Middleware

Implement an error-handling middleware that uses `normalizeError` to ensure all errors follow the `ApplicationError` structure.

#### Express.js Example:

```ts
app.use((err, req, res, next) => {
  const error = normalizeError(err);
  res.status(error.status).json(error.toJSON());
});
```

#### Fastify Example:

```ts
fastify.setErrorHandler((err, req, reply) => {
  const error = normalizeError(err);
  reply.status(error.status).send(error.toJSON());
});
```

### Step 4: Test Centralized Error Handling

Trigger errors in different parts of your application and verify that the middleware catches and formats them consistently.

```ts
app.get('/', (req, res) => {
  throw new ApplicationError({title: 'Test Error', status: 500});
});
```

## Verification

To verify centralized error handling:

- Trigger errors in various routes.
- Confirm that all error responses follow the `ApplicationError` format.
- Adjust middleware as needed to include logging, custom headers, or additional metadata.

This guide ensures your application has a consistent and maintainable error handling mechanism using `@micra/error`.
