# How to Use `toJSON({ pick, omit })` to Control Config Output

Follow these steps to selectively include or exclude environment variables using the `toJSON()` method from `@micra/environment`.

---

## Step 1: Import and Create the Environment Instance

```ts
import {Environment} from '@micra/environment';

const env = new Environment(
  {
    API_URL: 'https://api.example.com',
    DEBUG: true,
    SECRET_KEY: 'my-secret',
  },
  {SECRET_KEY: {sensitive: true}},
);
```

---

## Step 2: Use `pick` to Include Specific Keys

```ts
const config = env.toJSON({pick: ['API_URL', 'DEBUG']});
console.log(config);
// { API_URL: 'https://api.example.com', DEBUG: true }
```

---

## Step 3: Use `omit` to Exclude Specific Keys

```ts
const config = env.toJSON({omit: ['SECRET_KEY']});
console.log(config);
// { API_URL: 'https://api.example.com', DEBUG: true }
```

---

## Step 4: Combine with `includeSensitive` if Needed

```ts
const config = env.toJSON({
  omit: ['DEBUG'],
  includeSensitive: true,
});
console.log(config);
// { API_URL: 'https://api.example.com', SECRET_KEY: 'my-secret' }
```
