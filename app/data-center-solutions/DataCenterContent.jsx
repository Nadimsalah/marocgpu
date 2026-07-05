"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  CheckCircle2,
  Cpu,
  Gauge,
  Network,
  Server,
  ShieldCheck,
  Snowflake,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const equipment = [
  { icon: Server, number: "01", title: "Compute & storage", text: "Enterprise servers, GPU compute, SAN, NAS, backup systems, and scalable storage platforms." },
  { icon: Network, number: "02", title: "Network fabric", text: "Core and access switching, routing, firewalls, load balancing, optics, and structured fiber." },
  { icon: BatteryCharging, number: "03", title: "Power continuity", text: "Online UPS systems, PDUs, ATS, battery banks, generators, grounding, and power monitoring." },
  { icon: Snowflake, number: "04", title: "Precision cooling", text: "In-row and perimeter cooling, hot-aisle containment, sensors, airflow engineering, and controls." },
  { icon: Cable, number: "05", title: "Racks & cabling", text: "Server cabinets, intelligent PDUs, copper and fiber cabling, containment, labeling, and testing." },
  { icon: ShieldCheck, number: "06", title: "Physical security", text: "Access control, surveillance, environmental detection, fire suppression, and audit-ready monitoring." },
];

const stages = [
  { step: "01", title: "Assess", text: "We map workloads, capacity, resilience targets, site constraints, and growth." },
  { step: "02", title: "Engineer", text: "Our team designs the technical architecture, bill of materials, and deployment plan." },
  { step: "03", title: "Deploy", text: "We supply, install, configure, cable, test, document, and commission every system." },
  { step: "04", title: "Operate", text: "Monitoring, maintenance, optimization, spares, and lifecycle support keep it reliable." },
];

function DCSkeleton() {
  return (
    <main className="dc-page">
      <header className="dc-header">
        <a href="/"><div className="shimmer" style={{ width: 130, height: 44, borderRadius: 8 }} /></a>
        <nav>
          <div className="shimmer" style={{ width: 80, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 70, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 70, height: 16, borderRadius: 6 }} />
        </nav>
        <div className="shimmer" style={{ width: 180, height: 45, borderRadius: 9 }} />
      </header>

      <section className="dc-hero" style={{ background: "#0f1624" }}>
        <div className="dc-hero-copy">
          <div className="shimmer-dark" style={{ width: 160, height: 14, borderRadius: 6, marginBottom: 22 }} />
          <div className="shimmer-dark" style={{ width: "85%", height: 72, borderRadius: 12, marginBottom: 20 }} />
          <div className="shimmer-dark" style={{ width: "65%", height: 18, borderRadius: 8, marginBottom: 36 }} />
          <div style={{ display: "flex", gap: 12 }}>
            <div className="shimmer-dark" style={{ width: 180, height: 53, borderRadius: 10 }} />
            <div className="shimmer-dark" style={{ width: 160, height: 53, borderRadius: 10 }} />
          </div>
        </div>
        <div className="dc-hero-stats">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="shimmer-dark" style={{ width: 80, height: 18, borderRadius: 6, marginBottom: 6 }} />
              <div className="shimmer-dark" style={{ width: 120, height: 12, borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </section>

      <section className="dc-intro">
        <div className="shimmer" style={{ width: 160, height: 14, borderRadius: 6, marginBottom: 0 }} />
        <div className="shimmer" style={{ width: "90%", height: 60, borderRadius: 12, marginBottom: 20 }} />
        <div>
          <div className="shimmer" style={{ width: "100%", height: 18, borderRadius: 8, marginBottom: 12 }} />
          <div className="shimmer" style={{ width: "90%", height: 18, borderRadius: 8, marginBottom: 20 }} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer" style={{ width: "70%", height: 18, borderRadius: 8, marginBottom: 8 }} />
          ))}
        </div>
      </section>

      <section className="dc-equipment">
        <div className="dc-section-heading">
          <div className="shimmer" style={{ width: 180, height: 14, borderRadius: 6, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "55%", height: 52, borderRadius: 10, marginBottom: 18 }} />
          <div className="shimmer" style={{ width: "70%", height: 18, borderRadius: 8 }} />
        </div>
        <div className="dc-equipment-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i}>
              <div className="shimmer" style={{ width: 40, height: 30, borderRadius: 8 }} />
              <div className="shimmer" style={{ width: "70%", height: 28, borderRadius: 8, marginTop: 56, marginBottom: 14 }} />
              <div className="shimmer" style={{ width: "100%", height: 16, borderRadius: 6, marginBottom: 6 }} />
              <div className="shimmer" style={{ width: "85%", height: 16, borderRadius: 6, marginBottom: 24 }} />
              <div className="shimmer" style={{ width: 120, height: 16, borderRadius: 6 }} />
            </article>
          ))}
        </div>
      </section>

      <section className="dc-control" style={{ background: "#0a0d13" }}>
        <div className="dc-control-visual">
          <div className="shimmer-dark" style={{ width: 235, height: 235, borderRadius: "50%", position: "relative", zIndex: 2 }} />
        </div>
        <div className="dc-control-copy">
          <div className="shimmer-dark" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 22 }} />
          <div className="shimmer-dark" style={{ width: "95%", height: 60, borderRadius: 12, marginBottom: 20 }} />
          <div className="shimmer-dark" style={{ width: "80%", height: 18, borderRadius: 8, marginBottom: 34 }} />
          <div className="shimmer-dark" style={{ width: 220, height: 53, borderRadius: 10 }} />
        </div>
      </section>

      <section className="dc-delivery">
        <div className="dc-section-heading">
          <div className="shimmer" style={{ width: 150, height: 14, borderRadius: 6, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "65%", height: 52, borderRadius: 10 }} />
        </div>
        <div className="dc-stages">
          {[1, 2, 3, 4].map((i) => (
            <article key={i}>
              <div className="shimmer" style={{ width: 30, height: 14, borderRadius: 6, marginBottom: 86 }} />
              <div className="shimmer" style={{ width: "50%", height: 28, borderRadius: 8, marginBottom: 12 }} />
              <div className="shimmer" style={{ width: "85%", height: 16, borderRadius: 6, marginBottom: 4 }} />
              <div className="shimmer" style={{ width: "70%", height: 16, borderRadius: 6 }} />
            </article>
          ))}
        </div>
      </section>

      <section className="dc-contact" style={{ background: "#11151e" }}>
        <div>
          <div className="shimmer-dark" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 22 }} />
          <div className="shimmer-dark" style={{ width: "80%", height: 52, borderRadius: 10, marginBottom: 18 }} />
          <div className="shimmer-dark" style={{ width: "70%", height: 18, borderRadius: 8 }} />
        </div>
        <div className="shimmer-dark" style={{ width: 270, height: 60, borderRadius: 11 }} />
      </section>
    </main>
  );
}

export default function DataCenterContent() {
  const [ready, setReady] = useState(false);
  const { t, language, changeLanguage } = useSite();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <DCSkeleton />;

  return (
    <motion.main
      className="dc-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="dc-header">
        <a href="/" aria-label="MarocGPU home"><img src="/marocgpu-logo-transparent.webp" alt="MarocGPU" /></a>
        <nav aria-label="Data center navigation">
          <a href="#equipment">{t("AI & Compute")}</a>
          <a href="#delivery">{t("Methodology")}</a>
          <a href="#contact">{t("Contact")}</a>
        </nav>
        
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

          <a className="dc-header-cta" href="#contact" style={{ margin: 0 }}>
            {t("Plan your AI Data Center")} <ArrowRight size={17} />
          </a>
        </div>
      </header>

      <section className="dc-hero">
        <img src="/datacenter-hero.png" alt="Modern data center with rows of enterprise server racks" />
        <div className="dc-hero-shade" />
        <div className="dc-hero-copy">
          <p>{t("MarocGPU & MicroIntégral in partnership with NVIDIA")}</p>
          <h1>{t("Next-Generation AI & Data Center Infrastructure.")}</h1>
          <span>{t("We engineer, supply, deploy, and support complete enterprise data center environments, GPU computing clusters, and high-performance AI networks backed by MicroIntégral's leading expertise.")}</span>
          <div className="dc-hero-actions">
            <a href="#contact">{t("Start your AI project")} <ArrowRight size={18} /></a>
            <a href="#equipment">{t("Explore solutions")}</a>
          </div>
        </div>
        <div className="dc-hero-stats">
          <div><strong>{t("NVIDIA Partner")}</strong><span>{t("Advanced GPU computing")}</span></div>
          <div><strong>{t("MicroIntégral")}</strong><span>{t("Leading local support")}</span></div>
          <div><strong>{t("End-to-End")}</strong><span>{t("Design, deploy & operate")}</span></div>
        </div>
      </section>

      <section className="dc-intro">
        <p>{t("Built for AI & Enterprise Workloads")}</p>
        <h2>{t("Infrastructure that arrives ready for deep learning.")}</h2>
        <div>
          <span>{t("We provide every major equipment layer required to build or modernize a secure, efficient data center optimized for high-density NVIDIA GPUs and heavy compute operations.")}</span>
          <ul>
            <li><CheckCircle2 size={18} /> {t("Official NVIDIA GPU & server systems")}</li>
            <li><CheckCircle2 size={18} /> {t("Complete installation and thermal optimization")}</li>
            <li><CheckCircle2 size={18} /> {t("Full maintenance, warranty, and MicroIntégral support")}</li>
          </ul>
        </div>
      </section>

      <section className="dc-equipment" id="equipment">
        <div className="dc-section-heading">
          <p>{t("Complete computing portfolio")}</p>
          <h2>{t("AI, Compute & Power. Engineered together.")}</h2>
          <span>{t("One cohesive architecture across IT servers, GPU nodes, high-speed InfiniBand switches, and backup cooling systems.")}</span>
        </div>
        <div className="dc-equipment-grid">
          {equipment.map(({ icon: Icon, number, title, text }) => (
            <article key={title}>
              <div><Icon size={25} /><span>{number}</span></div>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
              <a href="#contact">{t("Discuss requirements")} <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="dc-control">
        <div className="dc-control-visual">
          <div className="dc-control-orbit orbit-one" />
          <div className="dc-control-orbit orbit-two" />
          <div className="dc-control-core"><Gauge size={40} /><strong>99.999%</strong><span>{t("Designed uptime")}</span></div>
          <div className="dc-node node-power"><BatteryCharging size={21} /><span>{t("Power continuity")}</span></div>
          <div className="dc-node node-cooling"><Snowflake size={21} /><span>{t("Precision cooling")}</span></div>
          <div className="dc-node node-network"><Network size={21} /><span>{t("Network fabric")}</span></div>
          <div className="dc-node node-compute"><Cpu size={21} /><span>{t("Compute & storage")}</span></div>
        </div>
        <div className="dc-control-copy">
          <p>{t("MicroIntégral AI Orchestration")}</p>
          <h2>{t("Optimized for NVIDIA AI & HPC Workloads.")}</h2>
          <span>{t("We integrate advanced cooling infrastructure with GPU cluster monitoring, ensuring your AI training models and high-performance server clusters operate at peak efficiency.")}</span>
          <a href="#contact">{t("Design the compute layer")} <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="dc-delivery" id="delivery">
        <div className="dc-section-heading">
          <p>{t("Deployment methodology")}</p>
          <h2>{t("From requirements to reliable operations.")}</h2>
        </div>
        <div className="dc-stages">
          {stages.map((stage) => (
            <article key={stage.step}>
              <span>{stage.step}</span>
              <h3>{t(stage.title)}</h3>
              <p>{t(stage.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dc-contact" id="contact">
        <div>
          <p>{t("Build with confidence")}</p>
          <h2>{t("Let’s design your NVIDIA AI Data Center.")}</h2>
          <span>{t("Tell us your computing capacity, location, and timeline. Our infrastructure engineering team will shape the equipment and delivery plan.")}</span>
        </div>
        <a href="mailto:contact@marocgpu.ma">{t("Contact infrastructure team")} <ArrowRight size={20} /></a>
      </section>

      <footer className="dc-footer">
        <a href="/"><img src="/marocgpu-logo-transparent.webp" alt="MarocGPU" /></a>
        <p>{t("High-performance computing and data center infrastructure, engineered in partnership with NVIDIA by MicroIntégral in Morocco.")}</p>
        <span>&copy; 2026 MarocGPU | {t("All rights reserved.")}</span>
      </footer>
    </motion.main>
  );
}
