"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Settings, Shield, Mail, Phone } from "lucide-react";

export default function SettingsPage() {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: "MarocGPU",
    currency: "MAD",
    supportEmail: "support@marocgpu.com",
    contactPhone: "+212 522-123456",
    address: "Showroom MarocGPU, Boulevard Zerktouni, Casablanca",
    allowRegistration: true,
    maintenanceMode: false
  });

  useEffect(() => {
    const stored = localStorage.getItem("marocgpu_panel_settings");
    if (stored) {
      try {
        setForm(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    localStorage.setItem("marocgpu_panel_settings", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!ready) {
    return (
      <div className="panel-content">
        <div className="panel-header">
          <div className="shimmer" style={{ width: 140, height: 28, borderRadius: 8, marginBottom: 8 }} />
          <div className="shimmer" style={{ width: 220, height: 14, borderRadius: 6 }} />
        </div>
        <div className="shimmer" style={{ width: "100%", height: 420, borderRadius: 18 }} />
      </div>
    );
  }

  return (
    <motion.div
      className="panel-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="panel-header">
        <div>
          <h1>Settings</h1>
          <p>Configure your dashboard settings and business preferences.</p>
        </div>
        <button
          className="store-save-btn"
          onClick={handleSave}
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <Save size={17} /> {saved ? "Saved!" : "Save changes"}
        </button>
      </div>

      <div className="panel-section" style={{ maxWidth: 680, padding: 32 }}>
        <div className="products-edit-form" style={{ gap: 24 }}>
          <div style={{ borderBottom: "1px solid #f0f1f3", paddingBottom: 16 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", display: "flex", alignItems: "center", gap: 8, margin: "0 0 4px" }}><Settings size={18} style={{ color: "#0a4bd9" }} /> General Preferences</h3>
            <p style={{ fontSize: "0.82rem", color: "#666", margin: 0 }}>Basic shop parameters and localized configuration.</p>
          </div>

          <div className="products-edit-row">
            <label>
              <span>Store Name</span>
              <input value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
            </label>
            <label>
              <span>Currency Symbol</span>
              <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} style={{ height: 44, borderRadius: 8, border: "1px solid #dcdde1", padding: "0 12px" }}>
                <option value="MAD">MAD (Moroccan Dirham)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </label>
          </div>

          <div style={{ borderBottom: "1px solid #f0f1f3", paddingBottom: 16, marginTop: 12 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", display: "flex", alignItems: "center", gap: 8, margin: "0 0 4px" }}><Mail size={18} style={{ color: "#0a4bd9" }} /> Business Contact</h3>
            <p style={{ fontSize: "0.82rem", color: "#666", margin: 0 }}>Configure contact detail displays on checkout pages.</p>
          </div>

          <div className="products-edit-row">
            <label>
              <span>Support Email</span>
              <input value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
            </label>
            <label>
              <span>Contact Phone</span>
              <input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
            </label>
          </div>

          <div className="products-edit-row" style={{ gridTemplateColumns: "1fr" }}>
            <label>
              <span>Business Address</span>
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </label>
          </div>

          <div style={{ borderBottom: "1px solid #f0f1f3", paddingBottom: 16, marginTop: 12 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", display: "flex", alignItems: "center", gap: 8, margin: "0 0 4px" }}><Shield size={18} style={{ color: "#0a4bd9" }} /> Security & Status</h3>
            <p style={{ fontSize: "0.82rem", color: "#666", margin: 0 }}>Control store visibility and accessibility settings.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={form.allowRegistration} onChange={(e) => setForm({ ...form, allowRegistration: e.target.checked })} style={{ width: 18, height: 18, cursor: "pointer" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111" }}>Enable customer checkout registration</span>
                <span style={{ fontSize: "0.78rem", color: "#666" }}>Permits anonymous checkout guest purchases to auto-generate customer records.</span>
              </div>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 6 }}>
              <input type="checkbox" checked={form.maintenanceMode} onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })} style={{ width: 18, height: 18, cursor: "pointer" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111" }}>Enable maintenance mode</span>
                <span style={{ fontSize: "0.78rem", color: "#666" }}>Temporarily lock storefront access to only administrators with correct credentials.</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
