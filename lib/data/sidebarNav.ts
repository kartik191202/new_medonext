import type { LucideIcon } from "lucide-react";
import {
  ClipboardPlus,
  Users,
  CalendarCheck,
  Stethoscope,
  Receipt,
  ShieldCheck,
  Activity,
  FileBarChart,
} from "lucide-react";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
};

export const SIDEBAR_NAV: SidebarNavSection[] = [
  {
    title: "OPD Modules",
    items: [
      { label: "New OPD Registration", href: "/patient-registration", icon: ClipboardPlus, badge: "NEW" },
      { label: "Patient Queue & Tokens", href: "/patient-queue", icon: Users, badge: "142" },
      { label: "Appointments Desk", href: "/appointments", icon: CalendarCheck },
      { label: "Doctor Roster & Clinics", href: "/doctor-roster", icon: Stethoscope },
    ],
  },
  {
    title: "Clinical & Services",
    items: [
      { label: "OPD Billing & Counter", href: "/opd-billing", icon: Receipt },
      { label: "Insurance / TPA Desk", href: "/insurance-tpa", icon: ShieldCheck },
      { label: "Triage & Emergency Vitals", href: "/triage-vitals", icon: Activity },
      { label: "OPD Audit & Reports", href: "/opd-audit-reports", icon: FileBarChart },
    ],
  },
];
