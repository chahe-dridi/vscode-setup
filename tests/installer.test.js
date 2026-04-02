const assert = require("assert");
const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const installerPath = require.resolve("../src/installer");

function loadInstallerWithExecSync(mockExecSync) {
  const originalExecSync = childProcess.execSync;
  delete require.cache[installerPath];
  childProcess.execSync = mockExecSync;

  try {
    return require("../src/installer");
  } finally {
    childProcess.execSync = originalExecSync;
    delete require.cache[installerPath];
  }
}

const { generateExtensionsJson, getCodeInstallInstructions } = require("../src/installer");

// generateExtensionsJson
{
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

  process.chdir(originalCwd);
  fs.rmSync(tmpDir, { recursive: true });

  console.log("  ✓ generateExtensionsJson - creates valid .vscode/extensions.json");
}

// generateExtensionsJson - creates .vscode dir if missing
{
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vscode-setup-test-"));
  const originalCwd = process.cwd();
  process.chdir(tmpDir);

  assert.ok(!fs.existsSync(path.join(tmpDir, ".vscode")), ".vscode dir should not exist yet");

  generateExtensionsJson([{ id: "test.ext", name: "Test" }]);

  assert.ok(fs.existsSync(path.join(tmpDir, ".vscode")), ".vscode dir should be created");

  process.chdir(originalCwd);
  fs.rmSync(tmpDir, { recursive: true });

  console.log("  ✓ generateExtensionsJson - auto-creates .vscode directory");
}

// getCodeInstallInstructions
{
  const instructions = getCodeInstallInstructions();
  assert.ok(typeof instructions === "string");
  assert.ok(instructions.length > 10);

  if (process.platform === "win32") {
    assert.ok(
      instructions.includes("Add to PATH"),
      "Windows instructions should mention adding VS Code to PATH"
    );
    assert.ok(
      instructions.includes("restart your terminal"),
      "Windows instructions should tell the user to restart the terminal"
    );
  }

  console.log(`  ✓ getCodeInstallInstructions - returns: "${instructions.slice(0, 50)}..."`);
}

console.log("\n  All installer tests passed\n");
