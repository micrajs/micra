# Why Micra Doesn’t Support Deeply Nested Keys or Dot Notation on the Environment API

_Flat config as a design decision for predictability and separation of concerns_

In many configuration systems, it’s common to see environment keys written in dot notation or as deeply nested objects:

```ts
process.env['database.host'] = 'localhost';
config.database.host; // or get('database.host')
```

At first glance, this seems convenient. It mimics how configuration might appear in a JSON file and suggests structure. But beneath this illusion of clarity lies a set of trade-offs—ambiguity, tight coupling, and hidden complexity—that Micra deliberately avoids.

Micra’s Environment API is **flat by design**. It treats each environment variable as a top-level key, intentionally avoiding nested keys or dot notation. This isn’t a limitation. It’s a deliberate choice rooted in the principles of **predictability**, **modularity**, and **separation of concerns**.

---

## The Illusion of Structure

Nested keys appear to provide organization:

```ts
{
  database: {
    host: 'localhost',
    port: 5432
  }
}
```

But in the world of environment variables—often passed as strings via shell environments, Dockerfiles, or cloud UIs—there is no native support for true nesting. The structure is simulated with conventions like:

- Dots: `database.host`
- Underscores: `DATABASE_HOST`
- JSON strings: `'{"host":"localhost"}'`

These patterns rely on implicit parsing rules that vary across environments and teams. This creates a **fragile interface** between your runtime and your application code.

---

## Flat Keys as Predictable Contracts

Micra’s flat model sidesteps this ambiguity entirely. Each key is a single, explicit string:

```ts
API_URL;
PORT;
DEBUG;
DB_HOST;
DB_PORT;
```

This offers three key benefits:

### 1. **Predictability**

Flat keys map directly to runtime sources—shells, .env files, CI/CD pipelines—without needing translation or parsing. What you define is what you get.

There’s no question about whether `config['db.host']` means:

- A top-level string key `"db.host"`
- A nested object `config.db.host`
- Or a parsed structure from a JSON blob

Flat keys eliminate this ambiguity.

---

### 2. **Decoupling Configuration from Structure**

In many systems, deeply nested keys tie the configuration format directly to the internal shape of your application. This introduces tight coupling: if your app's structure changes, your environment schema may need to change too.

Micra keeps these concerns separate:

- The **environment layer** is a flat, validated store of primitive values.
- The **application layer** is free to organize and interpret them however it likes.

This aligns with the _single responsibility principle_: the Environment API exists to manage environment variables—not to act as a hierarchical configuration system.

---

### 3. **Ease of Tooling, Overrides, and Introspection**

A flat environment is easier to:

- Diff, inspect, and serialize
- Override in tests or forked instances
- Filter with `pick`/`omit`
- Compare between environments (e.g., staging vs. production)

Consider how you'd represent a diff between two configs:

```plaintext
✓ API_URL matched
✓ DB_PORT matched
✗ DB_HOST differs (localhost vs. db.internal)
```

With flat keys, diffs are obvious. With nested structures, you first have to serialize and normalize the shape before comparing.

---

## Diagram: Separation of Concerns

```plaintext
[ Environment API (Flat) ]
─────────────────────────
API_URL = "https://..."
DB_HOST = "localhost"
DEBUG = true

           │
           ▼

[ Application Logic ]
────────────────────
{
  configuration: {
    database: {
      host: env.get('DB_HOST'),
      port: env.get('DB_PORT'),
    },
    api: {
      url: env.get('API_URL'),
    }
  }
}
```

The environment layer supplies raw, typed inputs. The application is responsible for how those values are grouped, interpreted, or composed.

---

## What If You Need Structure?

If you want nested behavior, you can construct it **in your application configuration**, not in your environment schema. This makes structure an application concern, not an environmental one. Micra’s Environment API is focused on **precision and clarity**, not on dictating internal organization.

---

## Summary

Micra’s decision to avoid nested keys and dot notation is rooted in the belief that configuration should be **simple**, **explicit**, and **decoupled from application internals**.

By modeling environment variables as a flat key-value store, Micra:

- Reduces ambiguity and parsing complexity
- Encourages better separation of concerns
- Enables more portable, testable, and maintainable code

In short, flat configuration isn’t a constraint—it’s a foundation for consistency.
