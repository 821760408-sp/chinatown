export const SITE = {
  title: 'Chinatown Gao',
  description: 'Portfolio, writing, and small web experiments.',
  author: 'Chinatown Gao',
};

/** Prefix an internal path with the configured base (needed for GitHub Pages project sites). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
