# HELIX Plugin Starter Template

[![Validate Plugins](https://github.com/HELIX-Origin/helix-plugin-template/actions/workflows/validate-plugin.yml/badge.svg)](https://github.com/HELIX-Origin/helix-plugin-template/actions/workflows/validate-plugin.yml)
[![Node.js >=22.0.0](https://img.shields.io/badge/Node.js-%3E%3D22.0.0-339933?style=plastic&logo=node.js&logoColor=white)](https://nodejs.org)
[![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg?style=plastic)](LICENSE)

Official starter template for building, testing, and distributing language plugins and custom source providers for the [HELIX Discord Bot](https://github.com/HELIX-Origin/HELIX).

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
# Run all unit tests
npm test

# Run TypeScript typechecks
npm run typecheck
```

---

## 📁 Repository Structure

```
helix-my-plugins/
├── .github/
│   └── workflows/
│       └── validate-plugin.yml    # Automated CI matrix on push/PR
├── config.json                    # Root manifest declaring plugins
├── types.ts                       # Standard HELIX Plugin SDK Types
├── sample-plugin/                 # Example Language Plugin
│   ├── plugin.json                # Plugin metadata & capability declarations
│   ├── index.ts                   # Entry point exporting LanguagePlugin class
│   ├── linter.ts                  # Static analysis & AST rule engine
│   ├── diagnostics.ts             # Runtime error stack trace debugger
│   ├── generator.ts               # Code snippet & module generator
│   ├── refactor.ts                # Code modernization & refactoring
│   ├── security.ts                # Security & vulnerability inspection
│   ├── docs.ts                    # Offline documentation lookup
│   └── tests/
│       └── sample-plugin.test.ts  # Vitest unit test suite
└── source-provider-example/       # (Optional) Custom SourceProvider
    ├── plugin.json
    ├── provider.ts
    └── tests/
        └── provider.test.ts
```

---

## 🛠️ Developing Your Plugin

### 1. Update `config.json`
Edit `config.json` to declare your repository name and list your plugin directories:

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
  ]
}
```

### 2. Configure `plugin.json`
Inside your plugin folder (e.g. `my-lang/plugin.json`), declare your capabilities:

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
In `my-lang/index.ts`, implement the standard `LanguagePlugin` interface from `../types.js`:

```typescript
import { LanguagePlugin, LintOutput, DebugDiagnostic } from '../types.js';

export class MyLanguagePlugin implements LanguagePlugin {
  public readonly id = 'my-lang';
  public readonly name = 'MyLanguage';
  public readonly version = '1.0.0';
  public readonly fileExtensions = ['.mylang', '.ml'];
  public readonly capabilities = ['lint', 'explain', 'docs', 'debug', 'generate', 'refactor', 'inspect'];

  public async lint(code: string, fileName = 'code.mylang'): Promise<LintOutput> {
    // Implement AST / regex static analysis
  }

  public async debug(errorLog: string, codeContext?: string): Promise<DebugDiagnostic> {
    // Analyze error stack trace and provide fixes
  }

  // Implement explain, getDocumentation, generate, refactor, inspect ...
}

export default new MyLanguagePlugin();
```

---

## 🌐 Installing Your Plugin in Discord

Once your repository is published to GitHub:

```bash
# In any Discord server where HELIX is invited:
>plugin install yourname/helix-my-plugins

# Verify installation:
>plugin list
>plugin info my-lang
```

Commands like `>lint`, `>explain`, `>debug`, `>refactor`, `>generate`, `>inspect`, and `>docs` will now immediately handle your language files!

---

## 📜 License
Released under the [BSD 3-Clause License](LICENSE).
