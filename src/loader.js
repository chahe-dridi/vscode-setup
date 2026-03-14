const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data", "categories");

/**
 * Load all categories in the order defined by index.json
 * @returns {Array} array of category objects
 */
function loadCategories() {
  const indexPath = path.join(DATA_DIR, "index.json");
  const order = JSON.parse(fs.readFileSync(indexPath, "utf8"));

  return order.map((id) => {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  });
}

/**
 * Load a single category by its id
 * @param {string} id
 * @returns {object} category object
 */
function loadCategory(id) {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Category "${id}" not found at ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Get all extensions as a flat array with their category label attached
 * @returns {Array}
 */
function getAllExtensions() {
  const categories = loadCategories();
  const all = [];
  for (const cat of categories) {
    for (const ext of cat.extensions) {
      all.push({ ...ext, category: cat.label, categoryId: cat.id });
    }
  }
  return all;
}

/**
 * Validate a category file structure
 * @param {object} category
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateCategory(category) {
  const errors = [];

  if (!category.id || typeof category.id !== "string") {
    errors.push("Missing or invalid 'id' field");
  }
  if (!category.label || typeof category.label !== "string") {
    errors.push("Missing or invalid 'label' field");
  }
  if (!category.description || typeof category.description !== "string") {
    errors.push("Missing or invalid 'description' field");
  }
  if (!Array.isArray(category.extensions)) {
    errors.push("'extensions' must be an array");
  } else {
    category.extensions.forEach((ext, i) => {
      if (!ext.id || !ext.id.includes(".")) {
        errors.push(`Extension[${i}] has invalid or missing 'id' (must contain a dot, e.g. publisher.name)`);
      }
      if (!ext.name || typeof ext.name !== "string") {
        errors.push(`Extension[${i}] missing 'name'`);
      }
      if (!ext.description || typeof ext.description !== "string") {
        errors.push(`Extension[${i}] missing 'description'`);
      }
      if (!Array.isArray(ext.tags)) {
        errors.push(`Extension[${i}] 'tags' must be an array`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { loadCategories, loadCategory, getAllExtensions, validateCategory };
