# How to Unset an Environment Variable and Trigger Change Events

Follow these steps to unset a variable using the `@micra/environment` package, ensuring change events are properly triggered.

---

## Step 1: Import the Environment Class

Import the `Environment` class from the package:

```typescript
import {Environment} from '@micra/environment';
```

---

## Step 2: Instantiate the Environment

Create an environment instance, optionally defining initial variables:

```typescript
const env = new Environment({
  API_URL: 'https://api.example.com',
  DEBUG: true,
});
```

---

## Step 3: Add a Listener for Change Events (Optional)

To react to changes, add an event listener:

```typescript
env.addEventListener('environment:changed', () => {
  console.log('Environment changed!');
});
```

---

## Step 4: Unset the Variable

Use the `.unset()` method to remove a variable, automatically triggering the change event:

```typescript
env.unset('DEBUG');
```

---

## Step 5: Verify the Variable is Unset (Optional)

Confirm the variable is unset using `.has()` or `.get()`:

```typescript
console.log(env.has('DEBUG')); // Outputs: false
console.log(env.get('DEBUG')); // Outputs: undefined
```

---
