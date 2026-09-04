# HELIX Plugin Starter Template

[![Validate Plugins](https://github.com/HELIX-Origin/helix-plugin-template/actions/workflows/validate-plugin.yml/badge.svg)](https://github.com/HELIX-Origin/helix-plugin-template/actions/workflows/validate-plugin.yml)
[![Node.js >=22.0.0](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-339933?style=plastic&logo=node.js&logoColor=white)](https://nodejs.org)
[![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg?style=plastic)](LICENSE)

Official starter template for building, testing, and distributing language plugins and custom source providers for the [HELIX Discord Bot](https://github.com/HELIX-Origin/HELIX-Discord-Bot).

---

## 🚀 Quick Start: Creating Your Plugin Repository

### 1. Use this GitHub Template
Click the **[Use this template](https://github.com/HELIX-Origin/helix-plugin-template/generate)** button on GitHub to create a new repository in your GitHub account (e.g. `yourname/helix-my-plugins`).

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/yourname/helix-my-plugins.git
cd helix-my-plugins
npm install
```

### 3. Run the Test Suite
```bash
# Run all unit tests with Vitest
npm test

# Run TypeScript strict typecheck
npm run typecheck
```

---

## 📁 Repository Structure

```
helix-my-plugins/
├── .github/
│   └── workflows/
│       └── validate-plugin.yml    # Automated CI workflow on push & pull requests
├── config.json                    # Root repository manifest declaring all plugins
├── types.ts                       # Standard HELIX Plugin SDK type contracts
├── sample-plugin/                 # Complete Example Language Plugin
│   ├── plugin.json                # Plugin metadata & capability declarations
│   ├── index.ts                   # Entry point exporting LanguagePlugin class
│   ├── linter.ts                  # Static analysis & AST rule engine (>lint)
│   ├── diagnostics.ts             # Runtime error stack trace debugger (>debug)
│   ├── generator.ts               # Code snippet & module generator (>generate)
│   ├── refactor.ts                # Code modernization & refactoring (>refactor)
│   ├── security.ts                # Security & vulnerability inspection (>inspect)
│   ├── docs.ts                    # Offline documentation lookup (>docs)
│   └── tests/
│       └── sample-plugin.test.ts  # Vitest unit test suite (100% passing)
└── source-provider-example/       # (Optional) Custom SourceProvider example
    ├── plugin.json                # Source provider manifest
    ├── provider.ts                # Custom URL resolver & fetcher
    └── tests/
        └── provider.test.ts       # Vitest test suite for URL parsing
```

---

## 🛠️ Developing Your Plugin

### 1. Update `config.json`
Edit `config.json` at the root of your repository to declare your repository slug, description, and plugin directories:

```json
{
  "repository": "yourname/helix-my-plugins",
  "name": "My Custom Language Plugins",
  "version": "1.0.0",
  "description": "Custom language intelligence plugins for HELIX",
  "author": "YourName",
  "plugins": [
    {
      "id": "my-lang",
      "path": "./my-lang"
    }
  ],
  "sourceProviders": [
    {
      "id": "my-host",
      "path": "./source-provider-example"
    }
  ]
}
```

### 2. Configure `plugin.json`
Inside your plugin directory (e.g. `my-lang/plugin.json`), declare your language metadata and capability matrix:

```json
{
  "id": "my-lang",
  "name": "MyLanguage",
  "version": "1.0.0",
  "description": "Static linting, documentation, and diagnostics for MyLanguage",
  "author": "YourName",
  "fileExtensions": [".mylang", ".ml"],
  "entry": "index.ts",
  "capabilities": [
    "lint",
    "explain",
    "docs",
    "debug",
    "generate",
    "refactor",
    "inspect"
  ],
  "dependencies": [],
  "repository": "https://github.com/yourname/helix-my-plugins"
}
```

### 3. Implement the `LanguagePlugin` Class
In `my-lang/index.ts`, implement the standard `LanguagePlugin` interface from `./types.js`:

```typescript
import { LanguagePlugin, LintOutput, DebugDiagnostic, CodeExplanation, DocEntry } from '../types.js';

export class MyLanguagePlugin implements LanguagePlugin {
  public readonly id = 'my-lang';
  public readonly name = 'MyLanguage';
  public readonly version = '1.0.0';
  public readonly fileExtensions = ['.mylang', '.ml'];
  public readonly capabilities = ['lint', 'explain', 'docs', 'debug', 'generate', 'refactor', 'inspect'];

  public async lint(code: string, fileName = 'code.mylang'): Promise<LintOutput> {
    // AST / regex static analysis
  }

  public async explain(code: string): Promise<CodeExplanation> {
    // Structural analysis: imports, exports, functions, complexity
  }

  public async debug(errorLog: string, codeContext?: string): Promise<DebugDiagnostic> {
    // Error stack trace parsing, root cause analysis, and suggested fix
  }

  public async generate(templateName: string, options?: Record<string, unknown>): Promise<string> {
    // Deterministic boilerplate/module generator
  }

  public async refactor(code: string, refactorType: string): Promise<string> {
    // Deterministic modernization and transformation
  }

  public async inspect(code: string): Promise<{ score: number; issues: string[]; suggestions: string[] }> {
    // Code quality, security check, and complexity metrics
  }

  public async getDocumentation(query: string): Promise<DocEntry | null> {
    // Offline documentation reference lookup
  }
}

export default new MyLanguagePlugin();
```

---

## 🌐 Installing Your Plugin in Discord

Once your repository is pushed to a public GitHub repository:

```bash
# In any Discord channel where the HELIX bot is invited:
>plugin install yourname/helix-my-plugins

# List installed plugins:
>plugin list

# View plugin details:
>plugin info my-lang

# Check for and install updates:
>plugin update
```

Commands like `>lint`, `>explain`, `>debug`, `>refactor`, `>generate`, `>inspect`, and `>docs` will now immediately process your language's files and codeblocks!

---

## 📚 Further Reading & References

- [HELIX Discord Bot Repository](https://github.com/HELIX-Origin/HELIX-Discord-Bot)
- [Plugin Authoring Guide](https://github.com/HELIX-Origin/HELIX-Discord-Bot/blob/main/docs/plugin-authoring.md)
- [Plugin Repository Specification](https://github.com/HELIX-Origin/HELIX-Discord-Bot/blob/main/docs/plugin-repository-structure.md)
- [Zero-AI Plugin Architecture](https://github.com/HELIX-Origin/HELIX-Discord-Bot/blob/main/docs/plugin-system.md)

---

## 📜 License
Released under the [BSD 3-Clause License](LICENSE). Copyright (c) 2026 HELIX-Origin & Contributors.
