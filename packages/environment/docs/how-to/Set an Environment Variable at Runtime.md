# How to Set an Environment Variable at Runtime

Follow these steps to set an environment variable during runtime using the `@micra/environment` package.

---

## Step 1: Import the Environment Class

Import the `Environment` class from the `@micra/environment` package:

```typescript
import {Environment} from '@micra/environment';
```

---

## Step 2: Create an Environment Instance

Instantiate your environment object. You may provide initial definitions and defaults if necessary:

```typescript
const env = new Environment({
  API_URL: 'https://default.api.com',
});
```

---

## Step 3: Set the Environment Variable at Runtime

Use the `.set()` method to assign a value to your environment variable at runtime:

```typescript
env.set('API_URL', 'https://runtime.api.com');
```

To set multiple variables simultaneously, pass an object:

```typescript
env.set({
  API_URL: 'https://runtime.api.com',
  DEBUG: true,
});
```

---

## Step 4: Retrieve and Verify the Variable

Use `.get()` to access the variable and confirm the assignment:

```typescript
const apiUrl = env.get('API_URL');
console.log(apiUrl); // Output: 'https://runtime.api.com'
```

---

## Step 5: Listen for Runtime Changes (Optional)

You can also listen to changes using event listeners provided by Micra:

```typescript
env.addEventListener('environment:changed', (event) => {
  console.log(`Environment variable changed:`, event);
});
```

Now, whenever a variable is set, this listener will trigger and log the changes.

---
