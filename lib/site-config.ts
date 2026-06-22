const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "Braided Digital",
  url: configuredUrl || "https://braideddigital.pl",
  email: "ma.atelier.kontakt@gmail.com",
  phone: "+48 730 195 530",
  whatsapp: "https://wa.me/48730195530",
  address: "Chylin 35, 62-710 Władysławów",
} as const;
