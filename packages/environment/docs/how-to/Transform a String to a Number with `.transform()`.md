# How to Transform a String to a Number with `.transform()`

Follow these steps to convert a string input into a number using the `.transform()` option in `@micra/environment`.

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

## Step 3: Define a Variable with a `.transform()` Function

Use the `transform` option to convert the string input:

```ts
env.define('PORT', {
  transform: (value) => parseInt(String(value), 10),
});
```

---

## Step 4: Set the Variable Using a String

```ts
env.set('PORT', '3000');
```

---

## Step 5: Get the Transformed Value

```ts
const port = env.get('PORT');
console.log(typeof port, port); // Output: "number 3000"
```
