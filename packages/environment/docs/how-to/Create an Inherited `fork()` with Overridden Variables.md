# How to Create an Inherited `fork()` with Overridden Variables

Use the steps below to fork an environment instance and override specific variables using `@micra/environment`.

---

## Step 1: Import and Create the Base Environment

```ts
import {Environment} from '@micra/environment';

const baseEnv = new Environment({
  API_URL: 'https://api.example.com',
  DEBUG: false,
});
```

---

## Step 2: Fork the Environment with Overrides

```ts
const testEnv = baseEnv.fork({
  API_URL: 'https://test.api.com',
});
```

---

## Step 3: Access Values from the Forked Environment

```ts
console.log(testEnv.get('API_URL')); // Outputs: 'https://test.api.com'
console.log(testEnv.get('DEBUG')); // Outputs: false (inherited)
```
