# GymLang 💪

**A programming language for gym bros, by gym bros. Where every program is a gains program!**

[![npm version](https://badge.fury.io/js/gymlang.svg)](https://badge.fury.io/js/gymlang)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🏋️ Installation

```bash
npm install -g gymlang
```

## 🚀 Quick Start

```bash
# Run a program
gymlang program.gym

# Or use Node.js directly
node gymlang.js program.gym
```

## 📝 Syntax

GymLang uses a simple, bro-friendly syntax. One command per line:

```gym
# Set up your starting weights
BRO bench 135
BRO squat 185
BRO deadlift 225

# Progressive overload (bulking season)
BULK bench 10
BULK squat 15

# Get those gains!
GAINS bench 1.5
WHEY bench 2

# Show off your progress
FLEX bench
FLEX squat

# Some motivation
FLEX "No pain, no gain"
```

## 🏋️ Core Commands

### Variable Management

- `BRO <name> <value>` - Declare variable with bro energy
- `BULK <name> <value>` - Add to variable (bulking season)
- `SHRED <name> <value>` - Subtract from variable (shredding)
- `GAINS <name> <value>` - Multiply variable (muscle gains)
- `CARDIO <name> <value>` - Divide variable (cardio kills gains)

### Math Operations

- `REPS <vals...>` - Sum values
- `CREATINE <vals...>` - Multiply values
- `PR <high/low> <vals...>` - Find maximum/minimum (pump it up!)

### Transformations

- `YOLO <name>` - Random value (you only live once)
- `WHEY <name> <value>` - Exponentiation (get whey!)
- `LEGDAY <name>` - Set to 0 (skip leg day)
- `HUSTLE <up/down> <name>` - Round up/down (hustle harder)

### Output

- `FLEX <value|name|"str">` - Print value (show off)

## 📚 Examples

### Basic Workout Program

```gym
# Starting weights
BRO bench 135
BRO squat 185

# Progressive overload
BULK bench 5
BULK squat 10

# Get swole
WHEY bench 2
GAINS squat 1.5

# Show results
FLEX bench
FLEX squat
```

### Advanced Bro Math

```gym
BRO x 10
BRO y 5

# Bro math operations
REPS x y 15
CREATINE x y 3
PR high x y 20
PR low x y 5

# Transformations
WHEY x 3
YOLO random
```

### Complex Workout Tracking

```gym
# Initialize workout variables
BRO bench_press 225
BRO squat_weight 315
BRO deadlift_max 405

# Progressive overload
BULK bench_press 10
BULK squat_weight 15
SHRED deadlift_max 20

# Calculate total volume
REPS bench_press squat_weight deadlift_max

# Get those gains
GAINS bench_press 1.1
WHEY squat_weight 2

# Round up for next session
HUSTLE up bench_press

# Show off results
FLEX "=== WORKOUT COMPLETE ==="
FLEX bench_press
FLEX squat_weight
FLEX deadlift_max
```

## 🎯 Features

- **Bro-friendly syntax** - Easy to learn, hard to master
- **Built-in motivation** - Every command has personality
- **Gym culture integration** - Real gym bro terminology
- **Error handling** - Helpful error messages with bro energy
- **Cross-platform** - Works on any system with Node.js

## 🤝 Contributing

Want to add more gym bro commands? Fork this repo and submit a pull request!

### Adding New Commands

1. Fork the repository
2. Add your command to the interpreter in `src/interpreter.js`
3. Update the documentation
4. Submit a pull request

## 📄 License

MIT License - feel free to use this for your gains!

## 🙏 Acknowledgments

- All the gym bros who inspired this language
- The bro code that keeps us together
- Protein shakes and creatine for the gains

---

**Remember: Pain is temporary, gains are forever! 💪**
