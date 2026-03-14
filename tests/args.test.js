const assert = require("assert");
const { parseArgs } = require("../src/args");

// ─── No flags ──────────────────────────────────────────────────────────────
{
  const f = parseArgs([]);
  assert.strictEqual(f.list, false);
  assert.strictEqual(f.json, false);
  assert.strictEqual(f.help, false);
  assert.strictEqual(f.category, null);
  console.log("  ✓ parseArgs([]) — all defaults false/null");
}

// ─── --list ────────────────────────────────────────────────────────────────
{
  const f = parseArgs(["--list"]);
  assert.strictEqual(f.list, true);
  assert.strictEqual(f.json, false);
  console.log("  ✓ parseArgs(['--list']) — list=true");
}

// ─── --list --json ─────────────────────────────────────────────────────────
{
  const f = parseArgs(["--list", "--json"]);
  assert.strictEqual(f.list, true);
  assert.strictEqual(f.json, true);
  console.log("  ✓ parseArgs(['--list', '--json']) — both true");
}

// ─── --help / -h ──────────────────────────────────────────────────────────
{
  const f1 = parseArgs(["--help"]);
  assert.strictEqual(f1.help, true);
  const f2 = parseArgs(["-h"]);
  assert.strictEqual(f2.help, true);
  console.log("  ✓ parseArgs --help and -h both work");
}

// ─── --category ────────────────────────────────────────────────────────────
{
  const f = parseArgs(["--category", "fun"]);
  assert.strictEqual(f.category, "fun");
  console.log("  ✓ parseArgs --category fun — category='fun'");
}

// ─── --category without value ─────────────────────────────────────────────
{
  const f = parseArgs(["--category"]);
  assert.strictEqual(f.category, null);
  console.log("  ✓ parseArgs --category (no value) — category=null");
}

// ─── Unknown flags are ignored ─────────────────────────────────────────────
{
  const f = parseArgs(["--unknown", "--whatever"]);
  assert.strictEqual(f.list, false);
  assert.strictEqual(f.json, false);
  console.log("  ✓ Unknown flags are safely ignored");
}

console.log("\n  All args tests passed ✅\n");
