import { describe, it, expect } from 'vitest';
import { SampleLanguagePlugin } from '../index.js';

describe('SampleLanguagePlugin', () => {
  const plugin = new SampleLanguagePlugin();

  it('declares valid plugin metadata and capabilities', () => {
    expect(plugin.id).toBe('sample-plugin');
    expect(plugin.name).toBe('SampleLang');
    expect(plugin.fileExtensions).toContain('.sample');
    expect(plugin.capabilities).toContain('lint');
    expect(plugin.capabilities).toContain('debug');
  });

  it('lints code and detects warnings for var usage', async () => {
    const code = 'var x = 10;\nTODO: optimize this\n';
    const output = await plugin.lint(code);

    expect(output.language).toBe('SampleLang');
    expect(output.warningCount).toBe(1);
    expect(output.results[0].rule).toBe('sample/no-var');
  });

  it('detects empty catch blocks as errors', async () => {
    const code = 'try { doSomething(); } catch (err) {}';
    const output = await plugin.lint(code);

    expect(output.errorCount).toBe(1);
    expect(output.results[0].severity).toBe('error');
  });

  it('debugs runtime NullReference errors', async () => {
    const errorLog = 'TypeError: cannot read property of undefined (reading "name")';
    const diag = await plugin.debug(errorLog);

    expect(diag.errorType).toBe('NullReferenceError');
    expect(diag.fixes.length).toBeGreaterThan(0);
    expect(diag.codeSample).toBeDefined();
  });

  it('generates boilerplate modules and classes', async () => {
    const snippet = await plugin.generate('class', 'UserService');
    expect(snippet.fileName).toBe('UserService.sample');
    expect(snippet.code).toContain('class UserService');
  });

  it('refactors legacy var to const', async () => {
    const code = 'var message = "hello";';
    const refactored = await plugin.refactor(code);
    expect(refactored.refactoredCode).toContain('const message = "hello";');
  });

  it('inspects code for security vulnerabilities', async () => {
    const insecureCode = 'const data = eval(userInput);\nconst apikey = "secret_12345";';
    const audit = await plugin.inspect(insecureCode);

    expect(audit.passed).toBe(false);
    expect(audit.issues.length).toBe(2);
    expect(audit.score).toBeLessThan(100);
  });

  it('returns documentation for valid topics', async () => {
    const docs = await plugin.getDocumentation('classes');
    expect(docs.length).toBe(1);
    expect(docs[0].title).toContain('Classes');
  });
});
