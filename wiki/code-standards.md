
# Frontend Code Standards (SCSS & JavaScript)

These standards exist to keep the codebase predictable, scalable, and maintainable.
Consistency beats cleverness.

---

## SCSS Standards (7–1 Architecture)

### Folder Structure
We follow the canonical **7–1 architecture**.

```

scss/
├── abstracts/   // Variables, mixins, functions
├── base/        // Reset, typography, base elements
├── components/  // Buttons, cards, modals, etc.
├── layout/      // Header, footer, grid, navigation
├── pages/       // Page-specific styles
├── themes/      // Theme variations (e.g. dark mode)
├── vendors/     // Third-party overrides
└── main.scss    // Imports only

````

Rules:
- `main.scss` contains **imports only**
- No CSS rules in `abstracts/`
- Page-specific styles belong **only** in `pages/`

---

### Nesting

Avoid deep nesting.

Rules:

* Max **3 levels deep**
* Prefer flat selectors over nested ones
* Nest only when it reflects true DOM hierarchy

Bad:

```scss
.nav {
  ul {
    li {
      a {}
    }
  }
}
```

Good:

```scss
.nav {}
.nav__item {}
.nav__link {}
```

---

### Variables & Design Tokens

All variables live in `abstracts/_variables.scss`.

Rules:

* No magic numbers
* Use semantic names
* Spacing, colors, fonts must be variables

```scss
$color-primary: #005fcc;
$spacing-md: 1rem;
$font-size-base: 1rem;
```

---

### Mixins & Extend

* Use **mixins** for reusable patterns or logic
* Use `@extend` sparingly and intentionally

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
---

### Property Ordering

Use a consistent order within rules:

1. Positioning
2. Box model
3. Typography
4. Visual styles
5. Misc

```scss
.card {
  position: relative;
  padding: $spacing-lg;

  font-size: $font-size-base;

  background-color: $color-white;
  border-radius: 4px;
}
```

---

## JavaScript Standards

---

### Naming Conventions

Use explicit, readable names.

```js
const isModalOpen = false;

function toggleModal() {}
```

Rules:

* Booleans start with `is`, `has`, or `can`
* Functions are verbs
* Avoid unclear abbreviations


---

### DOM Access

Cache DOM queries.

Bad:

```js
document.querySelector('.card').classList.add('is-active');
```

Good:

```js
const card = document.querySelector('.card');
card.classList.add('is-active');
```

---

### Events

Event handlers should be small and focused.

```js
button.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  toggleModal();
}
```

Rules:

* One handler per concern
* Avoid inline anonymous functions for complex logic

---

## Tooling & Enforcement

Standards must be enforced automatically.

Required tools:

* **Prettier** – formatting
* **ESLint** – JavaScript linting
* **Stylelint** – SCSS linting


---
