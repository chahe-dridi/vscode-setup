const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Check if the `code` CLI is available in PATH
 * @returns {boolean}
 */
function isCodeAvailable() {
  try {
    execSync("code --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Return OS-specific instructions for adding `code` to PATH
 * @returns {string}
 */
function getCodeInstallInstructions() {
  const platform = process.platform;
  if (platform === "win32") {
    return (
      "Windows: Open VS Code → Ctrl+Shift+P → type 'Shell Command: Install code command in PATH' → press Enter"
    );
  }
  if (platform === "darwin") {
    return (
      "macOS: Open VS Code → Cmd+Shift+P → type 'Shell Command: Install code command in PATH' → press Enter"
    );
  }
  return "Linux: Run: sudo ln -s /usr/share/code/bin/code /usr/local/bin/code";
}

/**
 * Install a single extension via the `code` CLI
 * @param {string} id  extension id
 * @returns {{ success: boolean, error?: string }}
 */
function installExtension(id) {
  try {
    execSync(`code --install-extension ${id} --force`, { stdio: "ignore" });
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Install multiple extensions and return a results summary
 * @param {Array<{id: string, name: string}>} extensions
 * @param {function} onProgress  callback(ext, result, index, total)
 * @returns {{ installed: number, failed: number, results: Array }}
 */
function installExtensions(extensions, onProgress) {
  const results = [];
  let installed = 0;
  let failed = 0;

  for (let i = 0; i < extensions.length; i++) {
    const ext = extensions[i];
    const result = installExtension(ext.id);
    results.push({ ext, ...result });

    if (result.success) {
      installed++;
    } else {
      failed++;
    }

    if (typeof onProgress === "function") {
      onProgress(ext, result, i + 1, extensions.length);
    }
  }

  return { installed, failed, results };
}

/**
 * Generate a .vscode/extensions.json file in the current directory
 * @param {Array<{id: string}>} extensions
 * @returns {string} path to the generated file
 */
function generateExtensionsJson(extensions) {
  const vscodeDir = path.join(process.cwd(), ".vscode");
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true });
  }

  const outputPath = path.join(vscodeDir, "extensions.json");
  const content = {
    recommendations: extensions.map((e) => e.id),
  };

  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
  return outputPath;
}

module.exports = {
  isCodeAvailable,
  getCodeInstallInstructions,
  installExtension,
  installExtensions,
  generateExtensionsJson,
};
