"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Image as ImageIcon, Plus, Search, Upload, X, Trash2, Settings, Check } from "lucide-react";
import { useSite } from "../../context/SiteContext";

const defaultCategories = ["Consumer", "Professional", "Graphics", "Displays", "Accessories", "Printers"];

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

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxDim = 800; // Resize to a max dimension of 800px to keep it small (under 100kb)
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG with 0.7 quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressedBase64);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

export default function ProductsPage() {
  const { settings } = useSite();
  const categories = settings?.navItems || defaultCategories;

  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [addError, setAddError] = useState("");
  const [rawProducts, setRawProducts] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [adding, setAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "", category: categories[0] || "Consumer", price: "", stock: "", badge: "", image: "", description: "", pdf: "", inquiry_only: false
  });

  const loadData = async () => {
    try {
      const resProducts = await fetch('/api/products');
      const productsData = await resProducts.json();
      const productsList = Array.isArray(productsData) ? productsData : [];
      setProducts(productsList);
      setRawProducts(productsList);
    } catch (e) {
      console.error("Error loading products:", e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    loadData();
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
    setIsSaving(true);
    try {
      const payload = { ...editForm };
      if (!payload.pdf) {
        delete payload.pdf;
      }
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const updated = await res.json();
      if (updated && !updated.error) {
        setRawProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSelected(updated);
        setEditForm(null);
      }
    } catch (e) {
      console.error("Error saving product changes:", e);
    } finally {
      setIsSaving(false);
    }
  };

  if (!ready) return <Skeleton />;

  return (
    <motion.div className="panel-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="panel-header">
        <div>
          <h1>Products</h1>
          <p>{rawProducts.length} products · {rawProducts.reduce((s, p) => s + (p.stock || 0), 0)} total stock</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="store-save-btn" onClick={() => { setAdding(true); setAddError(""); setAddForm(prev => ({ ...prev, category: categories[0] || "Consumer" })); }} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Plus size={17} /> Add product
          </button>
        </div>
      </div>

      <div className="orders-toolbar">
        <label className="orders-search">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, category, or badge..." />
        </label>
        <div className="orders-filters">
          <button className={categoryFilter === "All" ? "active" : ""} onClick={() => setCategoryFilter("All")}>All</button>
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
                  <td className="panel-amount">{p.price?.toLocaleString("en-US")} MAD</td>
                  <td><span style={{ color: p.stock < 10 ? "#e53e3e" : "#16845a", fontWeight: 650 }}>{p.stock}</span></td>
                  <td style={{ fontWeight: 650 }}>{p.sold}</td>
                  <td className="panel-amount">{(p.price * p.sold)?.toLocaleString("en-US")} MAD</td>
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
                          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
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
                    <div className="products-edit-row" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 0" }}>
                      <input 
                        type="checkbox" 
                        id="edit-inquiry-only" 
                        checked={editForm.inquiry_only || false} 
                        onChange={(e) => setEditForm({ ...editForm, inquiry_only: e.target.checked })} 
                        style={{ width: "18px", height: "18px", cursor: "pointer" }} 
                      />
                      <label htmlFor="edit-inquiry-only" style={{ cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", color: "#111", display: "inline-flex", alignItems: "center" }}>
                        Inquiry Only (Disable direct purchase / checkout)
                      </label>
                    </div>
                    <div className="products-edit-row">
                      <label><span>Image</span>
                        <div
                          className="products-image-upload"
                          onPaste={(e) => {
                            const text = e.clipboardData.getData("text");
                            if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/i)) {
                              setEditForm({ ...editForm, image: text });
                            }
                          }}
                          tabIndex={0}
                        >
                          {editForm.image && <img src={editForm.image} alt="" onError={(e) => e.target.style.display = "none"} />}
                          {!editForm.image && <div className="products-image-placeholder" style={{ display: "flex" }}><ImageIcon size={24} /></div>}
                          <label className="products-image-overlay">
                            <Upload size={16} />
                            <input type="file" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                compressImage(file, (base64) => setEditForm({ ...editForm, image: base64 }));
                              }
                            }} />
                          </label>
                        </div>
                      </label>
                    </div>
                    <div className="products-edit-row">
                      <label>
                        <span>Product PDF (Datasheet/Manual)</span>
                        <div className="products-pdf-upload" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => setEditForm({ ...editForm, pdf: ev.target.result });
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          {editForm.pdf && (
                            <span style={{ color: "#16845a", fontSize: "0.85rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <Check size={16} /> PDF Uploaded
                            </span>
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="products-edit-row" style={{ gridTemplateColumns: "1fr" }}>
                      <label>
                        <span>Description</span>
                        <textarea value={editForm.description || ""} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} style={{ width: "100%", minHeight: 100, borderRadius: 8, border: "1px solid #dcdde1", padding: 12 }} />
                      </label>
                    </div>
                    <div className="products-edit-actions">
                      <button className="store-save-btn" onClick={saveEdit} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save changes"}
                      </button>
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
                    {selected.pdf && (
                      <div className="orders-detail-card" style={{ gridColumn: "1 / -1" }}>
                        <h4>Datasheet (PDF)</h4>
                        <a 
                          href={selected.pdf} 
                          download={`${selected.name.replace(/\s+/g, "_")}_datasheet.pdf`}
                          style={{ color: "#0a4bd9", textDecoration: "underline", fontSize: "0.88rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4 }}
                        >
                          Download Datasheet PDF
                        </a>
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
            <motion.div className="orders-detail-modal" onClick={(e) => e.stopPropagation()}>
              <div className="orders-detail-header">
                <h2>Add product</h2>
                <button className="orders-close-btn" onClick={() => setAdding(false)}><X size={18} /></button>
              </div>
              <div className="orders-detail-body">
                <div className="products-edit-form">
                  <div className="products-edit-row">
                    <label><span>Name</span><input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} /></label>
                    <label><span>Category</span>
                      <select value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="products-edit-row">
                    <label><span>Price (MAD)</span><input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: e.target.value })} /></label>
                    <label><span>Stock</span><input type="number" value={addForm.stock} onChange={(e) => setAddForm({ ...addForm, stock: e.target.value })} /></label>
                  </div>
                  <div className="products-edit-row">
                    <label><span>Badge</span><input value={addForm.badge} onChange={(e) => setAddForm({ ...addForm, badge: e.target.value })} /></label>
                    <label><span>Image</span>
                      <div className="products-image-upload" onPaste={(e) => { const text = e.clipboardData.getData("text"); if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/i)) setAddForm({ ...addForm, image: text }); }}>
                        {addForm.image && <img src={addForm.image} alt="" onError={(e) => e.target.style.display = "none"} />}
                        {!addForm.image && <div className="products-image-placeholder" style={{ display: "flex" }}><ImageIcon size={24} /></div>}
                        <label className="products-image-overlay">
                          <Upload size={16} />
                          <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { compressImage(file, (base64) => setAddForm({ ...addForm, image: base64 })); } }} />
                        </label>
                      </div>
                    </label>
                  </div>
                  <div className="products-edit-row" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 0" }}>
                    <input 
                      type="checkbox" 
                      id="add-inquiry-only" 
                      checked={addForm.inquiry_only || false} 
                      onChange={(e) => setAddForm({ ...addForm, inquiry_only: e.target.checked })} 
                      style={{ width: "18px", height: "18px", cursor: "pointer" }} 
                    />
                    <label htmlFor="add-inquiry-only" style={{ cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", color: "#111", display: "inline-flex", alignItems: "center" }}>
                      Inquiry Only (Disable direct purchase / checkout)
                    </label>
                  </div>
                  <div className="products-edit-row">
                    <label>
                      <span>Product PDF (Datasheet/Manual)</span>
                      <div className="products-pdf-upload" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setAddForm({ ...addForm, pdf: ev.target.result });
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {addForm.pdf && (
                          <span style={{ color: "#16845a", fontSize: "0.85rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Check size={16} /> PDF Uploaded
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="products-edit-row" style={{ gridTemplateColumns: "1fr" }}>
                    <label>
                      <span>Description</span>
                      <textarea value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} style={{ width: "100%", minHeight: 100, borderRadius: 8, border: "1px solid #dcdde1", padding: 12 }} />
                    </label>
                  </div>
                  {addError && <div style={{ color: "#e53e3e", textAlign: "center", fontWeight: 600 }}>{addError}</div>}
                  <div className="products-edit-actions">
                    <button className="store-save-btn" disabled={isSaving} onClick={async () => {
                      if (!addForm.name.trim()) return;
                      setIsSaving(true);
                      setAddError("");
                      try {
                        const payload = { ...addForm, price: parseInt(addForm.price) || 0, stock: parseInt(addForm.stock) || 0, sold: 0, badge: addForm.badge || "New" };
                        if (!payload.pdf) {
                          delete payload.pdf;
                        }
                        const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                        const created = await res.json();
                        if (res.ok) { setRawProducts((prev) => [created, ...prev]); setAdding(false); setAddForm({ name: "", category: categories[0] || "", price: "", stock: "", badge: "", image: "", description: "", pdf: "", inquiry_only: false }); }
                        else setAddError(created?.error || "Error");
                      } catch (e) { setAddError("Network error."); }
                      finally { setIsSaving(false); }
                    }}>{isSaving ? "Creating..." : "Create product"}</button>
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
