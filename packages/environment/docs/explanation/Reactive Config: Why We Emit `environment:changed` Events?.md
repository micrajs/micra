# Reactive Config: Why We Emit `environment:changed` Events?

_A deeper dive into event-driven configuration and dynamic reloading_

In traditional configuration systems, the environment is treated as static. Values are read once—often at application startup—and then assumed to stay fixed for the rest of the process. This works for many scenarios, but it introduces two major limitations:

1. **Lack of responsiveness** to runtime changes
2. **Tight coupling** between configuration and behavior

Micra's approach is different. It treats configuration not as a snapshot but as a **reactive stream** of values. When a variable changes, it emits a corresponding `environment:changed` event. This enables systems to **react**, **adapt**, and **stay in sync**—without being restarted or reloaded.

---

## The Static Assumption Breaks Down

In real-world systems, configuration values don’t always stay the same:

- A feature flag is toggled remotely.
- A deployment changes an environment variable mid-flight.
- A test runner overrides settings on a per-suite basis.
- A user action in a CLI or admin panel modifies a setting.

Without a way to observe these changes, the only option is to reload the app—or re-fetch the config manually. This is brittle and error-prone.

---

## From Static to Reactive: A New Model

Micra emits a `environment:changed` event whenever a variable is updated. Internally, this makes the environment behave more like a **publisher**—a source of events—rather than a static key-value store.

```plaintext
                     Change Detected
                           │
                           ▼
               ┌─────────────────────┐
               │  environment:changed │
               └─────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    Reload Feature Cache         Reconnect to New Host
```

This opens up powerful use cases:

- Automatically reconfigure clients when `API_URL` changes
- Recompute derived config or refresh caches
- Log or audit configuration mutations
- Enable hot-swappable environments during development or testing

---

## Analogy: Reactivity in UI Frameworks

Consider how modern UI frameworks like React or Vue work. When a state variable changes, the UI doesn’t need to be told to re-render—it **reacts**.

Micra brings a similar philosophy to configuration:

> “If something changes, the system should know—and respond appropriately.”

Just as UIs benefit from reactive state, **applications benefit from reactive configuration**.

---

## Decoupling Producers from Consumers

One of the key advantages of emitting events is that it **decouples who changes the config from who responds to the change**.

| Role         | Responsibility                             |
| ------------ | ------------------------------------------ |
| **Producer** | Calls `env.set('X', value)`                |
| **Consumer** | Subscribes to `environment:changed` events |

The producer doesn’t need to know what depends on the variable. Consumers choose how to respond—or ignore—based on their own logic. This promotes modularity and extensibility.

---

## Use Cases That Benefit from Reactivity

- **Feature Flags**: Toggle behavior dynamically without redeploying.
- **Live Debugging**: Turn on verbose logging for one component only.
- **Multitenancy**: Change configuration on a per-tenant basis without restarting services.
- **Testing**: Inject controlled variations of config during runtime.
- **Watch Mode**: Recompile or reload modules based on environment deltas.

---

## Diagram: The Event-Driven Feedback Loop

```plaintext
       [ env.set('DEBUG', true) ]
                   │
                   ▼
    ┌────────────────────────────┐
    │ Emits environment:changed  │
    └────────────────────────────┘
                   │
         ┌─────────┴──────────┐
         ▼                    ▼
   Update logger        Refresh diagnostics
```

This makes your app _self-adjusting_ in ways that static configuration cannot support.

---

## Design Principle: Stability Without Rigidity

Reactive configuration doesn’t mean unpredictability. The goal is not to make config a moving target—but to allow systems to respond gracefully when controlled, intentional changes happen.

To that end, Micra also emits `error` events if something goes wrong during a change. This keeps the system observable and failsafe.

---

## Summary

Emitting `environment:changed` events transforms configuration from something passive into something **interactive and observable**.

It allows your application to:

- Detect and respond to change
- Decouple config consumers from producers
- Enable dynamic, context-aware behavior

In a world where software is increasingly dynamic, distributed, and user-configurable, a reactive environment model isn’t just helpful—it’s essential. Micra’s event-driven foundation ensures that your application doesn’t just read configuration—it **listens to it**.
