"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 142000, orders: 28, visitors: 1840, conversion: 1.52 },
  { month: "Feb", revenue: 168000, orders: 34, visitors: 2120, conversion: 1.6 },
  { month: "Mar", revenue: 195000, orders: 41, visitors: 2540, conversion: 1.61 },
  { month: "Apr", revenue: 172000, orders: 36, visitors: 2310, conversion: 1.56 },
  { month: "May", revenue: 224000, orders: 48, visitors: 2980, conversion: 1.61 },
  { month: "Jun", revenue: 256000, orders: 52, visitors: 3410, conversion: 1.53 },
  { month: "Jul", revenue: 238000, orders: 47, visitors: 3120, conversion: 1.51 },
  { month: "Aug", revenue: 215000, orders: 43, visitors: 2850, conversion: 1.51 },
  { month: "Sep", revenue: 272000, orders: 56, visitors: 3670, conversion: 1.53 },
  { month: "Oct", revenue: 298000, orders: 61, visitors: 4020, conversion: 1.52 },
  { month: "Nov", revenue: 345000, orders: 68, visitors: 4560, conversion: 1.49 },
  { month: "Dec", revenue: 412000, orders: 82, visitors: 5230, conversion: 1.57 },
];

const categoryBreakdown = [
  { name: "Consumer", revenue: 892000, orders: 184, percentage: 32 },
  { name: "Professional", revenue: 764000, orders: 156, percentage: 27 },
  { name: "Graphics", revenue: 312000, orders: 68, percentage: 11 },
  { name: "Displays", revenue: 289000, orders: 52, percentage: 10 },
  { name: "Accessories", revenue: 351000, orders: 142, percentage: 13 },
  { name: "Printers", revenue: 198000, orders: 38, percentage: 7 },
];

const topProducts = [
  { name: "Vector Pro Mouse", sold: 428, revenue: 295320, growth: 18 },
  { name: "Forge 75 Keyboard", sold: 312, revenue: 340080, growth: 12 },
  { name: "GeForce RTX 4070 Super", sold: 215, revenue: 1610350, growth: 24 },
  { name: "ProWork X1 Mobile Studio", sold: 187, revenue: 2429130, growth: 8 },
  { name: "EliteBook Pro 14", sold: 142, revenue: 1560580, growth: -3 },
];

const kpiCards = [
  { label: "Total Revenue", value: "2,806,000 MAD", change: "+18.2%", up: true, icon: DollarSign, detail: "Year-to-date revenue across all products and channels." },
  { label: "Total Orders", value: "616", change: "+12.4%", up: true, icon: ShoppingCart, detail: "Total orders placed this year across all categories." },
  { label: "Unique Visitors", value: "38,620", change: "+22.1%", up: true, icon: Users, detail: "Unique website visitors tracked across all pages." },
  { label: "Conversion Rate", value: "1.54%", change: "-0.08%", up: false, icon: BarChart3, detail: "Overall conversion rate from visitor to purchase." },
];

function Skeleton() {
  return (
    <div className="panel-content">
      <div className="panel-header">
        <div><div className="shimmer" style={{ width: 160, height: 28, borderRadius: 8, marginBottom: 8 }} /><div className="shimmer" style={{ width: 240, height: 14, borderRadius: 6 }} /></div>
      </div>
      <div className="panel-stats-grid">{ [1,2,3,4].map((i) => <div key={i} className="shimmer" style={{ height: 120, borderRadius: 16 }} />) }</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 24 }}>
        <div className="shimmer" style={{ height: 340, borderRadius: 18 }} />
        <div className="shimmer" style={{ height: 340, borderRadius: 18 }} />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [ready, setReady] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));
  const maxOrders = Math.max(...monthlyData.map((d) => d.orders));

  if (!ready) return <Skeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Analytics</h1>
          <p>Your store performance at a glance.</p>
        </div>
        <div className="panel-header-badge">
          <BarChart3 size={16} />
          <span>Updated just now</span>
        </div>
      </div>

      <div className="panel-stats-grid">
        {kpiCards.map((kpi, i) => (
          <motion.div
            className="panel-stat-card"
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedKpi(kpi)}
          >
            <div className="panel-stat-icon" style={{ background: "#f0f4ff", color: "#0a4bd9" }}>
              <kpi.icon size={22} />
            </div>
            <div className="panel-stat-info">
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small style={{ color: kpi.up ? "#16845a" : "#e53e3e" }}>
                {kpi.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {kpi.change}
              </small>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="panel-section">
          <div className="panel-section-header">
            <h2>Monthly Revenue</h2>
            <span style={{ fontSize: "0.78rem", color: "#888" }}>{monthlyData[monthlyData.length - 1].month} · {monthlyData[monthlyData.length - 1].revenue.toLocaleString("en-US")} MAD</span>
          </div>
          <div className="analytics-chart">
            <div className="analytics-bars">
              {monthlyData.map((d) => (
                <div key={d.month} className="analytics-bar-group">
                  <span className="analytics-bar-label">{d.month}</span>
                  <div className="analytics-bar-track">
                    <motion.div
                      className="analytics-bar-fill"
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="analytics-legend">
              <span><i style={{ background: "#0a4bd9" }} /> Revenue</span>
            </div>
          </div>
        </div>

        <div className="panel-section">
          <div className="panel-section-header">
            <h2>Monthly Orders</h2>
            <span style={{ fontSize: "0.78rem", color: "#888" }}>{monthlyData[monthlyData.length - 1].month} · {monthlyData[monthlyData.length - 1].orders} orders</span>
          </div>
          <div className="analytics-chart">
            <div className="analytics-bars">
              {monthlyData.map((d) => (
                <div key={d.month} className="analytics-bar-group">
                  <span className="analytics-bar-label">{d.month}</span>
                  <div className="analytics-bar-track">
                    <motion.div
                      className="analytics-bar-fill orders"
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.orders / maxOrders) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="analytics-legend">
              <span><i style={{ background: "#25D366" }} /> Orders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-grid" style={{ marginTop: 20 }}>
        <div className="panel-section">
          <div className="panel-section-header">
            <h2>Revenue by Category</h2>
          </div>
          <div className="analytics-categories">
            {categoryBreakdown.map((c) => (
              <div key={c.name} className="analytics-cat-row">
                <div className="analytics-cat-info">
                  <span>{c.name}</span>
                  <strong>{c.revenue.toLocaleString("en-US")} MAD</strong>
                  <small>{c.orders} orders</small>
                </div>
                <div className="analytics-cat-bar">
                  <motion.div
                    className="analytics-cat-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="analytics-cat-pct">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <div className="panel-section-header">
            <h2>Top Products</h2>
          </div>
          <div className="analytics-top-products">
            {topProducts.map((p, i) => (
              <div key={p.name} className="analytics-top-row">
                <span className="analytics-top-rank">{i + 1}</span>
                <div className="analytics-top-info">
                  <strong>{p.name}</strong>
                  <span>{p.sold} sold · {p.revenue.toLocaleString("en-US")} MAD</span>
                </div>
                <span className={`analytics-top-growth ${p.growth >= 0 ? "up" : "down"}`}>
                  {p.growth >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {Math.abs(p.growth)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedKpi && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedKpi(null)}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
              <div className="orders-detail-header">
                <div>
                  <h2 style={{ color: "#111" }}>{selectedKpi.label}</h2>
                  <span>Key performance indicator</span>
                </div>
                <button className="orders-close-btn" onClick={() => setSelectedKpi(null)}><X size={18} /></button>
              </div>
              <div className="orders-detail-body">
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0f4ff", color: "#0a4bd9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <selectedKpi.icon size={28} />
                  </div>
                  <p style={{ fontSize: "2rem", fontWeight: 760, color: "#111", margin: "0 0 6px", letterSpacing: "-0.03em" }}>{selectedKpi.value}</p>
                  <p style={{ fontSize: "0.88rem", color: selectedKpi.up ? "#16845a" : "#e53e3e", fontWeight: 650, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    {selectedKpi.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {selectedKpi.change} vs last period
                  </p>
                </div>
                <div style={{ padding: "16px 0", borderTop: "1px solid #f0f1f3" }}>
                  <p style={{ fontSize: "0.9rem", color: "#5f636b", lineHeight: 1.6, margin: 0 }}>{selectedKpi.detail}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
