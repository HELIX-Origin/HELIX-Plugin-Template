import { LintOutput, LintResult } from '../types.js';

export function lintSampleCode(code: string, fileName = 'code.sample'): LintOutput {
  const startTime = Date.now();
  const lines = code.split('\n');
  const results: LintResult[] = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Rule 1: Check for var keyword (encourage let/const)
    if (/\bvar\s+[a-zA-Z_]/.test(trimmed)) {
      results.push({
        line: lineNum,
        column: line.indexOf('var') + 1,
        message: 'Avoid using "var". Prefer "let" or "const" for block scoping.',
        severity: 'warning',
        rule: 'sample/no-var',
      });
    }

    // Rule 2: Check for unhandled TODO comments
    if (/\bTODO\b/i.test(trimmed)) {
      results.push({
        line: lineNum,
        column: line.search(/\bTODO\b/i) + 1,
        message: 'Unresolved TODO comment found.',
        severity: 'info',
        rule: 'sample/no-todo',
      });
    }

    // Rule 3: Check for empty catch blocks
    if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(trimmed)) {
      results.push({
        line: lineNum,
        column: 1,
        message: 'Empty catch block suppresses runtime exceptions.',
        severity: 'error',
        rule: 'sample/no-empty-catch',
      });
    }
  });

  return {
    fileName,
    language: 'SampleLang',
    results,
    errorCount: results.filter((r) => r.severity === 'error').length,
    warningCount: results.filter((r) => r.severity === 'warning').length,
    durationMs: Date.now() - startTime,
  };
}
