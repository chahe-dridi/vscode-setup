const assert = require("assert");
const { parseSelection } = require("../src/prompt");

const MAX = 5; // pretend there are 5 items

// ─── "a" / "all" → 'all' ──────────────────────────────────────────────────
{
  assert.strictEqual(parseSelection("a", MAX), "all");
  assert.strictEqual(parseSelection("A", MAX), "all");
  assert.strictEqual(parseSelection("all", MAX), "all");
  assert.strictEqual(parseSelection("  a  ", MAX), "all");
  console.log("  ✓ 'a' / 'all' returns 'all'");
}

// ─── "q" / "quit" → 'quit' ────────────────────────────────────────────────
{
  assert.strictEqual(parseSelection("q", MAX), "quit");
  assert.strictEqual(parseSelection("Q", MAX), "quit");
  assert.strictEqual(parseSelection("quit", MAX), "quit");
  console.log("  ✓ 'q' / 'quit' returns 'quit'");
}

// ─── Empty → 'none' ───────────────────────────────────────────────────────
{
  assert.strictEqual(parseSelection("", MAX), "none");
  assert.strictEqual(parseSelection("   ", MAX), "none");
  console.log("  ✓ empty string returns 'none'");
}

// ─── Valid numbers ─────────────────────────────────────────────────────────
{
  const result = parseSelection("1 2 3", MAX);
  assert.deepStrictEqual(result, [0, 1, 2], "should convert 1-based to 0-based");
  console.log("  ✓ '1 2 3' → [0, 1, 2] (0-based)");
}

// ─── Duplicates removed ────────────────────────────────────────────────────
{
  const result = parseSelection("1 1 2", MAX);
  assert.deepStrictEqual(result, [0, 1]);
  console.log("  ✓ Duplicates removed — '1 1 2' → [0, 1]");
}

// ─── Out-of-range numbers filtered ────────────────────────────────────────
{
  const result = parseSelection("1 99 -1 0", MAX);
  assert.deepStrictEqual(result, [0], "only index 0 (input '1') is valid");
  console.log("  ✓ Out-of-range filtered — '1 99 -1 0' → [0]");
}

// ─── All invalid → empty array ────────────────────────────────────────────
{
  const result = parseSelection("99 100", MAX);
  assert.deepStrictEqual(result, []);
  console.log("  ✓ All invalid → []");
}

// ─── Single valid number ──────────────────────────────────────────────────
{
  const result = parseSelection("3", MAX);
  assert.deepStrictEqual(result, [2]);
  console.log("  ✓ Single number '3' → [2]");
}

console.log("\n  All prompt tests passed ✅\n");
