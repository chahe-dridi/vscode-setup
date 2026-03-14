/**
 * Parse process.argv into a simple flags object
 * Supports:
 *   --list              print all extensions and exit
 *   --json              output as JSON (use with --list)
 *   --category <id>     skip menu, run specific category
 *   --help              show usage
 * @returns {object}
 */
function parseArgs(argv = process.argv.slice(2)) {
  const flags = {
    list: false,
    json: false,
    help: false,
    category: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--list")   flags.list = true;
    if (arg === "--json")   flags.json = true;
    if (arg === "--help" || arg === "-h") flags.help = true;
    if (arg === "--category" && argv[i + 1]) {
      flags.category = argv[i + 1];
      i++;
    }
  }

  return flags;
}

const HELP_TEXT = `
Usage: npx vscode-setup [options]

Options:
  (no flags)              Interactive mode — pick categories and extensions
  --list                  List all available extensions
  --list --json           Output all extensions as JSON
  --category <id>         Skip menu and jump to a specific category
  --help, -h              Show this help message

Category IDs:
  essential   webdev   themes   fun   ai   python   devtools

Examples:
  npx vscode-setup
  npx vscode-setup --list
  npx vscode-setup --list --json
  npx vscode-setup --category fun
`;

module.exports = { parseArgs, HELP_TEXT };
