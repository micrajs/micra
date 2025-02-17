# Event Emitter API

## **Summary**

This RFC proposes the development of a robust, type-safe Event Emitter API for the Micra Framework. The goal is to provide a powerful event management system that supports event bubbling, propagation control, wildcard listeners, and bulk dispatching, ensuring flexibility and scalability across different Micra applications.

## **Problem Statement**

Managing events in JavaScript applications can often become complex and challenging, especially in large-scale applications. Existing solutions like the Node.js `EventEmitter` and the DOM `EventTarget` provide robust event handling, but they may lack modern type safety features or flexibility required for Micra’s modular architecture. This RFC addresses the need for a highly configurable, type-safe event management system that integrates seamlessly with Micra.

## **Motivation**

A dedicated Event Emitter API in the Micra Framework will:

- Offer a **type-safe event system** ensuring developers can catch errors at compile time.
- Support **event bubbling and propagation control**, similar to the DOM standard, allowing events to propagate through a defined hierarchy.
- Provide **wildcard listeners** to capture multiple related events with a single handler.
- Enable **bulk dispatching** for scenarios where multiple events need to be emitted simultaneously.
- Integrate seamlessly with Micra’s modular system, enhancing cross-module communication.

## **Goals and Constraints**

### Goals:

- Implement a **flexible and extensible** Event Emitter API.
- Ensure **type safety** using TypeScript.
- Provide features like **event bubbling, propagation control, wildcard listeners, and bulk dispatching**.
- Maintain **consistency with Micra’s modular architecture**.

### Constraints:

- Should be lightweight and performant.
- Avoid introducing unnecessary complexity.

## **Prior Art**

### JavaScript Specs and Standards

#### **DOM `EventTarget` API**

The DOM `EventTarget` API is a standard interface for handling events in web applications. It supports event listeners, event bubbling, and propagation control, making it highly flexible for hierarchical event management. However, it lacks built-in type safety and can be cumbersome when used in non-browser environments.

**Example Usage:**

```js
const target = new EventTarget();
target.addEventListener('customEvent', (e) => console.log(e.detail));
target.dispatchEvent(new CustomEvent('customEvent', {detail: 'Hello World'}));
```

This section highlights the key functionalities of the DOM `EventTarget` API, showing a baseline for Micra’s Event Emitter API design.

##### EventTarget Creation

Creating an event target is straightforward with `new EventTarget()`.

```js
const target = new EventTarget();
```

##### Adding an Event Listener

Listeners are added using `addEventListener`.

```js
target.addEventListener('customEvent', (e) => console.log(e.detail));
```

##### Dispatching Events

Events are dispatched using `dispatchEvent`. This API requires a dedicated Event class, such as `CustomEvent` in the DOM, to pair with the event target. This ensures that event data is structured and extensible, providing a clear contract for the event's properties and behavior.

```js
target.dispatchEvent(new CustomEvent('customEvent', {detail: 'Hello World'}));
```

##### Removing an Event Listener

Listeners can be removed with `removeEventListener`.

```js
target.removeEventListener('customEvent', listener);
```

These examples illustrate how the DOM API manages event creation, listening, dispatching, and removal, serving as a reference for Micra’s design.

##### Limitations

While the DOM `EventTarget` API provides robust event handling, it does not support type-safe event definitions, making it challenging to catch errors at compile time. Additionally, it lacks wildcard listeners for dynamically handling multiple related events and does not offer built-in support for bulk event dispatching. For Micra, these features are essential for a modern, modular framework, highlighting the need for a more flexible and type-safe Event Emitter API.

#### Node.js `EventEmitter`

The `EventEmitter` API in Node.js provides a simple and efficient way to handle events in server-side applications. It supports synchronous and asynchronous event handling but lacks advanced features like bubbling and propagation found in the DOM standard. It also has limited type safety.

##### Creating an EventEmitter

Creating an event emitter is done using the built-in `events` module:

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

##### Adding and Removing Listeners

Listeners are added using `on` or `addListener`, and removed using `removeListener` or `off`:

```js
emitter.on('eventName', listener);
emitter.off('eventName', listener);
```

##### Emitting Events

Events are emitted with `emit`:

```js
emitter.emit('eventName', arg1, arg2);
```

##### Limitations

Node.js `EventEmitter` does not support event bubbling, propagation control, or wildcard listeners, making it less flexible for complex event-driven architectures like those envisioned for Micra.

### Implementations in Other Frameworks

#### **AdonisJS**

AdonisJS provides an `Event` module with support for event listeners and emitters, focusing on its built-in event system for cross-module communication.

##### Adding Listeners

Listeners are registered with `on` or `once`:

```js
emitter.on('user:created', (user) => console.log(user));
```

##### Emitting Events

Events are emitted with `emit`:

```js
emitter.emit('user:created', userData);
```

##### Removing Listeners

You can remove listeners using `off`:

```js
emitter.off('user:created', listener);
```

##### Limitations

AdonisJS does not provide type safety, event bubbling, or wildcard listeners, which are essential for Micra’s needs.

#### **NestJS**

NestJS provides an `EventEmitterModule` that extends the Node.js `EventEmitter` with seamless TypeScript integration. It allows developers to create and manage events within a NestJS application.

##### Creating an Event Emitter Module

In NestJS, an `EventEmitterModule` can be registered globally using:

```ts
import {EventEmitterModule} from '@nestjs/event-emitter';
@Module({
  imports: [EventEmitterModule.forRoot()],
})
export class AppModule {}
```

##### Adding Listeners

Listeners can be defined using the `@OnEvent` decorator:

```ts
import {OnEvent} from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  @OnEvent('user.created')
  handleUserCreated(payload: any) {
    console.log(payload);
  }
}
```

##### Emitting Events

Events are emitted using the `EventEmitter2` service:

```ts
import { EventEmitter2 } from '@nestjs/event-emitter';

// first inject EventEmitter2 using standard constructor injection
constructor(private eventEmitter: EventEmitter2) {}

// Then use it in a class as follows:
this.eventEmitter.emit(
  'order.created',
  new OrderCreatedEvent({
    orderId: 1,
    payload: {},
  }),
);
```

##### Wildcard Listeners

NestJS `EventEmitterModule` can be configured to allow wildcard listeners:

```ts
EventEmitterModule.forRoot({wildcard: true});
```

This enables subscribing with wildcards:

```ts
@OnEvent('order.*')
handleOrderEvents(payload: OrderEvent) { /* handle events */ }

@OnEvent('**')
handleEverything(payload: any) { /* handle all events */ }
```

##### Limitations

NestJS `EventEmitterModule` does not support event bubbling, or propagation control, making it less suitable for Micra’s broader modular design requirements.

#### **C# EventHandler**

C# provides a strongly typed event handling mechanism centered around delegates. Events are defined within classes, with dedicated event arguments and handlers.

##### Defining Events

```cs
public class Publisher {
  public event EventHandler<EventArgs> OnPublish;
}
```

##### Subscribing to Events

```cs
publisher.OnPublish += (sender, args) => Console.WriteLine("Event received");
```

##### Raising Events

```cs
OnPublish?.Invoke(this, EventArgs.Empty);
```

##### Limitations

C#'s EventHandler mechanism focuses on delegates and lacks event bubbling, wildcard listeners, and bulk dispatching, making it less flexible compared to the needs of Micra's Event Emitter API.

#### **Bevy Event System (Rust)**

Bevy provides a strongly typed event system designed for game development, focusing on performance and bulk dispatching. Events are defined as simple structs, registered as resources, emitted through the `Events<T>` resource, and handled by systems using `EventReader`.

##### Defining Events

```rust
struct PlayerScored { player_id: u32, points: u32 }
```

##### Registering Events

```rust
App::new().add_event::<PlayerScored>();
```

##### Emitting Events

```rust
events.send(PlayerScored { player_id: 1, points: 10 });
```

##### Listening to Events

```rust
fn handle_score_events(mut reader: EventReader<PlayerScored>) { for event in reader.iter() { println!("Player {} scored {} points!", event.player_id, event.points); } }
```

##### Limitations

Bevy’s event system lacks event bubbling, wildcard listeners, and propagation control, making it less suitable for Micra’s modular, type-safe Event Emitter API needs.

## **API Designs**

### **Summary**

This API design option proposes an Event Target-inspired API for the Micra Framework. Built with TypeScript, it offers a familiar yet modern event management system, featuring type-safe event definitions, event bubbling, propagation control, wildcard listeners, and bulk dispatching.

### **Problem Statement**

This design addresses the need for a robust, type-safe event management system in Micra. By drawing inspiration from the DOM `EventTarget` API, it ensures developers have access to a well-known interface while extending it with modern TypeScript capabilities.

### **Proposed API Design**

#### **GlobToPath Type**

This type transforms a glob pattern string literal (e.g. `user.\*`) into a matchable value, enabling type-safety with wildcard references.

```ts
export type GlobToPath<Glob extends string> =
  Glob extends `${infer Head}*${infer Tail}`
    ? `${Head}${string}${GlobToPath<Tail>}`
    : Glob;
```

#### **Event Interface**

The `Event` interface represents an event object with metadata, propagation controls, and a composed path.

```ts
export interface Event<
  Type extends string | number | symbol = string,
  Detail extends Record<any, any> = {},
> {
  readonly type: Type;
  readonly detail: Detail;
  readonly eventPhase: number;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly defaultPrevented: boolean;
  readonly currentTarget: EventEmitter | null;
  readonly target: EventEmitter | null;
  readonly timeStamp: number;
  readonly immediatePropagationStopped: boolean;
  readonly propagationStopped: boolean;
  stopPropagation(): void;
  stopImmediatePropagation(): void;
  preventDefault(): void;
  composedPath(): EventEmitter[];
}
```

##### Generics:

- `Type`  defines the event type, ensuring flexibility for string, numeric, or symbol-based event identifiers.
- `Detail` specifies the event detail, allowing for structured metadata.

##### Properties:

- `type`: Represents the type of the event, indicating what kind of event occurred.
- `detail`: Contains additional data related to the event, offering context for event handlers.
- `eventPhase`: Indicates the current phase of the event (e.g., capturing, at target, or bubbling).
- `bubbles`: A boolean indicating whether the event will bubble up through the event chain.
- `cancelable`: Specifies if the event can be canceled by calling `preventDefault()`.
- `defaultPrevented`: A boolean indicating if `preventDefault()` was called on the event.
- `currentTarget`: Refers to the `EventEmitter` currently processing the event.
- `target`: Points to the original `EventEmitter` that dispatched the event.
- `timeStamp`: Records the time when the event was created.
- `immediatePropagationStopped`: A boolean showing if `stopImmediatePropagation()` was called.
- `propagationStopped`: Indicates if `stopPropagation()` was called, halting the event’s propagation.

##### Methods:

- `stopPropagation()`: Prevents the event from propagating further in the event chain.
- `stopImmediatePropagation()`: Stops the event from propagating and prevents other listeners on the same event from being executed.
- `preventDefault()`: Cancels the event’s default action if it is cancelable.
- `composedPath()`: Returns an array representing the path the event follows through the event emitters.

#### **AddEventListenerOptions Interface**

This interface defines options for event listeners, such as capture, once, and passive.

```ts
export interface AddEventListenerOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}
```

##### Properties:

- `capture`: A boolean indicating if the event listener should be invoked during the capture phase.
- `once`: A boolean specifying if the listener should be removed after being invoked once.
- `passive`: A boolean indicating that the listener will never call `preventDefault()`, improving performance by allowing the browser to optimize event handling.

#### **EventListener Type**

A type for event listener functions that handle dispatched events.

```ts
export interface EventListener<E extends Event<any, any> = Event<any, any>> {
  (event: E): void;
}
```

##### Generics:

- `E`: This generic ensures that the listener receives an event object adhering to the `Event` interface, providing type safety for the event payload and type.

#### **MatchGlobEvents Type**

A utility type that matches all events in a given event map against a glob pattern.

```ts
export type MatchGlobEvents<
  Glob extends string,
  EventMap extends Record<string, any>,
> = {
  [K in keyof EventMap]: K extends GlobToPath<Glob>
    ? Event<K, EventMap[K]>
    : never;
}[keyof EventMap];
```

#### **EventEmitter Interface**

Defines an event emitter with methods to add, remove, and dispatch events.

```ts
export interface EventEmitter<EventMap extends Record<string, any> = {}> {
  addEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
    options?: AddEventListenerOptions | boolean,
  ): () => void;
  removeEventListener<Type extends string>(
    type: Type,
    listener: EventListener<MatchGlobEvents<Type, EventMap>>,
  ): void;
  dispatchEvent<Type extends keyof EventMap>(
    event: Event<Type, EventMap[Type]>,
  ): boolean;
}
```

##### Generics:

- `EventMap`: A record that maps event types to their corresponding detail objects, providing type safety for event data.

##### Methods:

- `addEventListener`: Adds an event listener for a specific event type, with support for glob patterns and optional listener settings. Returns a function that, when called, removes the added listener for convenience.
- `removeEventListener`: Removes a previously added event listener for a specific event type.
- `dispatchEvent`: Dispatches an event to all registered listeners, returning a boolean indicating if any listener called `preventDefault()`.

#### **Usage Examples**

##### **Wildcard Listeners**

```ts
emitter.addEventListener('user.*', (event) =>
  console.log(`Wildcard event: ${event.type}`, event.detail),
);
```

This example listens to any event starting with `user.`.

##### **Catch All Listeners**

```ts
emitter.addEventListener('*', (event) =>
  console.log('Catch-all event:', event.type, event.detail),
);
```

This example listens to all dispatched events.

##### **Creating an EventEmitter**

```ts
const emitter = new EventEmitter<MyEventMap>();
```

##### **Adding Listeners**

```ts
emitter.addEventListener('my.event', (event) => console.log(event.detail));
```

##### **Removing Listeners**

```ts
const listener = (event) => console.log(event.detail);

// Using removeEventListener
emitter.removeEventListener('my.event', listener);
```

```ts
// Using the unsubscribe callback
const unsubscribe = emitter.addEventListener('my.event', listener);
unsubscribe();
```

##### **Dispatching Events**

```ts
import {Event} from '@micra/event-emitter';

emitter.dispatchEvent(new Event('test', {detail: 42}));
```

### **Design Considerations**

This design was chosen for its familiarity (DOM `EventTarget`), type safety, and extensibility. Alternatives like Node.js `EventEmitter` lack type safety, and other frameworks don’t offer the full feature set Micra requires.

### **Feedback Areas**

- Is the use of glob patterns for wildcard events intuitive?
- Are the method names clear and consistent?
- Are there potential performance bottlenecks?

## **Drawbacks**

- A custom implementation may increase bundle size, impacting performance in resource-constrained environments.
- Implementing a new Event Emitter API from scratch will require significant development effort.
- Introducing advanced features like bubbling and wildcard listeners may increase the API's complexity.
- Ensuring high performance while adding type safety could be challenging.

## **Q&A**

**Q: Why not use existing event emitters like Node.js **`EventEmitter`**?**
A: Existing solutions do not offer the level of type safety and flexibility required by Micra’s modular design. Additionally, many existing APIs are tied to Node.js environments, while Micra needs a standard solution that works consistently across all environments, including browsers, servers, and CLI tools.

## **References**

- [AdonisJS Events](https://docs.adonisjs.com/guides/digging-deeper/emitter)
- [NestJS Events](https://docs.nestjs.com/techniques/events)
- [C# EventHandler](https://learn.microsoft.com/en-us/dotnet/standard/events/)
- [Bevy Event System](https://docs.rs/bevy/latest/bevy/prelude/struct.Events.html)
- [DOM EventTarget API](https://dom.spec.whatwg.org/#eventtarget)
- [Node.js EventEmitter API](https://nodejs.org/api/events.html)
