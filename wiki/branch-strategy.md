Alright. Same strategy, just cleaned up and written properly for a `README.md` or `CONTRIBUTING.md`. No fluff.

---

# Branch Strategy

This repository uses a simple **Dev → Master** workflow with **squash merges for features** and a **merge commit from Dev to Master** to keep history clean and readable.

---

## Branches

### `master`

* Production-ready branch
* Always stable and deployable
* Receives changes **only** from `dev`

### `dev`

* Integration branch for ongoing development
* Collects completed features
* May be unstable

### `feature/<feature-name>`

* Short-lived branches for individual features or fixes
* Created from `dev`
* Merged back into `dev` via **squash merge**

---

## Workflow

### 1. Create a Feature Branch

```bash
git checkout dev
git pull origin dev
git checkout -b feature/<feature-name>
```

---

### 2. Develop the Feature

* Commit freely in the feature branch
* Keep commits logical and focused
* Rebase on `dev` if needed to stay up to date:

```bash
git fetch origin
git rebase origin/dev
```

---

### 3. Merge Feature into `dev` (Squash)

All feature branches **must be squash-merged** into `dev`.

```bash
git checkout dev
git pull origin dev
git merge --squash feature/<feature-name>
git commit -m "Add <feature-name>"
git push origin dev
```

* Results in **one commit per feature** on `dev`
* Feature branch history does not pollute `dev`

---

### 4. Merge `dev` into `master`

When `dev` is stable and ready for release, merge it into `master` using a commit merge.

```bash
git checkout master
git pull origin master
git merge --no-ff dev
git push origin master
```

* Preserves a clear release boundary
* `master` history shows when development was promoted

---

### 5. Clean Up Feature Branches

After merging:

```bash
git branch -d feature/<feature-name>
git push origin --delete feature/<feature-name>
```

---

## Rules

* No direct commits to `master`
* No direct merges from `feature/*` to `master`
* All features **must** squash merge into `dev`
* `master` must always be deployable

---

## Resulting History

* `feature/*` → squashed into `dev`
* `dev` → merged into `master` via a single merge commit
* Clean, readable Git history with clear feature boundaries

---

If this is going into a real team repo, next step is:

* **branch protection rules**
* **required PR checks**
* **who’s allowed to merge to `master`**

What tooling are you using? GitHub, GitLab, Bitbucket?
