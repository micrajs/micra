# Error API

## Problem Statement

The Micra Framework currently lacks a unified, structured approach to error handling and reporting. Developers require a flexible and extensible error management system that aligns with industry standards for structured error reporting. Without a standard API, handling errors consistently across different modules becomes challenging, leading to fragmented implementations and reduced maintainability.

## Motivation

This proposal aims to introduce a robust Error API that provides:

- A **structured error format** that ensures consistency, predictability, and ease of integration across different parts of an application, making it simpler for developers to handle, log, and debug errors efficiently.
- Support for **both single and aggregated errors**, making it suitable for diverse use cases, including batch operations.
- **Extensibility**, allowing developers to create custom error types while maintaining interoperability.
- **Serialization and Deserialization** to ensure compatibility with various transports (HTTP, logging, debugging tools).
- **A consistent way to handle and propagate errors** across different parts of an application.

## Goals and Constraints

### Goals

- Provide a **standardized** interface for error management.
- Ensure **extensibility** for custom error handling.
- Support **structured serialization** for logging, debugging, and API responses.
- Facilitate **aggregated error reporting** for batch operations.
- Maintain **alignment with existing industry standards.**

### Constraints

- The API should remain **lightweight and performant**.
- Should not introduce **breaking changes** to existing error handling practices.
- Must support both **JavaScript and TypeScript users**.

## API Designs

### **Summary**

This document outlines the proposed API design for the Micra Framework's Error API. The goal is to provide a structured, extensible, and standardized error-handling mechanism that aligns with **RFC 9457** for structured field values in HTTP responses. This design ensures consistency, supports single and aggregated errors, and enhances debugging and logging capabilities.

### **Problem Statement**

As we build the Micra Framework from the ground up, establishing a standardized approach to error handling is essential. Without a well-defined error management system, inconsistencies can arise, making debugging, logging, and integration with other systems more challenging. This proposal introduces a structured error API that:

- Enforces a **structured format** for errors.
- Supports **nested error aggregation**.
- Provides **customization options** for different application needs.
- Facilitates **serialization and deserialization** for transport and logging.

Closes [#88](https://github.com/micrajs/micra/issues/88).

### **Proposed API Design**

#### **ApplicationError Interface**

The `ApplicationError` interface extends the built-in `Error` object, providing a structured error format with support for nested errors, metadata, and serialization. This serves as the primary error type in the framework, ensuring consistency across all error-handling implementations.

##### **Handling of `add()` Method**

The `add()` method is responsible for aggregating errors while ensuring a consistent structure. When adding a raw `Error` instance, it is automatically converted into an `ApplicationError` to maintain a structured format.

- If an `ApplicationError` is provided, it is added directly.
- If a standard `Error` object is passed, it is wrapped into an `ApplicationError` with a default `status` of `500` and a `title` derived from the error message.

This ensures all errors follow a standardized structure, preventing serialization issues.

##### **Choosing `add()` Over `push()` or `attach()`**

The `add()` method was selected because it explicitly conveys the **aggregation of related errors** rather than simple array manipulation. Unlike `push()`, which suggests a low-level array operation, `add()` reflects a structured approach where errors are logically grouped within an error object.

###### **Alternative: `attach()`**

If more explicit semantics were preferred, `attach()` could be an alternative:

```typescript
mainError.attach(subError1, subError2);
```

However, **`add()` was ultimately chosen** because:

- It is **widely used** in APIs for object-based accumulation.
- It maintains **intuitive readability** for developers handling grouped errors.
- It differentiates from raw array operations, reinforcing **structured error management**.

##### Interface

```typescript
export interface ApplicationError {
  detail?: string;
  instance?: string;
  metadata?: Record<string, any>;
  status: number;
  title: string;
  type?: string;
  readonly errors: ApplicationError[];
  readonly hasErrors: boolean;
  add(errors: (ApplicationError | Error)[]): void;
  add(...errors: (ApplicationError | Error)[]): void;
  clear(): void;
  toJSON(options?: ErrorSerializerOptions): SerializedError;
}
```

**Default values:**

| Property   | Default Value                 |
| ---------- | ----------------------------- |
| `status`   | `500` (Internal Server Error) |
| `errors`   | `[]` (empty array)            |
| `metadata` | `{}` (empty object)           |

#### **ErrorSerializerOptions Interface**

The `ErrorSerializerOptions` interface defines configuration options for serializing an error object. This allows developers to control the depth of nested errors and whether to include stack traces in the output.

##### Interface

```typescript
export interface ErrorSerializerOptions {
  includeStack?: boolean;
  depth?: number;
}
```

**Default values:**

| Property                | Default Value |
| ----------------------- | ------------- |
| `depth` (serialization) | `5`           |
| `includeStack`          | `false`       |

#### **ErrorDetail Interface**

The `ErrorDetail` interface represents the core structure of an error, encapsulating key information such as status codes, titles, and additional metadata. This ensures that all error responses follow a predictable schema.

##### Interface

```typescript
export interface ErrorDetail {
  status: number;
  title: string;
  detail?: string;
  instance?: string;
  type?: string;
  metadata?: Record<string, any>;
}
```

#### **SerializedError Interface**

The `SerializedError` interface extends `ErrorDetail` and includes optional fields for stack traces and nested error serialization. This makes it easier to generate structured error responses for logging and API consumption.

##### Interface

```typescript
export interface SerializedError extends ErrorDetail {
  stack?: string;
  errors?: SerializedError[];
}
```

#### **ErrorOptions Interface**

The `ErrorOptions` interface allows for partial customization of an error, enabling developers to specify only the necessary fields when constructing an `ApplicationError` instance.

##### Interface

```typescript
export interface ErrorOptions extends Partial<ErrorDetail> {
  title: string;
}
```

#### **Usage Examples**

##### **Creating Basic Errors**

A simple error instance can be created using a string message. This is useful for general-purpose errors that do not require additional metadata.

```typescript
const error = new ApplicationError('Something went wrong');

error.title; // 'Something went wrong'
error.status; // 500
```

##### **Creating Errors with Metadata**

Errors can include additional metadata, such as an HTTP status code and a detailed message, allowing for more structured error reporting.

```typescript
const error = new ApplicationError({
  title: 'Validation Error',
  status: 400,
  detail: 'Email is required',
});

error.title; // 'Validation Error'
error.status; // 400
error.detail; // 'Email is required'
```

##### **Aggregating Multiple Errors**

Errors can be grouped together into a single instance, making it easier to track and handle multiple failures within a batch process.

```typescript
const mainError = new ApplicationError({
  title: 'Batch Processing Error',
  status: 500,
});
const subError1 = new ApplicationError({title: 'Item 1 Failed', status: 400});
const subError2 = new ApplicationError({title: 'Item 2 Failed', status: 404});

mainError.add(subError1, subError2);

console.log(mainError.toJSON());
```

##### **Aggregating Non-Standardized Errors**

Errors that do not follow the structured `ApplicationError` format can still be aggregated to maintain a consistent error-handling approach.

```typescript
const mainError = new ApplicationError({
  title: 'Processing Error',
  status: 500,
});
mainError.add(new Error('Unexpected system failure'));

console.log(mainError.toJSON());
```

##### **Aggregating an Array of Errors**

Instead of adding errors one by one, multiple errors can be aggregated at once using an array.

```typescript
const mainError = new ApplicationError({
  title: 'Validation Errors',
  status: 400,
});
const errors = [
  new ApplicationError({
    title: 'Field Required',
    status: 400,
    detail: 'Username is required',
  }),
  new ApplicationError({
    title: 'Invalid Format',
    status: 400,
    detail: 'Email format is incorrect',
  }),
];

mainError.add(errors);

console.log(mainError.toJSON());
```

##### **Checking for Aggregated Errors**

To determine whether an error instance contains any aggregated errors, the `hasErrors` property can be used.

```typescript
const mainError = new ApplicationError({
  title: 'Batch Operation Error',
  status: 500,
});
console.log(mainError.hasErrors); // false

mainError.add(
  new ApplicationError({title: 'Item Processing Failed', status: 400}),
);
console.log(mainError.hasErrors); // true
```

##### **Clearing Aggregated Errors**

To reset an error instance and remove all aggregated errors, the `clear` method is used.

```typescript
const mainError = new ApplicationError({title: 'Session Errors', status: 500});
mainError.add(
  new ApplicationError({title: 'Token Expired', status: 401}),
  new ApplicationError({title: 'Invalid Session', status: 403}),
);

console.log(mainError.errors.length); // 2
mainError.clear();
console.log(mainError.errors.length); // 0
```

##### **Simple Serialization of Errors**

The `toJSON` method provides a structured JSON representation of an error instance.

```typescript
const error = new ApplicationError({
  title: 'Forbidden',
  status: 403,
  detail: 'Access denied',
});

console.log(error.toJSON());
```

##### **Serializing Errors with Stack Traces**

Serialization can include stack traces for debugging purposes, providing insights into where and why an error occurred.

```typescript
const error = new ApplicationError({title: 'Unauthorized', status: 401});
console.log(JSON.stringify(error.toJSON({includeStack: true})));
```

##### **Limiting the Depth of Serialization**

When aggregating multiple errors, limiting serialization depth ensures controlled output, preventing infinite recursion in deeply nested error structures.

```typescript
const mainError = new ApplicationError({title: 'Database Errors', status: 500});
mainError.add(
  new ApplicationError({title: 'Connection Timeout', status: 504}),
  new ApplicationError({title: 'Query Failed', status: 500}),
);

console.log(JSON.stringify(mainError.toJSON({depth: 1}), null, 2));
```

### **Design Considerations**

#### **Why This Design?**

- **Alignment with RFC 9457**: This structure ensures standardized field values and predictable responses.
- **Extensibility**: Developers can extend `ApplicationError` to create framework-specific error classes.
- **Aggregation Support**: Enables grouping multiple errors into a single error instance.
- **Serialization**: Allows structured logging, API error responses, and debugging flexibility.

## Comparison

### Specifications

#### RFC 9457: Problem Details for HTTP APIs

RFC 9457 defines a standard for structured field values in HTTP headers. This specification introduces a consistent syntax for representing structured data in headers, improving interoperability, efficiency, and reliability of HTTP messages. The key benefits of RFC 9457 include:

- **Compact and Efficient Parsing**: Defines a structured format that is both machine-readable and optimized for transport.

* **Enhanced Interoperability**: Ensures consistent interpretation of HTTP header values across different implementations.

- **Supports Complex Data**: Allows representation of lists, dictionaries, and other structured data in headers without ambiguity.

* **Improved Security**: Reduces parsing errors and ambiguities that can lead to security vulnerabilities.

A typical JSON representation of structured field values in RFC 9457 might look like this:

```json
{
  "errors": [
    {
      "status": 400,
      "title": "Invalid Request",
      "detail": "The provided request payload is missing required fields.",
      "instance": "/orders/12345",
      "type": "https://example.com/probs/invalid-request"
    }
  ]
}
```

This structured approach aligns with modern web standards and enhances error reporting mechanisms when integrated with specifications like [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807) for problem details in HTTP APIs.

### Existing Approaches in Other Frameworks

#### Express.js

Express.js relies on middleware-based error handling but does not provide a structured format for error messages. This means that different applications often implement error handling inconsistently, leading to challenges when integrating multiple services or debugging complex issues.

Since Express does not enforce a standard structure, developers may return different response formats across endpoints, making it harder for client applications to process errors uniformly. For example, one endpoint might return:

```json
{
  "error": "Invalid request"
}
```

while another might return:

```json
{
  "message": "User not found",
  "status": 404
}
```

This lack of consistency increases maintenance overhead and complicates debugging, especially in large applications. Developers often need to define custom middleware to handle errors consistently across their applications. Example:

```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
```

While this approach works, it places the burden on each developer to create and maintain a structured error-handling system, rather than relying on a framework-provided standard.

#### NestJS

NestJS provides a robust error handling mechanism through custom exception classes and exception filters. It standardizes error responses by ensuring that all thrown exceptions are structured in a consistent format. Developers can extend built-in exception classes (e.g., `BadRequestException`, `UnauthorizedException`) to create custom error types while maintaining a unified structure. Additionally, NestJS automatically formats and serializes exceptions into a response format aligned with best practices.

Example of using a built-in exception:

```typescript
import { BadRequestException } from '@nestjs/common';

throw new BadRequestException('Invalid request payload');
```

Developers can also create custom exceptions by extending `HttpException`:

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('Custom error message', HttpStatus.BAD_REQUEST);
  }
}
```

NestJS standardizes error responses to ensure consistency across applications. When an exception is thrown, the response follows a structured JSON format, which typically includes:

```json
{
  "statusCode": 400,
  "message": "Invalid request payload",
  "error": "Bad Request"
}
```

For custom exceptions, developers can modify the response structure:

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Custom error message',
        error: 'CustomError',
        additionalData: { details: 'More context on the error' },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
```

This ensures that all errors in NestJS applications follow a predictable structure, making it easier to handle them consistently in clients and logs.

#### Django (Python)

Django REST Framework (DRF) provides a structured approach to error handling by offering a set of built-in exception classes that extend `APIException`. These exceptions ensure that error responses follow a consistent JSON structure.

Django standardizes error responses using:

- **Base Exception Classes**: DRF includes exceptions such as `ValidationError`, `NotAuthenticated`, and `PermissionDenied` to enforce a structured approach.
- **Automatic Exception Formatting**: When an APIException is raised, DRF formats the response to include details like status codes and error messages.
- **Custom Exception Handling**: Developers can override the default behavior using `exception_handler` to customize response formatting while maintaining the structured format.

Example of using a built-in exception:

```python
from rest_framework.exceptions import ValidationError

raise ValidationError("Invalid input data")
```

This would produce a structured JSON response:

```json
{
  "detail": "Invalid input data"
}
```

Customizing error handling globally:

```python
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        response.data['status_code'] = response.status_code
    return response
```

This structured approach ensures that all API errors in Django applications remain predictable, making it easier for client applications to handle and log errors consistently.

## Drawbacks

- This API adds extra code and overhead, which may impact performance and increase complexity if not carefully managed.
- Additional documentation and onboarding efforts will be required for developers.
- If not carefully designed, extensibility could introduce complexity.

## References

- [RFC 7807: Problem Details for HTTP APIs (obsolete)](https://datatracker.ietf.org/doc/html/rfc7807)
- [RFC 9457: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc9457)
- [NestJS Exception Handling](https://docs.nestjs.com/exception-filters)
- [Django Exception API Guide](https://www.django-rest-framework.org/api-guide/exceptions/)

## Q&A

**Q: Will this replace all existing error handling mechanisms in Micra?**\
A: No, this API will provide a standard approach while allowing flexibility for existing error handling patterns.

**Q: Will this API be required for all modules?**\
A: While recommended, modules may still use their own error handling approaches if needed.
