export type PanelNavItem = {
  href: string;
  label: string;
  icon: string;
  description: string;
  section: "main" | "tools" | "system";
};

export const panelNavItems: PanelNavItem[] = [
  // Main
  { href: "/panel", label: "Dashboard", icon: "LayoutDashboard", description: "Przegląd aktywności", section: "main" },
  { href: "/panel/klienci", label: "Klienci", icon: "Users", description: "Baza klientów", section: "main" },
  { href: "/panel/wyceny", label: "Wyceny", icon: "Calculator", description: "Kalkulacje i oferty", section: "main" },
  { href: "/panel/projekty", label: "Projekty", icon: "FolderOpen", description: "Aktywne realizacje", section: "main" },
  // Tools
  { href: "/panel/demo", label: "Demo", icon: "Globe", description: "Strony demonstracyjne", section: "tools" },
  { href: "/panel/ai", label: "AI", icon: "Sparkles", description: "Asystent AI", section: "tools" },
  { href: "/panel/wordpress", label: "WordPress", icon: "Layout", description: "Zarządzanie WordPress", section: "tools" },
  { href: "/panel/woocommerce", label: "WooCommerce", icon: "ShoppingBag", description: "Zarządzanie sklepami", section: "tools" },
  // System
  { href: "/panel/ustawienia", label: "Ustawienia", icon: "Settings", description: "Konfiguracja systemu", section: "system" },
];

export const publicNavItems = [
  { href: "/oferta", label: "Oferta" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/wycena", label: "Wycena" },
  { href: "/kontakt", label: "Kontakt" },
];
