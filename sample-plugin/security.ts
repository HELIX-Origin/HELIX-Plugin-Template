import { SecurityAuditResult, SecurityIssue } from '../types.js';

export function inspectSampleSecurity(code: string): SecurityAuditResult {
  const issues: SecurityIssue[] = [];

  if (/eval\s*\(/.test(code)) {
    issues.push({
      severity: 'critical',
      description: 'Dangerous dynamic evaluation via eval() detected.',
      recommendation: 'Replace eval() with structured JSON.parse() or dedicated parsers.',
    });
  }

  if (/(password|secret|apikey|token)\s*=\s*["'][^"']+["']/i.test(code)) {
    issues.push({
      severity: 'high',
      description: 'Possible hardcoded credential string detected in source code.',
      recommendation: 'Store sensitive keys in environment variables (.env).',
    });
  }

  const score = issues.length === 0 ? 100 : Math.max(20, 100 - issues.length * 40);

  return {
    score,
    issues,
    passed: issues.length === 0,
  };
}
