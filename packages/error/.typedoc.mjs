/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: [
    // Add submodules
    'src/index.ts',
    'src/normalizeError.ts',
    'src/isErrorOptions.ts',
    'src/isError.ts',
    'src/isApplicationError.ts',
    'src/ApplicationError.ts',
  ],
  exclude: ['**/*+(.test).tsx?'],
  excludeExternals: true,
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  out: 'docs/references',
  plugin: ['typedoc-plugin-markdown'],
  readme: 'none',
};

export default config;
