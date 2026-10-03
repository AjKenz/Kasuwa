import { DashboardShell } from "@/components/layout/DashboardShell";

const NAV_ITEMS = [{ href: "/admin", label: "Overview", icon: "📊" }];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Operator" navItems={NAV_ITEMS}>
      {children}
    </DashboardShell>
  );
}
