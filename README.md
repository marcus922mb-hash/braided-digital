# Braided Digital

Profesjonalna, wielostronicowa witryna usługowa Braided Digital. Projekt prezentuje ofertę tworzenia stron, sklepów internetowych, linków w bio oraz wsparcia WordPress i WooCommerce dla małych firm i marek handmade.

## Technologie

- Next.js 16 z App Routerem
- React 19
- TypeScript
- Tailwind CSS 4
- statyczne generowanie stron (SSG)

## Uruchomienie lokalne

Wymagany jest Node.js 20.9 lub nowszy.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Strona będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

## Kontrola jakości

```bash
npm run lint
npm run build
```

Oba polecenia wykonuje również skrót:

```bash
npm run check
```

## Konfiguracja

Projekt nie wymaga sekretów ani bazy danych. Dostępna jest jedna publiczna zmienna:

```env
NEXT_PUBLIC_SITE_URL=https://braideddigital.pl
```

Ustaw ją w Vercel dla środowiska Production, jeżeli docelowa domena będzie inna. Zmienna jest używana w metadatach SEO, `robots.txt` i `sitemap.xml`.

## Publikacja na GitHub

Po utworzeniu pustego repozytorium na GitHub:

```bash
git remote add origin https://github.com/NAZWA-UZYTKOWNIKA/braided-digital.git
git push -u origin main
```

Workflow w `.github/workflows/ci.yml` automatycznie uruchamia lint i build dla każdego push oraz pull requestu do gałęzi `main`.

## Wdrożenie na Vercel

1. Zaloguj się do Vercel i wybierz **Add New → Project**.
2. Zaimportuj repozytorium `braided-digital` z GitHub.
3. Framework Preset pozostaw jako **Next.js**.
4. Build Command pozostaw jako `next build`, a Output Directory bez zmian.
5. Dodaj `NEXT_PUBLIC_SITE_URL` w **Environment Variables**.
6. Kliknij **Deploy**.
7. Po podpięciu własnej domeny zaktualizuj wartość zmiennej i wykonaj redeploy.

Vercel będzie automatycznie tworzyć podgląd dla pull requestów i wdrażać produkcję po pushu do `main`.

## Ważne adresy

- `/oferta` - zakres usług
- `/portfolio` - case study MA Atelier
- `/cennik` - pakiety i prezentacje demo
- `/regulamin` - regulamin usług
- `/polityka-prywatnosci` - polityka prywatności
- `/polityka-cookies` - polityka cookies

© Braided Digital
