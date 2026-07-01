"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const CATALOG = [
  { id: 1, name: "ProWork X1 Mobile Studio", category: "Consumer", price: 12990, badge: "Best seller", spec: "Core Ultra 7 · RTX 4060 · 32GB · 1TB", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1100&q=88" },
  { id: 2, name: "EliteBook Pro 14", category: "Consumer", price: 10990, badge: "Business ready", spec: "Core Ultra 7 · 32GB · 1TB SSD", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=88" },
  { id: 3, name: "CreatorBook OLED 16", category: "Consumer", price: 15490, badge: "New", spec: "Ryzen 9 · RTX 4070 · OLED 3.2K", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1100&q=88" },
  { id: 4, name: "Creator Tower RTX", category: "Professional", price: 18490, badge: "Creator pick", spec: "Ryzen 9 · RTX 4070 · 64GB · 2TB", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1100&q=88" },
  { id: 5, name: "Apex Gaming G7", category: "Professional", price: 21990, badge: "High performance", spec: "Core i9 · RTX 4080 Super · 32GB", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1100&q=88" },
  { id: 6, name: "Compact Studio Mini", category: "Professional", price: 8490, badge: "Small footprint", spec: "Ryzen 7 · 32GB · 1TB NVMe", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1100&q=88" },
  { id: 7, name: "GeForce RTX 4070 Super", category: "Graphics", price: 7490, badge: "In stock", spec: "12GB GDDR6X · DLSS 3.5", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 8, name: "StudioView 27 4K", category: "Displays", price: 4799, badge: "Color accurate", spec: "4K IPS · 98% DCI-P3 · USB-C", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=88" },
  { id: 9, name: "UltraWide Flow 34", category: "Displays", price: 6190, badge: "Immersive", spec: "WQHD · 165Hz · 1ms · HDR", image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a0b2?auto=format&fit=crop&w=1100&q=88" },
  { id: 10, name: "Forge 75 Keyboard", category: "Accessories", price: 1090, badge: "Hot swappable", spec: "Mechanical · Wireless · RGB", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=88" },
  { id: 11, name: "Vector Pro Mouse", category: "Accessories", price: 690, badge: "Ultra light", spec: "49g · 26K sensor · Wireless", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=88" },
  { id: 12, name: "Creator Mic S1", category: "Accessories", price: 1490, badge: "Studio audio", spec: "USB-C · Cardioid · Low noise", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=88" },
  { id: 13, name: "Laser Pro M400", category: "Printers", price: 3290, badge: "Office ready", spec: "Duplex · Wi-Fi · 38 ppm", image: "https://images.unsplash.com/photo-1612810806695-30f7d5e2a7b5?auto=format&fit=crop&w=1100&q=88" },
  { id: 14, name: "SmartTank Studio", category: "Printers", price: 2790, badge: "Low cost printing", spec: "Color · Wireless · High capacity", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1100&q=88" },
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
