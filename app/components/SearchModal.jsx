"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  ShoppingCart,
  X as CloseIcon,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const searchProducts = [
  { id: 1, name: "ProWork X1 Mobile Studio", category: "Consumer", price: "12,990 MAD", badge: "Best seller", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1100&q=88" },
  { id: 2, name: "EliteBook Pro 14", category: "Consumer", price: "10,990 MAD", badge: "Business ready", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=88" },
  { id: 3, name: "CreatorBook OLED 16", category: "Consumer", price: "15,490 MAD", badge: "New", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1100&q=88" },
  { id: 4, name: "Creator Tower RTX", category: "Professional", price: "18,490 MAD", badge: "Creator pick", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1100&q=88" },
  { id: 5, name: "Apex Gaming G7", category: "Professional", price: "21,990 MAD", badge: "High performance", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1100&q=88" },
  { id: 6, name: "Compact Studio Mini", category: "Professional", price: "8,490 MAD", badge: "Small footprint", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1100&q=88" },
  { id: 7, name: "GeForce RTX 4070 Super", category: "Graphics", price: "7,490 MAD", badge: "In stock", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 8, name: "StudioView 27 4K", category: "Displays", price: "4,799 MAD", badge: "Color accurate", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=88" },
  { id: 9, name: "UltraWide Flow 34", category: "Displays", price: "6,190 MAD", badge: "Immersive", image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a0b2?auto=format&fit=crop&w=1100&q=88" },
  { id: 10, name: "Forge 75 Keyboard", category: "Accessories", price: "1,090 MAD", badge: "Hot swappable", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=88" },
  { id: 11, name: "Vector Pro Mouse", category: "Accessories", price: "690 MAD", badge: "Ultra light", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=88" },
  { id: 12, name: "Creator Mic S1", category: "Accessories", price: "1,490 MAD", badge: "Studio audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=88" },
  { id: 13, name: "Laser Pro M400", category: "Printers", price: "3,290 MAD", badge: "Office ready", image: "https://images.unsplash.com/photo-1612810806695-30f7d5e2a7b5?auto=format&fit=crop&w=1100&q=88" },
  { id: 14, name: "SmartTank Studio", category: "Printers", price: "2,790 MAD", badge: "Low cost printing", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1100&q=88" },
  { id: 15, name: "Performance Laptops", category: "Consumer", price: "From 8,990 MAD", badge: "Popular", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1100&q=88" },
  { id: 16, name: "Custom Gaming PCs", category: "Professional", price: "From 14,990 MAD", badge: "Custom build", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1100&q=88" },
  { id: 17, name: "Mechanical Keyboards", category: "Accessories", price: "From 890 MAD", badge: "Accessories", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=88" },
  { id: 18, name: "Pro Gaming Mice", category: "Accessories", price: "From 490 MAD", badge: "Accessories", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=88" },
  { id: 19, name: "Streaming Essentials", category: "Accessories", price: "From 790 MAD", badge: "Creator gear", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=88" },
  { id: 20, name: "NVIDIA Graphics Cards", category: "Graphics", price: "From 4,990 MAD", badge: "Graphics", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { addToCart, items, hydrated } = useCart();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = {};
    results.forEach((p) => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, [results]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="search-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <Search size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, brands..."
                autoComplete="off"
              />
              <button className="search-modal-close" type="button" onClick={onClose}>
                <CloseIcon size={20} />
              </button>
            </div>

            {!query.trim() ? (
              <div className="search-modal-empty">
                <Search size={40} />
                <p>Start typing to search our catalog</p>
              </div>
            ) : results.length === 0 ? (
              <div className="search-modal-empty">
                <p>No results for "{query}"</p>
                <span>Try a different search term or browse categories</span>
              </div>
            ) : (
              <div className="search-modal-results">
                <div className="search-modal-count">{results.length} result{results.length !== 1 ? "s" : ""}</div>
                {Object.entries(grouped).map(([category, products]) => (
                  <div key={category}>
                    <div className="search-modal-group">{category}</div>
                    <div className="search-modal-grid">
                      {products.map((product) => {
                        const inCart = hydrated && items.some((i) => i.id === product.id);
                        return (
                          <div className="search-result-card" key={product.id}>
                            <div className="search-result-image">
                              <img src={product.image} alt={product.name} loading="lazy" />
                              <span>{product.badge}</span>
                            </div>
                            <div className="search-result-info">
                              <h3>{product.name}</h3>
                              <strong>{product.price}</strong>
                              <button
                                className={inCart ? "added" : ""}
                                type="button"
                                onClick={() => addToCart(product.id)}
                              >
                                <ShoppingCart size={15} />
                                {inCart ? "In cart" : "Add to cart"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <a className="search-modal-view-all" href="/products" onClick={onClose}>
                  View all products <ArrowRight size={16} />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
