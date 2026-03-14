#!/usr/bin/env node

/**
 * github-setup.js
 *
 * Reads scripts/github-setup.json and:
 *   1. Checks which labels already exist  → creates only missing ones
 *   2. Checks which issues already exist (open OR closed) → creates only new ones
 *
 * Usage:
 *   node scripts/github-setup.js
 *
 * Requirements:
 *   - gh CLI installed  (https://cli.github.com)
 *   - gh auth login     (run once before this script)
 */

"use strict";

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// ── colors ─────────────────────────────────────────────────────────────────
const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  cyan:   "\x1b[36m",
  red:    "\x1b[31m",
  blue:   "\x1b[34m",
};

function log(msg)  { console.log(msg); }
function ok(msg)   { log(`  ${c.green}✓${c.reset} ${msg}`); }
function skip(msg) { log(`  ${c.yellow}↷${c.reset} ${msg}`); }
function info(msg) { log(`  ${c.cyan}•${c.reset} ${msg}`); }
function fail(msg) { log(`  ${c.red}✗${c.reset} ${msg}`); }
function head(msg) { log(`\n${c.bold}${msg}${c.reset}`); }

// ── helpers ─────────────────────────────────────────────────────────────────
function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: opts.silent ? "pipe" : undefined }).trim();
}

function runJSON(cmd) {
  try {
    const out = execSync(cmd, { encoding: "utf8", stdio: "pipe" }).trim();
    return JSON.parse(out);
  } catch {
    return null;
  }
}

// ── check gh is installed ───────────────────────────────────────────────────
function checkGH() {
  try {
    run("gh --version", { silent: true });
  } catch {
    log(`\n${c.red}  Error: gh CLI is not installed or not in PATH.${c.reset}`);
    log(`  Download it from: https://cli.github.com`);
    log(`  Then run: gh auth login\n`);
    process.exit(1);
  }
}

// ── check auth ──────────────────────────────────────────────────────────────
function checkAuth() {
  try {
    run("gh auth status", { silent: true });
  } catch {
    log(`\n${c.red}  Error: Not logged into gh CLI.${c.reset}`);
    log(`  Run: gh auth login\n`);
    process.exit(1);
  }
}

// ── load config ─────────────────────────────────────────────────────────────
function loadConfig() {
  const configPath = path.join(__dirname, "github-setup.json");
  if (!fs.existsSync(configPath)) {
    log(`\n${c.red}  Error: scripts/github-setup.json not found.${c.reset}\n`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

// ── fetch existing labels ───────────────────────────────────────────────────
function getExistingLabels(repo) {
  const data = runJSON(`gh label list --repo ${repo} --limit 100 --json name`);
  if (!data) return new Set();
  return new Set(data.map((l) => l.name.toLowerCase()));
}

// ── fetch existing issues (open + closed) ───────────────────────────────────
function getExistingIssueTitles(repo) {
  const open   = runJSON(`gh issue list --repo ${repo} --state open   --limit 200 --json title`) || [];
  const closed = runJSON(`gh issue list --repo ${repo} --state closed --limit 200 --json title`) || [];
  return new Set([...open, ...closed].map((i) => i.title.toLowerCase().trim()));
}

// ── create label ─────────────────────────────────────────────────────────────
function createLabel(repo, label) {
  try {
    run(
      `gh label create "${label.name}" --color "${label.color}" --description "${label.description}" --repo ${repo}`,
      { silent: true }
    );
    ok(`Label created: ${c.bold}${label.name}${c.reset}`);
    return true;
  } catch (err) {
    fail(`Failed to create label "${label.name}": ${err.message.split("\n")[0]}`);
    return false;
  }
}

// ── create issue ─────────────────────────────────────────────────────────────
function createIssue(repo, issue) {
  // Write body to a temp file to avoid shell escaping hell
  const tmpFile = path.join(require("os").tmpdir(), `vscode-setup-issue-${Date.now()}.md`);
  fs.writeFileSync(tmpFile, issue.body, "utf8");

  const labelFlag = issue.labels.map((l) => `--label "${l}"`).join(" ");

  try {
    const url = run(
      `gh issue create --repo ${repo} --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${tmpFile}" ${labelFlag}`,
      { silent: true }
    );
    ok(`Issue created: ${c.bold}${issue.title}${c.reset}`);
    info(`  ${c.dim}${url}${c.reset}`);
    return true;
  } catch (err) {
    fail(`Failed to create issue "${issue.title}": ${err.message.split("\n")[0]}`);
    return false;
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  log(`\n${c.bold}${c.blue}╔═══════════════════════════════════════╗${c.reset}`);
  log(`${c.bold}${c.blue}║   vscode-setup GitHub Setup Script    ║${c.reset}`);
  log(`${c.bold}${c.blue}╚═══════════════════════════════════════╝${c.reset}`);

  // ── preflight checks ────────────────────────────────────────────────────
  head("Preflight checks");
  checkGH();
  ok("gh CLI found");
  checkAuth();
  ok("gh CLI authenticated");

  const config = loadConfig();
  const { repo, labels, issues } = config;
  info(`Repo: ${c.bold}${repo}${c.reset}`);

  // ── labels ──────────────────────────────────────────────────────────────
  head(`Labels  (${labels.length} defined)`);
  const existingLabels = getExistingLabels(repo);
  info(`Found ${existingLabels.size} existing labels on GitHub`);

  let labelsCreated = 0;
  let labelsSkipped = 0;

  for (const label of labels) {
    if (existingLabels.has(label.name.toLowerCase())) {
      skip(`Already exists: ${label.name}`);
      labelsSkipped++;
    } else {
      const created = createLabel(repo, label);
      if (created) labelsCreated++;
      // small delay to avoid rate limiting
      await sleep(300);
    }
  }

  log(`\n  ${c.green}${labelsCreated} created${c.reset}  ${c.dim}${labelsSkipped} already existed${c.reset}`);

  // ── issues ──────────────────────────────────────────────────────────────
  head(`Issues  (${issues.length} defined)`);
  const existingTitles = getExistingIssueTitles(repo);
  info(`Found ${existingTitles.size} existing issues on GitHub (open + closed)`);

  let issuesCreated = 0;
  let issuesSkipped = 0;
  let issuesFailed  = 0;

  for (const issue of issues) {
    const titleKey = issue.title.toLowerCase().trim();

    if (existingTitles.has(titleKey)) {
      skip(`Already exists: ${issue.title}`);
      issuesSkipped++;
    } else {
      // verify all labels for this issue exist
      const missingLabels = issue.labels.filter(
        (l) => !existingLabels.has(l.toLowerCase()) && labelsCreated === 0
      );
      if (missingLabels.length > 0) {
        fail(`Skipping issue (missing labels: ${missingLabels.join(", ")}): ${issue.title}`);
        issuesFailed++;
        continue;
      }

      const created = createIssue(repo, issue);
      if (created) {
        issuesCreated++;
        existingTitles.add(titleKey); // prevent duplicates in same run
      } else {
        issuesFailed++;
      }

      // small delay to avoid hitting rate limits
      await sleep(800);
    }
  }

  // ── summary ─────────────────────────────────────────────────────────────
  log(`\n${"─".repeat(45)}`);
  log(`${c.bold}Summary${c.reset}`);
  log(`  Labels:  ${c.green}${labelsCreated} created${c.reset}  ${c.dim}${labelsSkipped} skipped${c.reset}`);
  log(`  Issues:  ${c.green}${issuesCreated} created${c.reset}  ${c.dim}${issuesSkipped} skipped${c.reset}${issuesFailed > 0 ? `  ${c.red}${issuesFailed} failed${c.reset}` : ""}`);

  if (issuesCreated > 0 || labelsCreated > 0) {
    log(`\n  ${c.green}✅ Done! View your repo:${c.reset}`);
    log(`  ${c.cyan}https://github.com/${repo}/issues${c.reset}\n`);
  } else {
    log(`\n  ${c.yellow}Everything already existed — nothing to do.${c.reset}\n`);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

main().catch((err) => {
  console.error(`\n${c.red}Unexpected error:${c.reset}`, err.message);
  process.exit(1);
});
