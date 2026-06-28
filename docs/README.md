# MA Atelier Studio — Dokumentacja projektu

## Przegląd

MA Atelier Studio to platforma oparta na Next.js App Router składająca się z:

- **Publiczna strona** (`/`) — strona sprzedażowa Braided Digital
- **Panel administracyjny** (`/panel`) — prywatny panel zarządzania
- **Demo** (`/demo/[slug]`) — dynamiczne strony demonstracyjne dla klientów

## Stack technologiczny

| Technologia       | Wersja  | Zastosowanie               |
|-------------------|---------|----------------------------|
| Next.js           | 16.x    | Framework, App Router      |
| React             | 19.x    | UI                         |
| TypeScript        | 5.x     | Typowanie                  |
| Tailwind CSS      | 4.x     | Stylowanie                 |
| Framer Motion     | 12.x    | Animacje                   |
| lucide-react      | 1.x     | Ikony                      |
| shadcn/ui         | —       | Komponenty bazowe          |

## Struktura katalogów

```
app/
  (site)/          — publiczna strona (layout: Header + Footer)
  panel/           — panel administracyjny (layout: Sidebar + Topbar)
  api/             — endpointy API

components/
  panel/           — komponenty panelu (shell, sidebar, topbar)
  public/          — komponenty strony publicznej
  demo/            — komponenty demo
  forms/           — formularze
  ma-web/          — strona MA Atelier Web (osobna)
  ui.tsx           — wspólne komponenty publiczne (PageHero, itp.)

config/
  navigation.ts    — definicje menu (panel + publiczne)
  app.ts           — konfiguracja aplikacji
  theme.ts         — tokeny kolorystyczne
  demoTemplates.ts — szablony stron demo

types/
  client.ts        — model klienta
  estimate.ts      — model wyceny
  demo.ts          — model demo
  project.ts       — model projektu

lib/
  utils/           — cn(), formatDate(), formatCurrency()
  constants/       — stałe (etykiety statusów, ścieżki)
  helpers/         — slugify(), generateId(), truncate()
  api/             — apiFetch() wrapper
  auth/            — stub autentykacji
  data.ts          — dane publicznej strony
  types.ts         — typy formularza wyceny publicznej
  seo.ts           — canonical URL helper
  site-config.ts   — konfiguracja domeny i kontaktu

docs/
  README.md        — ten plik
  supabase-setup.md — konfiguracja Supabase i logowania
```

## Routing

### Publiczne

| Ścieżka                     | Plik                                |
|-----------------------------|-------------------------------------|
| `/`                         | `app/(site)/page.tsx`               |
| `/oferta`                   | `app/(site)/oferta/page.tsx`        |
| `/portfolio`                | `app/(site)/portfolio/page.tsx`     |
| `/wycena`                   | `app/(site)/wycena/page.tsx`        |
| `/kontakt`                  | `app/(site)/kontakt/page.tsx`       |
| `/cennik`                   | `app/(site)/cennik/page.tsx`        |
| `/proces`                   | `app/(site)/proces/page.tsx`        |
| `/o-mnie`                   | `app/(site)/o-mnie/page.tsx`        |
| `/faq`                      | `app/(site)/faq/page.tsx`           |
| `/demo/[slug]`              | `app/(site)/demo/[slug]/page.tsx`   |

### Panel

| Ścieżka                     | Plik                                |
|-----------------------------|-------------------------------------|
| `/panel`                    | `app/panel/page.tsx`                |
| `/panel/klienci`            | `app/panel/klienci/page.tsx`        |
| `/panel/wyceny`             | `app/panel/wyceny/page.tsx`         |
| `/panel/demo`               | `app/panel/demo/page.tsx`           |
| `/panel/projekty`           | `app/panel/projekty/page.tsx`       |
| `/panel/ustawienia`         | `app/panel/ustawienia/page.tsx`     |

## Etapy rozwoju

- **Etap 1 (obecny)** — Fundament: routing, layout panelu, typy, config, lib stubs
- **Etap 2** — CRM: moduł klientów, wyceny, projekty
- **Etap 3** — Demo: generator stron demonstracyjnych
- **Etap 4** — Integracje: AI, WordPress, powiadomienia
