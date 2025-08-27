# Dev Dump

A front-end setup using **Vite** as the bundler and **Sass** with the **7-1 architecture** for structured, maintainable styles.
This is intended as a developer environment, not a production-ready application.

---

## Project Structure

This project follows the **7-1 Sass architecture**:

```
src/
│
├── index.html           # Entry point
├── main.js              # Vite bootstrap file
├── sass/                # All Sass files live here
│   ├── abstracts/       # Variables, functions, mixins
│   ├── base/            # Reset, typography, global styles
│   ├── components/      # Buttons, cards, navbars, etc.
│   ├── layout/          # Header, footer, grid, sections
│   ├── pages/           # Page-specific styles
│   ├── themes/          # Theme files (light/dark)
│   ├── vendors/         # Third-party overrides
│   └── main.scss        # Root Sass file importing everything
```

---

## Getting Started

Install dependencies and start the development server:

```bash
# Install dependencies
npm install

# Run Vite in development mode
npm run dev
```

### What `npm run dev` Does

Running `npm run dev` launches **Vite’s development server**.

* It compiles Sass into CSS.
* It processes and bundles JavaScript.
* It serves the app locally (usually at `http://localhost:5173/`).
* It watches for file changes and **hot reloads** the browser automatically.

This command is for **development only**. It is not intended for deployment.

---

## Build for Production

To create an optimized build:

```bash
npm run build
```

The output will be placed in `/dist`.

---

## Tech Stack

* [Vite](https://vitejs.dev/) — modern, fast build tool
* [Sass](https://sass-lang.com/) — structured styles with 7-1 pattern
* HTML — project foundation

---

## Notes

* Keep Sass modular by placing new files in the correct 7-1 folder.
* Import all partials into `main.scss`.
* Use the dev server (`npm run dev`) during development only.

