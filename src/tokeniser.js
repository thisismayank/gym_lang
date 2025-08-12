/* =========================
 * Tokenizer (per line)
 * ========================= */
const lineTokeniser = (line) => {
  // strip comments
  const raw = line.split("#")[0].trim();
  if (!raw) return [];

  const tokens = [];
  let i = 0;

  const isDigit = (c) => c >= "0" && c <= "9"; // Check if a character is a digit
  const isIdentStart = (c) => /[A-Za-z_]/.test(c); // Check if a character can start an identifier (letters or underscore)
  const isIdent = (c) => /[A-Za-z0-9_]/.test(c); // Check if a character can be part of an identifier (letters, digits, or underscore)
  const push = (type, value) => tokens.push({ type, value }); // Push a token onto the tokens array

  while (i < raw.length) {
    const c = raw[i];

    // skip whitespace
    if (/\s/.test(c)) {
      i++;
      continue;
    }

    // string literal: "..."
    if (c === '"') {
      i++; // skip opening "
      let s = "";
      while (i < raw.length && raw[i] !== '"') {
        s += raw[i++];
      }
      if (raw[i] !== '"') throw new SyntaxError("Unterminated string");
      i++; // closing "
      push("STRING", s);
      continue;
    }

    // number: 123 or 3.14 or .5
    if (isDigit(c) || (c === "." && isDigit(raw[i + 1]))) {
      let start = i;
      if (c === ".") i++; // handle leading dot
      while (i < raw.length && isDigit(raw[i])) i++;
      if (raw[i] === "." && isDigit(raw[i + 1])) {
        i++;
        while (i < raw.length && isDigit(raw[i])) i++;
      }
      const numText = raw.slice(start, i);
      push("NUMBER", Number(numText));
      continue;
    }

    // word: command or identifier
    if (isIdentStart(c)) {
      let start = i++;
      while (i < raw.length && isIdent(raw[i])) i++;
      const word = raw.slice(start, i);
      push("WORD", word);
      continue;
    }

    throw new SyntaxError(`Unexpected character: '${c}'`);
  }

  return tokens;
  // TOKENS [
  //   { type: 'WORD', value: 'BRO' },
  //   { type: 'WORD', value: 'bench_press' },
  //   { type: 'NUMBER', value: 225 },
  //   { type: 'STRING', value: 'woo!' }
  // ]
};

module.exports = { lineTokeniser };
