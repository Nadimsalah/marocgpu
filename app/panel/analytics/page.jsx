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

// Dynamic analytics datasets calculated in component

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
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState(["Consumer", "Professional", "Graphics", "Displays", "Accessories", "Printers"]);

  useEffect(() => {
    async function loadData() {
      try {
        const [resOrders, resCustomers, resCategories] = await Promise.all([
          fetch('/api/orders').then(r => r.json()),
          fetch('/api/customers').then(r => r.json()),
          fetch('/api/categories').then(r => r.json())
        ]);
        setOrders(Array.isArray(resOrders) ? resOrders : []);
        setCustomers(Array.isArray(resCustomers) ? resCustomers : []);
        
        const categoriesList = Array.isArray(resCategories) ? resCategories.map(c => c.name) : [];
        if (categoriesList.length > 0) {
          setCategories(categoriesList);
        }
      } catch (e) {
        console.error("Failed to load analytics data:", e);
      } finally {
        setReady(true);
      }
    }
    loadData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const kpiCards = [
    { label: "Total Revenue", value: `${totalRevenue.toLocaleString("en-US")} MAD`, change: "Real-time", up: true, icon: DollarSign, detail: "Total revenue across all real completed checkouts." },
    { label: "Total Orders", value: `${totalOrders}`, change: "Real-time", up: true, icon: ShoppingCart, detail: "Total number of real orders placed." },
    { label: "Unique Customers", value: `${totalCustomers}`, change: "Real-time", up: true, icon: Users, detail: "Unique customer profiles captured." },
    { label: "Average Order Value", value: `${aov.toLocaleString("en-US")} MAD`, change: "Real-time", up: true, icon: BarChart3, detail: "Average transaction size across all orders." },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = months.map((m, idx) => {
    const monthOrders = orders.filter(o => {
      if (!o.date) return false;
      const orderMonth = new Date(o.date).getMonth();
      return orderMonth === idx;
    });
    const revenue = monthOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
    return {
      month: m,
      revenue,
      orders: monthOrders.length
    };
  });

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue)) || 1;
  const maxOrders = Math.max(...monthlyData.map((d) => d.orders)) || 1;

  const categoryBreakdown = categories.map(cat => {
    const catOrders = orders.filter(o => o.category === cat);
    const revenue = catOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
    const totalRevenueSum = totalRevenue || 1;
    return {
      name: cat,
      revenue,
      orders: catOrders.length,
      percentage: Math.round((revenue / totalRevenueSum) * 100)
    };
  });

  const productSales = {};
  orders.forEach(o => {
    if (!o.product) return;
    const parts = o.product.split(", ");
    parts.forEach(part => {
      const match = part.match(/(.+) \(x(\d+)\)/);
      if (match) {
        const name = match[1];
        const qty = parseInt(match[2]) || 0;
        productSales[name] = (productSales[name] || 0) + qty;
      } else {
        productSales[part] = (productSales[part] || 0) + 1;
      }
    });
  });

  const topProducts = Object.keys(productSales).map(name => {
    const sold = productSales[name];
    const revenue = sold * 8500;
    return {
      name,
      sold,
      revenue,
      growth: 0
    };
  }).sort((a, b) => b.sold - a.sold).slice(0, 5);

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
