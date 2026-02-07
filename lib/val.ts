export type ValTheme = 'rose' | 'peach' | 'midnight';

export type ValPayload = {
  toName: string;
  fromName: string;
  message: string;
  theme: ValTheme;
  createdAt: string;
};

export const themeOptions: Array<{
  id: ValTheme;
  label: string;
  accent: string;
  background: string;
  card: string;
  glow: string;
}> = [
  {
    id: 'rose',
    label: 'Rose',
    accent: '#ff4f8b',
    background: 'radial-gradient(circle at 20% 20%, #ffd3e1 0%, #fff4f8 45%, #ffe7f0 100%)',
    card: 'rgba(255, 255, 255, 0.72)',
    glow: 'rgba(255, 79, 139, 0.35)'
  },
  {
    id: 'peach',
    label: 'Peach',
    accent: '#ff7a5c',
    background: 'radial-gradient(circle at 80% 10%, #ffe0d6 0%, #fff4ed 45%, #ffe9de 100%)',
    card: 'rgba(255, 255, 255, 0.74)',
    glow: 'rgba(255, 122, 92, 0.32)'
  },
  {
    id: 'midnight',
    label: 'Midnight',
    accent: '#8b7bff',
    background: 'radial-gradient(circle at 10% 20%, #2b2240 0%, #160f24 55%, #120b1e 100%)',
    card: 'rgba(20, 14, 32, 0.72)',
    glow: 'rgba(139, 123, 255, 0.4)'
  }
];

export function getTheme(id: ValTheme | string | undefined) {
  return themeOptions.find((theme) => theme.id === id) ?? themeOptions[0];
}

function toBase64Url(bytes: Uint8Array) {
  const base64 =
    typeof Buffer !== 'undefined'
      ? Buffer.from(bytes).toString('base64')
      : btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(token: string) {
  const padded = token.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(token.length / 4) * 4, '=');
  if (typeof Buffer !== 'undefined') {
    return Uint8Array.from(Buffer.from(padded, 'base64'));
  }
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeVal(payload: ValPayload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  return toBase64Url(bytes);
}

export function decodeVal(token: string): ValPayload | null {
  try {
    const bytes = fromBase64Url(token);
    const json = new TextDecoder().decode(bytes);
    const data = JSON.parse(json) as ValPayload;
    if (
      !data ||
      typeof data.toName !== 'string' ||
      typeof data.fromName !== 'string' ||
      typeof data.message !== 'string' ||
      typeof data.theme !== 'string'
    ) {
      return null;
    }
    return {
      toName: data.toName.slice(0, 60).trim(),
      fromName: data.fromName.slice(0, 60).trim(),
      message: data.message.slice(0, 800).trim(),
      theme: data.theme as ValTheme,
      createdAt: data.createdAt ?? new Date(0).toISOString()
    };
  } catch {
    return null;
  }
}
