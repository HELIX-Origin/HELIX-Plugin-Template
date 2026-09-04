import {
  LanguagePlugin,
  PluginCapability,
  LintOutput,
  ExplainOutput,
  DocReference,
  DebugDiagnostic,
  SnippetGeneration,
  RefactorOutput,
  SecurityAuditResult,
} from '../types.js';
import { lintSampleCode } from './linter.js';
import { debugSampleError } from './diagnostics.js';
import { generateSampleSnippet } from './generator.js';
import { refactorSampleCode } from './refactor.js';
import { inspectSampleSecurity } from './security.js';
import { getSampleDocs } from './docs.js';

export class SampleLanguagePlugin implements LanguagePlugin {
  public readonly id = 'sample-plugin';
  public readonly name = 'SampleLang';
  public readonly version = '1.0.0';
  public readonly fileExtensions = ['.sample', '.smp'];
  public readonly capabilities: PluginCapability[] = [
    'lint',
    'explain',
    'docs',
    'debug',
    'generate',
    'refactor',
    'inspect',
  ];

  public async lint(code: string, fileName = 'code.sample'): Promise<LintOutput> {
    return lintSampleCode(code, fileName);
  }

  public async explain(code: string): Promise<ExplainOutput> {
    const lines = code.split('\n').filter((l) => l.trim().length > 0);
    const hasClass = /class\s+[a-zA-Z_]/.test(code);
    const hasFunction = /function\s+|=>/.test(code);

    return {
      summary: `SampleLang program with ${lines.length} lines of code.`,
      concepts: [
        hasClass ? 'Object-Oriented Programming (Classes)' : 'Procedural / Scripting',
        hasFunction ? 'Function Definitions' : 'Top-level Statements',
      ],
      complexity: lines.length > 50 ? 'High' : lines.length > 20 ? 'Medium' : 'Low',
      sections: [
        {
          title: 'Program Structure',
          description: hasClass
            ? 'Defines modular classes and methods.'
            : 'Contains standalone function routines.',
        },
      ],
    };
  }

  public async getDocumentation(topic: string): Promise<DocReference[]> {
    return getSampleDocs(topic);
  }

  public async debug(errorLog: string, codeContext?: string): Promise<DebugDiagnostic> {
    return debugSampleError(errorLog, codeContext);
  }

  public async generate(type: string, name: string, options?: Record<string, any>): Promise<SnippetGeneration> {
    return generateSampleSnippet(type, name);
  }

  public async refactor(code: string, rule?: string): Promise<RefactorOutput> {
    return refactorSampleCode(code, rule);
  }

  public async inspect(code: string): Promise<SecurityAuditResult> {
    return inspectSampleSecurity(code);
  }
}

// Export named instance and default
export const samplePlugin = new SampleLanguagePlugin();
export default samplePlugin;
