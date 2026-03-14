# 📋 GitHub Issues to Create

Go to: https://github.com/chahe-dridi/vscode-setup/issues/new
Copy-paste each issue below one by one.

---

## 🏷️ STEP 1 — Create These Labels First

Go to: https://github.com/chahe-dridi/vscode-setup/labels → "New label"

| Label Name          | Hex Color | Purpose                                  |
|---------------------|-----------|------------------------------------------|
| `good first issue`  | `#7057ff` | Easy for first-time contributors         |
| `extension-request` | `#0075ca` | Add a new extension                      |
| `new-category`      | `#e4e669` | Add a whole new category                 |
| `bug`               | `#d73a4a` | Something is broken                      |
| `enhancement`       | `#a2eeef` | New feature or improvement               |
| `documentation`     | `#0075ca` | README, CONTRIBUTING, or docs work       |
| `help wanted`       | `#008672` | Needs community input                    |
| `cli`               | `#f9d0c4` | CLI behavior or flags                    |
| `tests`             | `#bfd4f2` | Writing or fixing tests                  |
| `discussion`        | `#d4c5f9` | Open question or brainstorm              |

---

## 📋 STEP 2 — Create These 12 Issues

---

### ISSUE 1
**Title:** `[CATEGORY] Add Rust & Systems category`
**Labels:** `good first issue` · `new-category` · `extension-request`
**Description:**
```
## 📁 New Category: 🦀 Rust & Systems

Rust is the most loved language on Stack Overflow for 8 years straight.
Many developers are picking it up and would benefit from a quick VS Code setup.

## Extensions to include

| Name | ID | Description |
|---|---|---|
| Rust Analyzer | `rust-lang.rust-analyzer` | Official Rust language server — IntelliSense, go-to-definition, inline errors |
| Crates | `serayuzgur.crates` | Shows crate versions inline in Cargo.toml |
| Even Better TOML | `tamasfe.even-better-toml` | Full TOML syntax support with validation |

## How to contribute

1. Fork the repo
2. Create `data/categories/rust.json` with the structure in CONTRIBUTING.md
3. Add `"rust"` to `data/categories/index.json`
4. Run `npm test` — all tests must pass
5. Open a PR

This is a great first contribution — just a JSON file and an index update!
```

---

### ISSUE 2
**Title:** `[CATEGORY] Add Go Development category`
**Labels:** `good first issue` · `new-category` · `extension-request`
**Description:**
```
## 📁 New Category: 🐹 Go Development

Go is widely used for backend services, CLI tools, and cloud infrastructure.
It deserves its own category.

## Extensions to include

| Name | ID | Description |
|---|---|---|
| Go | `golang.go` | Official Go extension — IntelliSense, debugging, formatting, test runner |
| Go Test Explorer | `premparihar.gotestexplorer` | Visual test runner for Go |

## How to contribute

1. Fork the repo
2. Create `data/categories/go.json`
3. Add `"go"` to `data/categories/index.json`
4. Run `npm test` — all tests must pass
5. Open a PR

Just a JSON file. No complex logic needed!
```

---

### ISSUE 3
**Title:** `[CATEGORY] Add Java & Spring Boot category`
**Labels:** `new-category` · `extension-request` · `help wanted`
**Description:**
```
## 📁 New Category: ☕ Java & Spring Boot

VS Code has become a real option for Java development.
We should support developers coming from IntelliJ or Eclipse.

## Extensions to include

| Name | ID | Notes |
|---|---|---|
| Extension Pack for Java | `vscjava.vscode-java-pack` | Requires a JDK installed |
| Spring Boot Dashboard | `vscjava.vscode-spring-boot-dashboard` | Spring-specific tooling |
| Lombok Annotations | `GabrielBB.vscode-lombok` | Lombok support |

## Notes

Descriptions should mention that a JDK is required.
If you are a Java developer, please verify these IDs from your own experience — you know it better than anyone!

## How to contribute

Same as other category issues:
1. Create `data/categories/java.json`
2. Add `"java"` to `data/categories/index.json`
3. Run `npm test`
4. Open a PR
```

---

### ISSUE 4
**Title:** `[CATEGORY] Add Mobile Development category (Flutter & React Native)`
**Labels:** `new-category` · `extension-request`
**Description:**
```
## 📁 New Category: 📱 Mobile Development

Flutter and React Native are both heavily used with VS Code.
This category would help mobile devs get set up instantly.

## Extensions to consider

| Name | ID | Stack |
|---|---|---|
| Flutter | `Dart-Code.flutter` | Flutter / Dart |
| Dart | `Dart-Code.dart-code` | Flutter / Dart |
| React Native Tools | `msjsdiag.vscode-react-native` | React Native |

## Help wanted

If you build mobile apps with VS Code, please:
- Verify these extension IDs
- Suggest any missing extensions
- Comment with your own must-haves

Then feel free to open a PR with the full category!
```

---

### ISSUE 5
**Title:** `[EXTENSION] Add more Fun & Personality extensions`
**Labels:** `good first issue` · `extension-request`
**Description:**
```
## ➕ Grow the Fun & Personality category

This is one of the most popular categories — let's make it even better!

## Extensions to add (pick one or more)

| Name | ID | Why |
|---|---|---|
| Peacock (already in themes — remove from there if added here) | `johnpapa.vscode-peacock` | Colors VS Code window per project |
| Ambient Sounds | `EFanZh.any-sound` | Plays lo-fi sounds while you code |
| Daily Anime Themes | `RainbowMango.theme-rainbow` | Rotating anime-inspired themes |

## How to contribute

1. Fork the repo
2. Open `data/categories/fun.json`
3. Add your chosen extension to the `extensions` array
4. Run `npm test`
5. Open a PR

Each extension should have a 1-sentence description. Keep it clear and honest — no hype!
```

---

### ISSUE 6
**Title:** `[BUG] Better error message when "code" CLI not found on Windows`
**Labels:** `bug` · `cli` · `good first issue`
**Description:**
```
## 🐛 Bug Report

On Windows, when VS Code is installed but `code` is not in PATH, the current
error message is too generic.

## Current behavior

> ⚠ "code" command not found. Add VS Code to PATH first.
> Windows: Open VS Code → Ctrl+Shift+P → ...

## Expected behavior

The message is already OS-aware, but we should test it on Windows and verify
the exact wording matches what you actually see in VS Code on Windows 10/11.

## How to fix

In `src/installer.js`, find `getCodeInstallInstructions()` and:
1. Test on a Windows machine (or Windows VM / GitHub Codespaces on Windows)
2. Follow the instructions yourself and confirm they work
3. Tweak the wording if needed

## Why this is a good first issue

It's a single function in `src/installer.js` with a few lines.
No complex logic — just test and improve a string.
```

---

### ISSUE 7
**Title:** `[FEATURE] Add --save and --load profile flags`
**Labels:** `enhancement` · `cli`
**Description:**
```
## 💡 Feature: Extension Profiles

Let users save their chosen extension set as a named profile and reload it later.
Perfect for setting up new machines or sharing a setup with teammates.

## Proposed usage

```bash
npx vscode-setup --save my-webdev-setup
npx vscode-setup --load my-webdev-setup
```

Profiles saved to: `~/.vscode-setup/profiles/<name>.json`

## Implementation plan

1. Add `--save <name>` and `--load <name>` to `src/args.js`
2. After the user selects extensions in interactive mode, if `--save` is set,
   write the selected IDs to `~/.vscode-setup/profiles/<name>.json`
3. If `--load <name>` is set, read the file and install each extension
4. Use `os.homedir()` + `path.join()` + `fs.mkdirSync({ recursive: true })`

## Tests to add

- `--save` flag is parsed correctly
- `--load` flag is parsed correctly
- Profile file is created with correct content
- Loading a non-existent profile shows a helpful error

## Difficulty

Medium. Good for a contributor who wants to own a whole feature end to end.
```

---

### ISSUE 8
**Title:** `[FEATURE] Add --search flag to filter extensions by name or tag`
**Labels:** `enhancement` · `cli`
**Description:**
```
## 💡 Feature: Search / Filter Extensions

Let users search across all extensions without going through the menu.

## Proposed usage

```bash
npx vscode-setup --search git
npx vscode-setup --search theme
npx vscode-setup --search discord
```

Should print all matching extensions (by name, description, or tag) and let
the user install them directly.

## Implementation plan

1. Add `--search <term>` to `src/args.js`
2. In `index.js`, if `--search` is set:
   a. Call `getAllExtensions()` from `src/loader.js`
   b. Filter where `name`, `description`, or `tags` includes the search term (case-insensitive)
   c. Print results with their category
   d. Optionally prompt to install

## Tests to add

In `tests/loader.test.js`, test that `getAllExtensions()` returns filterable data.

## Difficulty

Medium. Good for contributors comfortable with array filtering in JavaScript.
```

---

### ISSUE 9
**Title:** `[TESTS] Add test for display.js output formatting`
**Labels:** `tests` · `good first issue`
**Description:**
```
## 🧪 Missing Tests: display.js

The `src/display.js` module handles all terminal output and color formatting.
It currently has no tests.

## What to test

File: `tests/display.test.js`

Suggested tests:
- `printCategories` doesn't throw when given valid category array
- `printExtensions` doesn't throw when given valid extension array
- Color constants (c.red, c.green, etc.) are non-empty strings
- ANSI codes are present in color values (they should contain `\x1b[`)

## How to write the tests

```js
const assert = require("assert");
const { c } = require("../src/display");

assert.ok(c.green.includes("\x1b["), "green should be an ANSI code");
console.log("  ✓ ANSI color codes are present");
```

## Why this matters

Tests ensure that if someone refactors `display.js`, they don't accidentally
break color output or crash the terminal display.

## Difficulty

Easy. Great entry point for learning how the test suite works.
```

---

### ISSUE 10
**Title:** `[TESTS] Write tests for the installer.js installExtensions function`
**Labels:** `tests` · `enhancement`
**Description:**
```
## 🧪 Missing Tests: installExtensions()

The `installExtensions()` function in `src/installer.js` currently has no tests
because it calls the real `code` CLI. We should test it with a mock.

## What to test

In `tests/installer.test.js`, add tests for `installExtensions()` using a
fake/mock version of `installExtension()`.

The function signature is:
```js
installExtensions(extensions, onProgress)
// returns { installed: number, failed: number, results: Array }
```

Suggested approach: temporarily monkey-patch the internal call, or refactor
`installExtension` to be injectable (dependency injection).

## Tests to write

- With all extensions succeeding: `installed === total, failed === 0`
- With all extensions failing: `installed === 0, failed === total`
- `onProgress` callback is called once per extension
- `results` array has one entry per extension

## Difficulty

Medium. Requires understanding how to mock/stub a function in Node.js without
a test framework. Good learning experience!
```

---

### ISSUE 11
**Title:** `[DOCS] Add a terminal demo GIF to the README`
**Labels:** `documentation` · `good first issue` · `help wanted`
**Description:**
```
## 📖 Docs: Demo GIF

The README would be much more attractive with a real terminal demo GIF.

## What we need

A screen recording of:
1. Running `npx vscode-setup`
2. Picking the "Fun & Personality" category
3. Selecting a few extensions
4. Seeing them install

Saved as a `.gif` and added to the README.

## Tools (all free)

- **asciinema** (asciinema.org) — record + share terminal sessions
- **terminalizer** (terminalizer.com) — generates GIF from terminal recording
- **vhs** (github.com/charmbracelet/vhs) — script your terminal recording

## How to contribute

1. Record the demo using one of the tools above
2. Add the GIF to `docs/assets/demo.gif` (create the folder)
3. In README.md, replace the "🎬 Demo" section text with:
   `![Demo](docs/assets/demo.gif)`
4. Open a PR

**No coding required.** Perfect for designers, technical writers, or anyone
who wants to contribute without touching code!
```

---

### ISSUE 12
**Title:** `[DISCUSSION] What categories are missing? Vote and suggest here 👇`
**Labels:** `discussion` · `help wanted`
**Description:**
```
## 💬 Open Discussion: What's Missing?

We want to grow the extension list based on what the community actually uses.

## Current categories

- 🚀 Essential (All Devs)
- 🎨 Themes & Appearance
- 🐾 Fun & Personality
- 🧠 AI & Productivity
- 🌐 Web Development
- 🐍 Python & Data
- 🔧 Dev Tools & Utilities

## What should we add?

Comment below with:
1. **Category name + emoji**
2. **2–3 must-have extensions** for that category
3. **Who it's for** (e.g. "Rust developers", "mobile devs")

## Ideas to spark discussion

- ☕ Java & Spring Boot
- 🦀 Rust & Systems
- 🐹 Go Development
- 📱 Mobile (Flutter, React Native)
- 🧪 Testing (Jest, Vitest, Playwright, coverage)
- 🎮 Game Dev (Unity C#, Godot)
- 🐋 DevOps (Kubernetes, Terraform, Ansible)
- ✍️ Writing & Docs (Markdown, MDX, Spell check)
- 🌍 Remote & Cloud (GitHub Codespaces, AWS Toolkit)

Drop a comment — most upvoted ideas get built first! 🔥

(React with 👍 on comments you agree with)
```

---

## 📌 STEP 3 — Pin 2 Issues

After creating all issues, pin these two at the top of the Issues tab:
- **Issue #12** (Discussion — what's missing?) — gets people talking
- **Issue #1** (Rust category — good first issue) — invites first contributors

To pin: open the issue → click `···` menu → **"Pin issue"**

---

## 🚀 STEP 4 — Launch Checklist

### 1. Create the GitHub repo

- Go to https://github.com/new
- Name: `vscode-setup`
- Description: `Interactive CLI to discover and install the best VS Code extensions — themes, pets, Discord presence, AI tools, and more`
- Visibility: **Public**
- Do NOT check "Initialize with README"

### 2. Push the code

```bash
cd vscode-setup
git init
git add .
git commit -m "feat: initial release - interactive VS Code extension setup CLI"
git branch -M main
git remote add origin https://github.com/chahe-dridi/vscode-setup.git
git push -u origin main
```

### 3. Enable repo features

In **Settings → General → Features**, enable:
- ✅ Issues
- ✅ Discussions
- ✅ Projects (for roadmap tracking)

### 4. Create labels (Step 1 above)

### 5. Create issues (Step 2 above)

### 6. Pin 2 issues (Step 3 above)

### 7. Publish to npm

```bash
npm login       # create account at npmjs.com if needed
npm publish
```

This makes `npx vscode-setup` work for everyone worldwide.

### 8. Share it

- **Reddit:** r/vscode, r/webdev, r/programming
- **Dev.to:** write "I built a CLI to set up VS Code in seconds"
- **Twitter/X:** `#vscode #opensource #nodejs #100DaysOfCode`
- **Discord:** any dev server you're in
