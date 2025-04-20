# How to Apply Validation Rules to Environment Inputs

Use the steps below to apply validation rules to environment variables using `@micra/environment`.

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

## Step 3: Define a Variable with a Validation Function

Use the `define()` method with a `validate` function to enforce rules:

```ts
env.define('MAX_RETRIES', {
  validate: (value) => {
    const num = Number(value);
    return {
      value: num,
      issues:
        num < 0 || num > 10
          ? [{message: 'Value must be between 0 and 10'}]
          : undefined,
    };
  },
});
```

---

## Step 4: Set a Value (Valid or Invalid)

```ts
env.set('MAX_RETRIES', 5); // Passes
env.set('MAX_RETRIES', 99); // Throws error and triggers 'error' event
```

---

## Step 5: Add an Error Listener (Optional)

```ts
env.addEventListener('error', (event) => {
  console.error('Validation error:', event.detail.error);
});
```
