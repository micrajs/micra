# Add and Remove Event Listeners

## Goal

This guide will show you how to register and remove event listeners using the `@micra/event-emitter` package. Event listeners allow you to execute functions when specific events occur, making event-driven programming more modular and maintainable.

## Context

The `EventEmitter` class in `@micra/event-emitter` provides a robust system for managing events. It allows you to register event listeners, trigger events, and remove listeners when they are no longer needed. Properly managing event listeners prevents memory leaks and ensures efficient event handling.

## Steps

### Step 1: Import `EventEmitter`

Before using event listeners, you need to import and instantiate an `EventEmitter`.

```ts
import {EventEmitter} from '@micra/event-emitter/EventEmitter';

const emitter = new EventEmitter();
```

### Step 2: Register an Event Listener

To listen for an event, use `addEventListener`. This method accepts an event type and a callback function.

```ts
const onUserLogin = (event) => {
  console.log(`User logged in:`, event.detail);
};

const unsubscribe = emitter.addEventListener('user.login', onUserLogin);
```

### Step 3: Remove an Event Listener

There are two ways to remove an event listener:

#### Using `removeEventListener`

```ts
emitter.removeEventListener('user.login', onUserLogin);
```

#### Using the Unsubscribe Callback

When adding a listener, `addEventListener` returns a function that removes the listener when called.

```ts
unsubscribe();
```

## Verification

To verify that event listeners are working correctly:

- Add a listener and dispatch an event to see if the callback executes.
- Remove the listener and dispatch the event again to confirm that it no longer executes.

This guide ensures proper event listener management, helping maintain an efficient and scalable event-driven system.
