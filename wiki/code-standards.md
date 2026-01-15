
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

Reference:  
https://sass-guidelin.es/#the-7-1-pattern

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

Reference:
[https://sass-guidelin.es/#nesting](https://sass-guidelin.es/#nesting)

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

Reference:
[https://sass-guidelin.es/#variables](https://sass-guidelin.es/#variables)

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

Reference:
[https://sass-guidelin.es/#mixins](https://sass-guidelin.es/#mixins)

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

Reference:
[https://google.github.io/styleguide/jsguide.html#naming](https://google.github.io/styleguide/jsguide.html#naming)

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

Reference:
[https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

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

### Styling from JavaScript

JavaScript **toggles classes only**.

```js
element.classList.add('is-active');
```

Never:

```js
element.style.display = 'none';
```

SCSS owns styling. JavaScript controls state.

Reference:
[https://css-tricks.com/decoupling-html-css-and-javascript/](https://css-tricks.com/decoupling-html-css-and-javascript/)

---

## Tooling & Enforcement

Standards must be enforced automatically.

Required tools:

* **Prettier** – formatting
* **ESLint** – JavaScript linting
* **Stylelint** – SCSS linting

References:

* [https://prettier.io/](https://prettier.io/)
* [https://eslint.org/](https://eslint.org/)
* [https://stylelint.io/](https://stylelint.io/)

Manual formatting and unchecked styles are not acceptable.

---
