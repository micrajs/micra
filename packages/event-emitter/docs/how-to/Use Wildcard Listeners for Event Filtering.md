# Use Wildcard Listeners for Event Filtering

## Goal

This guide will show you how to use wildcard event names to listen for multiple event types dynamically in the `@micra/event-emitter` package. Wildcard listeners simplify event handling by allowing a single listener to match multiple related events.

## Context

The `EventEmitter` class in `@micra/event-emitter` supports wildcard event names, making it easier to listen for related event patterns without explicitly registering each event type. This is particularly useful for handling dynamic event names, namespaced events, or grouped event types.

## Steps

### Step 1: Import `EventEmitter`

Before using wildcard listeners, import and instantiate an `EventEmitter`.

```ts
import {EventEmitter} from '@micra/event-emitter/EventEmitter';

const emitter = new EventEmitter();
```

### Step 2: Register a Wildcard Listener

Wildcard listeners use patterns such as `*` to match multiple event types.

#### Listening to Events with a Single-Level Wildcard

The `*` wildcard matches any event at a specific level.

```ts
emitter.addEventListener('user.*', (event) => {
  console.log(`Wildcard matched: ${event.type}`, event.detail);
});
```

In this example, the listener will match any event starting with `user.`, such as `user.created`, `user.deleted`, or `user.updated`.

#### Listening to All Events with a Catch-All Wildcard

The `*` wildcard listens for **all** events, regardless of type.

```ts
emitter.addEventListener('*', (event) => {
  console.log(`Catch-all listener received: ${event.type}`, event.detail);
});
```

This is useful for logging or debugging all emitted events.

### Step 3: Dispatch Events

When events are dispatched, wildcard listeners will automatically capture matching event types.

```ts
import {Event} from '@micra/event-emitter/Event';

emitter.dispatchEvent(new Event('user.created', {detail: {userId: 42}}));
emitter.dispatchEvent(new Event('user.deleted', {detail: {userId: 24}}));
```

The wildcard listener for `user.*` will trigger for both events, and the `**` listener will trigger for all events.

### Step 4: Remove a Wildcard Listener

Wildcard listeners can be removed the same way as regular listeners.

```ts
const unsubscribe = emitter.addEventListener('user.*', (event) => {
  console.log(`User event received: ${event.type}`);
});

unsubscribe(); // Removes the wildcard listener
```

## Verification

To verify wildcard listeners are working correctly:

- Register a listener using a wildcard pattern.
- Dispatch multiple events matching the wildcard pattern.
- Observe that the listener captures all relevant events.
- Remove the listener and confirm it no longer triggers.

This guide ensures efficient event handling by using wildcard listeners, reducing redundant event registrations and improving maintainability in event-driven applications.
