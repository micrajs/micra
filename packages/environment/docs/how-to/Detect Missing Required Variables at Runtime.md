# How to Detect Missing Required Variables at Runtime

Follow these steps to detect missing required environment variables using `@micra/environment`.

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

## Step 3: Define a Required Variable

```ts
env.define('API_KEY', {
  required: true,
});
```

---

## Step 4: Call `validate()` to Check for Missing Variables

```ts
try {
  env.validate();
} catch (error) {
  console.error('Missing or invalid variables:', error);
}
```

---

## Step 5: (Optional) Set the Variable and Revalidate

```ts
env.set('API_KEY', 'my-secret-key');
env.validate(); // No error
```
