export function getVariantHomeHref(): string {
  if (typeof window === 'undefined') return '/';
  const slug = sessionStorage.getItem('variantSlug');
  return slug ? `/?v=${slug}` : '/';
}
