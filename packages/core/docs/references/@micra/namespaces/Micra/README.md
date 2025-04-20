[**@micra/core**](../../../README.md)

***

[@micra/core](../../../README.md) / Micra

# Micra

The `Micra` namespace contains all core abstractions, contracts, and utilities
defined by the Micra framework. This namespace serves as the central reference
for implementing framework-specific components and adhering to its specifications.

Framework developers and contributors should use the `Micra` namespace to
define and interact with entities like service providers, environments, kernels,
and other foundational abstractions.

## Example

```typescript
class CustomServiceProvider implements Micra.ServiceProvider {
  register() {
    console.log('Registering services...');
  }
  boot() {
    console.log('Booting services...');
  }
}
```

## Interfaces

- [AddEventListenerOptions](interfaces/AddEventListenerOptions.md)
- [ApplicationError](interfaces/ApplicationError.md)
- [Environment](interfaces/Environment.md)
- [EnvironmentDefinition](interfaces/EnvironmentDefinition.md)
- [EnvironmentEventMap](interfaces/EnvironmentEventMap.md)
- [EnvironmentSerializeOptions](interfaces/EnvironmentSerializeOptions.md)
- [ErrorDetail](interfaces/ErrorDetail.md)
- [ErrorOptions](interfaces/ErrorOptions.md)
- [ErrorSerializerOptions](interfaces/ErrorSerializerOptions.md)
- [Event](interfaces/Event.md)
- [EventEmitter](interfaces/EventEmitter.md)
- [EventListener](interfaces/EventListener.md)
- [SerializedError](interfaces/SerializedError.md)

## Type Aliases

- [EnvironmentVariableData](type-aliases/EnvironmentVariableData.md)
- [MatchGlobEvents](type-aliases/MatchGlobEvents.md)
