import { DocReference } from '../types.js';

const DOCS_DATABASE: Record<string, DocReference> = {
  classes: {
    title: 'SampleLang Classes & OOP',
    url: 'https://github.com/HELIX-Origin/helix-plugin-template#classes',
    summary: 'Classes in SampleLang support constructors, public/private properties, and inheritance.',
    syntax: 'class User {\n  constructor(name: string) {}\n}',
  },
  functions: {
    title: 'SampleLang Functions',
    url: 'https://github.com/HELIX-Origin/helix-plugin-template#functions',
    summary: 'Functions can be defined using the function keyword or concise arrow syntax.',
    syntax: 'const add = (a: number, b: number): number => a + b;',
  },
  variables: {
    title: 'SampleLang Variable Declarations',
    url: 'https://github.com/HELIX-Origin/helix-plugin-template#variables',
    summary: 'Use let for mutable bindings and const for immutable references. Avoid legacy var.',
    syntax: 'const id = 123;\nlet counter = 0;',
  },
};

export function getSampleDocs(topic: string): DocReference[] {
  const key = topic.toLowerCase().trim();
  const match = DOCS_DATABASE[key];
  return match ? [match] : [];
}
