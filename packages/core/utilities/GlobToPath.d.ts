/**
 * Transforms a glob pattern string into a type-safe path string.
 * This utility type allows wildcard patterns (e.g., 'user.*') to match various event types.
 *
 * @template Glob - The glob pattern string.
 */
export type GlobToPath<Glob extends string> = Glob extends `${infer Head}*${infer Tail}`
  ? `${Head}${string}${GlobToPath<Tail>}`
  : Glob;
