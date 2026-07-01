"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Image as ImageIcon, Plus, Search, Upload, X } from "lucide-react";

const allProducts = [];

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
  const [products, setProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [adding, setAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "", category: "Consumer", price: "", stock: "", badge: "", image: "", description: ""
  });

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setProducts(list);
      setRawProducts(list);
    } catch (e) {
      console.error("Error loading products:", e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = rawProducts;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.badge && p.badge.toLowerCase().includes(q)));
    }
    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    setProducts(filtered);
  }, [search, categoryFilter, rawProducts]);

  const openEdit = (product) => {
    setEditForm({ ...product });
    setSelected(product);
  };

  const saveEdit = async () => {
    if (!editForm) return;
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const updated = await res.json();
      if (updated && !updated.error) {
        setRawProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSelected(updated);
        setEditForm(null);
      }
    } catch (e) {
      console.error("Error saving product changes:", e);
    }
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
                    <div className="products-edit-row" style={{ gridTemplateColumns: "1fr" }}>
                      <label>
                        <span>Description</span>
                        <textarea
                          value={editForm.description || ""}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          placeholder="Detailed description of the product features, specs, and contents..."
                          style={{
                            width: "100%",
                            minHeight: 100,
                            borderRadius: 8,
                            border: "1px solid #dcdde1",
                            padding: "12px",
                            fontFamily: "inherit",
                            fontSize: "0.9rem",
                            resize: "vertical"
                          }}
                        />
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
                    {selected.description && (
                      <div className="orders-detail-card" style={{ gridColumn: "1 / -1" }}>
                        <h4>Description</h4>
                        <p style={{ fontSize: "0.88rem", color: "#444", lineHeight: 1.5, margin: "6px 0 0" }}>{selected.description}</p>
                      </div>
                    )}
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
                  <div className="products-edit-row" style={{ gridTemplateColumns: "1fr" }}>
                    <label>
                      <span>Description</span>
                      <textarea
                        value={addForm.description}
                        onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                        placeholder="Detailed description of the product features, specs, and contents..."
                        style={{
                          width: "100%",
                          minHeight: 100,
                          borderRadius: 8,
                          border: "1px solid #dcdde1",
                          padding: "12px",
                          fontFamily: "inherit",
                          fontSize: "0.9rem",
                          resize: "vertical"
                        }}
                      />
                    </label>
                  </div>
                  <div className="products-edit-actions">
                    <button
                      className="store-save-btn"
                      onClick={async () => {
                        if (!addForm.name.trim()) return;
                        try {
                          const res = await fetch('/api/products', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              name: addForm.name,
                              category: addForm.category,
                              price: parseInt(addForm.price) || 0,
                              stock: parseInt(addForm.stock) || 0,
                              sold: 0,
                              badge: addForm.badge || "New",
                              image: addForm.image || "",
                              description: addForm.description || ""
                            })
                          });
                          const created = await res.json();
                          if (created && !created.error) {
                            setRawProducts((prev) => [created, ...prev]);
                            setAdding(false);
                            setAddForm({ name: "", category: "Consumer", price: "", stock: "", badge: "", image: "", description: "" });
                          }
                        } catch (e) {
                          console.error("Error creating product:", e);
                        }
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
