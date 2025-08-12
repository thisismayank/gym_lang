const { readValue } = require("../lib/readValue.js");
const { checkNameToken } = require("../lib/utility.js");

/* =========================
 * Interpreter (per line)
 * ========================= */
function lineInterpreter(tokens, env) {
  if (tokens.length === 0) return; // empty/comment-only line

  const head = tokens[0];
  if (head.type !== "WORD")
    throw new SyntaxError("Command must start with a word");

  const cmd = head.value.toUpperCase();

  // helpers

  switch (cmd) {
    case "BRO": {
      // BRO <name> <number> - variable assignment (variable name = number)
      const nameTok = tokens[1];
      const valTok = tokens[2];
      const variableName = checkNameToken("BRO needs a variable name", nameTok);
      const val = readValue(valTok, env);
      if (typeof val !== "number")
        throw new TypeError("BRO value must be a number");
      env.vars[variableName] = val;
      console.log(`💪 Bro, ${variableName} is now ${val}`);
      return;
    }

    case "BULK": {
      // BULK <name> <number> - name = name + number
      const nameTok = tokens[1];
      const delta = readValue(tokens[2], env);
      const variableName = checkNameToken(
        "BULK needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      if (
        typeof env.vars[variableName] !== "number" ||
        typeof delta !== "number"
      )
        throw new TypeError("BULK works with numbers only");
      env.vars[variableName] += delta;
      console.log(
        `${variableName} is now ${env.vars[variableName]} 🍗 Bulking up!`
      );
      return;
    }

    case "SHRED": {
      // SHRED <name> <number> - name = name - number
      const nameTok = tokens[1];
      const delta = readValue(tokens[2], env);
      const variableName = checkNameToken(
        "SHRED needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      if (
        typeof env.vars[variableName] !== "number" ||
        typeof delta !== "number"
      )
        throw new TypeError("SHRED works with numbers only");
      env.vars[variableName] -= delta;
      console.log(
        `${variableName} is now ${env.vars[variableName]} ✂️ Getting leaner!`
      );
      return;
    }

    case "GAINS": {
      // GAINS <name> <number> => name = name * number
      const nameTok = tokens[1];
      const multiplier = readValue(tokens[2], env);
      const variableName = checkNameToken(
        "GAINS needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      if (
        typeof env.vars[variableName] !== "number" ||
        typeof multiplier !== "number"
      )
        throw new TypeError("GAINS works with numbers only");
      env.vars[variableName] *= multiplier;
      console.log(`${variableName} is now ${env.vars[variableName]} 💪 GAINS!`);
      return;
    }

    case "CARDIO": {
      // CARDIO <name> <number> => name = name / number
      const nameTok = tokens[1];
      const divisor = readValue(tokens[2], env);
      const variableName = checkNameToken(
        "CARDIO needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      if (
        typeof env.vars[variableName] !== "number" ||
        typeof divisor !== "number"
      )
        throw new TypeError("CARDIO works with numbers only");
      if (divisor === 0) throw new TypeError("Can't divide by zero, bro!");
      env.vars[variableName] /= divisor;
      console.log(
        `${variableName} is now ${env.vars[variableName]} ✂️ Cardio kills gains!`
      );
      return;
    }

    case "REPS": {
      // REPS <vals...> -> sum and print
      if (tokens.length < 2)
        throw new SyntaxError("REPS needs at least one value");
      const vals = tokens.slice(1).map((tok) => readValue(tok, env));
      const sum = vals.reduce((a, b) => a + b, 0);
      console.log(sum);
      return;
    }

    case "CREATINE": {
      // CREATINE <vals...> -> product and print
      if (tokens.length < 2)
        throw new SyntaxError("CREATINE needs at least one value");
      const vals = tokens.slice(1).map((tok) => readValue(tok, env));
      const prod = vals.reduce((a, b) => a * b, 1);
      console.log(prod);
      return;
    }

    case "PR": {
      // PR <high/low> <vals...> -> max of args
      const highLow = tokens[1].value;
      if (tokens.length < 3)
        throw new SyntaxError("PR needs at least one value");
      const vals = tokens.slice(2).map((tok) => readValue(tok, env));
      if (highLow === "high") {
        const max = Math.max(...vals);
        console.log(`💪 PUMP IT UP! Maximum: ${max}`);
      } else {
        const min = Math.min(...vals);
        console.log(`🔥 GRIND MODE! Minimum: ${min}`);
      }
      return;
    }

    case "YOLO": {
      // YOLO <name> -> random value
      const nameTok = tokens[1];
      const variableName = checkNameToken(
        "YOLO needs a variable name",
        nameTok
      );
      const randomVal = Math.floor(Math.random() * 100) + 1;
      env.vars[variableName] = randomVal;
      console.log(
        `🎲 YOLO! ${variableName} is now ${randomVal}. You only live once!`
      );
      return;
    }

    case "WHEY": {
      // WHEY <name> <number> -> exponentiate the value
      const nameTok = tokens[1];
      const multiplier = readValue(tokens[2], env);
      const variableName = checkNameToken(
        "WHEY needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      env.vars[variableName] = env.vars[variableName] ** multiplier;
      console.log(
        `💪 GETTING WHEY! ${variableName} is now ${env.vars[variableName]}`
      );
      return;
    }

    case "LEGDAY": {
      // LEGDAY <name> -> set to 0 (skip leg day)
      const nameTok = tokens[1];
      const variableName = checkNameToken(
        "LEGDAY needs a variable name",
        nameTok
      );
      env.vars[variableName] = 0;
      console.log(`🦵 Skipped leg day! ${variableName} is now 0. Bro...`);
      return;
    }

    case "HUSTLE": {
      // HUSTLE <up/down> <name> -> round up
      const nameTok = tokens[2];
      const variableName = checkNameToken(
        "HUSTLE needs a variable name",
        nameTok
      );
      if (!(variableName in env.vars))
        throw new ReferenceError(`Unknown variable "${variableName}"`);
      if (tokens[1].value === "up") {
        env.vars[variableName] = Math.ceil(env.vars[variableName]);
      } else {
        env.vars[variableName] = Math.floor(env.vars[variableName]);
      }
      console.log(
        `💼 HUSTLE HARDER! ${variableName} is now ${env.vars[variableName]}`
      );
      return;
    }

    case "FLEX": {
      // FLEX <value|name|"string"> -> print
      if (tokens.length < 2) throw new SyntaxError("FLEX needs a value");
      const val = readValue(tokens[1], env);
      console.log(val);
      return;
    }

    default:
      throw new SyntaxError(`Unknown command "${cmd}"`);
  }
}

module.exports = { lineInterpreter };
