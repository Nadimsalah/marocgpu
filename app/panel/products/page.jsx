"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Image as ImageIcon, Plus, Search, Upload, X } from "lucide-react";

const allProducts = [
  { id: 1, name: "ProWork X1 Mobile Studio", category: "Consumer", price: 12990, stock: 24, sold: 187, badge: "Best seller", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=200&q=80" },
  { id: 2, name: "EliteBook Pro 14", category: "Consumer", price: 10990, stock: 31, sold: 142, badge: "Business ready", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80" },
  { id: 3, name: "CreatorBook OLED 16", category: "Consumer", price: 15490, stock: 12, sold: 98, badge: "New", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" },
  { id: 4, name: "Creator Tower RTX", category: "Professional", price: 18490, stock: 8, sold: 64, badge: "Creator pick", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=200&q=80" },
  { id: 5, name: "Apex Gaming G7", category: "Professional", price: 21990, stock: 6, sold: 53, badge: "High performance", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80" },
  { id: 6, name: "Compact Studio Mini", category: "Professional", price: 8490, stock: 18, sold: 76, badge: "Small footprint", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=200&q=80" },
  { id: 7, name: "GeForce RTX 4070 Super", category: "Graphics", price: 7490, stock: 42, sold: 215, badge: "In stock", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80" },
  { id: 8, name: "StudioView 27 4K", category: "Displays", price: 4799, stock: 15, sold: 89, badge: "Color accurate", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80" },
  { id: 9, name: "UltraWide Flow 34", category: "Displays", price: 6190, stock: 9, sold: 44, badge: "Immersive", image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a0b2?auto=format&fit=crop&w=200&q=80" },
  { id: 10, name: "Forge 75 Keyboard", category: "Accessories", price: 1090, stock: 67, sold: 312, badge: "Hot swappable", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80" },
  { id: 11, name: "Vector Pro Mouse", category: "Accessories", price: 690, stock: 83, sold: 428, badge: "Ultra light", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=200&q=80" },
  { id: 12, name: "Creator Mic S1", category: "Accessories", price: 1490, stock: 22, sold: 117, badge: "Studio audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80" },
  { id: 13, name: "Laser Pro M400", category: "Printers", price: 3290, stock: 11, sold: 38, badge: "Office ready", image: "https://images.unsplash.com/photo-1612810806695-30f7d5e2a7b5?auto=format&fit=crop&w=200&q=80" },
  { id: 14, name: "SmartTank Studio", category: "Printers", price: 2790, stock: 14, sold: 51, badge: "Low cost printing", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=200&q=80" },
];

const categories = ["All", "Consumer", "Professional", "Graphics", "Displays", "Accessories", "Printers"];

function Skeleton() {
  return (
    <div className="panel-content">
      <div className="panel-header">
        <div><div className="shimmer" style={{ width: 140, height: 28, borderRadius: 8, marginBottom: 8 }} /><div className="shimmer" style={{ width: 240, height: 14, borderRadius: 6 }} /></div>
      </div>
      <div className="shimmer" style={{ width: "100%", height: 52, borderRadius: 14, marginBottom: 20 }} />
      <div className="shimmer" style={{ width: "100%", height: 460, borderRadius: 18 }} />
    </div>
  );
}

export default function ProductsPage() {
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState(allProducts);
  const [editForm, setEditForm] = useState(null);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "", category: "Consumer", price: "", stock: "", badge: "", sold: "0", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80",
  });

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q));
    }
    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    setProducts(filtered);
  }, [search, categoryFilter]);

  const openEdit = (product) => {
    setEditForm({ ...product });
    setSelected(product);
  };

  const saveEdit = () => {
    if (!editForm) return;
    setProducts((prev) => prev.map((p) => (p.id === editForm.id ? editForm : p)));
    setSelected(editForm);
    setEditForm(null);
  };

  if (!ready) return <Skeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Products</h1>
          <p>{allProducts.length} products · {allProducts.reduce((s, p) => s + p.stock, 0)} total stock</p>
        </div>
        <button className="store-save-btn" onClick={() => setAdding(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Plus size={17} /> Add product
        </button>
      </div>

      <div className="orders-toolbar">
        <label className="orders-search">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, category, or badge..." />
        </label>
        <div className="orders-filters">
          {categories.map((c) => (
            <button key={c} className={categoryFilter === c ? "active" : ""} onClick={() => setCategoryFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-table-wrap">
          <table className="panel-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Revenue</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "48px 24px", color: "#888" }}>No products match your filters.</td></tr>
              ) : products.map((p) => (
                <tr key={p.id}>
                  <td><span className="orders-customer">{p.name}</span></td>
                  <td style={{ color: "#777", fontSize: "0.84rem" }}>{p.category}</td>
                  <td className="panel-amount">{p.price.toLocaleString("en-US")} MAD</td>
                  <td><span style={{ color: p.stock < 10 ? "#e53e3e" : "#16845a", fontWeight: 650 }}>{p.stock}</span></td>
                  <td style={{ fontWeight: 650 }}>{p.sold}</td>
                  <td className="panel-amount">{(p.price * p.sold).toLocaleString("en-US")} MAD</td>
                  <td><button className="orders-view-btn" onClick={() => openEdit(p)}><Edit3 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelected(null); setEditForm(null); }}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
              <div className="orders-detail-header">
                <div>
                  <h2 style={{ color: "#111" }}>{editForm?.name || selected.name}</h2>
                  <span>ID: #{selected.id}</span>
                </div>
                <button className="orders-close-btn" onClick={() => { setSelected(null); setEditForm(null); }}><X size={18} /></button>
              </div>

              <div className="orders-detail-body">
                {editForm ? (
                  <div className="products-edit-form">
                    <div className="products-edit-row">
                      <label><span>Name</span><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></label>
                      <label><span>Category</span>
                        <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                          {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </label>
                    </div>
                    <div className="products-edit-row">
                      <label><span>Price (MAD)</span><input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })} /></label>
                      <label><span>Stock</span><input type="number" value={editForm.stock} onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })} /></label>
                    </div>
                    <div className="products-edit-row">
                      <label><span>Badge</span><input value={editForm.badge} onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })} /></label>
                      <label><span>Sold</span><input type="number" value={editForm.sold} onChange={(e) => setEditForm({ ...editForm, sold: parseInt(e.target.value) || 0 })} /></label>
                    </div>
                    <div className="products-edit-row">
                      <label><span>Image</span>
                        <div
                          className="products-image-upload"
                          onPaste={(e) => {
                            const text = e.clipboardData.getData("text");
                            if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/i) || text.match(/^https?:\/\/\S+\.(jpg|jpeg|png|webp|avif|gif|svg)/i)) {
                              setEditForm({ ...editForm, image: text });
                            }
                          }}
                          tabIndex={0}
                        >
                          {editForm.image ? (
                            <img src={editForm.image} alt="" onError={(e) => { e.target.style.display = "none"; }} />
                          ) : null}
                          {!editForm.image && (
                            <div className="products-image-placeholder" style={{ display: "flex" }}>
                              <ImageIcon size={24} />
                              <span>Upload or paste image URL</span>
                            </div>
                          )}
                          <label className="products-image-overlay">
                            <Upload size={16} />
                            <input type="file" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setEditForm({ ...editForm, image: ev.target.result });
                                reader.readAsDataURL(file);
                              }
                            }} />
                          </label>
                        </div>
                      </label>
                    </div>
                    <div className="products-edit-actions">
                      <button className="store-save-btn" onClick={saveEdit}>Save changes</button>
                      <button className="products-cancel-btn" onClick={() => { setEditForm(null); }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="orders-detail-grid">
                    <div className="orders-detail-card" style={{ gridColumn: "1 / -1", display: "flex", gap: 20, alignItems: "center" }}>
                      <img src={selected.image} alt="" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", background: "#f0f1f3" }} />
                      <div>
                        <h4>{selected.category}</h4>
                        <p style={{ fontSize: "1rem", fontWeight: 700, color: "#111", marginBottom: 4 }}>{selected.name}</p>
                        <span className="panel-status" style={{ background: "#eef4ff", color: "#0a4bd9" }}>{selected.badge}</span>
                      </div>
                    </div>
                    <div className="orders-detail-card">
                      <h4>Price</h4>
                      <p className="orders-detail-amount">{selected.price.toLocaleString("en-US")} MAD</p>
                    </div>
                    <div className="orders-detail-card">
                      <h4>Stock</h4>
                      <p className="orders-detail-amount" style={{ color: selected.stock < 10 ? "#e53e3e" : "#16845a" }}>{selected.stock} units</p>
                    </div>
                    <div className="orders-detail-card">
                      <h4>Sold</h4>
                      <p className="orders-detail-amount">{selected.sold} units</p>
                    </div>
                    <div className="orders-detail-card">
                      <h4>Revenue</h4>
                      <p className="orders-detail-amount">{(selected.price * selected.sold).toLocaleString("en-US")} MAD</p>
                    </div>
                    <button className="store-save-btn" style={{ gridColumn: "1 / -1", width: "100%", justifyContent: "center" }} onClick={() => openEdit(selected)}>
                      <Edit3 size={16} /> Edit product
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adding && (
          <motion.div className="orders-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAdding(false)}>
            <motion.div className="orders-detail-modal" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
              <div className="orders-detail-header">
                <div>
                  <h2 style={{ color: "#111" }}>Add product</h2>
                  <span>Fill in the details to create a new product</span>
                </div>
                <button className="orders-close-btn" onClick={() => setAdding(false)}><X size={18} /></button>
              </div>
              <div className="orders-detail-body">
                <div className="products-edit-form">
                  <div className="products-edit-row">
                    <label><span>Name</span><input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="Product name" /></label>
                    <label><span>Category</span>
                      <select value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}>
                        {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="products-edit-row">
                    <label><span>Price (MAD)</span><input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: e.target.value })} placeholder="0" /></label>
                    <label><span>Stock</span><input type="number" value={addForm.stock} onChange={(e) => setAddForm({ ...addForm, stock: e.target.value })} placeholder="0" /></label>
                  </div>
                  <div className="products-edit-row">
                    <label><span>Badge</span><input value={addForm.badge} onChange={(e) => setAddForm({ ...addForm, badge: e.target.value })} placeholder="e.g. New, Best seller" /></label>
                    <label><span>Image</span>
                      <div
                        className="products-image-upload"
                        onPaste={(e) => {
                          const text = e.clipboardData.getData("text");
                          if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/i) || text.match(/^https?:\/\/\S+\.(jpg|jpeg|png|webp|avif|gif|svg)/i)) {
                            setAddForm({ ...addForm, image: text });
                          }
                        }}
                        tabIndex={0}
                      >
                        {addForm.image ? (
                          <img src={addForm.image} alt="" onError={(e) => { e.target.style.display = "none"; document.getElementById("prod-img-placeholder").style.display = "flex"; }} />
                        ) : null}
                        <div id="prod-img-placeholder" className="products-image-placeholder" style={{ display: addForm.image ? "none" : "flex" }}>
                          <ImageIcon size={24} />
                          <span>Upload or paste image URL</span>
                        </div>
                        <label className="products-image-overlay">
                          <Upload size={16} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setAddForm({ ...addForm, image: ev.target.result });
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </label>
                  </div>
                  <div className="products-edit-actions">
                    <button
                      className="store-save-btn"
                      onClick={() => {
                        if (!addForm.name.trim()) return;
                        const newId = Math.max(...products.map((p) => p.id)) + 1;
                        const newProduct = {
                          id: newId,
                          name: addForm.name,
                          category: addForm.category,
                          price: parseInt(addForm.price) || 0,
                          stock: parseInt(addForm.stock) || 0,
                          sold: 0,
                          badge: addForm.badge || "New",
                          image: addForm.image,
                        };
                        setProducts((prev) => [newProduct, ...prev]);
                        setAdding(false);
                        setAddForm({ name: "", category: "Consumer", price: "", stock: "", badge: "", sold: "0", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80" });
                      }}
                    >
                      <Plus size={16} /> Create product
                    </button>
                    <button className="products-cancel-btn" onClick={() => setAdding(false)}>Cancel</button>
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
