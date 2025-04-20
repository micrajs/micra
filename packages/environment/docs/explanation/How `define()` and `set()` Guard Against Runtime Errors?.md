# How `define()` and `set()` Guard Against Runtime Errors

_Design choices around safety-by-default and defensive API design_

In most JavaScript environments, working with configuration is deceptively simple:

```ts
const port = parseInt(process.env.PORT);
```

This line assumes many things:

- That `process.env.PORT` exists
- That it’s a valid number
- That it’s defined before use

But what happens if any of those assumptions fail? The application may still run—until the wrong value breaks routing, or a `NaN` ends up in a log file, or a crash occurs mid-request.

Micra’s `define()` and `set()` methods were designed to make **those failures impossible to ignore**. Together, they provide a layered defense system that turns vague runtime risks into **structured, pre-validated logic**.

---

## The Status Quo: Implicit and Risky

Traditional environment variable access in platforms like Node.js is:

- **Global**: Variables live on `process.env`
- **Untyped**: All values are strings or undefined
- **Unvalidated**: You must manually check for existence, type, and range
- **Non-deterministic**: Order and timing of access can lead to subtle bugs

Every access is a gamble—especially when configuration is provided by CI/CD pipelines, shell scripts, or external deployment environments.

---

## Micra’s Approach: Declare First, Use Later

Micra turns this model inside out. Instead of reading values immediately, you **define expectations first**, then set values. This eliminates many classes of bugs before the application even runs.

### `define()` sets the rules

- What keys exist
- What type they should be
- Whether they are required or sensitive
- How to transform and validate them

### `set()` enforces the rules

- Ensures a variable cannot be set without being defined
- Applies transformation and validation logic immediately
- Emits errors if a value is invalid, unsafe, or unexpected

---

## Analogy: API Contracts vs. Ad Hoc Parameters

Imagine calling a function with loose arguments:

```ts
function send(email, subject, message) {
  /* ... */
}
```

Now imagine the same function with a typed contract:

```ts
send({
  to: string,
  subject: string,
  message: string,
});
```

The second version is more verbose—but safer, clearer, and future-proof.

Micra treats your environment the same way. It asks you to be explicit—because clarity in configuration prevents confusion in behavior.

---

## Diagram: The Guardrail Model

```plaintext
  ┌──────────────┐
  │ define()     │
  │ (schema)     │
  └─────┬────────┘
        ▼
  ┌──────────────┐
  │ set()        │ ← Input value
  └─────┬────────┘
        ▼
  ┌──────────────┐
  │ transform()  │ ← Clean shape
  └─────┬────────┘
        ▼
  ┌──────────────┐
  │ validate()   │ ← Enforce constraints
  └─────┬────────┘
        ▼
  ┌──────────────┐
  │ usable value │ ← Safe for runtime use
  └──────────────┘
```

Each stage acts as a filter, narrowing the path from raw input to accepted configuration.

---

## Design Principle: Safety by Default

Micra follows a **fail-fast, fail-loud** model:

- Variables must be declared before use
- Invalid input raises errors immediately
- Validation is not an afterthought—it’s built into the lifecycle
- Sensitive data is protected from accidental exposure

This means your application either starts with valid config, or it doesn’t start at all. That might seem strict, but it prevents **silent misbehavior**—the kind of errors that go undetected until users report them.

---

## Why This Matters in Practice

| Risk Scenario                  | How Micra Guards Against It                      |
| ------------------------------ | ------------------------------------------------ |
| A missing required variable    | `define()` enforces presence via schema          |
| A value of the wrong type      | `transform()` and `validate()` correct or reject |
| A mistyped or unknown key      | `set()` throws if key is not defined             |
| Inconsistent test overrides    | Forked environments inherit schema rules         |
| Sensitive value leaked in logs | Marking as `sensitive` prevents exposure         |

Each of these protections is the result of design—not convention.

---

## Summary

Micra’s `define()` and `set()` methods form a **defensive boundary** around configuration. They replace hopeful access with declarative contracts and runtime enforcement.

Together, they ensure that:

- Configuration is validated before use
- Failures are caught early and clearly
- The environment behaves as a reliable source of truth

In short, they turn configuration from a risk into a guarantee. That’s what safe-by-default looks like.
