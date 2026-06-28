import type { Metadata } from "next";
import Link from "next/link";
import { Users, FolderOpen, Calculator, Globe } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { RecentTable, type RecentItem } from "@/components/dashboard/recent-table";
import { WidgetTasks } from "@/components/dashboard/widget-tasks";
import { WidgetNotes } from "@/components/dashboard/widget-notes";
import { WidgetCalendar, type CalendarItem } from "@/components/dashboard/widget-calendar";
import { getDashboardData } from "@/features/dashboard/queries/dashboard-queries";
import { getUpcomingDeadlines } from "@/features/projects/queries/project-queries";

export const metadata: Metadata = { title: "Dashboard" };

export default async function PanelDashboard() {
  const [{ data, error }, upcomingDeadlines] = await Promise.all([
    getDashboardData(),
    getUpcomingDeadlines(5),
  ]);

  const calendarItems: CalendarItem[] = upcomingDeadlines.map((p) => ({
    id: p.id,
    label: p.name,
    deadline: p.deadline,
    href: `/panel/projekty/${p.id}`,
    status: p.status,
  }));
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Dzień dobry" : hour < 18 ? "Cześć" : "Dobry wieczór";
  const stats = [
    { label: "Klienci", value: data.stats.clients, sub: "w bazie CRM", icon: <Users size={14} /> },
    { label: "Aktywne projekty", value: data.stats.projects, sub: "w trakcie realizacji", icon: <FolderOpen size={14} /> },
    { label: "Wyceny", value: data.stats.estimates, sub: `${data.stats.pendingEstimates} oczekuje`, icon: <Calculator size={14} /> },
    { label: "Aktywne demo", value: data.stats.activeDemos, sub: `${data.stats.demos} łącznie`, icon: <Globe size={14} /> },
  ];

  return (
    <>
      {/* Hero */}
      <div className="panel-dash-hero panel-enter">
        <h1 className="panel-dash-hero-greeting">
          {greeting}, <em>Marek.</em>
        </h1>
        <p className="panel-dash-hero-meta">
          Twoje studio jest aktywne. Sprawdź co nowego.
        </p>
      </div>

      {/* Quick actions */}
      <div className="panel-enter panel-enter-1">
        <QuickActions />
      </div>

      {error && (
        <div className="panel-error panel-enter panel-enter-1">
          <p>Supabase nie zwrócił danych dashboardu: {error}</p>
        </div>
      )}

      {/* Stat cards */}
      <div className="panel-stat-grid panel-enter panel-enter-2">
        {stats.map(({ label, value, sub, icon }) => (
          <StatCard key={label} label={label} value={value} sub={sub} icon={icon} />
        ))}
      </div>

      {/* Main columns: activity + recent clients */}
      <div className="panel-dash-cols panel-enter panel-enter-3">
        <div className="panel-card">
          <div className="panel-card-header">
            <span className="panel-card-title">Ostatnia aktywność</span>
          </div>
          <div className="panel-card-body">
            <ActivityFeed items={data.activity} />
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-card-header">
            <span className="panel-card-title">Ostatni klienci</span>
            <Link href="/panel/klienci" className="panel-card-action">
              Zobacz wszystkich →
            </Link>
          </div>
          <div className="panel-card-body">
            <RecentTable items={data.recentClients as RecentItem[]} />
          </div>
        </div>
      </div>

      {/* Recent estimates */}
      <div className="panel-card panel-enter panel-enter-4" style={{ marginBottom: "1.25rem" }}>
        <div className="panel-card-header">
          <span className="panel-card-title">Ostatnie wyceny</span>
          <Link href="/panel/wyceny" className="panel-card-action">
            Zobacz wszystkie →
          </Link>
        </div>
        <div className="panel-card-body">
          <RecentTable items={data.recentEstimates as RecentItem[]} />
        </div>
      </div>

      {/* Widgets */}
      <div className="panel-dash-widgets panel-enter panel-enter-5">
        <WidgetTasks />
        <WidgetNotes />
        <WidgetCalendar items={calendarItems} />
      </div>
    </>
  );
}
