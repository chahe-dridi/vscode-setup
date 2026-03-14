const readline = require("readline");

/**
 * Create a readline interface
 * @returns {readline.Interface}
 */
function createRL() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Prompt the user and return their input
 * @param {readline.Interface} rl
 * @param {string} question
 * @returns {Promise<string>}
 */
function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

/**
 * Parse a user input string like "1 2 3" or "a" into an array of 0-based indexes
 * @param {string} input
 * @param {number} max  maximum valid index (exclusive)
 * @returns {number[]|'all'|'quit'|'none'}
 */
function parseSelection(input, max) {
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "q" || trimmed === "quit") return "quit";
  if (trimmed === "a" || trimmed === "all") return "all";
  if (trimmed === "") return "none";

  const nums = trimmed
    .split(/\s+/)
    .map((n) => parseInt(n, 10) - 1)
    .filter((n) => !isNaN(n) && n >= 0 && n < max);

  return [...new Set(nums)];
}

module.exports = { createRL, ask, parseSelection };
