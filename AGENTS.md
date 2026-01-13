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

### 3. `rollback`
**Description:**  
Reverts the repository to the previous commit. This is helpful if a recent commit introduced unwanted changes.

**Action:**  
- Moves the current branch pointer to the previous commit
- Preserves the working directory according to the previous commit state

**Git Equivalent:**
```bash
git reset --hard HEAD~1
```

**Usage Example:**
```
> rollback
Rolled back to previous commit.
```

---

## Notes
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

