[**@micra/core**](../../../README.md)

***

[@micra/core](../../../README.md) / [Micra](../README.md) / MatchGlobEvents

# Type Alias: MatchGlobEvents\<Glob, EventMap\>

> **MatchGlobEvents**\<`Glob`, `EventMap`\>: `{ [K in keyof EventMap]: K extends GlobToPath<Glob> ? Event<K, EventMap[K]> : never }`\[keyof `EventMap`\]

Defined in: [event-emitter/index.d.ts:124](https://github.com/micrajs/micra/blob/3b7677b14fc2bb80e62464f4fbe424c9f2241a5a/packages/core/event-emitter/index.d.ts#L124)

Matches all events in a given event map against a glob pattern.

## Type Parameters

• **Glob** *extends* `string`

The glob pattern string to match event types.

• **EventMap** *extends* `Record`\<`string`, `any`\>

A record mapping event types to their corresponding detail objects.
