# Supabase i logowanie

## 1. Zmienne w `.env.local`

Uzupełnij wartości z Supabase Dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Gdzie znaleźć:

- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings -> API -> Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings -> API -> anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Project Settings -> API -> service_role key

`SUPABASE_SERVICE_ROLE_KEY` jest tylko serwerowy. Nie dodawaj go do kodu klienta ani nie prefiksuj `NEXT_PUBLIC_`.

## 2. Baza danych

W Supabase SQL Editor uruchom:

1. `supabase/schema.sql`
2. `supabase/migrations/20260626000000_demo_generator.sql`

Jeśli projekt Supabase jest nowy i tabele nie są widoczne przez Data API, sprawdź ustawienia Data API w Supabase Dashboard. Tabele mają włączone RLS, a panel korzysta z roli `authenticated`.

## 3. Konto administratora

W Supabase Dashboard:

1. Wejdź w Authentication -> Users.
2. Kliknij Add user.
3. Ustaw e-mail i silne hasło.
4. Potwierdź użytkownika, jeśli projekt wymaga potwierdzania e-maila.
5. Zaloguj się w aplikacji przez `/login`.

Panel `/panel` jest chroniony przez `proxy.ts`. Niezalogowany użytkownik trafia na `/login`, a zalogowany użytkownik odwiedzający `/login` trafia do `/panel`.

## 4. Szybki test

1. Uruchom aplikację: `npm run dev`.
2. Otwórz `/login`.
3. Zaloguj się użytkownikiem z Authentication -> Users.
4. Po sukcesie aplikacja przekieruje do `/panel`.
5. Wylogowanie działa z menu użytkownika i wywołuje Supabase `signOut`.
