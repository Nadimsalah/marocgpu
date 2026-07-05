"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Grid2X2,
  List,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSite } from "../context/SiteContext";
import InquiryModal from "../components/InquiryModal";

const defaultCategories = ["All", "Consumer", "Professional", "Graphics", "Displays", "Printers", "Accessories"];

const catalogProducts = [
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

function normalizeCategory(value, categoriesList = defaultCategories) {
  if (!value) return "All";
  const normalized = value.toLowerCase();
  if (normalized.includes("consumer") || normalized.includes("laptop")) return "Consumer";
  if (normalized.includes("professional") || normalized.includes("desktop") || normalized.includes("business") || normalized.includes("data center")) return "Professional";
  if (normalized.includes("graphic")) return "Graphics";
  if (normalized.includes("monitor") || normalized.includes("display")) return "Displays";
  if (normalized.includes("printer")) return "Printers";
  if (normalized.includes("gaming") || normalized.includes("workstation")) return "Professional";
  if (normalized.includes("stream")) return "Accessories";
  if (normalized.includes("accessor")) return "Accessories";
  return categoriesList.find((category) => category.toLowerCase() === normalized) || "All";
}

export default function ProductsPage() {
  const { settings, t, language, changeLanguage } = useSite();
  const categories = useMemo(() => {
    const navs = settings?.navItems || ["Consumer", "Professional", "Data Center Solutions", "Support"];
    const filtered = navs.filter(n => n !== "Support" && n !== "Support center");
    return ["All", ...filtered];
  }, [settings?.navItems]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState("grid");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const { addToCart, items, setDrawerOpen, hydrated } = useCart();
  const [liveProducts, setLiveProducts] = useState([]);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const [inquiryProduct, setInquiryProduct] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const resProducts = await fetch('/api/products');
        const productsData = await resProducts.json();
        
        if (Array.isArray(productsData)) {
          setLiveProducts(productsData);
        }
        
        const params = new URLSearchParams(window.location.search);
        const category = normalizeCategory(params.get("category"), categories);
        setActiveCategory(category);
        if (params.get("category") && params.get("category") !== category) {
          window.history.replaceState({}, "", `/products?category=${encodeURIComponent(category)}`);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setReady(true);
      }
    }
    loadData();
  }, [categories]);

  const displayProducts = liveProducts.length > 0 ? liveProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: Number(p.price),
    badge: p.badge || "New",
    spec: p.description ? (p.description.length > 90 ? p.description.slice(0, 90).trim() + "..." : p.description) : "",
    fullDescription: p.description || "",
    inquiry_only: p.inquiry_only,
    image: p.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80"
  })) : catalogProducts;

  const visibleProducts = useMemo(() => {
    const filtered = displayProducts.filter((product) => {
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const searchMatch = `${product.name} ${product.fullDescription || product.spec}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  }, [activeCategory, query, sort, displayProducts]);

  const chooseCategory = (category) => {
    setActiveCategory(category);
    const url = category === "All" ? "/products" : `/products?category=${encodeURIComponent(category)}`;
    window.history.replaceState({}, "", url);
  };

  if (!ready) {
    return (
      <main className="catalog-page">
        <header className="catalog-header">
          <Link className="catalog-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
          <Link className="catalog-home-link" href="/"><ArrowLeft size={17} /> Back to home</Link>
          <button className="catalog-cart" type="button" aria-label="Loading...">
            <ShoppingCart size={19} />
          </button>
        </header>

        <section className="catalog-hero">
          <p>MarocGPU catalog</p>
          <h1>Find your next machine.</h1>
          <span>Purpose-built hardware for work, play, and everything you are creating next.</span>
        </section>

        <section className="catalog-shell">
          <div className="catalog-categories" aria-label="Product categories" style={{ display: "flex", gap: "10px", marginBottom: "24px", overflowX: "auto" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="shimmer"
                style={{
                  width: i === 1 ? "50px" : i === 2 ? "90px" : i === 3 ? "110px" : i === 4 ? "80px" : i === 5 ? "100px" : i === 6 ? "75px" : "95px",
                  height: "38px",
                  borderRadius: "999px",
                  flexShrink: 0
                }}
              />
            ))}
          </div>

          <div className="catalog-toolbar" style={{ pointerEvents: "none" }}>
            <div className="shimmer" style={{ width: "300px", height: "48px", borderRadius: "999px" }} />
            <div className="shimmer" style={{ width: "100px", height: "20px", borderRadius: "6px" }} />
            <div className="shimmer" style={{ width: "160px", height: "20px", borderRadius: "6px" }} />
            <div className="shimmer" style={{ width: "80px", height: "36px", borderRadius: "8px" }} />
          </div>

          <div className={`catalog-products ${view}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <article className="catalog-card" key={i} style={{ pointerEvents: "none" }}>
                <div className="shimmer" style={{ width: "100%", height: "260px", borderRadius: "22px" }} />
                <div className="catalog-card-body" style={{ padding: "24px 2px 0" }}>
                  <div className="shimmer" style={{ width: "30%", height: "12px", borderRadius: "4px", marginBottom: "12px" }} />
                  <div className="shimmer" style={{ width: "80%", height: "20px", borderRadius: "6px", marginBottom: "12px" }} />
                  <div className="shimmer" style={{ width: "95%", height: "14px", borderRadius: "4px", marginBottom: "20px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="shimmer" style={{ width: "40%", height: "22px", borderRadius: "6px" }} />
                    <div className="shimmer" style={{ width: "110px", height: "36px", borderRadius: "999px" }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      <header className="catalog-header" style={{ gap: 12 }}>
        <Link className="catalog-logo" href="/" aria-label="MarocGPU home">
          <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
        </Link>
        <Link className="catalog-home-link" href="/"><ArrowLeft size={17} /> {t("Back to home")}</Link>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
          {/* Modern Language Switcher */}
          <div className="lang-switcher" style={{ display: "inline-flex", background: "#f1f3f5", borderRadius: 20, padding: 3, gap: 2, height: 32, alignItems: "center" }}>
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              style={{
                padding: "4px 8px",
                borderRadius: 16,
                fontSize: "0.72rem",
                fontWeight: 800,
                border: "none",
                background: language === "en" ? "#0a4bd9" : "transparent",
                color: language === "en" ? "#fff" : "#555",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("fr")}
              style={{
                padding: "4px 8px",
                borderRadius: 16,
                fontSize: "0.72rem",
                fontWeight: 800,
                border: "none",
                background: language === "fr" ? "#0a4bd9" : "transparent",
                color: language === "fr" ? "#fff" : "#555",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              FR
            </button>
          </div>

          <button className="catalog-cart" type="button" aria-label={`${hydrated ? items.length : 0} products in cart`} onClick={() => setDrawerOpen(true)} style={{ margin: 0 }}>
            <ShoppingCart size={19} />{hydrated && <span>{items.length}</span>}
          </button>
        </div>
      </header>

      <section className="catalog-hero">
        <p>{t("MarocGPU catalog")}</p>
        <h1>{t("Find your next machine.")}</h1>
        <span>{t("Purpose-built hardware for work, play, and everything you are creating next.")}</span>
      </section>

      <section className="catalog-shell">
        <div className="catalog-categories" aria-label="Product categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "active" : ""}
              type="button"
              key={category}
              onClick={() => chooseCategory(category)}
            >
              {activeCategory === category ? <Check size={15} /> : null}{t(category)}
            </button>
          ))}
        </div>

        <div className="catalog-toolbar">
          <label className="catalog-search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search products")} />
          </label>
          <div className="catalog-count"><SlidersHorizontal size={16} /> {visibleProducts.length} {t("products")}</div>
          <label className="catalog-sort">
            <span>{t("Sort")}</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">{t("Featured")}</option>
              <option value="price-low">{t("Price: low to high")}</option>
              <option value="price-high">{t("Price: high to low")}</option>
              <option value="name">{t("Name")}</option>
            </select>
          </label>
          <div className="view-switch" aria-label="Product view">
            <button className={view === "grid" ? "active" : ""} type="button" onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 size={18} /></button>
            <button className={view === "list" ? "active" : ""} type="button" onClick={() => setView("list")} aria-label="List view"><List size={19} /></button>
          </div>
        </div>

        {visibleProducts.length ? (
          <div className={`catalog-products ${view}`}>
            {visibleProducts.map((product) => {
              const isAdded = hydrated && items.some((i) => i.id === product.id);
              return (
                 <article 
                  className="catalog-card" 
                  key={product.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <div className="catalog-card-image">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span>{t(product.badge)}</span>}
                  </div>
                  <div className="catalog-card-body">
                    <p>{t(product.category)}</p>
                    <h2>{product.name}</h2>
                    <span>{product.spec}</span>
                    <div className="catalog-card-buy" onClick={(e) => e.stopPropagation()}>
                      <strong>{product.price.toLocaleString("en-US")} MAD</strong>
                      {product.inquiry_only ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInquiryProduct(product);
                          }}
                          style={{
                            backgroundColor: "#0a4bd9",
                            color: "#fff",
                            borderColor: "#0a4bd9",
                            fontWeight: "700"
                          }}
                        >
                          {t("Inquire")}
                        </button>
                      ) : (
                        <button
                          className={isAdded ? "added" : ""}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                            setDrawerOpen(true);
                          }}
                        >
                          {isAdded ? <Check size={17} /> : <ShoppingCart size={17} />}{isAdded ? t("In cart") : t("Add to cart")}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty">
            <h2>{t("No products found")}</h2>
            <p>{t("Try another category or a shorter search.")}</p>
            <button type="button" onClick={() => { setQuery(""); chooseCategory("All"); }}>{t("Clear filters")} <ArrowRight size={17} /></button>
          </div>
        )}
      </section>
      <InquiryModal
        open={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        product={inquiryProduct}
      />
    </main>
  );
}
