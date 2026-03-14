const assert = require("assert");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { generateExtensionsJson, getCodeInstallInstructions } = require("../src/installer");

// ─── generateExtensionsJson ────────────────────────────────────────────────
{
  // Use a temp directory so we don't pollute the real project
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vscode-setup-test-"));
  const originalCwd = process.cwd();
  process.chdir(tmpDir);

  const fakeExtensions = [
    { id: "esbenp.prettier-vscode", name: "Prettier" },
    { id: "dbaeumer.vscode-eslint", name: "ESLint" },
  ];

  const outputPath = generateExtensionsJson(fakeExtensions);

  assert.ok(fs.existsSync(outputPath), "extensions.json should be created");

  const contents = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  assert.ok(Array.isArray(contents.recommendations));
  assert.strictEqual(contents.recommendations.length, 2);
  assert.ok(contents.recommendations.includes("esbenp.prettier-vscode"));
  assert.ok(contents.recommendations.includes("dbaeumer.vscode-eslint"));

  // Clean up
  process.chdir(originalCwd);
  fs.rmSync(tmpDir, { recursive: true });

  console.log("  ✓ generateExtensionsJson — creates valid .vscode/extensions.json");
}

// ─── generateExtensionsJson — creates .vscode dir if missing ──────────────
{
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vscode-setup-test-"));
  const originalCwd = process.cwd();
  process.chdir(tmpDir);

  assert.ok(!fs.existsSync(path.join(tmpDir, ".vscode")), ".vscode dir should not exist yet");

  generateExtensionsJson([{ id: "test.ext", name: "Test" }]);

  assert.ok(fs.existsSync(path.join(tmpDir, ".vscode")), ".vscode dir should be created");

  process.chdir(originalCwd);
  fs.rmSync(tmpDir, { recursive: true });

  console.log("  ✓ generateExtensionsJson — auto-creates .vscode directory");
}

// ─── getCodeInstallInstructions ────────────────────────────────────────────
{
  // We can't change process.platform but we can verify it returns a non-empty string
  const instructions = getCodeInstallInstructions();
  assert.ok(typeof instructions === "string");
  assert.ok(instructions.length > 10);
  console.log(`  ✓ getCodeInstallInstructions — returns: "${instructions.slice(0, 50)}..."`);
}

console.log("\n  All installer tests passed ✅\n");
