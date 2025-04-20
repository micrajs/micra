# How to Validate All Variables at Once with `validate()`

Follow these steps to validate all defined environment variables using the `validate()` method from `@micra/environment`.

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

## Step 3: Define Required and Validated Variables

```ts
env.define({
  API_URL: {required: true},
  MAX_RETRIES: {
    default: 3,
    transform: (value) => parseInt(String(value), 10),
    validate: (value) => ({
      value: num,
      issues:
        num < 0 || num > 10
          ? [{message: 'Must be between 0 and 10'}]
          : undefined,
    }),
  },
});
```

---

## Step 4: Set Variable Values

```ts
env.set({MAX_RETRIES: '5'});
```

---

## Step 5: Call `validate()`

```ts
env.validate(); // Throws as API_URL is required and not set
```
