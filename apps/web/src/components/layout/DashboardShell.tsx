import Link from "next/link";
import type { ReactNode } from "react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: string;
}

export function DashboardShell({
  title,
  navItems,
  children,
}: {
  title: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto flex max-w-6xl">
        <aside className="hidden w-56 shrink-0 border-e border-stone-200 px-3 py-6 sm:block">
          <Link href="/" className="mb-6 flex items-center gap-2 px-2">
            <span className="text-lg" aria-hidden>
              🧺
            </span>
            <span className="font-semibold text-stone-900">Kasuwa</span>
          </Link>
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
            {title}
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/"
            className="mt-6 block px-2 text-xs font-medium text-stone-400 hover:text-stone-600"
          >
            ← Back to storefront
          </Link>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
