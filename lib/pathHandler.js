const pathHandler = (path) => {
  // Handle help and version flags
  if (!path || path === "--help" || path === "-h") {
    console.log(`
💪 GymLang - A programming language for gym bros, by gym bros! 💪

USAGE:
  gymlang <program.gym>    # Run a GymLang program
  gymlang --help          # Show this help
  gymlang --version       # Show version

EXAMPLES:
  gymlang demo.gym        # Run the demo program
  gymlang sample.gym      # Run the sample program

COMMANDS:
  BRO <name> <value>      # Declare variable with bro energy
  BULK <name> <value>     # Add to variable (bulking season)
  SHRED <name> <value>    # Subtract from variable (shredding)
  GAINS <name> <value>    # Multiply variable (muscle gains)
  CARDIO <name> <value>   # Divide variable (cardio kills gains)
  REPS <vals...>          # Sum values
  CREATINE <vals...>      # Multiply values
  PR <high/low> <vals...> # Find maximum/minimum (pump it up!)
  YOLO <name>             # Random value (you only live once)
  WHEY <name> <value>     # Exponentiation (get whey!)
  LEGDAY <name>           # Set to 0 (skip leg day)
  HUSTLE <up/down> <name> # Round up/down (hustle harder)
  FLEX <value|name|"str"> # Print value (show off)

FEATURES:
  - Comments start with '#'
  - Strings use double quotes
  - Numbers can be integers or decimals
  - Built-in gym bro wisdom and motivation

Remember: Pain is temporary, gains are forever! 💪
    `);
    process.exit(0);
  }

  if (path === "--version" || path === "-v") {
    console.log("💪 GymLang v1.0.0 - Where every program is a gains program!");
    process.exit(0);
  }

  if (!path) {
    console.error("💪 Usage: gymlang <program.gym>");
    console.error("💪 Run 'gymlang --help' for more information");
    process.exit(1);
  }

  return path;
};

module.exports = { pathHandler };
