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
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const catalogProducts = [
  { id: 1, name: "ProWork X1 Mobile Studio", category: "Consumer", price: 12990, badge: "Best seller", spec: "Core Ultra 7 · RTX 4060 · 32GB · 1TB", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1100&q=88", description: "A mobile powerhouse designed for professionals who need desktop-class performance on the go. The ProWork X1 combines the latest Intel Core Ultra 7 processor with NVIDIA RTX 4060 graphics, delivering exceptional performance for 3D rendering, video editing, and AI workloads.", specs: { processor: "Intel Core Ultra 7 155H", graphics: "NVIDIA RTX 4060 8GB", memory: "32GB DDR5", storage: "1TB NVMe SSD", display: '16" 2.5K IPS 165Hz', battery: "90Wh · Up to 8 hours" }, features: ["Thunderbolt 4", "Wi-Fi 7", "Backlit Keyboard", "Fingerprint Reader", "Dolby Atmos"] },
  { id: 2, name: "EliteBook Pro 14", category: "Consumer", price: 10990, badge: "Business ready", spec: "Core Ultra 7 · 32GB · 1TB SSD", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=88", description: "The EliteBook Pro 14 is engineered for business professionals who demand reliability, security, and performance. With its sleek aluminum chassis and all-day battery life, it's the perfect companion for the modern workplace.", specs: { processor: "Intel Core Ultra 7 155U", graphics: "Intel Arc Graphics", memory: "32GB LPDDR5", storage: "1TB NVMe SSD", display: '14" 2.8K OLED Touch', battery: "72Wh · Up to 12 hours" }, features: ["Thunderbolt 4", "Wi-Fi 6E", "IR Camera", "Smart Card Reader", "MIL-STD-810H"] },
  { id: 3, name: "CreatorBook OLED 16", category: "Consumer", price: 15490, badge: "New", spec: "Ryzen 9 · RTX 4070 · OLED 3.2K", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1100&q=88", description: "Built for creators who refuse to compromise. The CreatorBook OLED 16 features a stunning 3.2K OLED display with 100% DCI-P3 color accuracy, powered by AMD Ryzen 9 and NVIDIA RTX 4070 for uncompromising creative performance.", specs: { processor: "AMD Ryzen 9 7945HX", graphics: "NVIDIA RTX 4070 8GB", memory: "32GB DDR5", storage: "2TB NVMe SSD", display: '16" 3.2K OLED 120Hz', battery: "99.9Wh · Up to 7 hours" }, features: ["SD Card Reader", "HDMI 2.1", "Wi-Fi 7", "Per-Key RGB", "Pantone Validated"] },
  { id: 4, name: "Creator Tower RTX", category: "Professional", price: 18490, badge: "Creator pick", spec: "Ryzen 9 · RTX 4070 · 64GB · 2TB", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1100&q=88", description: "The Creator Tower RTX is a professional workstation designed for demanding creative workflows. From 3D modeling to 8K video editing, this tower delivers uncompromising performance with room to grow.", specs: { processor: "AMD Ryzen 9 7950X", graphics: "NVIDIA RTX 4070 12GB", memory: "64GB DDR5", storage: "2TB NVMe SSD", cooling: "360mm AIO Liquid Cooling", power: "850W 80+ Gold" }, features: ["USB-C Front Panel", "Wi-Fi 6E", "Tool-less Design", "RGB Lighting", "5-Year Warranty"] },
  { id: 5, name: "Apex Gaming G7", category: "Professional", price: 21990, badge: "High performance", spec: "Core i9 · RTX 4080 Super · 32GB", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1100&q=88", description: "The Apex Gaming G7 is built for gamers who demand the absolute best. With an Intel Core i9 and RTX 4080 Super, it delivers maximum frame rates at the highest settings for an unparalleled gaming experience.", specs: { processor: "Intel Core i9-14900K", graphics: "NVIDIA RTX 4080 Super 16GB", memory: "32GB DDR5-6000", storage: "2TB NVMe Gen4 SSD", cooling: "Custom 360mm AIO", power: "1000W 80+ Platinum" }, features: ["Tempered Glass", "RGB Ecosystem", "Wi-Fi 7", "USB 4.0", "Overclocking Support"] },
  { id: 6, name: "Compact Studio Mini", category: "Professional", price: 8490, badge: "Small footprint", spec: "Ryzen 7 · 32GB · 1TB NVMe", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1100&q=88", description: "Big performance in a tiny package. The Compact Studio Mini is perfect for professionals who need powerful computing in a space-saving form factor. Ideal for creative work, development, and everyday productivity.", specs: { processor: "AMD Ryzen 7 7840HS", graphics: "AMD Radeon 780M", memory: "32GB DDR5", storage: "1TB NVMe SSD", size: "1L Volume", power: "65W USB-C" }, features: ["Dual 4K Display", "USB-C Power", "Wi-Fi 6E", "VESA Mount", "Silent Operation"] },
  { id: 7, name: "GeForce RTX 4070 Super", category: "Graphics", price: 7490, badge: "In stock", spec: "12GB GDDR6X · DLSS 3.5", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1100&q=88", description: "Experience next-gen gaming and creative performance with the GeForce RTX 4070 Super. Featuring 12GB of GDDR6X memory and DLSS 3.5 with Ray Reconstruction for stunning visuals at high frame rates.", specs: { gpu: "NVIDIA Ada Lovelace", memory: "12GB GDDR6X", cudaCores: "8448 CUDA Cores", boostClock: "2475 MHz", tdp: "220W", interface: "PCIe 4.0 x16" }, features: ["DLSS 3.5", "Ray Tracing", "AV1 Encode", "DisplayPort 2.1", "HDMI 2.1a"] },
  { id: 8, name: "StudioView 27 4K", category: "Displays", price: 4799, badge: "Color accurate", spec: "4K IPS · 98% DCI-P3 · USB-C", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=88", description: "The StudioView 27 delivers professional-grade color accuracy in a stunning 4K IPS panel. With 98% DCI-P3 coverage and USB-C connectivity, it's the perfect display for creative professionals.", specs: { panel: '27" IPS 4K UHD', colorGamut: "98% DCI-P3 · 100% sRGB", brightness: "400 nits", contrast: "1000:1", refreshRate: "60Hz", connectivity: "USB-C 90W · HDMI 2.1 · DP 1.4" }, features: ["Factory Calibrated", "USB-C Hub", "Height Adjustable", "Pivot/Tilt/Swivel", "HDR400"] },
  { id: 9, name: "UltraWide Flow 34", category: "Displays", price: 6190, badge: "Immersive", spec: "WQHD · 165Hz · 1ms · HDR", image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a0b2?auto=format&fit=crop&w=1100&q=88", description: "Immerse yourself in the UltraWide Flow 34. This curved ultrawide monitor delivers a panoramic viewing experience with fast 165Hz refresh rate and 1ms response time for gaming and productivity.", specs: { panel: '34" Curved VA WQHD', resolution: "3440 x 1440", refreshRate: "165Hz", responseTime: "1ms GtG", curvature: "1500R", hdr: "HDR400" }, features: ["FreeSync Premium", "USB Hub", "KVM Switch", "Picture-by-Picture", "Low Blue Light"] },
  { id: 10, name: "Forge 75 Keyboard", category: "Accessories", price: 1090, badge: "Hot swappable", spec: "Mechanical · Wireless · RGB", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1100&q=88", description: "The Forge 75 is a premium 75% mechanical keyboard with hot-swappable switches, wireless connectivity, and per-key RGB lighting. Built for enthusiasts who demand the best typing experience.", specs: { layout: "75% · 84 Keys", switches: "Hot-swappable · 3-pin/5-pin", connectivity: "2.4GHz · Bluetooth 5.0 · USB-C", battery: "4000mAh · Up to 200 hours", keycaps: "Double-shot PBT", case: "CNC Aluminum" }, features: ["Gasket Mount", "Per-Key RGB", "Programmable", "N-Key Rollover", "Detachable Cable"] },
  { id: 11, name: "Vector Pro Mouse", category: "Accessories", price: 690, badge: "Ultra light", spec: "49g · 26K sensor · Wireless", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1100&q=88", description: "The Vector Pro is an ultra-lightweight wireless gaming mouse weighing just 49g. Featuring a 26,000 DPI sensor and 70-hour battery life, it's designed for competitive gamers who demand precision and speed.", specs: { sensor: "26,000 DPI Optical", weight: "49g", buttons: "6 Programmable", battery: "70 hours", connectivity: "2.4GHz · Bluetooth · USB-C", switches: "Optical · 100M clicks" }, features: ["PTFE Feet", "Paracord Cable", "Onboard Memory", "RGB Lighting", "DPI Clutch"] },
  { id: 12, name: "Creator Mic S1", category: "Accessories", price: 1490, badge: "Studio audio", spec: "USB-C · Cardioid · Low noise", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1100&q=88", description: "The Creator Mic S1 delivers studio-quality audio for content creators, streamers, and podcasters. With a cardioid pickup pattern and ultra-low noise floor, your voice has never sounded better.", specs: { type: "Condenser · Cardioid", frequency: "20Hz - 20kHz", sampleRate: "96kHz / 24-bit", connectivity: "USB-C", polarPattern: "Cardioid", snr: "120dB" }, features: ["Zero-latency Monitoring", "Mute Button", "Gain Control", "Shock Mount", "Pop Filter Included"] },
  { id: 13, name: "Laser Pro M400", category: "Printers", price: 3290, badge: "Office ready", spec: "Duplex · Wi-Fi · 38 ppm", image: "https://images.unsplash.com/photo-1612810806695-30f7d5e2a7b5?auto=format&fit=crop&w=1100&q=88", description: "The Laser Pro M400 is a high-performance monochrome laser printer designed for busy offices. With fast 38 ppm printing, automatic duplexing, and wireless connectivity, it keeps your workflow moving.", specs: { type: "Monochrome Laser", speed: "38 ppm", resolution: "1200 x 1200 dpi", duplex: "Automatic", connectivity: "Wi-Fi · Ethernet · USB", capacity: "550-sheet tray" }, features: ["Mobile Printing", "Secure Print", "Toner Save Mode", "100-sheet MPT", "50,000 page/month"] },
  { id: 14, name: "SmartTank Studio", category: "Printers", price: 2790, badge: "Low cost printing", spec: "Color · Wireless · High capacity", image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1100&q=88", description: "The SmartTank Studio delivers ultra-low cost color printing with its refillable ink tank system. Perfect for high-volume printing needs, it produces vibrant colors at a fraction of the cost per page.", specs: { type: "Ink Tank · Color", speed: "15 ppm color · 22 ppm mono", resolution: "4800 x 1200 dpi", connectivity: "Wi-Fi · USB", capacity: "Up to 6000 pages black", ink: "Refillable tanks" }, features: ["Borderless Printing", "Auto Duplex", "Mobile App", "LCD Display", "6000-page yield"] },
];

function getRelatedProducts(productId, category) {
  return catalogProducts.filter((p) => p.id !== productId && p.category === category).slice(0, 4);
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

      <section className="pd-tabs">
        <div className="pd-tab-headers">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer" style={{ width: 110, height: 40, borderRadius: 6, marginRight: 4 }} />
          ))}
        </div>
        <div className="pd-tab-content">
          <div className="pd-specs-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: 16 }}>
                <div className="shimmer" style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="shimmer" style={{ width: "60%", height: 12, borderRadius: 6, marginBottom: 6 }} />
                  <div className="shimmer" style={{ width: "80%", height: 16, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
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
  const [ready, setReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const { addToCart, count, setDrawerOpen, hydrated } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

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
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <span className="active">{product.category}</span>
        </nav>
        <div className="pd-header-actions">
          <button className="pd-cart-btn" type="button" aria-label="Cart" onClick={() => setDrawerOpen(true)}>
            <ShoppingCart size={19} />
            {hydrated && count > 0 && <span className="pd-cart-badge">{count}</span>}
          </button>
          <Link className="pd-back" href="/products">
            <ArrowLeft size={17} /> All products
          </Link>
        </div>
      </header>

      <div className="pd-breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products">Products</Link>
        <ChevronRight size={14} />
        <Link href={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
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
          <p className="pd-category">{product.category}</p>
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
          <p className="pd-description">{product.description}</p>

          <div className="pd-quantity">
            <span>Quantity</span>
            <div className="pd-qty-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="pd-add" onClick={handleAddToCart}>
              <ShoppingCart size={18} /> Add to cart
            </button>
          </div>

          <div className="pd-perks">
            <div><Truck size={18} /><span>Free delivery across Morocco</span></div>
            <div><Shield size={18} /><span>2-year official warranty</span></div>
            <div><RotateCcw size={18} /><span>30-day returns</span></div>
          </div>
        </div>
      </section>

      <section className="pd-tabs">
        <div className="pd-tab-headers">
          <button className={activeTab === "specs" ? "active" : ""} onClick={() => setActiveTab("specs")}>Specifications</button>
          <button className={activeTab === "features" ? "active" : ""} onClick={() => setActiveTab("features")}>Features</button>
          <button className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>Description</button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "specs" && (
            <motion.div
              key="specs"
              className="pd-tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="pd-specs-grid">
                {Object.entries(product.specs).map(([key, value]) => {
                  const Icon = specIcons[key] || Box;
                  return (
                    <div key={key} className="pd-spec-item">
                      <div className="pd-spec-icon"><Icon size={18} /></div>
                      <div>
                        <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                        <strong>{value}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
          {activeTab === "features" && (
            <motion.div
              key="features"
              className="pd-tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="pd-features-list">
                {product.features.map((f) => (
                  <li key={f}><Check size={16} /> {f}</li>
                ))}
              </ul>
            </motion.div>
          )}
          {activeTab === "description" && (
            <motion.div
              key="description"
              className="pd-tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p>{product.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <h2>Related products</h2>
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
                  <img src={rp.image} alt={rp.name} />
                  <span>{rp.badge}</span>
                </div>
                <div className="pd-related-info">
                  <p>{rp.category}</p>
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
          <span>Casablanca, Morocco</span>
          <span>{"\u00A9"} 2026 MarocGPU. All rights reserved.</span>
        </div>
      </footer>
    </motion.main>
  );
}
