# Compare: Micra Environment vs `process.env`, Deno, Viper, NestJS, Adonis

_What makes this different?_

Configuration is fundamental to all software. But how systems manage configuration varies widely—especially when it comes to **environment variables**, which serve as the foundation for injecting behavior, secrets, and runtime context.

Whether you're using `process.env` in Node.js, the `Deno.env` API, or more structured tools like Viper (Go), NestJS's ConfigModule, or AdonisJS's Env provider, you're ultimately solving the same core problem:

> “How do I get configuration into my application in a way that’s correct, safe, and predictable?”

Micra’s Environment API offers a unique approach to this question—rooted not in convenience, but in **first-principles design**. It’s not a wrapper or extension around `process.env`, but a rethinking of what configuration should look like in modern JavaScript environments.

---

## A Mental Model of the Landscape

| System        | Source Model     | Type Safety | Validation | Reactivity | Platform Neutrality  | Structured Errors |
| ------------- | ---------------- | ----------- | ---------- | ---------- | -------------------- | ----------------- |
| `process.env` | Flat string map  | No          | No         | No         | Node-only            | No                |
| `Deno.env`    | Flat string map  | No          | No         | No         | Deno-only            | No                |
| Viper (Go)    | Merged layers    | Partial     | Yes        | No         | Yes (Go)             | Partial           |
| NestJS        | Module injection | Partial     | Optional   | No         | Node/TypeScript      | Partial           |
| AdonisJS      | Framework layer  | Partial     | Optional   | No         | Node/TypeScript      | Partial           |
| **Micra**     | Schema-first API | Yes         | Yes        | **Yes**    | **Runtime-agnostic** | **Yes**           |

Micra’s approach differs in four essential ways:

---

## 1. **Schema-First, Not Access-First**

Traditional systems start with access. You retrieve a variable and then manually handle defaults, type conversions, or fallbacks:

```ts
const port = parseInt(process.env.PORT || '3000');
```

Micra flips this on its head. You **define** what’s expected first—what key exists, what type it should be, what transformation and validation rules apply—before any value is accessed.

> This shift from access-first to schema-first is what makes Micra reliable and safe at scale.

It replaces ad hoc patterns with a **declarative contract**.

---

## 2. **Cross-Platform by Design**

Many environment systems are tied to specific runtimes:

- `process.env` only works in Node.js.
- `Deno.env` only works in Deno.
- NestJS and Adonis are bound to their frameworks.

Micra treats the environment as an **injectable runtime dependency**, not a global. This allows it to work in:

- Node.js
- Deno
- Bun
- Workers
- Tests
- CLI tools
- Embedded runtimes

> Configuration should follow your app—not lock you into a platform.

---

## 3. **Built-in Reactivity**

Micra emits `environment:changed` events when values are updated. This makes it the only system in this comparison that supports **event-driven configuration** out of the box.

This enables use cases like:

- Dynamic feature toggles
- Live reconfiguration
- Scoped overrides during testing
- Hot-swapping dependencies or flags

Other systems assume config is static. Micra treats it as **observable state**.

---

## 4. **Predictable by Design**

Micra explicitly rejects common but fragile patterns like:

- Dot notation for nested config
- Lazy transformation of string inputs
- Silent fallbacks or defaults

Instead, it provides:

- Declarative `transform()` and `validate()` functions
- Aggregated validation errors (not just first failure)
- Sensible redaction of sensitive values during serialization

This prioritizes **clarity and determinism** over implicit magic.

---

## Diagram: Micra’s Layered Control Flow

```plaintext
  [ Environment Definition ]
         ┌───────────────┐
         │  Schema + Rules│
         └─────┬─────────┘
               ▼
  [ Transformation Stage ]
         ┌───────────────┐
         │  to typed value│
         └─────┬─────────┘
               ▼
    [ Validation Stage ]
         ┌───────────────┐
         │   Ensure valid │
         └─────┬─────────┘
               ▼
     [ Reactive Environment ]
         ┌───────────────┐
         │  Emits changes│
         └───────────────┘
```

No other system in the comparison covers this full lifecycle natively.

---

## Summary: Why Micra Is Different

Micra’s Environment API isn’t just about managing values—it’s about **designing safer systems through configuration**.

It stands apart because it:

- Starts with schema, not access
- Works across runtimes
- Supports event-driven workflows
- Enables validation and redaction
- Treats environment configuration as a first-class, testable, observable system

Where others offer convenience, Micra offers **control, correctness, and composability**. That’s what makes it different.
