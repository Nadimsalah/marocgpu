"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const CATALOG = [
  { id: 10, name: "PNY GeForce RTX 4090 24GB XLR8 Gaming Verto RGB", category: "Consumer", price: 22490, badge: "Flagship GPU", spec: "Ada Lovelace · 24GB GDDR6X · XLR8 RGB", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 11, name: "PNY GeForce RTX 4080 Super 16GB XLR8 Gaming Verto", category: "Consumer", price: 13990, badge: "High Performance", spec: "Ada Lovelace · 16GB GDDR6X · Triple Fan", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 12, name: "PNY GeForce RTX 4070 Ti Super 16GB Verto Overclocked", category: "Consumer", price: 10490, badge: "Best Value Gaming", spec: "Ada Lovelace · 16GB GDDR6X · Dual Fan", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 13, name: "NVIDIA RTX 6000 Ada Generation 48GB", category: "Professional", price: 94990, badge: "AI & Rendering", spec: "Ada Lovelace · 48GB GDDR6 · Dual-Slot Blower", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 14, name: "NVIDIA RTX 4000 Ada Generation 20GB", category: "Professional", price: 18990, badge: "Workstation GPU", spec: "Ada Lovelace · 20GB GDDR6 · Single-Slot", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 15, name: "PNY NVIDIA RTX A6000 48GB GDDR6", category: "Professional", price: 62490, badge: "Quadro Legacy", spec: "Ampere Architecture · 48GB GDDR6 · ECC Memory", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 16, name: "NVIDIA H100 Tensor Core GPU 80GB HBM3", category: "Data Center Solutions", price: 420000, badge: "LLM & GenAI", spec: "Hopper Architecture · 80GB HBM3 · SXM5 / PCIe", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 17, name: "NVIDIA A100 Tensor Core GPU 80GB CoWoS", category: "Data Center Solutions", price: 195000, badge: "Data Center GPU", spec: "Ampere Architecture · 80GB HBM2e · MIG Support", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 18, name: "NVIDIA L40S Tensor Core GPU 48GB", category: "Data Center Solutions", price: 165000, badge: "AI & Graphics", spec: "Ada Lovelace · 48GB GDDR6 · Universal Accelerator", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 19, name: "PNY XLR8 Gaming DDR5 6000MHz 64GB Kit (2x32GB)", category: "Accessories", price: 3190, badge: "DDR5 Memory", spec: "64GB Dual Channel · 6000MHz CL38 · RGB Heat Spreader", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1100&q=88" },
  { id: 20, name: "PNY CS3140 2TB PCIe Gen4 x4 M.2 NVMe SSD", category: "Accessories", price: 2490, badge: "High-Speed SSD", spec: "2TB NVMe SSD · Up to 7500MB/s Read · XLR8 Heatsink", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1100&q=88" }
];

export function getProduct(id) {
  return CATALOG.find((p) => p.id === id);
}

export function getAllProducts() {
  return CATALOG;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [dbCatalog, setDbCatalog] = useState([]);

  useEffect(() => {
    async function loadDbCatalog() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setDbCatalog(data);
        }
      } catch (e) {
        console.error("CartContext loadDbCatalog error:", e);
      }
    }
    loadDbCatalog();
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("marocgpu_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("marocgpu_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (productId, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      const next = existing
        ? prev.map((i) => i.id === productId ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { id: productId, qty }];
      try {
        localStorage.setItem("marocgpu_cart", JSON.stringify(next));
      } catch {}
      return next;
    });
    setDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== productId);
      try {
        localStorage.setItem("marocgpu_cart", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => {
      const next = prev.map((i) => i.id === productId ? { ...i, qty } : i);
      try {
        localStorage.setItem("marocgpu_cart", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearCart = () => setItems([]);

  const getProductDetails = (id) => {
    const dbProd = dbCatalog.find((p) => p.id === id || String(p.id) === String(id));
    if (dbProd) {
      return {
        id: dbProd.id,
        name: dbProd.name,
        category: dbProd.category,
        price: Number(dbProd.price),
        badge: dbProd.badge,
        spec: dbProd.description || "",
        image: dbProd.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80"
      };
    }
    return CATALOG.find((p) => p.id === id || String(p.id) === String(id));
  };

  const cartItems = items.map((item) => {
    const product = getProductDetails(item.id);
    return product ? { ...product, qty: item.qty } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;
  const count = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart, removeFromCart, updateQty, clearCart, subtotal, shipping, total, count, drawerOpen, setDrawerOpen, hydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
