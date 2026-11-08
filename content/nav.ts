export type NavItem = { label: string; href: string };

/** Primary desktop navigation (Services dropdown is rendered separately, first). */
export const primaryNav: NavItem[] = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Mobile drawer top-level items. */
export const drawerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  ...primaryNav,
];

export const footerCompany: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Request a booking", href: "/book" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
