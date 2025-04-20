# How Does Environment Validation Work?

_A breakdown of runtime validation, error aggregation, and safety features._

Environment validation in Micra is not an afterthought—it’s a foundational part of the design. At its core, validation ensures your application starts with the **right configuration, in the right shape, and with known safety guarantees**.

This guide will help you build a mental model of how validation works under the hood and why it matters.

---

## Configuration Without a Safety Net

In most JavaScript environments, configuration is pulled directly from the runtime environment with no checks in place:

```ts
const retries = Number(process.env.MAX_RETRIES);
```

This code looks harmless, but what happens if `MAX_RETRIES` is undefined? Or if it’s set to `"not-a-number"`? These errors will only surface **after** your application has started—and usually in ways that are hard to debug.

---

## The Role of Validation in Micra

Micra’s Environment API changes this by requiring you to **declare expectations up front** and validating inputs **before they are used**.

Think of it as a contract between your app and its environment:

- What variables should exist?
- What shape and type should they have?
- Are they allowed to be missing?
- Can we transform them into something more useful?

Micra enforces this contract through **runtime validation**.

---

## The Three Phases of Validation

### 1. **Declaration**

You declare a variable along with its expected characteristics—such as default value, required status, transformation, or validation rules.

> This is the equivalent of defining the schema of your configuration.

```txt
Variable: MAX_RETRIES
Type: number
Constraints: must be between 0 and 10
Default: 3
```

---

### 2. **Evaluation**

When a value is provided (via `set()` or at initialization), Micra applies the following logic:

1. **Transform** (e.g., turn `"5"` into `5`)
2. **Validate** (e.g., ensure `5` is between 0 and 10)
3. **Check Requirements** (e.g., is the variable marked as required?)

This process is performed **immediately**, so you get feedback before the variable is used incorrectly.

---

### 3. **Aggregation**

If any variable fails validation, Micra doesn't throw immediately. It **collects all issues** into a single structured error object.

This is known as **error aggregation**.

```txt
Validation failed:
- API_KEY is missing (required)
- MAX_RETRIES must be between 0 and 10
```

This approach prevents “fail-fast” loops where you fix one variable only to find another problem in the next run.

> Validation becomes an intentional checkpoint: a single source of truth for what’s wrong, rather than a cascade of uncaught errors.

---

## Diagram: Validation Flow

```plaintext
                ┌────────────────────┐
                │   Environment Set  │
                └────────────────────┘
                          │
                          ▼
                ┌────────────────────┐
                │   Transform Value  │  ← optional
                └────────────────────┘
                          │
                          ▼
                ┌────────────────────┐
                │   Run Validator    │  ← optional
                └────────────────────┘
                          │
                          ▼
                ┌────────────────────┐
                │  Check Required?   │
                └────────────────────┘
                          │
                          ▼
               ┌────────────────────────┐
               │  Collect Any Failures  │
               └────────────────────────┘
                          │
                          ▼
            ┌──────────────────────────────┐
            │ Throw Aggregated Error if Any│
            └──────────────────────────────┘
```

---

## Built-in Safety Features

Micra’s validation system is designed to prevent the most common configuration pitfalls:

- **Early failure**: Errors are thrown during startup, not after deployment.
- **Sensitive values are protected**: Secret variables can be marked as sensitive and excluded from error logs and telemetry.
- **Scoped overrides are safe**: When forking environments for tests or submodules, each instance inherits validation logic.

---

## Why This Design?

Micra’s validation system is built on three core goals:

| Goal               | Why It Matters                                         |
| ------------------ | ------------------------------------------------------ |
| **Predictability** | Fewer surprises from undefined or malformed values     |
| **Composability**  | Support for overrides, forks, and testing environments |
| **Transparency**   | Aggregated errors show the full picture at a glance    |

By aligning validation with runtime safety and composability, Micra ensures that your environment config behaves as a **well-defined contract**, not just a collection of strings floating in `process.env`.

---

## Summary

Environment validation in Micra is more than a convenience—it’s a **guarantee** that your app won’t run with broken, missing, or insecure configuration. By combining transformation, validation, and error aggregation, it gives developers a clear, consistent, and safe way to handle runtime configuration.

It answers the question:

> _“Can I trust my environment?”_

With Micra, the answer is: **Yes, and here’s why.**
