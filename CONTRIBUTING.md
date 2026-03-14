# Contributing to vscode-setup 🎉

Thank you for wanting to contribute! This project grows because of the community.

Whether you're adding one extension, building a new category, fixing a bug, or writing tests — every contribution counts.

---

## 🧩 How to Add an Extension (Easiest — ~5 minutes)

### Step 1 — Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/vscode-setup.git
cd vscode-setup
```

### Step 2 — Find the Extension ID

Go to the VS Code Marketplace and open the extension page. The ID is in the URL:

```
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
                                                     ^^^^^^^^^^^^^^^^^^^^^^
                                                            This is the ID
```

### Step 3 — Open the Right Category File

All extensions live in `data/categories/`. Each category is its own JSON file:

```
data/categories/
├── essential.json
├── themes.json
├── fun.json          ← e.g. for VS Code Pets, Discord Presence
├── ai.json
├── webdev.json
├── python.json
└── devtools.json
```

Open the one that matches your extension and add it to the `extensions` array:

```json
{
  "id": "publisher.extension-id",
  "name": "Extension Name",
  "description": "One clear sentence. What does it do? Why is it useful?",
  "tags": ["fun", "theme"]
}
```

**Rules for a good description:**
- Exactly one sentence
- No marketing language ("the best", "powerful")
- Written for a developer reading it cold for the first time

### Step 4 — Run the Tests

```bash
npm test
```

All tests must pass before you open a PR. The test suite validates every JSON file automatically, so if your extension object is malformed, it will catch it.

### Step 5 — Open a Pull Request

```bash
git checkout -b add-extension-name
git add .
git commit -m "feat: add [Extension Name] to [category]"
git push origin add-extension-name
```

Then open a PR on GitHub. Fill in the PR template.

---

## 📁 How to Add a New Category

1. Create a new file: `data/categories/your-id.json`

```json
{
  "id": "your-id",
  "label": "🦀 Your Category",
  "description": "One sentence about who this is for.",
  "extensions": [
    {
      "id": "publisher.extension",
      "name": "Extension Name",
      "description": "What it does in one sentence.",
      "tags": ["tag"]
    }
  ]
}
```

2. Add the ID to `data/categories/index.json` (this controls display order):

```json
["essential", "themes", "fun", "ai", "webdev", "python", "devtools", "your-id"]
```

3. Run `npm test` — must all pass
4. Open a PR

---

## 🧪 Writing Tests

Tests live in `tests/` and use Node's built-in `assert` — no libraries to install.

To add a test file:

1. Create `tests/your-module.test.js`
2. Use `assert` from Node:

```js
const assert = require("assert");
const { yourFunction } = require("../src/your-module");

assert.strictEqual(yourFunction("input"), "expected");
console.log("  ✓ your test description");
```

3. The test runner (`src/test-runner.js`) auto-discovers all `*.test.js` files — no registration needed.

---

## 🐛 Reporting Bugs

Use the [Bug Report template](https://github.com/chahe-dridi/vscode-setup/issues/new?template=bug_report.md).

Include: OS, Node.js version (`node -v`), VS Code version (`code --version`), and the error output.

---

## 💡 Suggesting Features

Use the [Feature Request template](https://github.com/chahe-dridi/vscode-setup/issues/new?template=feature_request.md).

---

## ✅ Finding Something to Work On

Browse [`good first issue`](https://github.com/chahe-dridi/vscode-setup/issues?q=label%3A%22good+first+issue%22) — these are chosen specifically for contributors picking up the project for the first time.

---

## 📋 Commit Convention

```
feat: add [Extension Name] to [category]
feat: add [Category Name] category
fix: correct extension ID for [Name]
test: add tests for [module]
docs: update README
```

---

Thanks for contributing 🙌
