import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Sparkles,
  Network,
  Lightbulb,
  Compass,
  Route as RouteIcon,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Target,
  FileText,
  Bell,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  group: "core" | "money" | "intelligence" | "account";
  short?: string;
};

export const NAV: NavItem[] = [
  { to: "/", label: "Home", icon: LayoutDashboard, group: "core", short: "Home" },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles, group: "core", short: "AI" },
  { to: "/twin", label: "Digital Twin", icon: Network, group: "intelligence", short: "Twin" },
  { to: "/insights", label: "Insights", icon: Lightbulb, group: "intelligence" },
  { to: "/journeys", label: "Journeys", icon: RouteIcon, group: "intelligence", short: "Plans" },
  { to: "/explore", label: "Explore", icon: Compass, group: "money" },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight, group: "money" },
  { to: "/portfolio", label: "Portfolio", icon: TrendingUp, group: "money" },
  { to: "/accounts", label: "Accounts & Cards", icon: Wallet, group: "money" },
  { to: "/goals", label: "Goals", icon: Target, group: "money" },
  { to: "/health", label: "Financial Health", icon: ShieldCheck, group: "intelligence" },
  { to: "/documents", label: "Documents", icon: FileText, group: "account" },
  { to: "/notifications", label: "Notifications", icon: Bell, group: "account" },
  { to: "/profile", label: "Profile", icon: User, group: "account" },
  { to: "/settings", label: "Settings", icon: Settings, group: "account" },
  { to: "/support", label: "Support", icon: HelpCircle, group: "account" },
];

export const BOTTOM_NAV = NAV.filter((n) =>
  ["/", "/assistant", "/twin", "/insights", "/portfolio"].includes(n.to),
);
