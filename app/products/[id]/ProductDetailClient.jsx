"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Zap,
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Fan,
  Box,
  FileText,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useSite } from "../../context/SiteContext";
import InquiryModal from "../../components/InquiryModal";

const catalogProducts = [
  { 
    id: 10, 
    name: "PNY GeForce RTX 4090 24GB XLR8 Gaming Verto RGB", 
    category: "Consumer", 
    price: 22490, 
    badge: "Flagship GPU", 
    spec: "Ada Lovelace · 24GB GDDR6X · XLR8 RGB", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "The PNY GeForce RTX 4090 Verto is the ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics. Experience ultra-high performance gaming, incredibly detailed virtual worlds, unprecedented productivity, and new ways to create. Powered by the NVIDIA Ada Lovelace architecture and comes with 24 GB of G6X memory.",
    specs: { architecture: "Ada Lovelace", memory: "24GB GDDR6X", cudaCores: "16384 Cores", memoryBandwidth: "1008 GB/s", interface: "PCIe 4.0 x16", tdp: "450W" },
    features: ["NVIDIA DLSS 3", "Ray Tracing Cores (3rd Gen)", "Tensor Cores (4th Gen)", "AV1 Encoding", "NVIDIA Broadcast"]
  },
  { 
    id: 11, 
    name: "PNY GeForce RTX 4080 Super 16GB XLR8 Gaming Verto", 
    category: "Consumer", 
    price: 13990, 
    badge: "High Performance", 
    spec: "Ada Lovelace · 16GB GDDR6X · Triple Fan", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "Supercharged gaming and creating with the NVIDIA GeForce RTX 4080 Super. Built with the ultra-efficient Ada Lovelace architecture, it brings fast ray tracing, AI-accelerated performance with DLSS 3, and new ways to create.",
    specs: { architecture: "Ada Lovelace", memory: "16GB GDDR6X", cudaCores: "10240 Cores", memoryBandwidth: "736 GB/s", interface: "PCIe 4.0 x16", tdp: "320W" },
    features: ["NVIDIA DLSS 3.5", "Ray Tracing", "Tensor Cores", "Triple Fan Cooling", "G-SYNC Compatible"]
  },
  { 
    id: 12, 
    name: "PNY GeForce RTX 4070 Ti Super 16GB Verto Overclocked", 
    category: "Consumer", 
    price: 10490, 
    badge: "Best Value Gaming", 
    spec: "Ada Lovelace · 16GB GDDR6X · Dual Fan", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "Equip yourself for stellar gaming and creating with the NVIDIA GeForce RTX 4070 Ti Super. It is built with the ultra-efficient Ada Lovelace architecture and 16GB of super-fast GDDR6X memory.",
    specs: { architecture: "Ada Lovelace", memory: "16GB GDDR6X", cudaCores: "8448 Cores", memoryBandwidth: "672 GB/s", interface: "PCIe 4.0 x16", tdp: "285W" },
    features: ["DLSS 3.5 Support", "Real-Time Ray Tracing", "Dual Fan XLR8 Design", "OC Edition", "NVIDIA Reflex"]
  },
  { 
    id: 13, 
    name: "NVIDIA RTX 6000 Ada Generation 48GB", 
    category: "Professional", 
    price: 94990, 
    badge: "AI & Rendering", 
    spec: "Ada Lovelace · 48GB GDDR6 · Dual-Slot Blower", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "The NVIDIA RTX 6000 Ada Generation is the ultimate professional GPU for desktop workstations. It delivers the features, hardware capabilities, and capacity needed to meet the challenges of modern AI, graphics, and compute workloads.",
    specs: { architecture: "Ada Lovelace", memory: "48GB GDDR6 with ECC", cudaCores: "18176 Cores", tensorCores: "568 Cores", memoryBandwidth: "960 GB/s", tdp: "300W" },
    features: ["AI Model Training", "Large Language Model (LLM) Inference", "High-End 3D Rendering", "vGPU Support", "Quadro Legacy Sync"]
  },
  { 
    id: 14, 
    name: "NVIDIA RTX 4000 Ada Generation 20GB", 
    category: "Professional", 
    price: 18990, 
    badge: "Workstation GPU", 
    spec: "Ada Lovelace · 20GB GDDR6 · Single-Slot", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "The NVIDIA RTX 4000 Ada Generation is the most powerful single-slot GPU for professionals, providing real-time ray tracing, AI-accelerated compute, and high-performance graphics on desktop workstations.",
    specs: { architecture: "Ada Lovelace", memory: "20GB GDDR6 with ECC", cudaCores: "6144 Cores", memoryBandwidth: "360 GB/s", interface: "PCIe 4.0 x16", tdp: "130W" },
    features: ["Single-Slot Compact Design", "ECC Memory Protection", "CAD & BIM Optimization", "Real-Time Ray Tracing", "Quiet Active Blower"]
  },
  { 
    id: 15, 
    name: "PNY NVIDIA RTX A6000 48GB GDDR6", 
    category: "Professional", 
    price: 62490, 
    badge: "Quadro Legacy", 
    spec: "Ampere Architecture · 48GB GDDR6 · ECC Memory", 
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88",
    description: "Unlock the next generation of revolutionary designs, scientific breakthroughs, and immersive entertainment with the NVIDIA RTX A6000, the world's most powerful visual computing GPU for desktop workstations.",
    specs: { architecture: "Ampere", memory: "48GB GDDR6 with ECC", cudaCores: "10752 Cores", memoryBandwidth: "768 GB/s", interface: "PCIe 4.0 x16", tdp: "300W" },
    features: ["NVLink Support", "ECC Error Correction", "Hardware Ray Tracing", "Enterprise Driver Validation", "Four DisplayPort 1.4a Output"]
  },
  { 
    id: 16, 
    name: "NVIDIA H100 Tensor Core GPU 80GB HBM3", 
    category: "Data Center Solutions", 
    price: 420000, 
    badge: "LLM & GenAI", 
    spec: "Hopper Architecture · 80GB HBM3 · SXM5 / PCIe", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88",
    description: "The NVIDIA H100 Tensor Core GPU delivers unprecedented performance, scalability, and security for every data center. It accelerates LLMs, deep learning, and HPC workloads by up to 30x compared to the previous generation.",
    specs: { architecture: "Hopper", memory: "80GB HBM3", tensorCores: "528 Tensor Cores", memoryBandwidth: "3000 GB/s (3 TB/s)", interface: "PCIe 5.0 x16 / SXM5", tdp: "350W - 700W" },
    features: ["Transformer Engine", "Multi-Instance GPU (MIG)", "DPX Instructions", "HPC Acceleration", "AI Training & Inference Scale"]
  },
  { 
    id: 17, 
    name: "NVIDIA A100 Tensor Core GPU 80GB CoWoS", 
    category: "Data Center Solutions", 
    price: 195000, 
    badge: "Data Center GPU", 
    spec: "Ampere Architecture · 80GB HBM2e · MIG Support", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88",
    description: "The NVIDIA A100 Tensor Core GPU accelerates AI, data analytics, and HPC. A100 can efficiently scale to thousands of GPUs or be partitioned into seven isolated GPU instances using Multi-Instance GPU (MIG).",
    specs: { architecture: "Ampere", memory: "80GB HBM2e", tensorCores: "432 Tensor Cores", memoryBandwidth: "2039 GB/s (2 TB/s)", interface: "PCIe 4.0 / SXM4", tdp: "250W - 400W" },
    features: ["Multi-Instance GPU (MIG)", "Third-Gen Tensor Cores", "Structural Sparsity", "HPC Acceleration", "AI Inference Scale"]
  },
  { 
    id: 18, 
    name: "NVIDIA L40S Tensor Core GPU 48GB", 
    category: "Data Center Solutions", 
    price: 165000, 
    badge: "AI & Graphics", 
    spec: "Ada Lovelace · 48GB GDDR6 · Universal Accelerator", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=88",
    description: "The NVIDIA L40S Tensor Core GPU is the most powerful universal GPU for the enterprise data center, delivering end-to-end acceleration for next-generation generative AI, graphics, and video workloads.",
    specs: { architecture: "Ada Lovelace", memory: "48GB GDDR6 with ECC", cudaCores: "18176 Cores", tensorCores: "568 Cores", memoryBandwidth: "864 GB/s", tdp: "350W" },
    features: ["Generative AI Optimization", "NVIDIA Omniverse Acceleration", "Universal Data Center GPU", "Ray Tracing Support", "PCIe Form Factor"]
  },
  { 
    id: 19, 
    name: "PNY XLR8 Gaming DDR5 6000MHz 64GB Kit (2x32GB)", 
    category: "Accessories", 
    price: 3190, 
    badge: "DDR5 Memory", 
    spec: "64GB Dual Channel · 6000MHz CL38 · RGB Heat Spreader", 
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1100&q=88",
    description: "PNY's premium XLR8 Gaming DDR5 memory features high-speed performance, low latency, and XLR8 RGB design. Engineered to handle extreme overclocking and high-performance gaming rig requirements.",
    specs: { type: "DDR5 Desktop Memory", capacity: "64GB Kit (2 x 32GB)", speed: "6000 MHz", latency: "CL38-38-38-78", voltage: "1.35V", profile: "Intel XMP 3.0 & AMD EXPO" },
    features: ["RGB Sync Compatible", "Aluminum Heat Spreader", "High-Frequency Gaming", "Stability & Reliability", "Lifetime Warranty"]
  },
  { 
    id: 20, 
    name: "PNY CS3140 2TB PCIe Gen4 x4 M.2 NVMe SSD", 
    category: "Accessories", 
    price: 2490, 
    badge: "High-Speed SSD", 
    spec: "2TB NVMe SSD · Up to 7500MB/s Read · XLR8 Heatsink", 
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1100&q=88",
    description: "The CS3140 M.2 NVMe Gen4 x4 Solid State Drive is designed to be the highest performance SSD on the market. It delivers extreme performance of up to 7,500 MB/s sequential read speed.",
    specs: { formFactor: "M.2 2280", interface: "PCIe Gen4 x4, NVMe 1.4", capacity: "2TB", readSpeed: "Up to 7500 MB/s", writeSpeed: "Up to 6850 MB/s", tbw: "1400 TBW" },
    features: ["Extruded Aluminum Heatsink", "Ultra-High IOPS", "PlayStation 5 Compatible", "LDAC Error Correction", "5-Year Warranty"]
  }
];

function getRelatedProducts(productId, category) {
  return catalogProducts.filter((p) => p.id !== productId && p.category === category).slice(0, 4);
}

function parseInlineBold(text) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} style={{ fontWeight: "700", color: "#171719" }}>{part}</strong>;
    }
    return part;
  });
}

function formatDescription(text) {
  if (!text) return null;
  const paragraphs = text.split(/\r?\n/);
  return paragraphs.map((para, index) => {
    const trimmed = para.trim();
    if (!trimmed) return null;

    // 1. Markdown Headings (#, ##, ###)
    if (trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#")) {
      const titleText = trimmed.replace(/^#+\s+/, "");
      return (
        <h3 key={index} style={{ fontSize: "1.15rem", fontWeight: "700", margin: "24px 0 12px", color: "#171719" }}>
          {titleText}
        </h3>
      );
    }

    // 2. Explicitly short section headers ending in colon (e.g. "Key Capabilities:")
    if (trimmed.endsWith(":") && trimmed.length < 35) {
      const titleText = trimmed.slice(0, -1);
      return (
        <h4 key={index} style={{ fontSize: "1.05rem", fontWeight: "700", margin: "20px 0 10px", color: "#171719" }}>
          {titleText}
        </h4>
      );
    }

    // 3. Inline bold styling (e.g. **bold text**)
    if (trimmed.includes("**")) {
      return (
        <p key={index} className="pd-description" style={{ margin: "0 0 14px" }}>
          {parseInlineBold(trimmed)}
        </p>
      );
    }

    // 4. Line with colon separators (e.g. "Title: Description")
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > 0 && colonIndex < 40 && !trimmed.slice(0, colonIndex).includes("http")) {
      const titleText = trimmed.slice(0, colonIndex);
      const restText = trimmed.slice(colonIndex);
      return (
        <p key={index} className="pd-description" style={{ margin: "0 0 14px" }}>
          <strong style={{ fontWeight: "700", color: "#171719" }}>{titleText}</strong>
          {restText}
        </p>
      );
    }

    // Default: regular paragraph
    return (
      <p key={index} className="pd-description" style={{ margin: "0 0 14px" }}>
        {trimmed}
      </p>
    );
  }).filter(Boolean);
}

function ProductDetailSkeleton() {
  return (
    <main className="product-detail-page">
      <header className="pd-header">
        <div className="shimmer" style={{ width: 110, height: 40, borderRadius: 8 }} />
        <nav className="pd-nav">
          <div className="shimmer" style={{ width: 50, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 70, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 80, height: 16, borderRadius: 6 }} />
        </nav>
        <div className="pd-header-actions">
          <div className="shimmer" style={{ width: 40, height: 40, borderRadius: "50%" }} />
          <div className="shimmer" style={{ width: 100, height: 40, borderRadius: 999 }} />
        </div>
      </header>

      <div className="pd-breadcrumb">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="shimmer" style={{ width: i < 4 ? 60 : 120, height: 14, borderRadius: 6 }} />
            {i < 4 && <div className="shimmer" style={{ width: 14, height: 14, borderRadius: "50%" }} />}
          </div>
        ))}
      </div>

      <section className="pd-main">
        <div className="pd-gallery">
          <div className="pd-thumbnails">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shimmer" style={{ width: 72, height: 72, borderRadius: 12, marginBottom: 10 }} />
            ))}
          </div>
          <div className="pd-main-image" style={{ background: "#f0f1f3" }} />
        </div>
        <div className="pd-info">
          <div className="shimmer" style={{ width: 100, height: 14, borderRadius: 6, marginBottom: 12 }} />
          <div className="shimmer" style={{ width: "85%", height: 36, borderRadius: 8, marginBottom: 14 }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shimmer" style={{ width: 16, height: 16, borderRadius: 4 }} />
            ))}
            <div className="shimmer" style={{ width: 100, height: 14, borderRadius: 6 }} />
          </div>
          <div className="shimmer" style={{ width: "40%", height: 32, borderRadius: 8, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "100%", height: 14, borderRadius: 6, marginBottom: 6 }} />
          <div className="shimmer" style={{ width: "100%", height: 14, borderRadius: 6, marginBottom: 6 }} />
          <div className="shimmer" style={{ width: "70%", height: 14, borderRadius: 6, marginBottom: 28 }} />
          <div className="shimmer" style={{ width: "50%", height: 42, borderRadius: 10, marginBottom: 24 }} />
          <div className="shimmer" style={{ width: "100%", height: 54, borderRadius: 14, marginBottom: 24 }} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer" style={{ width: "60%", height: 16, borderRadius: 6, marginBottom: 8 }} />
          ))}
        </div>
      </section>

      <section className="pd-related">
        <div className="shimmer" style={{ width: 180, height: 24, borderRadius: 8, marginBottom: 24 }} />
        <div className="pd-related-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="shimmer" style={{ width: "100%", aspectRatio: "4/3", borderRadius: "16px 16px 0 0" }} />
              <div style={{ padding: 16 }}>
                <div className="shimmer" style={{ width: "50%", height: 12, borderRadius: 6, marginBottom: 6 }} />
                <div className="shimmer" style={{ width: "80%", height: 16, borderRadius: 6, marginBottom: 6 }} />
                <div className="shimmer" style={{ width: "40%", height: 16, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pd-footer">
        <div className="pd-footer-inner">
          <div className="shimmer" style={{ width: 100, height: 32, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 140, height: 14, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 180, height: 14, borderRadius: 6 }} />
        </div>
      </footer>
    </main>
  );
}

export default function ProductDetailPage({ params }) {
  const { t, language, changeLanguage } = useSite();
  const [ready, setReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, count, setDrawerOpen, hydrated } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [inquiryProduct, setInquiryProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch('/api/products');
        const list = await res.json();
        if (Array.isArray(list)) {
          const found = list.find((p) => String(p.id) === String(params.id));
          if (found) {
            setProduct({
              ...found,
              price: Number(found.price),
              spec: found.description || "",
              specs: found.specs || { processor: "Performance core", memory: "Standard RAM", storage: "High-speed SSD" },
              features: found.features || ["Premium Quality", "Authentic Product", "Full Warranty"]
            });
            setRelatedProducts(list.filter((p) => String(p.id) !== String(found.id) && p.category === found.category).slice(0, 4));
          } else {
            const fallback = catalogProducts.find((p) => String(p.id) === String(params.id)) || catalogProducts[0];
            setProduct(fallback);
            setRelatedProducts(catalogProducts.filter((p) => p.id !== fallback.id && p.category === fallback.category).slice(0, 4));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setReady(true);
      }
    }
    loadProduct();
  }, [params.id]);

  if (!ready || !product) return <ProductDetailSkeleton />;

  const images = [
    product.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&q=80",
    product.image,
    product.image,
    product.image
  ].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const specIcons = {
    processor: Cpu, graphics: Monitor, memory: MemoryStick, storage: HardDrive,
    cooling: Fan, power: Zap, gpu: Cpu, cudaCores: Cpu, boostClock: Zap, tdp: Zap,
    interface: Box, panel: Monitor, colorGamut: Monitor, brightness: Monitor,
    contrast: Monitor, refreshRate: Monitor, connectivity: Box, resolution: Monitor,
    responseTime: Monitor, curvature: Monitor, hdr: Monitor, layout: Box, switches: Box,
    battery: Zap, keycaps: Box, case: Box, sensor: Cpu, weight: Box, buttons: Box,
    type: Box, frequency: Box, sampleRate: Box, polarPattern: Box, snr: Box,
    speed: Box, duplex: Box, capacity: Box, ink: Box, size: Box, display: Monitor,
  };

  if (!ready) return <ProductDetailSkeleton />;

  return (
    <motion.main
      className="product-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="pd-header">
        <Link className="pd-logo" href="/" aria-label="MarocGPU home">
          <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
        </Link>
        <nav className="pd-nav">
          <Link href="/">{t("Home")}</Link>
          <Link href="/products">{t("Products")}</Link>
          <span className="active">{t(product.category)}</span>
        </nav>
        <div className="pd-header-actions" style={{ gap: 12 }}>
          {/* Modern Language Switcher */}
          <div className="lang-switcher" style={{ display: "inline-flex", background: "#f1f3f5", borderRadius: 20, padding: 3, gap: 2, marginRight: 4, height: 32, alignItems: "center" }}>
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

          <button className="pd-cart-btn" type="button" aria-label="Cart" onClick={() => setDrawerOpen(true)}>
            <ShoppingCart size={19} />
            {hydrated && count > 0 && <span className="pd-cart-badge">{count}</span>}
          </button>
          <Link className="pd-back" href="/products">
            <ArrowLeft size={17} /> {t("All products")}
          </Link>
        </div>
      </header>

      <div className="pd-breadcrumb">
        <Link href="/">{t("Home")}</Link>
        <ChevronRight size={14} />
        <Link href="/products">{t("Products")}</Link>
        <ChevronRight size={14} />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`}>{t(product.category)}</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      <section className="pd-main">
        <div className="pd-gallery">
          <div className="pd-thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                className={selectedImage === i ? "active" : ""}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
          <div className="pd-main-image">
            <motion.img
              key={selectedImage}
              src={images[selectedImage]}
              alt={product.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            {product.badge && <span className="pd-badge">{product.badge}</span>}
          </div>
        </div>

        <div className="pd-info">
          <p className="pd-category">{t(product.category)}</p>
          <h1>{product.name}</h1>
          <div className="pd-rating">
            <div className="pd-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill={s <= 4 ? "#f5a623" : "none"} color={s <= 4 ? "#f5a623" : "#d0d0d0"} />
              ))}
            </div>
            <span>4.0 (24 reviews)</span>
          </div>
          <p className="pd-price">{product.price.toLocaleString("en-US")} <small>MAD</small></p>
          <div style={{ marginBottom: "28px" }}>{formatDescription(product.description)}</div>

          {!product.inquiry_only && (
            <div className="pd-quantity">
              <span>{t("Quantity")}</span>
              <div className="pd-qty-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          )}

          <div className="pd-actions" style={{ display: "flex", gap: "12px" }}>
            {product.inquiry_only ? (
              <button 
                className="pd-add" 
                onClick={() => setInquiryProduct(product)} 
                style={{ flex: 1, backgroundColor: "#0a4bd9", border: "1px solid #0a4bd9", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                {t("Inquire Availability")}
              </button>
            ) : (
              <button className="pd-add" onClick={handleAddToCart} style={{ flex: 1 }}>
                <ShoppingCart size={18} /> {t("Add to cart")}
              </button>
            )}
            {product.pdf && (
              <a
                className="pd-add"
                href={product.pdf}
                download={`${product.name.replace(/\s+/g, "_")}_datasheet.pdf`}
                style={{
                  flex: 1,
                  textDecoration: "none",
                  backgroundColor: "#202124"
                }}
              >
                <FileText size={18} /> {t("Datasheet PDF")}
              </a>
            )}
          </div>

          <div className="pd-perks">
            <div><Truck size={18} /><span>{t("Free delivery across Morocco")}</span></div>
            <div><Shield size={18} /><span>{t("2-year official warranty")}</span></div>
            <div><RotateCcw size={18} /><span>{t("30-day returns")}</span></div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <h2>{t("Related products")}</h2>
          <div className="pd-related-grid">
            {relatedProducts.map((rp) => (
              <motion.a
                key={rp.id}
                className="pd-related-card"
                href={`/products/${rp.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <div className="pd-related-image">
                  <img src={rp.image} alt={rp.name} loading="lazy" />
                  {rp.badge && <span>{t(rp.badge)}</span>}
                </div>
                <div className="pd-related-info">
                  <p>{t(rp.category)}</p>
                  <h3>{rp.name}</h3>
                  <strong>{rp.price.toLocaleString("en-US")} MAD</strong>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      <footer className="pd-footer">
        <div className="pd-footer-inner">
          <Link href="/" className="pd-footer-logo"><img src="/marocgpu-logo-transparent.png" alt="MarocGPU" /></Link>
          <span>{t("Casablanca, Morocco")}</span>
          <span>{"\u00A9"} 2026 MarocGPU. {t("All rights reserved.")}</span>
        </div>
      </footer>
      <InquiryModal
        open={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        product={inquiryProduct}
      />
    </motion.main>
  );
}
