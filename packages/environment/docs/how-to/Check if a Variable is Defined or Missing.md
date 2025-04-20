# How to Check if a Variable is Defined or Missing

Follow these steps to check whether an environment variable is defined or missing using `@micra/environment`.

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

## Step 3: Set a Variable (Optional)

```ts
env.set('DEBUG', true);
```

---

## Step 4: Check if the Variable is Defined

Use `.has()` to check if the variable exists:

```ts
const isDefined = env.has('DEBUG');
console.log(isDefined); // true
```

---

## Step 5: Check if the Variable is Missing

Use `.missing()` to check if the variable is not set:

```ts
const isMissing = env.missing('API_URL');
console.log(isMissing); // true
```
