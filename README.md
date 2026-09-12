# pi-diff-review

This is pure slop, see: https://pi.dev/session/#d4ce533cedbd60040f2622dc3db950e2

It is my hope, that someone takes this idea and makes it gud.

Native diff review window for pi, powered by [Glimpse](https://github.com/hazat/glimpse) and Monaco.

```
pi install git:https://github.com/dbuck/pi-diff-review
```

## What it does

Adds a `/diff-review` command to pi.

The command:

1. opens a native review window
2. lets you switch between working-tree, branch-from-main, a selectable `from...to` commit range, and all-files scopes
   - **Branch from main** compares the current working tree with the merge base of the current branch and `main` (falling back to `origin/main`), so it includes every change on the branch plus uncommitted and untracked changes
   - **Commits** compares the selected range with `git diff fromCommitIsh...toCommitIsh`, including all accumulated changes from the range's merge base through the selected To commit
   - The last selected **Branch from main** or **Last commit** scope opens by default the next time you run `/diff-review` in the same Pi session
3. shows a collapsible sidebar with fuzzy file search
4. shows git status markers in the sidebar for changed files and untracked files
5. persists reviewed-file markers and the changed-areas display preference in the repository's Git metadata; a file marker is restored only while the file's contents are unchanged
6. lazy-loads file contents on demand as you switch files and scopes
7. lets you draft comments on the original side, modified side, or whole file
8. inserts the resulting feedback prompt into the pi editor when you submit

## Requirements

- macOS, Linux, or Windows
- Node.js 20+
- `pi` installed
- internet access for the Tailwind and Monaco CDNs used by the review window

### Windows notes

Glimpse now supports Windows. To build the native host during install you need:

- .NET 8 SDK
- Microsoft Edge WebView2 Runtime
