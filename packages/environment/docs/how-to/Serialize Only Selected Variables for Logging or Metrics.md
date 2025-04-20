# How to Serialize Only Selected Variables for Logging or Metrics

Follow these steps to serialize a subset of environment variables using `@micra/environment`.

---

## Step 1: Import and Create the Environment Instance

```ts
import {Environment} from '@micra/environment';

const env = new Environment({
  API_URL: 'https://api.example.com',
  DEBUG: true,
  SECRET_KEY: 'my-secret',
});
```

---

## Step 2: Use `toJSON({ pick })` to Include Specific Keys

```ts
const data = env.toJSON({pick: ['API_URL', 'DEBUG']});
console.log(data);
// { API_URL: 'https://api.example.com', DEBUG: true }
```

---

## Step 3: (Optional) Use `toJSON({ omit })` to Exclude Specific Keys

```ts
const data = env.toJSON({omit: ['SECRET_KEY']});
console.log(data);
// { API_URL: 'https://api.example.com', DEBUG: true }
```
