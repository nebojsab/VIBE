"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  BookOpen,
  FileText,
  Wrench,
  BarChart3,
  FileCheck,
  ArrowLeftRight,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Companies", icon: Building2, href: "/" },
  { name: "Catalog", icon: BookOpen, href: "/catalog" },
  { name: "Quotes", icon: FileText, href: "/quotes" },
  { name: "Services", icon: Wrench, href: "/services" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
  { name: "Audit Logs", icon: FileCheck, href: "/audit-logs" },
  { name: "Migrations", icon: ArrowLeftRight, href: "/migrations" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col bg-gray-50 border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className="font-semibold text-gray-900">VIBE</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center mx-auto">
            <span className="text-white text-sm font-bold">V</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* My Company Section */}
      <div className="px-2 py-4 border-t border-gray-200">
        <Link
          href="/my-company"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === "/my-company"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          <Home className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>My Company</span>}
        </Link>
      </div>

      {/* Version */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">Version 1.4.2</p>
        </div>
      )}
    </aside>
  );
}
