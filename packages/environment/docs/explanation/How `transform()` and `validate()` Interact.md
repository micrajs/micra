# How `transform()` and `validate()` Interact?

_The lifecycle of a value through transformation and validation_

When working with environment variables, you're often forced to deal with raw input—typically strings—from an external, loosely controlled source. But your application rarely wants strings. It wants booleans, numbers, structured data, or constrained values.

Micra’s Environment API introduces two distinct stages—`transform()` and `validate()`—to convert raw input into safe, meaningful values. These stages work together in a clearly defined lifecycle, giving developers full control over how environment data is interpreted, shaped, and checked.

Understanding how these two steps interact is key to writing robust configuration logic.

---

## Raw Inputs vs. Runtime Values

All environment data enters your application as untyped strings (or worse, undefined). But what you actually want is something more specific and reliable:

| Raw Value (Input) | Desired Runtime Value    |
| ----------------- | ------------------------ |
| `"false"`         | `false` (boolean)        |
| `"3000"`          | `3000` (number)          |
| `"["a","b"]"`     | `["a", "b"]` (array)     |
| `""`              | Rejected (invalid/empty) |

The job of `transform()` is to convert that raw input into a proper value. The job of `validate()` is to determine whether that value is acceptable in the context of your application.

---

## The Lifecycle: From Input to Output

Here’s a high-level view of how a value moves through Micra’s environment processing pipeline:

```
┌─────────────┐
│ Raw Input   │ ← e.g. process.env.PORT = "3000"
└─────┬───────┘
      ▼
┌─────────────┐
│ transform() │ ← e.g. parseInt("3000") => 3000
└─────┬───────┘
      ▼
┌─────────────┐
│ validate()  │ ← e.g. value must be ≥ 1024 and ≤ 65535
└─────┬───────┘
      ▼
┌───────────────┐
│ Final Output  │ ← value is accepted and stored
└───────────────┘
```

Both stages are optional, but they serve complementary roles:

- **`transform()`** is about shaping the data.
- **`validate()`** is about approving it.

---

## Analogy: Preparing for a Job Interview

Think of raw input as a resume submitted by a candidate:

- **`transform()`** is the recruiter formatting the resume, converting dates and phone numbers, and discarding junk.
- **`validate()`** is the hiring manager checking whether the candidate meets the role's requirements.

The recruiter doesn’t reject candidates—they just make the input easier to evaluate. The hiring manager is responsible for making decisions based on actual rules.

---

## Why Separate the Two?

Micra’s design separates transformation and validation for a few key reasons:

| Reason                 | Benefit                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Clarity**            | Each function has a single responsibility                             |
| **Reusability**        | You can reuse the same transform or validation logic in many places   |
| **Composability**      | Complex logic can be built from simple, testable parts                |
| **Error Transparency** | Validation failures are clearly distinguishable from transform errors |

---

## Practical Interaction

In practice, this sequence enables clean layering of logic:

- **Transform early** to ensure values are the right shape
- **Validate after** to enforce expectations and boundaries

For example:

- You transform `"true"` into `true` (a boolean)
- Then you validate that the resulting value is of type `boolean` and not undefined

This reduces the surface area for unexpected behavior and allows you to intercept invalid values before they spread through your application.

---

## Failures Are Not Equal

Micra treats transformation and validation failures differently:

- A **transformation failure** is typically a developer mistake (e.g. passing a string that can't be coerced).
- A **validation failure** is usually a user or deployment misconfiguration (e.g. a missing or invalid environment value).

By distinguishing these failures and aggregating validation errors, Micra provides better observability and debugging support.

---

## Summary

Micra’s `transform()` and `validate()` form a clear pipeline from raw input to safe application state:

- **`transform()`** gives shape
- **`validate()`** gives rules
- **Together**, they give confidence

This pattern brings the same rigor to runtime configuration that developers already expect from static types and runtime assertions. It's not about complexity—it's about **making intent explicit** and protecting your app from silent misconfiguration.

Treat your environment like an interface. `transform()` and `validate()` are how you enforce it.
