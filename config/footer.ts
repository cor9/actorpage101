import type { FooterConfig } from "@/types";

export const footerConfig: FooterConfig = {
  links: [
    {
      title: "Product",
      items: [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Templates", href: "/#templates" },
        { title: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Help Center", href: "/help" },
        { title: "Blog", href: "/blog" },
        {
          title: "Child Actor 101",
          href: "https://www.childactor101.com",
          external: true,
        },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About Us", href: "/about" },
        {
          title: "Privacy Policy",
          href: "https://www.childactor101.com/privacy-policy",
          external: true,
        },
        {
          title: "Terms of Service",
          href: "https://www.childactor101.com/terms-and-conditions",
          external: true,
        },
      ],
    },
  ],
};
