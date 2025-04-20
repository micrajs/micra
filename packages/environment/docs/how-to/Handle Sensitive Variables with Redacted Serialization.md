# How to Handle Sensitive Variables with Redacted Serialization

Use the steps below to define sensitive variables and serialize them safely using `@micra/environment`.

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

## Step 3: Define a Sensitive Variable

Use the `sensitive` flag when defining the variable:

```ts
env.define('SECRET_KEY', {
  sensitive: true,
});
```

---

## Step 4: Set the Sensitive Value

```ts
env.set('SECRET_KEY', 'my-secret-value');
```

---

## Step 5: Serialize Without Exposing the Secret

By default, `toJSON()` omits sensitive values:

```ts
const config = env.toJSON();
console.log(config); // { SECRET_KEY: undefined }
```

---

## Step 6: (Optional) Include Sensitive Values Explicitly

Use the `includeSensitive: true` option if needed:

```ts
const fullConfig = env.toJSON({includeSensitive: true});
console.log(fullConfig); // { SECRET_KEY: 'my-secret-value' }
```
