# 🧩 vscode-setup

> An interactive CLI to discover, pick, and install the best VS Code extensions —  
> from essentials to fun stuff like pets 🐱, Discord presence, custom backgrounds, and more.

[![npm version](https://img.shields.io/npm/v/vscode-setup?color=blue&style=flat-square)](https://www.npmjs.com/package/vscode-setup)
[![GitHub stars](https://img.shields.io/github/stars/chahe-dridi/vscode-setup?style=flat-square)](https://github.com/chahe-dridi/vscode-setup/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/chahe-dridi/vscode-setup/ci.yml?style=flat-square&label=CI)](https://github.com/chahe-dridi/vscode-setup/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Good First Issues](https://img.shields.io/github/issues/chahe-dridi/vscode-setup/good%20first%20issue?style=flat-square&color=purple)](https://github.com/chahe-dridi/vscode-setup/issues?q=label%3A%22good+first+issue%22)

---

## 🚀 Usage

No install needed:

```bash
npx vscode-setup
```

Or install globally:

```bash
npm install -g vscode-setup
vscode-setup
```

---

## ⚡ CLI Flags

```bash
npx vscode-setup                    # interactive mode
npx vscode-setup --list             # list all extensions
npx vscode-setup --list --json      # output as JSON
npx vscode-setup --category fun     # jump straight to a category
npx vscode-setup --help             # show help
```

**Category IDs:** `essential` · `themes` · `fun` · `ai` · `webdev` · `python` · `devtools`

---

## 📦 What's Included

| Category | Highlights |
|---|---|
| 🚀 Essential | Prettier, ESLint, GitLens, Error Lens, Better Comments... |
| 🎨 Themes | Dracula, Tokyo Night, Night Owl, Material Icons, Peacock... |
| 🐾 Fun & Personality | VS Code Pets 🐱, Discord Presence, Background, Power Mode, SynthWave... |
| 🧠 AI & Productivity | GitHub Copilot, Codeium (free), Bookmarks, Todo Tree... |
| 🌐 Web Dev | Live Server, Tailwind IntelliSense, React Snippets, REST Client... |
| 🐍 Python & Data | Python, Jupyter, Black, Pylint, autoDocstring... |
| 🔧 Dev Tools | Docker, Remote SSH, Database Client, YAML, Hex Editor... |

---

## 🗂️ Project Structure

```
vscode-setup/
├── index.js                     # CLI entry point (thin orchestrator)
├── src/
│   ├── loader.js                # reads + validates category JSON files
│   ├── installer.js             # installs extensions via `code` CLI
│   ├── display.js               # all terminal output / colors
│   ├── prompt.js                # readline + input parsing
│   ├── args.js                  # --flag parser
│   └── test-runner.js           # runs all test files
├── data/
│   └── categories/
│       ├── index.json           # defines load order
│       ├── essential.json
│       ├── themes.json
│       ├── fun.json
│       ├── ai.json
│       ├── webdev.json
│       ├── python.json
│       └── devtools.json
├── tests/
│   ├── loader.test.js
│   ├── installer.test.js
│   ├── args.test.js
│   └── prompt.test.js
└── .github/
    ├── workflows/ci.yml
    ├── pull_request_template.md
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        ├── feature_request.md
        ├── add_extension.md
        └── add_category.md
```

---

## 🤝 Contributing

**Adding an extension is the easiest contribution — no complex setup needed.**

1. Open the matching file in `data/categories/` (e.g. `data/categories/fun.json`)
2. Add your extension:

```json
{
  "id": "publisher.extension-id",
  "name": "Extension Name",
  "description": "One clear sentence about what it does.",
  "tags": ["fun", "theme"]
}
```

3. Run `npm test` — all tests must pass
4. Open a pull request

👉 **Full guide: [CONTRIBUTING.md](CONTRIBUTING.md)**  
👉 **Good first issues: [Browse open issues](https://github.com/chahe-dridi/vscode-setup/issues?q=label%3A%22good+first+issue%22)**

---

## 🧪 Running Tests

```bash
npm test
```

Tests cover: category validation, input parsing, CLI flags, and the extensions JSON generator. No external dependencies — uses Node's built-in `assert` module.

---

## 💡 Roadmap

- [x] Interactive CLI with categories
- [x] Direct VS Code install via `code` CLI
- [x] Generate `.vscode/extensions.json`
- [x] CLI flags (`--list`, `--json`, `--category`)
- [x] Unit tests
- [ ] Save / load extension profiles
- [ ] Web UI for picking extensions visually
- [ ] Community extension ratings
- [ ] More language categories (Rust, Go, Java, Mobile...)

---

## 🐛 Found a Bug?

[Open a bug report →](https://github.com/chahe-dridi/vscode-setup/issues/new?template=bug_report.md)

---

## ⭐ Support

If this saved you time:
- Star the repo ⭐
- Share it with a dev friend
- [Contribute an extension](CONTRIBUTING.md)

---

## 📝 License

[MIT](LICENSE) © [chahe-dridi](https://github.com/chahe-dridi)
