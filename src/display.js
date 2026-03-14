// ─── ANSI color helpers ────────────────────────────────────────────────────
const c = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  dim:     "\x1b[2m",
  cyan:    "\x1b[36m",
  blue:    "\x1b[34m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  red:     "\x1b[31m",
};

const DIVIDER = `  ${"─".repeat(52)}`;

function banner() {
  console.clear();
  console.log(`${c.bold}${c.blue}`);
  console.log(`  ██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗`);
  console.log(`  ██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝`);
  console.log(`  ██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  `);
  console.log(`  ╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝  `);
  console.log(`   ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗`);
  console.log(`    ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝`);
  console.log(`${c.reset}`);
  console.log(`${c.cyan}  ✨ VS Code Extension Setup Tool${c.reset}  ${c.dim}by chahe-dridi${c.reset}`);
  console.log(`${c.dim}  https://github.com/chahe-dridi/vscode-setup${c.reset}`);
  console.log(`  ${DIVIDER.trim()}\n`);
}

function divider() {
  console.log(DIVIDER);
}

function printCategories(categories) {
  categories.forEach((cat, i) => {
    console.log(`  ${c.cyan}${i + 1}${c.reset}. ${cat.label} - ${cat.extensions.length} extensions`);
    console.log(`     ${c.dim}${cat.description}${c.reset}`);
  });
  console.log(`\n  ${c.cyan}a${c.reset}. All categories`);
  console.log(`  ${c.cyan}q${c.reset}. Quit`);
}

function printExtensions(extensions) {
  extensions.forEach((ext, i) => {
    console.log(
      `  ${c.cyan}${i + 1}${c.reset}. ${c.bold}${ext.name}${c.reset}  ${c.dim}(${ext.id})${c.reset}`
    );
    console.log(`     ${ext.description}`);
  });
  console.log(`\n  ${c.cyan}a${c.reset}. Select all`);
  console.log(`  ${c.cyan}Enter${c.reset}. Skip`);
}

function printInstallProgress(ext, result) {
  if (result.success) {
    process.stdout.write(`\r  ${c.green}✓${c.reset} ${ext.name} installed\n`);
  } else {
    process.stdout.write(`\r  ${c.red}✗${c.reset} ${ext.name} failed\n`);
  }
}

function printInstallStart(ext) {
  process.stdout.write(`  ${c.dim}Installing ${ext.name}...${c.reset}`);
}

function printSummary({ installed, failed, jsonPath }) {
  console.log(`\n${DIVIDER}`);
  console.log(`${c.bold}${c.green}  ✅ All done!${c.reset}\n`);
  if (installed > 0) console.log(`  ${c.green}•${c.reset} ${installed} extensions installed`);
  if (failed > 0)    console.log(`  ${c.red}•${c.reset} ${failed} failed`);
  if (jsonPath)      console.log(`  ${c.green}•${c.reset} .vscode/extensions.json saved`);
  console.log(`\n  ${c.dim}Love this tool? Star it on GitHub ⭐${c.reset}`);
  console.log(`  ${c.dim}https://github.com/chahe-dridi/vscode-setup${c.reset}`);
  console.log(`  ${c.dim}Want to add extensions? Open a PR or issue!${c.reset}\n`);
}

function printNoCodeWarning(instructions) {
  console.log(`\n  ${c.red}⚠ "code" command not found.${c.reset}`);
  console.log(`  ${c.dim}${instructions}${c.reset}\n`);
}

module.exports = {
  banner,
  divider,
  printCategories,
  printExtensions,
  printInstallProgress,
  printInstallStart,
  printSummary,
  printNoCodeWarning,
  c,
};
