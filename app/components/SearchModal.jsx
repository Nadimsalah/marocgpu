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
import { useSite } from "../context/SiteContext";

const searchProducts = [
  { id: 10, name: "PNY GeForce RTX 4090 24GB XLR8 Gaming Verto RGB", category: "Consumer", price: "22,490 MAD", badge: "Flagship GPU", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 11, name: "PNY GeForce RTX 4080 Super 16GB XLR8 Gaming Verto", category: "Consumer", price: "13,990 MAD", badge: "High Performance", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 12, name: "PNY GeForce RTX 4070 Ti Super 16GB Verto Overclocked", category: "Consumer", price: "10,490 MAD", badge: "Best Value Gaming", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 13, name: "NVIDIA RTX 6000 Ada Generation 48GB", category: "Professional", price: "94,990 MAD", badge: "AI & Rendering", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 14, name: "NVIDIA RTX 4000 Ada Generation 20GB", category: "Professional", price: "18,990 MAD", badge: "Workstation GPU", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 15, name: "PNY NVIDIA RTX A6000 48GB GDDR6", category: "Professional", price: "62,490 MAD", badge: "Quadro Legacy", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88" },
  { id: 16, name: "NVIDIA H100 Tensor Core GPU 80GB HBM3", category: "Data Center Solutions", price: "420,000 MAD", badge: "LLM & GenAI", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 17, name: "NVIDIA A100 Tensor Core GPU 80GB CoWoS", category: "Data Center Solutions", price: "195,000 MAD", badge: "Data Center GPU", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 18, name: "NVIDIA L40S Tensor Core GPU 48GB", category: "Data Center Solutions", price: "165,000 MAD", badge: "AI & Graphics", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88" },
  { id: 19, name: "PNY XLR8 Gaming DDR5 6000MHz 64GB Kit (2x32GB)", category: "Accessories", price: "3,190 MAD", badge: "DDR5 Memory", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1100&q=88" },
  { id: 20, name: "PNY CS3140 2TB PCIe Gen4 x4 M.2 NVMe SSD", category: "Accessories", price: "2,490 MAD", badge: "High-Speed SSD", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1100&q=88" }
];

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { addToCart, items, hydrated } = useCart();
  const { t } = useSite();

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
                placeholder={t("Search products, categories, brands...")}
                autoComplete="off"
              />
              <button className="search-modal-close" type="button" onClick={onClose}>
                <CloseIcon size={20} />
              </button>
            </div>

            {!query.trim() ? (
              <div className="search-modal-empty">
                <Search size={40} />
                <p>{t("Start typing to search our catalog")}</p>
              </div>
            ) : results.length === 0 ? (
              <div className="search-modal-empty">
                <p>{t("No results for")} "{query}"</p>
                <span>{t("Try a different search term or browse categories")}</span>
              </div>
            ) : (
              <div className="search-modal-results">
                <div className="search-modal-count">{results.length} {results.length === 1 ? t("result") : t("results")}</div>
                {Object.entries(grouped).map(([category, products]) => (
                  <div key={category}>
                    <div className="search-modal-group">{t(category)}</div>
                    <div className="search-modal-grid">
                      {products.map((product) => {
                        const inCart = hydrated && items.some((i) => i.id === product.id);
                        return (
                          <div className="search-result-card" key={product.id}>
                            <div className="search-result-image">
                              <img src={product.image} alt={product.name} loading="lazy" />
                              {product.badge && <span>{t(product.badge)}</span>}
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
                                {inCart ? t("In cart") : t("Add to cart")}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <a className="search-modal-view-all" href="/products/" onClick={onClose}>
                  {t("View all products")} <ArrowRight size={16} />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
