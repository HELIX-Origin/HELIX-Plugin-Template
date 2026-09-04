import { describe, it, expect } from 'vitest';
import { customPasteSourceProvider } from '../provider.js';

describe('CustomSourceProvider', () => {
  it('identifies handled domains', () => {
    const url1 = new URL('https://mypaste.example.com/p/abc123');
    const url2 = new URL('https://other.com/code');

    expect(customPasteSourceProvider.canHandle(url1)).toBe(true);
    expect(customPasteSourceProvider.canHandle(url2)).toBe(false);
  });

  it('resolves raw fetch URL and metadata', () => {
    const url = new URL('https://mypaste.example.com/p/script99.smp');
    const res = customPasteSourceProvider.resolve(url);

    expect(res.rawFetchUrl).toBe('https://mypaste.example.com/raw/script99.smp');
    expect(res.origin).toBe('custom-paste');
    expect(res.detectedLanguage).toBe('sample-plugin');
  });
});
