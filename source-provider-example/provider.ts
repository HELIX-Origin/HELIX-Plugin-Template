import { SourceProvider, SourceProviderResolution } from '../types.js';

export const customPasteSourceProvider: SourceProvider = {
  id: 'custom-paste',
  name: 'Custom Paste Provider',
  domains: ['mypaste.example.com', 'paste.mycompany.org'],

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return this.domains.includes(host);
  },

  resolve(url: URL): SourceProviderResolution {
    const host = url.hostname.toLowerCase();
    const pathname = url.pathname;

    // Example transformation: https://mypaste.example.com/p/12345 -> https://mypaste.example.com/raw/12345
    let rawFetchUrl = url.toString();
    if (pathname.startsWith('/p/')) {
      rawFetchUrl = `https://${host}/raw/${pathname.slice(3)}`;
    }

    return {
      rawFetchUrl,
      origin: 'custom-paste',
      label: `Custom Paste (${host}${pathname})`,
      detectedLanguage: pathname.endsWith('.smp') ? 'sample-plugin' : undefined,
    };
  },
};

export default customPasteSourceProvider;
