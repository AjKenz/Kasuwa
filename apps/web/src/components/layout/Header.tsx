import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            🧺
          </span>
          <span className="text-lg font-semibold text-stone-900">Kasuwa</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 sm:flex">
          <Link href="/" className="hover:text-stone-900">
            Browse
          </Link>
          <Link href="/sell/dashboard" className="hover:text-stone-900">
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
