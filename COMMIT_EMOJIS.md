# Commit Emoji Conventions

To make the commit history more readable and structured, we use emojis to denote the types of changes. Please follow these rules when creating commit messages.

| Emoji              | Commit Type | Description                                                |
| ------------------ | ----------- | ---------------------------------------------------------- |
| :tada:             | `happy`     | Mega happiness                                             |
| :sparkles:         | `feat`      | Adding a new feature                                       |
| :bug:              | `fix`       | Fixing a bug                                               |
| :pencil:           | `docs`      | Updating documentation                                     |
| :art:              | `style`     | Changes in styling (e.g., formatting, missing semi colons) |
| :recycle:          | `refactor`  | Code refactoring without functional changes                |
| :white_check_mark: | `test`      | Adding tests                                               |
| :hammer:           | `build`     | Changes in the build system or external dependencies       |
| :zap:              | `perf`      | Improving performance                                      |
| :wrench:           | `chore`     | Other changes that don't modify src or test files          |

## Example Commit Messages

- `feat: added user authentication`
- `fix: fixed display issue on mobile devices`
- `docs: updated installation guide`

## General Guidelines

1. Use one emoji per commit.
2. Start the commit message with the emoji and commit type.
3. Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
