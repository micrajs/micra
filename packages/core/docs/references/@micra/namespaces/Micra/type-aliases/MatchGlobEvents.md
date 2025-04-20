[**@micra/core**](../../../../README.md)

***

[@micra/core](../../../../README.md) / [Micra](../README.md) / MatchGlobEvents

# Type Alias: MatchGlobEvents\<Glob, EventMap\>

> **MatchGlobEvents**\<`Glob`, `EventMap`\> = `{ [K in keyof EventMap]: K extends GlobToPath<Glob> ? Event<K, EventMap[K]> : never }`\[keyof `EventMap`\]

Defined in: [event-emitter/index.d.ts:124](https://github.com/micrajs/micra/blob/9dee9d74218aff0d087a331784c8dc5772a9fcdd/packages/core/event-emitter/index.d.ts#L124)

Matches all events in a given event map against a glob pattern.

## Type Parameters

### Glob

`Glob` *extends* `string`

The glob pattern string to match event types.

### EventMap

`EventMap` *extends* `Record`\<`string`, `any`\>

A record mapping event types to their corresponding detail objects.
