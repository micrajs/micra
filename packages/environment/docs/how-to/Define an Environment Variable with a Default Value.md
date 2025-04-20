# How to Define an Environment Variable with a Default Value

Follow these steps to define an environment variable using the `@micra/environment` package and ensure it has a default value if no explicit value is provided.

---

## Step 1: Import and Instantiate the Environment Class

Start by importing the `Environment` class and creating a new environment instance:

```typescript
import {Environment} from '@micra/environment';

const env = new Environment();
```

---

## Step 2: Define the Environment Variable

Use the `define` method to specify your environment variable and its default value:

```typescript
env.define('API_URL', {
  default: 'https://api.example.com',
});
```

---

## Step 3: Access the Defined Variable

Retrieve your defined environment variable using the `get` method:

```typescript
const apiUrl = env.get('API_URL');
console.log(apiUrl); // Outputs: 'https://api.example.com'
```

---

## Step 4: (Optional) Override the Default Value

You can explicitly set a value for the environment variable, overriding the default:

```typescript
env.set('API_URL', 'https://custom.example.com');

const customApiUrl = env.get('API_URL');
console.log(customApiUrl); // Outputs: 'https://custom.example.com'
```

---
