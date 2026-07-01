"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  Filter,
  Package,
  Search,
  X,
} from "lucide-react";

const allOrders = [];

const statusColors = {
  Delivered: { bg: "#f0f4ff", color: "#0a4bd9" },
  Shipped: { bg: "#ebf8eb", color: "#16845a" },
  Processing: { bg: "#fff7e6", color: "#b8860b" },
  Pending: { bg: "#f5f5f5", color: "#888" },
};

function OrdersSkeleton() {
  return (
    <div className="panel-content">
      <div className="panel-header">
        <div><div className="shimmer" style={{ width: 140, height: 28, borderRadius: 8, marginBottom: 8 }} /><div className="shimmer" style={{ width: 200, height: 14, borderRadius: 6 }} /></div>
      </div>
      <div className="shimmer" style={{ width: "100%", height: 52, borderRadius: 14, marginBottom: 20 }} />
      <div className="shimmer" style={{ width: "100%", height: 460, borderRadius: 18 }} />
    </div>
  );
}

export default function OrdersPage() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [rawOrders, setRawOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setOrders(list);
      setRawOrders(list);
    } catch (e) {
      console.error("Error loading orders:", e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = rawOrders;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || (o.product && o.product.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "All") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    setOrders(filtered);
  }, [search, statusFilter, rawOrders]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });
      const updated = await res.json();
      if (updated && !updated.error) {
        setRawOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        setSelectedOrder((prev) => (prev?.id === orderId ? updated : prev));
      }
    } catch (e) {
      console.error("Error updating order status:", e);
    }
  };

  const statuses = ["All", "Delivered", "Shipped", "Processing", "Pending"];

  if (!ready) return <OrdersSkeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Orders</h1>
          <p>{allOrders.length} total orders · {allOrders.filter((o) => o.status === "Pending" || o.status === "Processing").length} active</p>
        </div>
      </div>

      <div className="orders-toolbar">
        <label className="orders-search">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders by ID, customer, or product..." />
        </label>
        <div className="orders-filters">
          {statuses.map((s) => (
            <button key={s} className={statusFilter === s ? "active" : ""} onClick={() => setStatusFilter(s)}>{s}</button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-table-wrap">
          <table className="panel-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>No orders match your filters.</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id}>
                  <td className="panel-order-id">{order.id}</td>
                  <td><span className="orders-customer">{order.customer}</span></td>
                  <td>{order.product}</td>
                  <td style={{ color: "#777", fontSize: "0.84rem" }}>{order.date}</td>
                  <td className="panel-amount">{order.amount.toLocaleString("en-US")} MAD</td>
                  <td><span className="panel-status" style={{ background: statusColors[order.status].bg, color: statusColors[order.status].color }}>{order.status}</span></td>
                  <td><button className="orders-view-btn" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
              <div className="orders-detail-header">
                <div>
                  <h2>{selectedOrder.id}</h2>
                  <span>Placed on {selectedOrder.date}</span>
                </div>
                <button className="orders-close-btn" onClick={() => setSelectedOrder(null)}><X size={18} /></button>
              </div>

              <div className="orders-detail-body">
                <div className="orders-detail-grid">
                  <div className="orders-detail-card">
                    <h4>Customer</h4>
                    <p className="orders-detail-name">{selectedOrder.customer}</p>
                    <p>{selectedOrder.email}</p>
                    <p>{selectedOrder.phone}</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Shipping</h4>
                    <p>{selectedOrder.address}</p>
                    <p className="orders-detail-meta">{selectedOrder.shipping} delivery</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Payment</h4>
                    <p className="orders-detail-meta" style={{ color: selectedOrder.payment === "Paid" ? "#16845a" : "#b8860b" }}>{selectedOrder.payment}</p>
                    <p className="orders-detail-amount">{selectedOrder.amount.toLocaleString("en-US")} MAD</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Status</h4>
                    <div className="orders-status-select">
                      {statuses.filter((s) => s !== "All").map((s) => (
                        <button key={s} className={selectedOrder.status === s ? "active" : ""} onClick={() => updateStatus(selectedOrder.id, s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="orders-detail-items">
                  <h4>Items</h4>
                  <div className="orders-detail-item">
                    <div className="orders-detail-item-info">
                      <strong>{selectedOrder.product}</strong>
                      <span>{selectedOrder.category}</span>
                    </div>
                    <div className="orders-detail-item-qty">
                      <span>Qty: {selectedOrder.quantity}</span>
                      <strong>{(selectedOrder.amount * selectedOrder.quantity).toLocaleString("en-US")} MAD</strong>
                    </div>
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
