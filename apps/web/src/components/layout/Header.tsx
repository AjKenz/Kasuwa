import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-amber-900/10 bg-sand/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🧺
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-stone-900">
            Kasuwa
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 sm:flex">
          <Link href="/" className="transition-colors hover:text-amber-800">
            Browse
          </Link>
          <Link href="/sell/dashboard" className="transition-colors hover:text-amber-800">
            Sell on Kasuwa
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <LinkButton href="/sign-in" variant="secondary" size="sm">
            Sign in
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
