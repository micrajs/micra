const DEFAULTS = {ignore: ['@micra/*']};

export function sizeLimit(...submodules) {
  return submodules.map((entry) => ({...DEFAULTS, ...entry}));
}
