"use client";

import { useState } from "react";
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Paintbrush,
  Settings,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/panel/" },
  { label: "Products", icon: Box, href: "/panel/products/" },
  { label: "Orders", icon: ShoppingCart, href: "/panel/orders/" },
  { label: "Customers", icon: Users, href: "/panel/customers/" },
  { label: "Analytics", icon: BarChart3, href: "/panel/analytics/" },
  { label: "Store", icon: Paintbrush, href: "/panel/store/" },
  { label: "Settings", icon: Settings, href: "/panel/settings/" },
];

export default function PanelLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="panel-root">
      {/* Mobile top bar */}
      <header className="panel-mobile-bar">
        <button
          className="panel-mobile-toggle"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link href="/panel/" className="panel-mobile-logo" onClick={() => setMobileOpen(false)}>
          <img src="/marocgpu-logo-transparent.webp" alt="MarocGPU" />
        </Link>
        <div style={{ width: 24 }} /> {/* Spacer to balance flex layout */}
      </header>

      {/* Mobile menu backdrop overlay */}
      <div
        className={`panel-mobile-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`panel-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="panel-sidebar-header">
          {!collapsed && (
            <Link href="/panel/" className="panel-logo">
              <img src="/marocgpu-logo-transparent.webp" alt="MarocGPU" style={{ height: 36, width: "auto" }} />
            </Link>
          )}
          <button
            className="panel-collapse-btn"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="panel-nav">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="panel-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="panel-sidebar-footer">
          <Link href="/" className="panel-nav-link" onClick={() => setMobileOpen(false)}>
            <LogOut size={20} />
            {!collapsed && <span>Back to site</span>}
          </Link>
        </div>
      </aside>

      <main className="panel-main">{children}</main>
    </div>
  );
}
