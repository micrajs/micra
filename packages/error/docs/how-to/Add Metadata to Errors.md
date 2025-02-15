# Add Metadata to Errors

## Goal

This guide will show you how to include additional metadata in `ApplicationError` instances using the `@micra/error` package. Metadata can be useful for adding request-specific data, user context, or debugging information.

## Context

The `ApplicationError` class in the `@micra/error` package supports an optional `metadata` field, allowing developers to attach any additional information relevant to the error. This can include HTTP request details, user session data, or custom debugging properties.

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

### Step 2: Import `ApplicationError`

Import the `ApplicationError` class from the package.

```ts
import {ApplicationError} from '@micra/error/ApplicationError';
```

### Step 3: Create an `ApplicationError` with Metadata

You can pass metadata as part of the error options when creating an instance.

```ts
const error = new ApplicationError({
  title: 'Validation Error',
  status: 400,
  detail: 'Invalid email address provided',
  metadata: {
    field: 'email',
    attemptedValue: 'invalid@.com',
    requestId: '12345',
  },
});
```

### Step 4: Access Metadata from the Error Instance

You can access the metadata property directly from the error instance.

```ts
console.log(error.metadata);
// Output: { field: 'email', attemptedValue: 'invalid@.com', requestId: '12345' }
```

### Step 5: Include Metadata in Serialized Output

When calling `toJSON()`, the metadata is automatically included in the serialized output.

```ts
console.log(JSON.stringify(error.toJSON(), null, 2));
/* Output:
{
  "status": 400,
  "title": "Validation Error",
  "detail": "Invalid email address provided",
  "metadata": {
    "field": "email",
    "attemptedValue": "invalid@.com",
    "requestId": "12345"
  }
}
*/
```

## Verification

To verify that metadata is correctly added and serialized:

- Run the code snippets provided.
- Check that `metadata` is present and accurate in the error instance and serialized output.
