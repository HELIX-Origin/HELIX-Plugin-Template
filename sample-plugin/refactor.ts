import { RefactorOutput } from '../types.js';

export function refactorSampleCode(code: string, rule?: string): RefactorOutput {
  const changes: string[] = [];
  let refactored = code;

  // Refactor var -> const/let
  if (/\bvar\s+/.test(refactored)) {
    refactored = refactored.replace(/\bvar\s+/g, 'const ');
    changes.push('Replaced legacy "var" declarations with "const"');
  }

  // Refactor function declarations to arrow functions
  if (rule === 'arrow-functions') {
    refactored = refactored.replace(/function\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g, 'const $1 = ($2) => {');
    changes.push('Converted function declarations to arrow functions');
  }

  return {
    description: 'Modernized SampleLang syntax and variable declarations',
    changes: changes.length > 0 ? changes : ['No automatic refactoring patterns applied'],
    refactoredCode: refactored,
  };
}
