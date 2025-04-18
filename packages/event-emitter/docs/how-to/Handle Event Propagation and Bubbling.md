# Handle Event Propagation and Bubbling

## Goal

This guide will show you how to control event flow across different event emitters in a hierarchy using the `@micra/event-emitter` package. Understanding event propagation and bubbling allows for more effective event handling in complex applications.

## Context

The `EventEmitter` class in `@micra/event-emitter` supports event propagation and bubbling, enabling events to travel through a hierarchy of emitters. This mechanism is particularly useful for designing modular, decoupled systems where events can be handled at different levels in the application.

## Steps

### Step 1: Import `EventEmitter`

Before handling event propagation, import and instantiate `EventEmitter` instances representing different levels in a hierarchy.

```ts
import {EventEmitter} from '@micra/event-emitter/EventEmitter';

const parentEmitter = new EventEmitter();
const childEmitter = new EventEmitter();
```

### Step 2: Establish a Hierarchical Relationship

For events to bubble, child emitters need to be linked to a parent.

```ts
parentEmitter.addChild(childEmitter);
```

### Step 3: Register Listeners at Different Levels

Listeners can be added to both parent and child emitters.

```ts
parentEmitter.addEventListener('user.updated', (event) => {
  console.log('Parent received event:', event.detail);
});

childEmitter.addEventListener('user.updated', (event) => {
  console.log('Child received event:', event.detail);
});
```

### Step 4: Dispatch Events and Observe Bubbling

When an event is dispatched from the child emitter, it propagates to the parent if bubbling is enabled.

```ts
import {Event} from '@micra/event-emitter/Event';

childEmitter.dispatchEvent(
  new Event('user.updated', {detail: {userId: 42}, bubbles: true}),
);
```

### Step 5: Stop Event Propagation

If an event should not propagate further up the hierarchy, use `stopPropagation()`.

```ts
childEmitter.addEventListener('user.updated', (event) => {
  event.stopPropagation();
  console.log('Child stopped propagation');
});
```

## Verification

To verify event propagation and bubbling:

- Dispatch an event from a child emitter and observe if it reaches the parent.
- Use `stopPropagation()` in the child listener and confirm that the parent does not receive the event.
- Ensure bubbling is enabled when necessary and disabled where required.

This guide ensures developers can effectively manage event flow within hierarchical structures, making event-driven applications more flexible and scalable.
