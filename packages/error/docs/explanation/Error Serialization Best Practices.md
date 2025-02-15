# Error Serialization Best Practices

## Introduction

Error serialization is a crucial aspect of error handling in the Micra Framework. It ensures that errors are consistently formatted for logging, debugging, and API responses. Proper control of error serialization helps maintain application security, improves performance, and prevents issues like infinite loops.

## Context

The `ApplicationError` class in Micra provides a `toJSON` method with options for controlling serialization, including `depth` and `includeStack`. These options help developers tailor error outputs to different environments, balancing detail and performance.

## Best Practices

### Control Depth to Prevent Infinite Loops

When errors are deeply nested, serialization without depth control can prevent infinite loops and application crashes. Setting a reasonable depth, such as 5, ensures that only the most relevant errors are serialized. For example:
```ts
const error = new ApplicationError({title: 'Nested Error', status: 500});
error.add(new ApplicationError({title: 'Sub-error', status: 400}));
console.log(JSON.stringify(error.toJSON({depth: 2}), null, 2));
```

This limits the output to two levels of nested errors, preventing infinite recursion and improving performance by keeping the serialized output concise.

### Include Stack Traces Only in Development

Stack traces are valuable for debugging but can expose sensitive information if included in production environments. To enhance security, stack traces should only be included during development. For example:

```ts
const includeStack = process.env.NODE_ENV === 'development';
console.log(JSON.stringify(error.toJSON({includeStack}), null, 2));
```

This ensures stack traces are available for debugging during development while being hidden in production to protect internal details.

### Optimize for Performance

Excessive serialization can slow down applications, particularly with complex error objects. Developers should optimize performance by using shallow depth for serialization and excluding unnecessary data in production. For example:

```ts
const error = new ApplicationError({title: 'API Error', status: 502});
console.log(JSON.stringify(error.toJSON({depth: 1}), null, 2));
```

This keeps the application fast and efficient.

### Secure Error Outputs

Ensuring that error outputs are secure is essential to prevent exposing sensitive data. Developers should sanitize error messages and metadata before serialization, particularly in public APIs. By carefully curating the data included in error outputs, Micra applications can maintain a high standard of security and reliability.

## Conclusion

Proper error serialization in Micra ensures secure, performant, and reliable error handling. By controlling depth, managing stack trace inclusion, and optimizing for environment-specific needs, developers can enhance both security and performance while avoiding common pitfalls like infinite loops.
