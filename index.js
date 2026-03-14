#!/usr/bin/env node

"use strict";

const { loadCategories, loadCategory } = require("./src/loader");
const { isCodeAvailable, getCodeInstallInstructions, installExtensions, generateExtensionsJson } = require("./src/installer");
const { banner, divider, printCategories, printExtensions, printInstallProgress, printInstallStart, printSummary, printNoCodeWarning, c } = require("./src/display");
const { createRL, ask, parseSelection } = require("./src/prompt");
const { parseArgs, HELP_TEXT } = require("./src/args");

// ─── Handle CLI flags ──────────────────────────────────────────────────────
const flags = parseArgs();

if (flags.help) {
  console.log(HELP_TEXT);
  process.exit(0);
}

if (flags.list) {
  const { getAllExtensions } = require("./src/loader");
  const all = getAllExtensions();
  if (flags.json) {
    console.log(JSON.stringify(all, null, 2));
  } else {
    all.forEach((ext) => {
      console.log(`\n  ${c.bold}${ext.name}${c.reset}  ${c.dim}(${ext.id})${c.reset}`);
      console.log(`  Category: ${ext.category}`);
      console.log(`  ${ext.description}`);
    });
    console.log(`\n  Total: ${all.length} extensions\n`);
  }
  process.exit(0);
}

// ─── Interactive Mode ──────────────────────────────────────────────────────
async function run() {
  banner();

  const rl = createRL();
  let selectedCategories = [];

  // If --category flag was passed, skip the category menu
  if (flags.category) {
    try {
      const cat = loadCategory(flags.category);
      selectedCategories = [cat];
      console.log(`${c.cyan}  Category: ${cat.label}${c.reset}\n`);
    } catch {
      console.log(`${c.red}  Unknown category: "${flags.category}"${c.reset}`);
      console.log(`  Valid IDs: essential, themes, fun, ai, webdev, python, devtools\n`);
      rl.close();
      process.exit(1);
    }
  } else {
    // ── Step 1: Pick categories ──────────────────────────────────────────
    const categories = loadCategories();
    console.log(`${c.bold}Step 1 — Choose categories${c.reset}`);
    console.log(`${c.dim}  Enter numbers separated by spaces, "a" for all, "q" to quit${c.reset}\n`);
    printCategories(categories);

    const catInput = await ask(rl, `\n${c.bold}  Your choice: ${c.reset}`);
    const catSel = parseSelection(catInput, categories.length);

    if (catSel === "quit") {
      console.log(`\n${c.yellow}  Bye! 👋${c.reset}\n`);
      rl.close();
      return;
    }
    if (catSel === "none") {
      console.log(`\n${c.yellow}  Nothing selected. Run again anytime!${c.reset}\n`);
      rl.close();
      return;
    }

    selectedCategories = catSel === "all" ? categories : catSel.map((i) => categories[i]);
  }

  // ── Step 2: Pick extensions ────────────────────────────────────────────
  console.log(`\n${c.bold}Step 2 — Pick extensions${c.reset}`);
  console.log(`${c.dim}  Enter numbers, "a" for all, or press Enter to skip a category${c.reset}`);

  const selected = [];

  for (const cat of selectedCategories) {
    divider();
    console.log(`\n${c.bold}${cat.label}${c.reset}  ${c.dim}— ${cat.description}${c.reset}\n`);
    printExtensions(cat.extensions);

    const extInput = await ask(rl, `\n${c.bold}  Select from ${cat.label}: ${c.reset}`);
    const extSel = parseSelection(extInput, cat.extensions.length);

    if (extSel === "all") {
      selected.push(...cat.extensions);
    } else if (Array.isArray(extSel) && extSel.length > 0) {
      selected.push(...extSel.map((i) => cat.extensions[i]));
    }
  }

  if (selected.length === 0) {
    console.log(`\n${c.yellow}  Nothing selected. Run again anytime!${c.reset}\n`);
    rl.close();
    return;
  }

  // ── Step 3: What to do ─────────────────────────────────────────────────
  divider();
  console.log(`\n${c.bold}Step 3 — What would you like to do?${c.reset}\n`);
  console.log(`  ${c.cyan}1${c.reset}. Install extensions directly in VS Code`);
  console.log(`  ${c.cyan}2${c.reset}. Generate .vscode/extensions.json`);
  console.log(`  ${c.cyan}3${c.reset}. Both\n`);

  const action = await ask(rl, `${c.bold}  Your choice (1/2/3): ${c.reset}`);

  divider();
  console.log(`\n${c.bold}  Processing ${selected.length} extensions...\n${c.reset}`);

  let installed = 0;
  let failed = 0;
  let jsonPath = null;

  if (action === "1" || action === "3") {
    if (!isCodeAvailable()) {
      printNoCodeWarning(getCodeInstallInstructions());
    } else {
      const onProgress = (ext, result) => {
        printInstallStart(ext);
        printInstallProgress(ext, result);
      };
      const summary = installExtensions(selected, onProgress);
      installed = summary.installed;
      failed = summary.failed;
    }
  }

  if (action === "2" || action === "3") {
    jsonPath = generateExtensionsJson(selected);
  }

  printSummary({ installed, failed, jsonPath });
  rl.close();
}

run().catch((err) => {
  console.error(`\n${c.red}Unexpected error:${c.reset}`, err.message);
  process.exit(1);
});
