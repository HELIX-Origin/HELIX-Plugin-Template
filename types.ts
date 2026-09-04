/**
 * Standard HELIX Plugin SDK Types
 * Defines the contract for all HELIX language plugins and custom source providers.
 */

export type PluginCapability =
  | 'lint'
  | 'explain'
  | 'fixes'
  | 'docs'
  | 'format'
  | 'patterns'
  | 'debug'
  | 'generate'
  | 'refactor'
  | 'inspect';

export interface LintResult {
  line: number;
  column?: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  rule?: string;
}

export interface LintOutput {
  fileName: string;
  language: string;
  results: LintResult[];
  errorCount: number;
  warningCount: number;
  durationMs?: number;
}

export interface ExplainSection {
  title: string;
  description: string;
}

export interface ExplainOutput {
  summary: string;
  concepts: string[];
  complexity?: 'Low' | 'Medium' | 'High';
  sections?: ExplainSection[];
}

export interface DocReference {
  title: string;
  url: string;
  summary: string;
  syntax?: string;
}

export interface DebugDiagnostic {
  errorType: string;
  summary: string;
  cause: string;
  fixes: string[];
  codeSample?: string;
}

export interface SnippetGeneration {
  fileName: string;
  description: string;
  code: string;
}

export interface RefactorOutput {
  description: string;
  changes: string[];
  refactoredCode: string;
}

export interface SecurityIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  line?: number;
}

export interface SecurityAuditResult {
  score: number;
  issues: SecurityIssue[];
  passed: boolean;
}

export interface SourceProviderResolution {
  rawFetchUrl: string;
  origin: string;
  label: string;
  detectedLanguage?: string;
}

export interface SourceProvider {
  id: string;
  name: string;
  domains: string[];
  canHandle(url: URL): boolean;
  resolve(url: URL): SourceProviderResolution;
}

export interface LanguagePlugin {
  id: string;
  name: string;
  version: string;
  fileExtensions: string[];
  capabilities: PluginCapability[];

  lint(code: string, fileName?: string): Promise<LintOutput> | LintOutput;
  explain(code: string): Promise<ExplainOutput> | ExplainOutput;
  getDocumentation(topic: string): Promise<DocReference[]> | DocReference[];

  debug?(errorLog: string, codeContext?: string): Promise<DebugDiagnostic> | DebugDiagnostic;
  generate?(type: string, name: string, options?: Record<string, any>): Promise<SnippetGeneration> | SnippetGeneration;
  refactor?(code: string, rule?: string): Promise<RefactorOutput> | RefactorOutput;
  inspect?(code: string): Promise<SecurityAuditResult> | SecurityAuditResult;
  suggestFixes?(errors: LintResult[]): Promise<any[]> | any[];
  format?(code: string): Promise<string> | string;
}
