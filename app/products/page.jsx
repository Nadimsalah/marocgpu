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
  { id: 20, name: "PNY CS3140 2TB PCIe Gen4 x4 M.2 NVMe SSD", category: "Accessories", price: 2490, badge: "High-Speed SSD", spec: "2TB NVMe SSD · Up to 7500MB/s Read · XLR8 Aluminum Heatsink", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1100&q=88" }
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
            <img src="/marocgpu-logo.svg" alt="MarocGPU" />
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
          <img src="/marocgpu-logo.svg" alt="MarocGPU" />
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
                    <img src={product.image} alt={product.name} loading="lazy" />
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
