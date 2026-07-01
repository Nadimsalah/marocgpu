"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaults = {
  logo: "/marocgpu-logo-transparent.png",
  siteName: "MarocGPU",
  tagline: "Powerful hardware, expert-built systems, and dependable local support across Morocco.",
  heroTitle: "A New Era of Performance Micro",
  heroSubtitle: "Discover powerful hardware, expert builds, and the technology shaping Morocco's digital future.",
  heroCta: "Explore MarocGPU",
  navItems: ["Consumer", "Professional", "Data Center Solutions", "Support"],
  footerColumns: [
    { title: "Products", links: ["Gaming PCs", "Workstations", "Laptops", "Components", "Accessories"] },
    { title: "Resources", links: ["Build guides", "Support center", "Warranty", "Delivery & returns", "Community"] },
    { title: "Company", links: ["About us", "Careers", "Data Center Solutions", "Contact", "Our showroom"] },
  ],
  footerBottom: "© 2026 MarocGPU. All rights reserved.",
  heroIcons: ["google", "apple", "microsoft", "figma", "github", "slack", "notion", "vercel", "stripe", "discord", "x", "spotify"],
  customIcons: {},
  featureKicker: "Built for ambitious work",
  featureTitle: "When performance stops getting in your way.",
  featureDescription: "MarocGPU helps creators, professionals, and growing teams build reliable systems that keep ideas moving.",
  featureCta: "Discover our solutions",
  solutionsKicker: "MAROCGPU BUSINESS",
  solutionsTitle: "Shift IT from hardware to impact.",
  solutionsDescription: "Build faster, reduce downtime, and keep every workstation performing with expert configuration and dependable local support.",
  solutionsCtaPrimary: "Request a quote",
  solutionsCtaSecondary: "Explore solutions",
};

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("marocgpu_settings");
    if (stored) {
      setSettings({ ...defaults, ...JSON.parse(stored) });
    } else {
      setSettings(defaults);
    }
  }, []);

  const updateSettings = (updates) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("marocgpu_settings", JSON.stringify(next));
      return next;
    });
  };

  if (!settings) return null;

  return (
    <SiteContext.Provider value={{ settings, updateSettings, defaults }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
