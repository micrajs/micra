# How to Listen for Environment Changes Using `addEventListener`

Follow these steps to listen for variable changes using `addEventListener` in `@micra/environment`.

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

## Step 3: Add a Listener for Change Events

Use `'environment:changed'` to listen for updates:

```ts
env.addEventListener('environment:changed', () => {
  console.log('An environment variable was updated.');
});
```

---

## Step 4: Trigger a Change

Change any variable to trigger the event:

```ts
env.set('DEBUG', true); // Logs: "An environment variable was updated."
```
