"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Mail, MapPin, Phone, Search, ShoppingBag, X } from "lucide-react";

const allCustomers = [];

const statusColors = {
  VIP: { bg: "#fff7e6", color: "#b8860b" },
  Active: { bg: "#ebf8eb", color: "#16845a" },
  Inactive: { bg: "#f5f5f5", color: "#888" },
};

const getStatusColors = (status) => {
  return statusColors[status] || { bg: "#f5f5f5", color: "#888" };
};


function Skeleton() {
  return (
    <div className="panel-content">
      <div className="panel-header">
        <div><div className="shimmer" style={{ width: 160, height: 28, borderRadius: 8, marginBottom: 8 }} /><div className="shimmer" style={{ width: 220, height: 14, borderRadius: 6 }} /></div>
      </div>
      <div className="shimmer" style={{ width: "100%", height: 52, borderRadius: 14, marginBottom: 20 }} />
      <div className="shimmer" style={{ width: "100%", height: 460, borderRadius: 18 }} />
    </div>
  );
}

export default function CustomersPage() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [rawCustomers, setRawCustomers] = useState([]);

  const loadCustomers = async () => {
    try {
      const res = await fetch('/api/customers');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setCustomers(list);
      setRawCustomers(list);
    } catch (e) {
      console.error("Error loading customers:", e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    let filtered = rawCustomers;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.city && c.city.toLowerCase().includes(q)));
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    setCustomers(filtered);
  }, [search, statusFilter, rawCustomers]);

  const filters = ["All", "VIP", "Active", "Inactive"];

  if (!ready) return <Skeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Customers</h1>
          <p>{rawCustomers.length} total · {rawCustomers.filter((c) => c.status === "VIP").length} VIP · {rawCustomers.filter((c) => c.status === "Active").length} active</p>
        </div>
      </div>

      <div className="orders-toolbar">
        <label className="orders-search">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or city..." />
        </label>
        <div className="orders-filters">
          {filters.map((f) => (
            <button key={f} className={statusFilter === f ? "active" : ""} onClick={() => setStatusFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-table-wrap">
          <table className="panel-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>City</th>
                <th>Orders</th>
                <th>Total spent</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>No customers match your filters.</td></tr>
              ) : customers.map((c) => (
                <tr key={c.id}>
                  <td><span style={{ fontWeight: 650, color: "#1f2937" }}>{c.name}</span></td>
                  <td style={{ color: "#777", fontSize: "0.84rem" }}>{c.email}</td>
                  <td>{c.city}</td>
                  <td style={{ fontWeight: 650 }}>{c.orders}</td>
                  <td className="panel-amount">{(Number(c.spent) || 0).toLocaleString("en-US")} MAD</td>
                  <td><span className="panel-status" style={{ background: getStatusColors(c.status).bg, color: getStatusColors(c.status).color }}>{c.status || "Active"}</span></td>
                  <td><button className="orders-view-btn" onClick={() => setSelected(c)}><Eye size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
              <div className="orders-detail-header">
                <div>
                  <h2 style={{ color: "#111" }}>{selected.name}</h2>
                  <span>Customer since {selected.joined}</span>
                </div>
                <button className="orders-close-btn" onClick={() => setSelected(null)}><X size={18} /></button>
              </div>

              <div className="orders-detail-body">
                <div className="orders-detail-grid">
                  <div className="orders-detail-card">
                    <h4>Contact</h4>
                    <p><Mail size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#0a4bd9" }} />{selected.email}</p>
                    <p><Phone size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#0a4bd9" }} />{selected.phone}</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Location</h4>
                    <p><MapPin size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#0a4bd9" }} />{selected.city}</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Activity</h4>
                    <p><ShoppingBag size={14} style={{ marginRight: 6, verticalAlign: "middle", color: "#0a4bd9" }} />{selected.orders} orders</p>
                    <p className="orders-detail-amount">{(Number(selected.spent) || 0).toLocaleString("en-US")} MAD spent</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Status</h4>
                    <span className="panel-status" style={{ background: getStatusColors(selected.status).bg, color: getStatusColors(selected.status).color }}>{selected.status || "Active"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
