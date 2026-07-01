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

  return (
    <div className="panel-root">
      <aside className={`panel-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="panel-sidebar-header">
          {!collapsed && (
            <a href="/panel/" className="panel-logo">
              <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" style={{ height: 36, width: "auto" }} />
            </a>
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
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="panel-sidebar-footer">
          <a href="/" className="panel-nav-link">
            <LogOut size={20} />
            {!collapsed && <span>Back to site</span>}
          </a>
        </div>
      </aside>

      <main className="panel-main">{children}</main>
    </div>
  );
}
