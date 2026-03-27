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

  console.log("  ok generateExtensionsJson creates valid .vscode/extensions.json");
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

  console.log("  ok generateExtensionsJson auto-creates .vscode directory");
}

// getCodeInstallInstructions
{
  const instructions = getCodeInstallInstructions();
  assert.ok(typeof instructions === "string");
  assert.ok(instructions.length > 10);

  if (process.platform === "win32") {
    assert.ok(
      instructions.includes("code command in PATH") || instructions.includes("PATH"),
      "Windows instructions should mention how to make the code command available"
    );
  }

  console.log(`  ok getCodeInstallInstructions returns: "${instructions.slice(0, 50)}..."`);
}

// installExtensions - all succeed
{
  const execCalls = [];
  const { installExtensions } = loadInstallerWithExecSync((command) => {
    execCalls.push(command);
  });

  const fakeExtensions = [
    { id: "esbenp.prettier-vscode", name: "Prettier" },
    { id: "dbaeumer.vscode-eslint", name: "ESLint" },
  ];

  const progressCalls = [];
  const summary = installExtensions(fakeExtensions, (...args) => progressCalls.push(args));

  assert.strictEqual(summary.installed, fakeExtensions.length);
  assert.strictEqual(summary.failed, 0);
  assert.strictEqual(summary.results.length, fakeExtensions.length);
  assert.strictEqual(progressCalls.length, fakeExtensions.length);
  assert.deepStrictEqual(execCalls, [
    "code --install-extension esbenp.prettier-vscode --force",
    "code --install-extension dbaeumer.vscode-eslint --force",
  ]);

  console.log("  ok installExtensions counts all successful installs");
}

// installExtensions - all fail
{
  const { installExtensions } = loadInstallerWithExecSync((command) => {
    throw new Error(`mock failure for ${command}`);
  });

  const fakeExtensions = [
    { id: "ms-python.python", name: "Python" },
    { id: "ms-vscode.cpptools", name: "C/C++" },
  ];

  const summary = installExtensions(fakeExtensions);

  assert.strictEqual(summary.installed, 0);
  assert.strictEqual(summary.failed, fakeExtensions.length);
  assert.strictEqual(summary.results.length, fakeExtensions.length);
  assert.ok(summary.results.every((result) => result.success === false));

  console.log("  ok installExtensions counts all failed installs");
}

// installExtensions - mixed results and progress
{
  const commandOutcomes = new Map([
    ["code --install-extension esbenp.prettier-vscode --force", true],
    ["code --install-extension dbaeumer.vscode-eslint --force", false],
    ["code --install-extension ms-python.python --force", true],
  ]);

  const { installExtensions } = loadInstallerWithExecSync((command) => {
    if (!commandOutcomes.get(command)) {
      throw new Error(`mock failure for ${command}`);
    }
  });

  const fakeExtensions = [
    { id: "esbenp.prettier-vscode", name: "Prettier" },
    { id: "dbaeumer.vscode-eslint", name: "ESLint" },
    { id: "ms-python.python", name: "Python" },
  ];

  const progressCalls = [];
  const summary = installExtensions(fakeExtensions, (...args) => progressCalls.push(args));

  assert.strictEqual(summary.installed, 2);
  assert.strictEqual(summary.failed, 1);
  assert.strictEqual(summary.results.length, fakeExtensions.length);
  assert.strictEqual(progressCalls.length, fakeExtensions.length);

  progressCalls.forEach(([ext, result, index, total], callIndex) => {
    assert.deepStrictEqual(ext, fakeExtensions[callIndex]);
    assert.strictEqual(index, callIndex + 1);
    assert.strictEqual(total, fakeExtensions.length);
    assert.strictEqual(result.success, summary.results[callIndex].success);
  });

  console.log("  ok installExtensions handles mixed results and progress callbacks");
}

console.log("\n  All installer tests passed\n");
