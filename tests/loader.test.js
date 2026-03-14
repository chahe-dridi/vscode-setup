const assert = require("assert");
const { loadCategories, loadCategory, getCategoryIds, getAllExtensions, validateCategory } = require("../src/loader");

// ─── loadCategories ────────────────────────────────────────────────────────
{
  const categories = loadCategories();

  assert.ok(Array.isArray(categories), "loadCategories should return an array");
  assert.ok(categories.length > 0, "should load at least one category");

  categories.forEach((cat, i) => {
    assert.ok(cat.id, `Category[${i}] must have an id`);
    assert.ok(cat.label, `Category[${i}] must have a label`);
    assert.ok(cat.description, `Category[${i}] must have a description`);
    assert.ok(Array.isArray(cat.extensions), `Category[${i}] must have an extensions array`);
    assert.ok(cat.extensions.length > 0, `Category[${i}] must have at least one extension`);
  });

  console.log(`  ✓ loadCategories — loaded ${categories.length} categories`);
}

// ─── loadCategory ──────────────────────────────────────────────────────────
{
  const cat = loadCategory("essential");
  assert.strictEqual(cat.id, "essential");
  assert.ok(cat.extensions.length > 0);
  console.log(`  ✓ loadCategory("essential") — ok`);

  assert.throws(
    () => loadCategory("nonexistent-category-xyz"),
    /not found/,
    "should throw for unknown category"
  );
  console.log(`  ✓ loadCategory("nonexistent") — throws correctly`);
}

// ─── getCategoryIds ───────────────────────────────────────────────────────
{
  const ids = getCategoryIds();
  assert.ok(Array.isArray(ids), "getCategoryIds should return an array");
  assert.ok(ids.length > 0, "getCategoryIds should return at least one id");
  assert.ok(ids.includes("essential"), "should include known category id: essential");
  console.log(`  ✓ getCategoryIds — loaded ${ids.length} ids`);
}

// ─── getAllExtensions ──────────────────────────────────────────────────────
{
  const all = getAllExtensions();
  assert.ok(Array.isArray(all));
  assert.ok(all.length > 0);

  all.forEach((ext, i) => {
    assert.ok(ext.id, `Extension[${i}] must have id`);
    assert.ok(ext.name, `Extension[${i}] must have name`);
    assert.ok(ext.category, `Extension[${i}] must have category attached`);
    assert.ok(ext.categoryId, `Extension[${i}] must have categoryId attached`);
  });

  // No duplicate IDs
  const ids = all.map((e) => e.id);
  const unique = new Set(ids);
  assert.strictEqual(ids.length, unique.size, "All extension IDs must be unique across categories");

  console.log(`  ✓ getAllExtensions — ${all.length} extensions, no duplicates`);
}

// ─── validateCategory ─────────────────────────────────────────────────────
{
  const good = {
    id: "test",
    label: "🧪 Test",
    description: "A test category",
    extensions: [
      { id: "publisher.ext", name: "Ext", description: "Does stuff", tags: ["test"] },
    ],
  };
  const r1 = validateCategory(good);
  assert.strictEqual(r1.valid, true, "valid category should pass");
  assert.deepStrictEqual(r1.errors, []);
  console.log(`  ✓ validateCategory — valid category passes`);

  const bad = {
    id: "",
    label: null,
    extensions: [
      { id: "no-dot-here", name: "", description: "", tags: "notarray" },
    ],
  };
  const r2 = validateCategory(bad);
  assert.strictEqual(r2.valid, false, "invalid category should fail");
  assert.ok(r2.errors.length > 0);
  console.log(`  ✓ validateCategory — invalid category caught ${r2.errors.length} errors`);
}

// ─── All category files are valid ─────────────────────────────────────────
{
  const categories = loadCategories();
  categories.forEach((cat) => {
    const result = validateCategory(cat);
    assert.strictEqual(
      result.valid,
      true,
      `Category "${cat.id}" has validation errors:\n  ${result.errors.join("\n  ")}`
    );
  });
  console.log(`  ✓ All category JSON files pass validation`);
}

console.log("\n  All loader tests passed ✅\n");
