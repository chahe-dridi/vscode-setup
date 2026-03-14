---
name: 📁 Add New Category
about: Propose a brand new language or tool category
title: "[CATEGORY] Add: "
labels: new-category, good first issue
assignees: ''
---

## 📁 Proposed Category

**Category name + emoji:** (e.g. `🦀 Rust & Systems`)
**Category ID:** (short lowercase, e.g. `rust`) — this becomes the JSON filename

## 📝 Description (1 sentence)

<!-- What kind of developer is this for? -->

## 📦 Extensions to include

| Name | ID | Description |
|------|----|-------------|
|      |    |             |
|      |    |             |

## 🌟 Why is this category needed?

<!-- How popular is this stack? Who would use it? -->

## 🔨 How to contribute

1. Fork the repo
2. Create `data/categories/<id>.json` using this structure:
```json
{
  "id": "your-id",
  "label": "🔥 Your Category",
  "description": "One sentence about who this is for",
  "extensions": [
    {
      "id": "publisher.extension",
      "name": "Extension Name",
      "description": "What it does in one sentence.",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```
3. Add your category ID to `data/categories/index.json`
4. Run `npm test` — all tests must pass
5. Open a PR

## Will you open a PR?

- [ ] Yes!
- [ ] No, just suggesting
