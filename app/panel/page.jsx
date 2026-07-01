"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  { label: "Total Products", value: "0", change: "0 this month", icon: Box, color: "#0a4bd9" },
  { label: "Active Orders", value: "0", change: "0 today", icon: ShoppingCart, color: "#25D366" },
  { label: "Revenue", value: "0 MAD", change: "0% vs last month", icon: DollarSign, color: "#f5a623" },
  { label: "Customers", value: "0", change: "0 new this month", icon: Users, color: "#7c3aed" },
];

const recentOrders = [];

function PanelSkeleton() {
  return (
    <div className="panel-content">
      <div className="panel-header">
        <div className="shimmer" style={{ width: 200, height: 32, borderRadius: 8, marginBottom: 8 }} />
        <div className="shimmer" style={{ width: 280, height: 16, borderRadius: 6 }} />
      </div>
      <div className="panel-stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="shimmer" style={{ width: "100%", height: 120, borderRadius: 16 }} />
          </div>
        ))}
      </div>
      <div className="shimmer" style={{ width: "100%", height: 380, borderRadius: 16, marginTop: 32 }} />
    </div>
  );
}

export default function PanelPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <PanelSkeleton />;

  return (
    <motion.div
      className="panel-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="panel-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here is what is happening today.</p>
        </div>
        <div className="panel-header-badge">
          <TrendingUp size={18} />
          <span>All systems operational</span>
        </div>
      </div>

      <div className="panel-stats-grid">
        {stats.map(({ label, value, change, icon: Icon, color }, i) => (
          <motion.div
            className="panel-stat-card"
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <div className="panel-stat-icon" style={{ background: `${color}15`, color }}>
              <Icon size={22} />
            </div>
            <div className="panel-stat-info">
              <span>{label}</span>
              <strong>{value}</strong>
              <small><ArrowUpRight size={13} /> {change}</small>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="panel-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="panel-section-header">
          <h2>Recent orders</h2>
          <a href="/panel/orders">View all</a>
        </div>
        <div className="panel-table-wrap">
          {recentOrders.length > 0 ? (
            <table className="panel-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="panel-order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td className="panel-amount">{order.amount}</td>
                    <td><span className={`panel-status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 24px", color: "#888ea8", fontSize: "0.95rem" }}>
              No recent orders found
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
