/** Site-wide configuration and content constants. */

export const site = {
  name: 'AcePointe',
  tagline: 'Forward-Deployed Data & AI Engineering',
  url: 'https://www.acepointe.com',
  /** Build-time palette: 'crimson' (brand default) | 'ruby' | 'garnet'. */
  palette: 'crimson' as 'crimson' | 'ruby' | 'garnet',
  phone: '602 403 2769',
  phoneHref: 'tel:6024032769',
  email: 'info@acepointe.com',
} as const;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Success stories', href: '/success-stories' },
  { label: 'Approach', href: '/approach' },
  { label: 'Why us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/AcePointe-100980914994319/' },
  { label: 'Twitter', href: 'https://twitter.com/acepointe' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/acepointe/about/' },
] as const;
