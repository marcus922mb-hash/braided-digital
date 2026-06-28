import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { isSupabaseAuthConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Logowanie | MA Atelier Studio",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  const isConfigured = isSupabaseAuthConfigured();

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">M</span>
          <div className="login-brand-text">
            <span className="login-brand-name">MA ATELIER</span>
            <span className="login-brand-sub">Studio</span>
          </div>
        </div>

        <h1 className="login-heading">Zaloguj się</h1>
        <p className="login-subheading">Panel administracyjny — dostęp prywatny</p>

        {!isConfigured && (
          <div className="login-config-warning" role="alert">
            Brakuje konfiguracji Supabase w `.env.local`. Uzupełnij
            NEXT_PUBLIC_SUPABASE_URL oraz NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </div>
        )}

        <LoginForm />

        <Link href="/" className="login-back">
          ← Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
