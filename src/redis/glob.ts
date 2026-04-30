export function globToRegex(pattern: string): RegExp {
  let regex = "^";
  let i = 0;
  while (i < pattern.length) {
    const ch = pattern[i]!;
    if (ch === "\\") {
      i++;
      if (i < pattern.length) {
        regex += escapeRegex(pattern[i]!);
      }
    } else if (ch === "*") {
      regex += ".*";
    } else if (ch === "?") {
      regex += ".";
    } else if (ch === "[") {
      const close = pattern.indexOf("]", i + 1);
      if (close === -1) {
        regex += "\\[";
      } else {
        let inner = pattern.slice(i + 1, close);
        if (inner.startsWith("^")) {
          inner = `^${inner.slice(1)}`;
        }
        regex += `[${inner}]`;
        i = close;
      }
    } else {
      regex += escapeRegex(ch);
    }
    i++;
  }
  regex += "$";
  return new RegExp(regex);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
