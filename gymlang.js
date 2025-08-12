#!/usr/bin/env node
/* GymLang — a tiny meme language in gym slang
 *
 * Syntax (whitespace-separated, one command per line):
 *   BRO <name> <number>       # declare variable with bro energy
 *   BULK <name> <number>      # add to variable (bulking season)
 *   SHRED <name> <number>     # subtract from variable (shredding)
 *   GAINS <name> <number>     # multiply variable (muscle gains)
 *   CARDIO <name> <number>    # divide variable (cardio kills gains)
 *   REPS <vals...>            # sum args and print
 *   CREATINE <vals...>        # multiply args and print
 *   PR <high/low> <vals...>   # find max/min of args (pump it up!)
 *   YOLO <name>               # random value (you only live once)
 *   WHEY <name> <number>      # exponentiate value (get whey!)
 *   LEGDAY <name>             # skip leg day (set to 0)
 *   HUSTLE <up/down> <name>   # round up/down (hustle harder)
 *   FLEX <value|name|"str">   # print value (show off)
 *
 * Extras:
 *   - Comments start with '#'
 *   - Strings use double quotes, e.g., "No pain, no gain"
 *   - Numbers can be integers or decimals
 *   - Built-in gym bro wisdom and motivation
 */

"use strict";

const { lineTokeniser } = require("./src/tokeniser.js");
const { lineInterpreter } = require("./src/interpreter.js");
const { pathHandler } = require("./lib/pathHandler.js");

/* =========================
 * Runner (multi-line program)
 * ========================= */
function runProgram(text) {
  const env = { vars: Object.create(null) };
  const lines = text.split(/\r?\n/);
  for (let ln = 0; ln < lines.length; ln++) {
    const line = lines[ln];
    try {
      const tokensedLine = lineTokeniser(line);
      lineInterpreter(tokensedLine, env);
    } catch (e) {
      // enrich error with line number/context
      const where = `Line ${ln + 1}: ${line.trim()}`;
      const msg = e && e.message ? e.message : String(e);
      throw new Error(`${msg}\n  -> ${where}`);
    }
  }
  return env; // expose env for tests/embedding
}

/* =========================
 * CLI
 * =========================
 * Usage:
 *   gymlang sample.gym
 *   gymlang --help
 *   gymlang --version
 */
if (require.main === module) {
  const fs = require("fs");

  const path = pathHandler(process.argv[2]);

  try {
    const src = fs.readFileSync(path, "utf8");
    runProgram(src);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`💪 Error: File '${path}' not found`);
      console.error("💪 Make sure the file exists and try again");
    } else {
      console.error(err.message || err);
    }
    process.exit(1);
  }
}

/* Exports for embedding/tests */
module.exports = { runProgram };
