import { DashboardShell } from "@/components/layout/DashboardShell";

const NAV_ITEMS = [
  { href: "/sell/dashboard", label: "My listings", icon: "📦" },
  { href: "/sell/new", label: "New listing", icon: "➕" },
];

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Seller" navItems={NAV_ITEMS}>
      {children}
    </DashboardShell>
  );
}
