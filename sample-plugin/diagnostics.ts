import { DebugDiagnostic } from '../types.js';

export function debugSampleError(errorLog: string, codeContext?: string): DebugDiagnostic {
  if (errorLog.includes('NullPointerException') || errorLog.includes('cannot read property of undefined')) {
    return {
      errorType: 'NullReferenceError',
      summary: 'Attempted to access a property or method on a null/undefined value.',
      cause: 'The target object was not initialized or returned null before member access.',
      fixes: [
        'Add a null/undefined guard before accessing properties: `if (obj) { obj.prop }`',
        'Use safe navigation or optional chaining operators if supported.',
        'Ensure object initializers provide default values.',
      ],
      codeSample: 'if (data && data.user) {\n  console.log(data.user.name);\n}',
    };
  }

  if (errorLog.includes('SyntaxError') || errorLog.includes('unexpected token')) {
    return {
      errorType: 'SyntaxParseError',
      summary: 'Syntax error encountered during parsing.',
      cause: 'Mismatched brackets, unclosed string literals, or missing semicolons.',
      fixes: [
        'Check matching parentheses `()`, brackets `[]`, and braces `{}`.',
        'Verify string quotes are properly escaped and closed.',
      ],
    };
  }

  return {
    errorType: 'RuntimeDiagnostic',
    summary: 'Generic runtime execution exception.',
    cause: 'Error log does not match common known crash patterns.',
    fixes: [
      'Inspect the stack trace line number in codeContext.',
      'Log intermediate state values prior to the failing expression.',
    ],
  };
}
