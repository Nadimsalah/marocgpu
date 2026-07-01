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
  const [stats, setStats] = useState([
    { label: "Total Products", value: "0", change: "0 total", icon: Box, color: "#0a4bd9" },
    { label: "Active Orders", value: "0", change: "0 pending", icon: ShoppingCart, color: "#25D366" },
    { label: "Revenue", value: "0 MAD", change: "0 total", icon: DollarSign, color: "#f5a623" },
    { label: "Customers", value: "0", change: "0 registered", icon: Users, color: "#7c3aed" },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [resProducts, resOrders, resCustomers] = await Promise.all([
          fetch('/api/products').then(r => r.json()),
          fetch('/api/orders').then(r => r.json()),
          fetch('/api/customers').then(r => r.json())
        ]);
        
        const productsList = Array.isArray(resProducts) ? resProducts : [];
        const ordersList = Array.isArray(resOrders) ? resOrders : [];
        const customersList = Array.isArray(resCustomers) ? resCustomers : [];
        
        const totalProducts = productsList.length;
        const activeOrders = ordersList.filter(o => o.status === "Pending" || o.status === "Processing").length;
        const revenue = ordersList.reduce((sum, o) => sum + Number(o.amount || 0), 0);
        const totalCustomers = customersList.length;

        setStats([
          { label: "Total Products", value: `${totalProducts}`, change: `${productsList.reduce((s, p) => s + (p.stock || 0), 0)} items in stock`, icon: Box, color: "#0a4bd9" },
          { label: "Active Orders", value: `${activeOrders}`, change: `${ordersList.filter(o => o.status === "Pending").length} pending verification`, icon: ShoppingCart, color: "#25D366" },
          { label: "Revenue", value: `${revenue.toLocaleString("en-US")} MAD`, change: "Total YTD Sales", icon: DollarSign, color: "#f5a623" },
          { label: "Customers", value: `${totalCustomers}`, change: `${customersList.filter(c => c.status === "VIP").length} VIP members`, icon: Users, color: "#7c3aed" },
        ]);
        
        setRecentOrders(ordersList.slice(0, 5));
      } catch (e) {
        console.error("Failed to load dashboard data:", e);
      } finally {
        setReady(true);
      }
    }
    loadData();
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
          <a href="/panel/orders/">View all</a>
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
