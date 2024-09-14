/** @type {import('@commitlint/types').UserConfig} */

module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "happy", // Mega happiness
        "feat", // Adding a new feature
        "fix", // Fixing a bug
        "docs", // Updating documentation
        "style", // Changes in styling (e.g., formatting, missing semi colons)
        "refactor", // Code refactoring without functional changes
        "test", // Adding tests
        "build", // Changes in the build system or external dependencies
        "perf", // Improving performance
        "chore", // Other changes that don't modify src or test files
      ],
    ],
  },
};
