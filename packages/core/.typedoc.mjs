/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: [
    // Add submodules
    'index.d.ts',
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
