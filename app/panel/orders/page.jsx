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
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const loadOrders = async () => {
    try {
      const [ordersRes, productsRes, inquiriesRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products'),
        fetch('/api/inquiries')
      ]);
      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const inquiriesData = await inquiriesRes.json();
      
      const ordersList = Array.isArray(ordersData) ? ordersData : [];
      const productsList = Array.isArray(productsData) ? productsData : [];
      const inquiriesList = Array.isArray(inquiriesData) ? inquiriesData : [];
      
      setOrders(ordersList);
      setRawOrders(ordersList);
      setProducts(productsList);
      setInquiries(inquiriesList);
    } catch (e) {
      console.error("Error loading orders, products, and inquiries:", e);
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

  // Helper to parse order products and match with product images/prices
  const parseOrderItems = (orderProductString) => {
    if (!orderProductString) return [];
    return orderProductString.split(',').map(item => {
      const trimmed = item.trim();
      const match = trimmed.match(/^(.+?)\s*\(x(\d+)\)$/);
      let name = trimmed;
      let qty = 1;
      if (match) {
        name = match[1];
        qty = parseInt(match[2], 10);
      }
      const productInfo = products.find(p => p.name.toLowerCase() === name.toLowerCase());
      return {
        name,
        qty,
        image: productInfo?.image || null,
        category: productInfo?.category || "General",
        price: productInfo?.price || null
      };
    });
  };

  if (!ready) return <OrdersSkeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header" style={{ marginBottom: 12 }}>
        <div>
          <h1>Sales & Leads</h1>
          <p>Manage customer orders and product inquiries</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #eee", marginBottom: 20 }}>
        <button 
          onClick={() => setActiveTab("orders")}
          style={{
            padding: "10px 16px",
            border: 0,
            background: "none",
            borderBottom: activeTab === "orders" ? "2px solid #0a4bd9" : "2px solid transparent",
            color: activeTab === "orders" ? "#0a4bd9" : "#666",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          Orders ({rawOrders.length})
        </button>
        <button 
          onClick={() => setActiveTab("inquiries")}
          style={{
            padding: "10px 16px",
            border: 0,
            background: "none",
            borderBottom: activeTab === "inquiries" ? "2px solid #0a4bd9" : "2px solid transparent",
            color: activeTab === "inquiries" ? "#0a4bd9" : "#666",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          Product Inquiries ({inquiries.length})
        </button>
      </div>

      {activeTab === "orders" ? (
        <>
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
                  ) : orders.map((order) => {
                    const parsedItems = parseOrderItems(order.product);
                    return (
                      <tr key={order.id}>
                        <td className="panel-order-id">{order.id}</td>
                        <td><span className="orders-customer">{order.customer}</span></td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                              {parsedItems.map((item, idx) => (
                                <div key={idx} style={{ width: "32px", height: "32px", borderRadius: "6px", overflow: "hidden", border: "1px solid #eee", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                  ) : (
                                    <Package size={14} color="#aaa" />
                                  )}
                                </div>
                              ))}
                            </div>
                            <span>{order.product}</span>
                          </div>
                        </td>
                        <td style={{ color: "#777", fontSize: "0.84rem" }}>{order.date}</td>
                        <td className="panel-amount">{order.amount.toLocaleString("en-US")} MAD</td>
                        <td><span className="panel-status" style={{ background: statusColors[order.status].bg, color: statusColors[order.status].color }}>{order.status}</span></td>
                        <td><button className="orders-view-btn" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="panel-section">
          <div className="panel-table-wrap">
            <table className="panel-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone / WhatsApp</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>No product inquiries received yet.</td></tr>
                ) : inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td><strong style={{ color: "#111" }}>{inq.product_name}</strong></td>
                    <td><span className="orders-customer">{inq.customer_name}</span></td>
                    <td style={{ color: "#444" }}>{inq.customer_email}</td>
                    <td style={{ color: "#444" }}>{inq.customer_phone}</td>
                    <td style={{ color: "#777", fontSize: "0.84rem" }}>
                      {new Date(inq.created_at || inq.id).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td><button className="orders-view-btn" onClick={() => setSelectedInquiry(inq)}><Eye size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                  {parseOrderItems(selectedOrder.product).map((item, idx) => (
                    <div key={idx} className="orders-detail-item" style={{ display: "flex", gap: "14px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                      <div style={{ width: "50px", height: "50px", borderRadius: "8px", overflow: "hidden", border: "1px solid #eee", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <Package size={20} color="#888" />
                        )}
                      </div>
                      <div className="orders-detail-item-info" style={{ flex: 1 }}>
                        <strong style={{ display: "block", fontSize: "0.95rem" }}>{item.name}</strong>
                        <span style={{ fontSize: "0.8rem", color: "#666" }}>{item.category}</span>
                      </div>
                      <div className="orders-detail-item-qty" style={{ textAlign: "right" }}>
                        <span style={{ display: "block", fontSize: "0.85rem", color: "#666" }}>Qty: {item.qty}</span>
                        {item.price ? (
                          <strong style={{ fontSize: "0.95rem" }}>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
                        ) : (
                          <strong style={{ fontSize: "0.95rem" }}>-- MAD</strong>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedInquiry && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedInquiry(null)}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()} style={{ width: "min(550px, 100%)" }}>
              <div className="orders-detail-header">
                <div>
                  <h2>Inquiry Details</h2>
                  <span>Received on {new Date(selectedInquiry.created_at || selectedInquiry.id).toLocaleString("en-US")}</span>
                </div>
                <button className="orders-close-btn" onClick={() => setSelectedInquiry(null)}><X size={18} /></button>
              </div>

              <div className="orders-detail-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  <div className="orders-detail-card" style={{ gridColumn: "span 2" }}>
                    <h4>Inquired Product</h4>
                    <strong style={{ fontSize: "1.1rem", color: "#111", display: "block", marginTop: "4px" }}>
                      {selectedInquiry.product_name}
                    </strong>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Customer Name</h4>
                    <p className="orders-detail-name">{selectedInquiry.customer_name}</p>
                  </div>
                  <div className="orders-detail-card">
                    <h4>Contact Info</h4>
                    <p>{selectedInquiry.customer_email}</p>
                    <p>{selectedInquiry.customer_phone}</p>
                  </div>
                </div>

                <div className="orders-detail-card" style={{ padding: "16px" }}>
                  <h4>Customer Message / Inquiry Notes</h4>
                  <p style={{ 
                    whiteSpace: "pre-wrap", 
                    fontSize: "0.92rem", 
                    lineHeight: 1.5, 
                    color: "#333",
                    marginTop: "8px",
                    background: "#f8f9fa",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #eee"
                  }}>
                    {selectedInquiry.message || "No message provided."}
                  </p>
                </div>
                
                <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                  <a 
                    href={`mailto:${selectedInquiry.customer_email}?subject=Inquiry regarding: ${encodeURIComponent(selectedInquiry.product_name)}`}
                    className="orders-view-btn" 
                    style={{ flex: 1, textDecoration: "none", justifyContent: "center", display: "inline-flex", alignItems: "center", height: "40px", gap: "6px", backgroundColor: "#0a4bd9", color: "#fff", border: "1px solid #0a4bd9", fontWeight: "600" }}
                  >
                    Reply via Email
                  </a>
                  <a 
                    href={`https://wa.me/${selectedInquiry.customer_phone.replace(/\D/g, "")}`}
                    target="_blank"
                    className="orders-view-btn" 
                    style={{ flex: 1, backgroundColor: "#25D366", color: "#fff", textDecoration: "none", justifyContent: "center", display: "inline-flex", alignItems: "center", height: "40px", gap: "6px", border: "1px solid #25D366", fontWeight: "600" }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
