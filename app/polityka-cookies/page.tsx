import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Polityka cookies", description: "Zasady korzystania z cookies i pamięci przeglądarki w serwisie Braided Digital." };

export default function CookiesPage() { return <LegalPage eyebrow="Dokumenty" title="Polityka cookies" intro="Serwis został zaprojektowany tak, aby działał bez reklamowego śledzenia i zbędnych plików cookies.">
  <h2>1. Czym są cookies i podobne technologie</h2><p>Cookies to małe informacje zapisywane na urządzeniu podczas korzystania ze strony. Podobną funkcję może pełnić pamięć lokalna przeglądarki (localStorage). Technologie te mogą być niezbędne, funkcjonalne, analityczne albo marketingowe.</p>
  <h2>2. Co wykorzystuje Braided Digital</h2><p>W obecnej wersji serwis nie uruchamia własnych narzędzi analitycznych ani reklamowych. W pamięci lokalnej przeglądarki zapisywana jest wyłącznie informacja <code>bd_cookie_preferences</code>, dzięki której komunikat o prywatności nie pojawia się przy każdej wizycie.</p><div className="legal-table"><div><strong>Technologia</strong><span>localStorage</span></div><div><strong>Cel</strong><span>zapamiętanie zamknięcia panelu prywatności</span></div><div><strong>Charakter</strong><span>niezbędny / preferencyjny</span></div><div><strong>Okres</strong><span>do usunięcia danych strony w przeglądarce</span></div></div>
  <h2>3. Zewnętrzny podgląd MA Atelier</h2><p>Podgląd w portfolio jest zewnętrzną zawartością z domeny ma-atelier.pl. Nie jest ładowany automatycznie. Dopiero kliknięcie przycisku „Uruchom podgląd 1:1” powoduje połączenie z tą domeną, która może wykorzystywać własne cookies, materiały wideo i narzędzia analityczne zgodnie z własnymi zasadami.</p>
  <h2>4. Zarządzanie ustawieniami</h2><p>Możesz usunąć zapisaną preferencję w ustawieniach przeglądarki, czyszcząc dane witryny. Większość przeglądarek pozwala również blokować cookies, usuwać je lub ograniczać cookies stron trzecich. Zablokowanie technologii niezbędnych może wpłynąć na zapamiętywanie ustawień.</p><div className="mt-6 inline-flex rounded bg-ink px-5 py-3 text-[.65rem] uppercase tracking-widest text-white"><CookieSettingsButton/></div>
  <h2>5. Zmiany</h2><p>Jeżeli w przyszłości zostanie wdrożona analityka, reklamy, osadzane filmy lub inne opcjonalne technologie, mechanizm zgody i niniejszy dokument powinny zostać zaktualizowane przed ich uruchomieniem.</p>
</LegalPage>; }
