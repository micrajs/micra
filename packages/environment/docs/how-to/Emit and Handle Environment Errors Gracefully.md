# How to Emit and Handle Environment Errors Gracefully

Follow these steps to listen for and respond to environment-related errors using `@micra/environment`.

---

## Step 1: Import the Environment Class

```ts
import {Environment} from '@micra/environment';
```

---

## Step 2: Create the Environment Instance

```ts
const env = new Environment();
```

---

## Step 3: Define a Variable with Invalid Rules

Example: A variable that must be between 1 and 5.

```ts
env.define('RANK', {
  transform: (v) => Number(v),
  validate: (v) => {
    const value = Number(v);
    return {
      value,
      issues: value < 1 || value > 5 ? [{message: 'Must be 1–5'}] : undefined,
    };
  },
});
```

---

## Step 4: Add an Error Event Listener

```ts
env.addEventListener('error', (event) => {
  console.error('Environment error:', event.detail.error);
});
```

---

## Step 5: Trigger an Error by Setting an Invalid Value

```ts
env.set('RANK', '10'); // Triggers the error listener and throws
```
