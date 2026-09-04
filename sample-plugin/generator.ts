import { SnippetGeneration } from '../types.js';

export function generateSampleSnippet(type: string, name: string): SnippetGeneration {
  const normType = type.toLowerCase();

  if (normType === 'class' || normType === 'module') {
    return {
      fileName: `${name}.sample`,
      description: `SampleLang Module for ${name}`,
      code: `// SampleLang Module: ${name}
export class ${name} {
  constructor(public id: string) {}

  public execute(): void {
    console.log("Executing " + this.id);
  }
}
`,
    };
  }

  return {
    fileName: `${name}.sample`,
    description: `Standard SampleLang Script: ${name}`,
    code: `// SampleLang Script: ${name}
function main() {
  const message = "Hello from ${name}!";
  console.log(message);
}

main();
`,
  };
}
