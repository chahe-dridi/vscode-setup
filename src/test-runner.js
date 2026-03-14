#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const TESTS_DIR = path.join(__dirname, "..", "tests");

const files = fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith(".test.js"));

let totalPassed = 0;
let totalFailed = 0;

console.log("\n╔══════════════════════════════════════════════╗");
console.log("║        vscode-setup — Test Suite             ║");
console.log("╚══════════════════════════════════════════════╝\n");

for (const file of files) {
  const filePath = path.join(TESTS_DIR, file);
  console.log(`\n── ${file} ${"─".repeat(Math.max(0, 42 - file.length))}`);

  try {
    require(filePath);
    totalPassed++;
  } catch (err) {
    console.error(`\n  ✗ FAILED: ${err.message}`);
    if (err.stack) {
      const lines = err.stack.split("\n").slice(1, 4);
      lines.forEach((l) => console.error(`    ${l.trim()}`));
    }
    totalFailed++;
  }
}

console.log("═".repeat(48));
console.log(`\n  Test files:  ${files.length}`);
console.log(`  Passed:      ${totalPassed}`);
if (totalFailed > 0) {
  console.log(`  Failed:      \x1b[31m${totalFailed}\x1b[0m`);
  console.log("\n  ❌ Some tests failed.\n");
  process.exit(1);
} else {
  console.log(`\n  ✅ All tests passed.\n`);
}
