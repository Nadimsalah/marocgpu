"use client";

import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingCart,
  Tag,
  UserRound,
  X as CloseIcon,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "./context/CartContext";
import { useSite } from "./context/SiteContext";
import SearchModal from "./components/SearchModal";
import LoadingSkeleton from "./components/LoadingSkeleton";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { brandIcons } from "./components/BrandIcons";

function FloatingIcon({ mouseX, mouseY, iconData, index, customIcon }) {
  const ref = React.useRef(null);
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 300, damping: 20 });
  const springY = useSpring(motionY, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 150) * 40;
          motionX.set(-Math.cos(angle) * force);
          motionY.set(-Math.sin(angle) * force);
        } else {
          motionX.set(0);
          motionY.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [motionX, motionY, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute", iconData.className)}
    >
      <motion.div
        className="floating-icon-chip"
        animate={{ y: [0, -8, 0, 8, 0], x: [0, 6, 0, -6, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{
          duration: 5 + (index % 5) * 0.8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        {customIcon ? (
          <img src={customIcon} alt="" style={{ width: 34, height: 34, objectFit: "contain" }} />
        ) : (
          <iconData.icon className="floating-icon-svg" />
        )}
      </motion.div>
    </motion.div>
  );
}

const floatingIconsMap = {
  google: { id: 1, name: "google", icon: brandIcons.google, className: "float-icon float-a" },
  apple: { id: 2, name: "apple", icon: brandIcons.apple, className: "float-icon float-b" },
  microsoft: { id: 3, name: "microsoft", icon: brandIcons.microsoft, className: "float-icon float-c" },
  figma: { id: 4, name: "figma", icon: brandIcons.figma, className: "float-icon float-d" },
  github: { id: 5, name: "github", icon: brandIcons.github, className: "float-icon float-e" },
  slack: { id: 6, name: "slack", icon: brandIcons.slack, className: "float-icon float-f" },
  notion: { id: 7, name: "notion", icon: brandIcons.notion, className: "float-icon float-g" },
  vercel: { id: 8, name: "vercel", icon: brandIcons.vercel, className: "float-icon float-h" },
  stripe: { id: 9, name: "stripe", icon: brandIcons.stripe, className: "float-icon float-i" },
  discord: { id: 10, name: "discord", icon: brandIcons.discord, className: "float-icon float-j" },
  x: { id: 11, name: "x", icon: brandIcons.x, className: "float-icon float-k" },
  spotify: { id: 12, name: "spotify", icon: brandIcons.spotify, className: "float-icon float-l" },
};

const allIconNames = Object.keys(floatingIconsMap);

const navItems = [
  "Consumer",
  "Professional",
  "Data Center Solutions",
  "Support",
];

const megaMenuCatalog = {
  Consumer: {
    label: "Consumer PCs",
    links: ["Featured", "AI PCs", "Top Rated Laptops", "Gaming Laptops"],
    cards: [
      { title: "Laptops for Home", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85" },
      { title: "Laptops for Work", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85" },
      { title: "Mobile Workstations", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&q=85" },
      { title: "Laptops for Gaming", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=85" },
    ],
  },
  Professional: {
    label: "Professional Systems",
    links: ["Featured", "Custom Builds", "Gaming PCs", "Workstations"],
    cards: [
      { title: "Creator Workstations", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=85" },
      { title: "Gaming Desktops", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=85" },
      { title: "Office PCs", image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=900&q=85" },
      { title: "Compact Systems", image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=900&q=85" },
    ],
  },
  Accessories: {
    label: "Setup Essentials",
    links: ["Featured", "Keyboards", "Gaming Mice", "Streaming Gear"],
    cards: [
      { title: "Mechanical Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85" },
      { title: "Precision Mice", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85" },
      { title: "Studio Audio", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=85" },
      { title: "Gaming Displays", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85" },
    ],
  },
};

function getMegaMenu(item) {
  return megaMenuCatalog[item] || {
    label: item,
    links: ["Featured", "New arrivals", "Best sellers", "Shop all"],
    cards: megaMenuCatalog.Accessories.cards,
  };
}

const products = [
  {
    id: "creator-ws",
    catalogId: 4,
    name: "Creator Workstations",
    category: "Workstations",
    price: "18,490 MAD",
    note: "RTX 4070 · 64GB RAM · 2TB NVMe",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "perf-laptops",
    catalogId: 1,
    name: "Performance Laptops",
    category: "Laptops",
    price: "From 10,990 MAD",
    note: "Core Ultra 7 · RTX 4060 · 32GB",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "custom-gaming",
    catalogId: 5,
    name: "Custom Gaming PCs",
    category: "Gaming PCs",
    price: "From 14,990 MAD",
    note: "Core i9 · RTX 4080 · 32GB RAM",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "ultrawide-monitors",
    catalogId: 9,
    name: "UltraWide Monitors",
    category: "Displays",
    price: "From 4,799 MAD",
    note: "4K IPS · 98% DCI-P3 · USB-C",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "nvidia-gpu",
    catalogId: 7,
    name: "NVIDIA Graphics Cards",
    category: "Graphics",
    price: "From 4,990 MAD",
    note: "RTX 4070 · DLSS 3.5 · 12GB",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "mech-keyboards",
    catalogId: 10,
    name: "Mechanical Keyboards",
    category: "Accessories",
    price: "From 890 MAD",
    note: "Wireless · RGB · Hot swappable",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "pro-mice",
    catalogId: 11,
    name: "Pro Gaming Mice",
    category: "Accessories",
    price: "From 490 MAD",
    note: "49g · 26K sensor · Wireless",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "streaming-gear",
    catalogId: 12,
    name: "Streaming Essentials",
    category: "Streaming",
    price: "From 790 MAD",
    note: "USB-C · Studio quality",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
  },
];

const businessProducts = [
  {
    id: "prowork-x1",
    catalogId: 1,
    name: "ProWork X1 Mobile Studio",
    category: "Mobile workstation",
    price: "12,990 MAD",
    note: "RTX graphics · 32GB RAM · 1TB SSD",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1100&q=88",
  },
  {
    id: "creator-tower",
    catalogId: 4,
    name: "Creator Tower RTX",
    category: "Professional desktop",
    price: "18,490 MAD",
    note: "RTX 4070 · 64GB RAM · 2TB NVMe",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1100&q=88",
  },
  {
    id: "elitebook-pro",
    catalogId: 2,
    name: "EliteBook Pro 14",
    category: "Business laptop",
    price: "10,990 MAD",
    note: "Core Ultra 7 · 32GB RAM · 1TB SSD",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=88",
  },
  {
    id: "studio-display",
    catalogId: 8,
    name: "StudioView 27 4K",
    category: "Professional display",
    price: "4,799 MAD",
    note: "4K IPS · 98% DCI-P3 · USB-C",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=88",
  },
];

function MobileMenu({ open, onClose, onSearch, menuNavItems }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
          <motion.aside
            className="mobile-drawer"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="mobile-drawer-top">
              <a href="/" className="brand-mark" aria-label="MarocGPU home" onClick={onClose}>
                <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
              </a>
              <button className="icon-btn" type="button" onClick={onClose}>
                <CloseIcon size={20} />
              </button>
            </div>
            <nav className="mobile-nav">
              {(menuNavItems || navItems).map((item) => (
                <a key={item} href={item === "Data Center Solutions" ? "/data-center-solutions" : item === "Support" ? "/support" : `/products?category=${encodeURIComponent(item)}`} onClick={onClose}>{item}</a>
              ))}
            </nav>
            <div className="mobile-footer-actions">
              <button className="search-pill" type="button" onClick={() => { onClose(); onSearch(); }}>
                <span>What are you looking for?</span>
                <Search size={18} />
              </button>
              <div className="mobile-icons">
                <button className="icon-btn" type="button">
                  <ShoppingCart size={18} />
                </button>
                <button className="icon-btn" type="button">
                  <UserRound size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const footerColumns = [
  {
    title: "Products",
    links: ["Gaming PCs", "Workstations", "Laptops", "Components", "Accessories"],
  },
  {
    title: "Resources",
    links: ["Build guides", "Support center", "Warranty", "Delivery & returns", "Community"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Data Center Solutions", "Contact", "Our showroom"],
  },
];

const footerSocials = [
  { label: "Facebook", mark: "f" },
  { label: "Instagram", mark: "ig" },
  { label: "X", mark: "x" },
  { label: "GitHub", mark: "gh" },
  { label: "Dribbble", mark: "dr" },
];

const countries = [
  { name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { name: "Albania", dial: "+355", flag: "🇦🇱" },
  { name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { name: "Andorra", dial: "+376", flag: "🇦🇩" },
  { name: "Angola", dial: "+244", flag: "🇦🇴" },
  { name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { name: "Armenia", dial: "+374", flag: "🇦🇲" },
  { name: "Australia", dial: "+61", flag: "🇦🇺" },
  { name: "Austria", dial: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", dial: "+994", flag: "🇦🇿" },
  { name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { name: "Belarus", dial: "+375", flag: "🇧🇾" },
  { name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { name: "Benin", dial: "+229", flag: "🇧🇯" },
  { name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { name: "Bosnia", dial: "+387", flag: "🇧🇦" },
  { name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { name: "Bulgaria", dial: "+359", flag: "🇧🇬" },
  { name: "Burkina Faso", dial: "+226", flag: "🇧🇫" },
  { name: "Cambodia", dial: "+855", flag: "🇰🇭" },
  { name: "Cameroon", dial: "+237", flag: "🇨🇲" },
  { name: "Canada", dial: "+1", flag: "🇨🇦" },
  { name: "Chile", dial: "+56", flag: "🇨🇱" },
  { name: "China", dial: "+86", flag: "🇨🇳" },
  { name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { name: "Congo", dial: "+242", flag: "🇨🇬" },
  { name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
  { name: "Croatia", dial: "+385", flag: "🇭🇷" },
  { name: "Cuba", dial: "+53", flag: "🇨🇺" },
  { name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { name: "Dominican Rep.", dial: "+1-809", flag: "🇩🇴" },
  { name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { name: "Estonia", dial: "+372", flag: "🇪🇪" },
  { name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { name: "Finland", dial: "+358", flag: "🇫🇮" },
  { name: "France", dial: "+33", flag: "🇫🇷" },
  { name: "Gabon", dial: "+241", flag: "🇬🇦" },
  { name: "Georgia", dial: "+995", flag: "🇬🇪" },
  { name: "Germany", dial: "+49", flag: "🇩🇪" },
  { name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { name: "Greece", dial: "+30", flag: "🇬🇷" },
  { name: "Guatemala", dial: "+502", flag: "🇬🇹" },
  { name: "Guinea", dial: "+224", flag: "🇬🇳" },
  { name: "Haiti", dial: "+509", flag: "🇭🇹" },
  { name: "Honduras", dial: "+504", flag: "🇭🇳" },
  { name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { name: "Iceland", dial: "+354", flag: "🇮🇸" },
  { name: "India", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { name: "Iran", dial: "+98", flag: "🇮🇷" },
  { name: "Iraq", dial: "+964", flag: "🇮🇶" },
  { name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { name: "Israel", dial: "+972", flag: "🇮🇱" },
  { name: "Italy", dial: "+39", flag: "🇮🇹" },
  { name: "Ivory Coast", dial: "+225", flag: "🇨🇮" },
  { name: "Jamaica", dial: "+1-876", flag: "🇯🇲" },
  { name: "Japan", dial: "+81", flag: "🇯🇵" },
  { name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { name: "Kazakhstan", dial: "+7", flag: "🇰🇿" },
  { name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { name: "Latvia", dial: "+371", flag: "🇱🇻" },
  { name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { name: "Libya", dial: "+218", flag: "🇱🇾" },
  { name: "Lithuania", dial: "+370", flag: "🇱🇹" },
  { name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { name: "Mali", dial: "+223", flag: "🇲🇱" },
  { name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { name: "Niger", dial: "+227", flag: "🇳🇪" },
  { name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { name: "Norway", dial: "+47", flag: "🇳🇴" },
  { name: "Oman", dial: "+968", flag: "🇴🇲" },
  { name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { name: "Panama", dial: "+507", flag: "🇵🇦" },
  { name: "Paraguay", dial: "+595", flag: "🇵🇾" },
  { name: "Peru", dial: "+51", flag: "🇵🇪" },
  { name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { name: "Poland", dial: "+48", flag: "🇵🇱" },
  { name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { name: "Puerto Rico", dial: "+1-787", flag: "🇵🇷" },
  { name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { name: "Romania", dial: "+40", flag: "🇷🇴" },
  { name: "Russia", dial: "+7", flag: "🇷🇺" },
  { name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { name: "Serbia", dial: "+381", flag: "🇷🇸" },
  { name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { name: "Slovakia", dial: "+421", flag: "🇸🇰" },
  { name: "Slovenia", dial: "+386", flag: "🇸🇮" },
  { name: "Somalia", dial: "+252", flag: "🇸🇴" },
  { name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { name: "Spain", dial: "+34", flag: "🇪🇸" },
  { name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { name: "Sudan", dial: "+249", flag: "🇸🇩" },
  { name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { name: "Syria", dial: "+963", flag: "🇸🇾" },
  { name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { name: "Tunisia", dial: "+216", flag: "🇹🇳" },
  { name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { name: "UAE", dial: "+971", flag: "🇦🇪" },
  { name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { name: "UK", dial: "+44", flag: "🇬🇧" },
  { name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { name: "USA", dial: "+1", flag: "🇺🇸" },
  { name: "Uruguay", dial: "+598", flag: "🇺🇾" },
  { name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { name: "Yemen", dial: "+967", flag: "🇾🇪" },
  { name: "Zambia", dial: "+260", flag: "🇿🇲" },
  { name: "Zimbabwe", dial: "+263", flag: "🇿🇼" },
];

function MarocGpuFooter({ onSubscribe, siteSettings }) {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+212");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!phone.trim()) return;
    setSubscribed(true);
    onSubscribe();
  };

  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div className="footer-newsletter-copy">
          <p>MarocGPU Reseller</p>
          <h2>Are you a reseller?</h2>
          <span>Join our WhatsApp channel and receive exclusive offers, bulk pricing, and priority stock alerts.</span>
          <form onSubmit={handleSubscribe}>
            <div className="phone-input-row">
              <select
                className="country-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.dial} value={c.dial}>
                    {c.flag} {c.name} ({c.dial})
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="footer-phone">WhatsApp number</label>
              <input
                id="footer-phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, ""));
                  setSubscribed(false);
                }}
                placeholder="06 12 34 56 78"
              />
            </div>
            <button type="submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {subscribed ? "Offer sent" : "Join via WhatsApp"}
            </button>
          </form>
        </div>

        <div className="footer-image-stack" aria-hidden="true">
          <span className="footer-image-layer layer-back" />
          <span className="footer-image-layer layer-middle" />
          <div className="footer-image-main">
            <img
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=88"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="footer-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </a>
          <p>{siteSettings ? siteSettings.tagline : "Powerful hardware, expert-built systems, and dependable local support across Morocco."}</p>
          <div className="footer-socials">
            {footerSocials.slice(0, 4).map(({ label, mark }) => (
              <a href="#" aria-label={label} key={label}><span>{mark}</span></a>
            ))}
          </div>
        </div>

        <div className="footer-links-area">
          {(siteSettings ? siteSettings.footerColumns : footerColumns).map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="/products">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>{siteSettings ? siteSettings.footerBottom : "© 2026 MarocGPU. All rights reserved."}</p>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <span>Casablanca, Morocco</span>
      </div>
    </footer>
  );
}

function FloatingIconsSection({ title, subtitle, ctaText, ctaHref, icons, customIcons }) {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section className="floating-section" onMouseMove={handleMouseMove}>
      <div className="floating-layer" aria-hidden="true">
        {icons.map((iconData, index) => (
          <FloatingIcon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
            customIcon={customIcons?.[iconData.name]}
          />
        ))}
      </div>

      <div className="floating-content">
        <p className="hero-kicker">MarocGPU</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a className="floating-cta" href={ctaHref}>
          {ctaText}
        </a>
      </div>
    </section>
  );
}

export default function Page() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [showThanks, setShowThanks] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setDrawerOpen, addToCart, items, hydrated } = useCart();
  const { settings } = useSite();
  const megaMenu = activeMenu ? getMegaMenu(activeMenu) : null;

  React.useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <LoadingSkeleton />;

  return (
    <motion.main
      className="hp-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} menuNavItems={settings.navItems} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="top-shell" onMouseLeave={() => setActiveMenu(null)}>
        <div className="site-bar">
          <div className="site-brand">
            <a href="/" className="brand-mark" aria-label="MarocGPU home">
              <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
            </a>
          </div>

          <nav className="site-nav" aria-label="Primary">
            {settings.navItems.map((item) =>
              item === "Data Center Solutions" ? (
                <Link className="nav-link" href="/data-center-solutions" key={item} onClick={() => setActiveMenu(null)}>{item}</Link>
              ) : item === "Support" ? (
                <Link className="nav-link" href="/support" key={item} onClick={() => setActiveMenu(null)}>{item}</Link>
              ) : (
                <button
                  className={activeMenu === item ? "nav-link active" : "nav-link"}
                  key={item}
                  type="button"
                  onMouseEnter={() => setActiveMenu(item)}
                  onFocus={() => setActiveMenu(item)}
                  onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                  aria-expanded={activeMenu === item}
                >
                  {item}
                </button>
              )
            )}
          </nav>

          <div className="site-actions">
            <button className="search-pill" type="button" onClick={() => setSearchOpen(true)}>
              <span>What are you looking for?</span>
              <Search size={19} />
            </button>
            <button className="icon-btn cart-icon-btn" type="button" aria-label="Cart" onClick={() => setDrawerOpen(true)}>
              <ShoppingCart size={19} />
              {hydrated && count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            <button
              className="icon-btn menu-trigger"
              type="button"
              onClick={() => {
                setActiveMenu(null);
                setMenuOpen(true);
              }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaMenu ? (
            <motion.div
              className="mega-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mega-menu-inner">
                <aside className="mega-menu-aside">
                  <div className="mega-menu-label"><Tag size={19} /> {megaMenu.label}</div>
                  <div className="mega-menu-links">
                    {megaMenu.links.map((link, index) => (
                      <a className={index === 0 ? "featured" : ""} href={`/products?category=${encodeURIComponent(activeMenu)}`} key={link}>
                        {link}
                      </a>
                    ))}
                  </div>
                </aside>

                <div className="mega-menu-grid">
                  {megaMenu.cards.map((card) => (
                    <a className="mega-menu-card" href={`/products?category=${encodeURIComponent(activeMenu)}`} key={card.title}>
                      <div><img src={card.image} alt="" /></div>
                      <span>{card.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {activeMenu ? (
          <motion.button
            className="menu-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setActiveMenu(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ) : null}
      </AnimatePresence>

      <FloatingIconsSection
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
        ctaText={settings.heroCta}
        ctaHref="#collections"
        icons={(settings.heroIcons || allIconNames).map((name) => floatingIconsMap[name]).filter(Boolean)}
        customIcons={settings.customIcons}
      />

      <section className="must-haves" id="collections">
        <div className="must-haves-heading">
          <div>
            <p>Curated by MarocGPU</p>
            <h2>Shop These Must Haves</h2>
          </div>
          <span>{products.length} essentials for your setup</span>
        </div>

        <div className="must-haves-grid">
          {products.slice(0, visibleProducts).map((product, index) => {
            const inCart = hydrated && items.some((i) => i.id === product.catalogId);
            return (
              <motion.article
                className="business-product-card"
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
              >
                <a className="business-product-image" href={`/products/${product.catalogId}`} aria-label={product.name}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>In stock</span>
                </a>
                <a className="business-product-info" href={`/products/${product.catalogId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <span>{product.note}</span>
                  <div className="business-product-buy" onClick={(e) => e.stopPropagation()}>
                    <strong>{product.price}</strong>
                    <button
                      className={inCart ? "added" : ""}
                      type="button"
                      onClick={() => addToCart(product.catalogId)}
                    >
                      <ShoppingCart size={17} />
                      {inCart ? "In cart" : "Add to cart"}
                    </button>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>

        {visibleProducts < products.length ? (
          <button
            className="load-more-btn"
            type="button"
            onClick={() => setVisibleProducts(products.length)}
          >
            Load more products
            <span aria-hidden="true">+</span>
          </button>
        ) : null}
      </section>

      <section className="feature-story" aria-labelledby="feature-story-title">
        <motion.div
          className="feature-story-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="feature-story-copy">
            <p className="feature-story-kicker">Built for ambitious work</p>
            <h2 id="feature-story-title">When performance stops getting in your way.</h2>
            <p className="feature-story-description">
              MarocGPU helps creators, professionals, and growing teams build reliable systems that keep ideas moving.
            </p>
            <a className="feature-story-cta" href="#collections">
              Discover our solutions
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="feature-story-media">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=88"
              alt="A team collaborating around a laptop in a modern workspace"
              loading="lazy"
            />
            <div className="feature-story-stat">
              <strong>Built smarter</strong>
              <span>Expert guidance from first part to final setup.</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="solutions-showcase" aria-labelledby="solutions-title">
        <motion.div
          className="solutions-visual"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="solution-stripe stripe-one" />
          <span className="solution-stripe stripe-two" />

          <div className="dashboard-device">
            <div className="dashboard-camera" />
            <div className="dashboard-screen">
              <div className="dashboard-topbar">
                <strong>MarocGPU Control</strong>
                <span>Live overview</span>
              </div>
              <div className="dashboard-grid">
                <div className="dashboard-panel dashboard-score">
                  <small>Setup score</small>
                  <strong>94</strong>
                  <span>Excellent</span>
                </div>
                <div className="dashboard-panel dashboard-chart">
                  <small>System performance</small>
                  <div className="chart-bars">
                    {[42, 66, 54, 82, 72, 92, 78].map((height, index) => (
                      <i key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
                <div className="dashboard-panel dashboard-health">
                  <small>Component health</small>
                  <div><span>CPU</span><b style={{ width: "84%" }} /></div>
                  <div><span>GPU</span><b style={{ width: "92%" }} /></div>
                  <div><span>Memory</span><b style={{ width: "76%" }} /></div>
                </div>
                <div className="dashboard-panel dashboard-activity">
                  <small>Live activity</small>
                  <span className="activity-line" />
                  <p>All systems running smoothly</p>
                </div>
              </div>
            </div>
            <div className="dashboard-base" />
          </div>

          <div className="metric-chip metric-performance">
            <span>Performance</span><strong>+18</strong><b>94</b>
          </div>
          <div className="metric-chip metric-health">
            <span>System health</span><strong>+7</strong><b>98%</b>
          </div>
          <div className="metric-chip metric-support">
            <span>Support status</span><strong>Live</strong><b>24/7</b>
          </div>
        </motion.div>

        <motion.div
          className="solutions-copy"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>MarocGPU Business</p>
          <h2 id="solutions-title">Shift IT from hardware to impact.</h2>
          <span>
            Build faster, reduce downtime, and keep every workstation performing with expert configuration and dependable local support.
          </span>
          <div className="solutions-actions">
            <a className="solutions-primary" href="#collections">Request a quote</a>
            <a className="solutions-secondary" href="#collections">Explore solutions</a>
          </div>
        </motion.div>
      </section>

      <section className="business-products" aria-labelledby="business-products-title">
        <div className="business-products-heading">
          <div>
            <p>Ready to deploy</p>
            <h2 id="business-products-title">Performance built for business.</h2>
          </div>
          <a href="/products">View all products <ArrowRight size={18} /></a>
        </div>

        <div className="business-products-grid">
          {businessProducts.map((product, index) => {
            const isAdded = hydrated && items.some((i) => i.id === product.catalogId);
            return (
              <motion.article
                className="business-product-card"
                key={product.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <a className="business-product-image" href={`/products/${product.catalogId}`} aria-label={product.name}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>In stock</span>
                </a>
                <a className="business-product-info" href={`/products/${product.catalogId}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <span>{product.note}</span>
                  <div className="business-product-buy" onClick={(e) => e.stopPropagation()}>
                    <strong>{product.price}</strong>
                    <button
                      className={isAdded ? "added" : ""}
                      type="button"
                      onClick={() => addToCart(product.catalogId)}
                    >
                      <ShoppingCart size={17} />
                      {isAdded ? "In cart" : "Add to cart"}
                    </button>
                  </div>
                </a>
              </motion.article>
            );
          })}
        </div>
      </section>

      <MarocGpuFooter onSubscribe={() => setShowThanks(true)} siteSettings={settings} />

      <AnimatePresence>
        {showThanks && (
          <motion.div
            className="thanks-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowThanks(false)}
          >
            <motion.div
              className="thanks-modal"
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="thanks-check">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" stroke="#25D366"/>
                </svg>
              </div>
              <h2>Thank You!</h2>
              <p>We'll reach out on WhatsApp with our latest reseller offers.</p>
              <button className="thanks-close" onClick={() => setShowThanks(false)}>
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
