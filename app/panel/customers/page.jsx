"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Mail, MapPin, Phone, Search, ShoppingBag, X } from "lucide-react";

const allCustomers = [
  { id: 1, name: "Ahmed El Amrani", email: "ahmed@example.com", phone: "+212 6XX-XXXXXX", city: "Casablanca", orders: 12, spent: 89450, joined: "2025-09-12", status: "Active" },
  { id: 2, name: "Fatima Benali", email: "fatima@example.com", phone: "+212 6XX-XXXXXX", city: "Rabat", orders: 8, spent: 62740, joined: "2025-11-03", status: "Active" },
  { id: 3, name: "Youssef Khalid", email: "youssef@example.com", phone: "+212 6XX-XXXXXX", city: "Marrakech", orders: 5, spent: 33470, joined: "2026-01-18", status: "Active" },
  { id: 4, name: "Sara Ouazzani", email: "sara@example.com", phone: "+212 6XX-XXXXXX", city: "Casablanca", orders: 15, spent: 112300, joined: "2025-06-22", status: "VIP" },
  { id: 5, name: "Omar Idrissi", email: "omar@example.com", phone: "+212 6XX-XXXXXX", city: "Fes", orders: 3, spent: 14280, joined: "2026-03-07", status: "Active" },
  { id: 6, name: "Hind Mansouri", email: "hind@example.com", phone: "+212 6XX-XXXXXX", city: "Tangier", orders: 7, spent: 56180, joined: "2025-10-15", status: "Active" },
  { id: 7, name: "Karim Benjelloun", email: "karim@example.com", phone: "+212 6XX-XXXXXX", city: "Agadir", orders: 9, spent: 43120, joined: "2025-08-30", status: "VIP" },
  { id: 8, name: "Laila Tazi", email: "laila@example.com", phone: "+212 6XX-XXXXXX", city: "Casablanca", orders: 4, spent: 18990, joined: "2026-02-14", status: "Active" },
  { id: 9, name: "Mohamed El Fassi", email: "mohamed@example.com", phone: "+212 6XX-XXXXXX", city: "Rabat", orders: 6, spent: 41560, joined: "2025-12-01", status: "Inactive" },
  { id: 10, name: "Nadia Berrada", email: "nadia@example.com", phone: "+212 6XX-XXXXXX", city: "Marrakech", orders: 11, spent: 76490, joined: "2025-07-19", status: "Active" },
  { id: 11, name: "Rachid Oujdi", email: "rachid@example.com", phone: "+212 6XX-XXXXXX", city: "Casablanca", orders: 2, spent: 9380, joined: "2026-04-25", status: "Active" },
  { id: 12, name: "Samira El Kettani", email: "samira@example.com", phone: "+212 6XX-XXXXXX", city: "Oujda", orders: 1, spent: 3290, joined: "2026-05-10", status: "Inactive" },
];

const statusColors = {
  VIP: { bg: "#fff7e6", color: "#b8860b" },
  Active: { bg: "#ebf8eb", color: "#16845a" },
  Inactive: { bg: "#f5f5f5", color: "#888" },
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
  const [customers, setCustomers] = useState(allCustomers);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = allCustomers;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    setCustomers(filtered);
  }, [search, statusFilter]);

  const filters = ["All", "VIP", "Active", "Inactive"];

  if (!ready) return <Skeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Customers</h1>
          <p>{allCustomers.length} total · {allCustomers.filter((c) => c.status === "VIP").length} VIP · {allCustomers.filter((c) => c.status === "Active").length} active</p>
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
                  <td className="panel-amount">{c.spent.toLocaleString("en-US")} MAD</td>
                  <td><span className="panel-status" style={{ background: statusColors[c.status].bg, color: statusColors[c.status].color }}>{c.status}</span></td>
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
                    <p className="orders-detail-amount">{selected.spent.toLocaleString("en-US")} MAD spent</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Status</h4>
                    <span className="panel-status" style={{ background: statusColors[selected.status].bg, color: statusColors[selected.status].color }}>{selected.status}</span>
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
