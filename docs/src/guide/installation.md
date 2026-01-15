# Setup

## Project Structure

This repository contains several key directories and configurations:

### `.github/` - GitHub Automation
Contains GitHub-specific configurations:
- **PULL_REQUEST_TEMPLATE.md** - Template for pull request descriptions
- **workflows/main.yml** - GitHub Actions workflow for automatic wiki deployment (triggered on push to master branch)
- **workflows/mdbook.yml** - GitHub Actions workflow for building and deploying mdBook documentation to GitHub Pages

### `azure-pipelines/` - Azure DevOps CI/CD
Contains Azure Pipeline definitions for the deployment lifecycle:
- **pr-dev-link.yml** - Do a code check

### `dist/` - Distribution Output
Build output directory where compiled assets are placed (e.g., compiled CSS from SASS).

### `docs/` - mdBook Documentation
Contains the mdBook documentation source:
- **src/** - Documentation markdown files
- **SUMMARY.md** - Table of contents for the documentation
- **guide/** - User guides including this installation guide

The documentation is automatically built and deployed to GitHub Pages via the mdBook GitHub Actions workflow.

### `wiki/` - Project Wiki
Contains wiki content that is automatically deployed to the GitHub repository wiki:
- **branch-strategy.md** - Git branching strategy documentation
- **code-standards.md** - Coding standards and guidelines

Changes to the wiki folder on the master branch automatically trigger deployment via GitHub Actions.

### `src/` - Source Code
Contains the source code for the project:
- **main.scss** - Main SASS stylesheet entry point

### Development Configuration
- **package.json** - Node.js dependencies and scripts including SASS compilation and Prettier formatting
- Available npm scripts:
  - `npm run dev` - Watch and compile SASS files
  - `npm run format` - Format code with Prettier

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`