# AGENTS.md

This file defines custom agent commands for managing your Git workflow during the React workshop. These commands are intended for local development and do not involve remote repositories unless specified.

---

## Commands

### 1. `save`
**Description:**  
Saves your current work by staging all changes and creating a local commit. This is useful to checkpoint your progress before making further changes.

**Action:**  
- Stages all changes in the repository
- Asks the user to provide a name for the checkpoint, which will be used as the commit message
- Creates a local commit with the provided message

**Git Equivalent:**
```bash
git add .
git commit -m "<checkpoint-name>"
```

**Usage Example:**
```
> save
Enter checkpoint name: Add new component
All changes staged and committed as "Add new component".
```

---

### 2. `reset`
**Description:**  
Discards all uncommitted changes and restores the working directory to the last committed state. This is useful if you want to start over from your last saved checkpoint.

**Action:**  
- Resets all files to match the latest commit
- Discards all local modifications

**Git Equivalent:**
```bash
git reset --hard
```

**Usage Example:**
```
> reset
All changes discarded. Working directory restored to last commit.
```

---

### 3. `checkpoints`
**Description:**  
Displays a list of all commits as checkpoints. This is useful to view your progress and see what changes have been saved.

**Action:**  
- Shows all commits with their checkpoint names (commit messages) and dates

**Git Equivalent:**
```bash
git log --oneline
```

**Usage Example:**
```
> checkpoints
Checkpoints:
1. a1b2c3d - Add new component (2 hours ago)
2. e4f5g6h - Initial setup (yesterday)
```

---

### 4. `rollback [commit-hash]`
**Description:**  
Reverts the repository to a specific commit or the previous commit. This is helpful if a recent commit introduced unwanted changes.

**Action:**  
- If a commit hash is provided, resets to that specific commit
- If no commit hash is provided, resets to the previous commit (HEAD~1)
- All commits after the target commit will be removed

**Git Equivalent:**
```bash
# With commit hash:
git reset --hard <commit-hash>

# Without commit hash (previous commit):
git reset --hard HEAD~1
```

**Usage Examples:**
```
> rollback
Rolled back to previous commit.

> rollback a1b2c3d
Rolled back to checkpoint "Add new component" (a1b2c3d).
```

---

## Notes
- **Never commit without the user explicitly asking.** Always wait for user confirmation before running any git commit.
- These commands are **local only** and will not push changes to any remote repository.  
- Use `reset` carefully: all uncommitted changes will be permanently lost.  
- Use `rollback` carefully: it removes the most recent commit, along with its changes.  

---

## Recommended Workflow
1. Use `save` frequently to create checkpoints.  
2. Use `reset` if you want to discard recent experimental changes.  
3. Use `rollback` if a commit introduced mistakes and you need to revert.  

---

_End of AGENTS.md_

