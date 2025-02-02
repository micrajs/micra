const ENTRIES = [{path: 'dist/index.js', limit: '13 b'}];

const DEFAULTS = {ignore: ['@micra/*']};

export default ENTRIES.map((entry) => ({...DEFAULTS, ...entry}));
