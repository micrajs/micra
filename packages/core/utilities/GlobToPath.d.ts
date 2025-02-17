export type GlobToPath<Value extends string> =
  Value extends `${infer Head}*${infer Tail}`
    ? `${Head}${string}${GlobToPath<Tail>}`
    : Value;
