const CACHE = new Map<string, RegExp>();
const SPECIAL_CHARS = ['\\', '^', '$', '.', '|', '?', '+', '(', ')', '[', ']'];

export function globToRegex(glob: string): RegExp {
  if (CACHE.has(glob)) return CACHE.get(glob)!;

  let regexStr = '';
  for (let i = 0; i < glob.length; i++) {
    const char = glob[i];
    if (char === '*') {
      regexStr += '.*?';
    } else if (SPECIAL_CHARS.includes(char)) {
      regexStr += '\\' + char;
    } else {
      regexStr += char;
    }
  }

  const regex = new RegExp('^' + regexStr + '$');
  CACHE.set(glob, regex);
  return regex;
}
