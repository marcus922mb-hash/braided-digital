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

### Zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i uzupełnij wartości:

```env
# Publiczny adres produkcyjny (wymagany dla SEO)
NEXT_PUBLIC_SITE_URL=https://web.ma-atelier.pl

# Resend — wysyłanie maili po wypełnieniu kalkulatora wyceny (opcjonalne)
RESEND_API_KEY=re_xxxxxxxxxx
```

#### `NEXT_PUBLIC_SITE_URL`
Używana w metadatach SEO, `robots.txt` i `sitemap.xml`. Ustaw w Vercel dla środowiska Production.

#### `RESEND_API_KEY` — jak aktywować maile

1. Utwórz konto na [resend.com](https://resend.com).
2. Zweryfikuj domenę `braideddigital.pl` (DNS → SPF/DKIM).
3. Wygeneruj klucz API i dodaj go jako zmienną środowiskową `RESEND_API_KEY`.
4. Domyślnie maile trafiają na `ma.atelier.kontakt@gmail.com`. Zmień to w `lib/email.ts` jeśli potrzeba.
5. Bez ustawionego klucza system działa normalnie — dane leada trafiają tylko do konsoli serwera.

## Kalkulator wyceny (`/wycena`)

### Jak przetestować formularz lokalnie

```bash
npm run dev
# Otwórz http://localhost:3000/wycena
```

1. Wypełnij 6 kroków formularza.
2. Po kliknięciu „Oblicz moją wycenę" formularz wysyła `POST /api/lead`.
3. Wynik (cena, czas, brief) wyświetla się natychmiast — bez potrzeby bazy danych.
4. W terminalu zobaczysz log `[Workflow] Lead saved (mock): ...`.

### Testowanie API bezpośrednio

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "projectType": "wizytowka",
    "pagesCount": "2-5",
    "needsSEO": true,
    "hasContent": false,
    "timeline": "1-miesiac",
    "name": "Kasia",
    "email": "kasia@example.com"
  }'
```

### Logika wyceny

Funkcja `calculateEstimate()` w `lib/estimate.ts`:
- Baza cenowa zależy od `projectType` (landing 500–900 zł … sklep 1800–4500 zł).
- Cena rośnie za: więcej podstron, sklep, dużo produktów, SEO, brak gotowych treści, integrację WhatsApp.
- `timeline === "asap"` dodaje 20% do całości.

## Jak podłączyć bazę danych

1. Wybierz dostawcę (Neon / Supabase / Vercel Postgres / PlanetScale).
2. Dodaj zmienną `DATABASE_URL` w Vercel.
3. W `lib/lead-workflow.ts` → funkcja `saveLead()` — zastąp `console.log(...)` prawdziwym wywołaniem ORM:

```ts
// Neon + Drizzle (przykład)
import { db } from "@/lib/db";
import { leads } from "@/lib/schema";
await db.insert(leads).values({
  id: submission.id,
  submittedAt: new Date(submission.submittedAt),
  email: submission.formData.email,
  projectType: submission.formData.projectType,
  minPrice: submission.estimate.minPrice,
  maxPrice: submission.estimate.maxPrice,
  rawJson: submission,
});
```

## Vercel Workflows — jak rozbudować

Obecna implementacja w `lib/lead-workflow.ts` jest synchroniczna. Żeby włączyć prawdziwy workflow (z opóźnionym follow-upem po 3 dniach):

1. `npm install @vercel/workflows`
2. Zdefiniuj workflow w `vercel.json`:

```json
{
  "workflows": [{
    "name": "lead-followup",
    "trigger": "http",
    "steps": [
      { "name": "notify", "action": "run", "module": "lib/lead-workflow" },
      { "name": "wait", "action": "sleep", "duration": "3d" },
      { "name": "followup", "action": "run", "module": "lib/lead-workflow", "function": "scheduleFollowUp" }
    ]
  }]
}
```

3. W `app/api/lead/route.ts` zastąp `void processLead(...)` wywołaniem triggera workflow.

## Vercel — zmienne środowiskowe (ustawić w dashboardzie)

| Zmienna | Środowisko | Opis |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | URL produkcyjny |
| `RESEND_API_KEY` | Production | Klucz Resend do maili |
| `DATABASE_URL` | Production | (przyszłość) Baza danych |

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
