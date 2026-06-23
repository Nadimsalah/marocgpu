"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Headphones,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RotateCcw,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const supportCards = [
  {
    icon: HelpCircle,
    title: "FAQs",
    text: "Quick answers to ordering, shipping, returns, and account questions.",
    href: "#faqs",
  },
  {
    icon: Wrench,
    title: "Warranty & repairs",
    text: "Check coverage, start a claim, or arrange service for your hardware.",
    href: "#contact",
  },
  {
    icon: RotateCcw,
    title: "Returns & exchanges",
    text: "Simple steps to return or exchange a product within policy windows.",
    href: "#contact",
  },
  {
    icon: Package,
    title: "Track an order",
    text: "Follow your shipment status and estimated delivery date.",
    href: "#contact",
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone support",
    detail: "+212 5XX-XXXXXX",
    note: "Mon–Sat, 9am–7pm",
  },
  {
    icon: Mail,
    title: "Email us",
    detail: "support@marocgpu.ma",
    note: "Reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit us",
    detail: "Casablanca, Morocco",
    note: "Showroom & service center",
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery, bank transfer, and major credit cards. Business customers can also request invoice-based payment with approved credit terms.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders in Casablanca, Rabat, and Marrakech arrive within 1–2 business days. Other Moroccan cities typically receive deliveries within 2–5 business days.",
  },
  {
    question: "Do your products come with a warranty?",
    answer:
      "Yes. All new products include the manufacturer's warranty, and custom builds from MarocGPU include a hardware warranty plus technical support.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "You can return unused products in original packaging within 14 days of delivery. Custom-built systems and opened software are non-refundable unless defective.",
  },
  {
    question: "Do you offer setup or installation support?",
    answer:
      "Yes. We provide setup guidance, remote support, and on-site installation options for workstations, servers, and data center equipment.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you will receive an email or WhatsApp message with a tracking number and estimated delivery window.",
  },
];

function SupportSkeleton() {
  return (
    <main className="support-page">
      <header className="support-header">
        <div className="shimmer" style={{ width: 130, height: 44, borderRadius: 8 }} />
        <nav>
          <div className="shimmer" style={{ width: 80, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 60, height: 16, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 70, height: 16, borderRadius: 6 }} />
        </nav>
        <div className="shimmer" style={{ width: 110, height: 45, borderRadius: 9 }} />
      </header>

      <section className="support-hero" style={{ background: "#f5f7fa", margin: "0 12px", borderRadius: "0 0 28px 28px", minHeight: 460 }}>
        <div className="support-hero-copy">
          <div className="shimmer" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 22 }} />
          <div className="shimmer" style={{ width: "65%", height: 64, borderRadius: 12, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "70%", height: 18, borderRadius: 8, marginBottom: 34 }} />
          <div style={{ display: "flex", gap: 12 }}>
            <div className="shimmer" style={{ width: 170, height: 53, borderRadius: 10 }} />
            <div className="shimmer" style={{ width: 150, height: 53, borderRadius: 10 }} />
          </div>
        </div>
      </section>

      <section className="support-topics">
        <div className="support-section-heading">
          <div className="shimmer" style={{ width: 100, height: 14, borderRadius: 6, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "50%", height: 52, borderRadius: 10, marginBottom: 18 }} />
          <div className="shimmer" style={{ width: "65%", height: 18, borderRadius: 8 }} />
        </div>
        <div className="support-cards-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="support-card">
              <div className="shimmer" style={{ width: 36, height: 36, borderRadius: 8 }} />
              <div className="shimmer" style={{ width: "60%", height: 26, borderRadius: 8, marginTop: 60, marginBottom: 14 }} />
              <div className="shimmer" style={{ width: "100%", height: 14, borderRadius: 6, marginBottom: 6 }} />
              <div className="shimmer" style={{ width: "85%", height: 14, borderRadius: 6, marginBottom: 20 }} />
              <div className="shimmer" style={{ width: 110, height: 16, borderRadius: 6 }} />
            </div>
          ))}
        </div>
      </section>

      <section className="support-faqs" style={{ background: "#f3f5f8" }}>
        <div className="support-section-heading">
          <div className="shimmer" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "55%", height: 52, borderRadius: 10 }} />
        </div>
        <div className="support-faq-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer" style={{ width: "100%", height: 62, borderRadius: 16, marginBottom: 10 }} />
          ))}
        </div>
      </section>

      <section className="support-contact">
        <div className="support-contact-layout">
          <div className="support-contact-copy">
            <div className="shimmer" style={{ width: 100, height: 14, borderRadius: 6, marginBottom: 20 }} />
            <div className="shimmer" style={{ width: "80%", height: 52, borderRadius: 10, marginBottom: 18 }} />
            <div className="shimmer" style={{ width: "90%", height: 18, borderRadius: 8, marginBottom: 34 }} />
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div className="shimmer" style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="shimmer" style={{ width: "50%", height: 16, borderRadius: 6, marginBottom: 6 }} />
                  <div className="shimmer" style={{ width: "70%", height: 14, borderRadius: 6, marginBottom: 4 }} />
                  <div className="shimmer" style={{ width: "40%", height: 12, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="support-form-wrap" style={{ background: "#fafbfc" }}>
            <div className="shimmer" style={{ width: "100%", height: 420, borderRadius: 20 }} />
          </div>
        </div>
      </section>

      <section className="support-whatsapp" style={{ background: "#0d111a" }}>
        <div>
          <div className="shimmer-dark" style={{ width: "60%", height: 40, borderRadius: 10, marginBottom: 14 }} />
          <div className="shimmer-dark" style={{ width: "70%", height: 16, borderRadius: 8 }} />
        </div>
        <div className="shimmer-dark" style={{ width: 220, height: 58, borderRadius: 12 }} />
      </section>
    </main>
  );
}

export default function SupportContent() {
  const [ready, setReady] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  if (!ready) return <SupportSkeleton />;

  return (
    <motion.main
      className="support-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="support-header">
        <a href="/" aria-label="MarocGPU home">
          <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
        </a>
        <nav aria-label="Support navigation">
          <a href="#help">Help topics</a>
          <a href="#faqs">FAQs</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="support-header-cta" href="#contact">
          Get help <ArrowRight size={17} />
        </a>
      </header>

      <section className="support-hero">
        <div className="support-hero-copy">
          <p>MarocGPU support</p>
          <h1>We're here to help.</h1>
          <span>
            Find answers, manage your order, or reach out to our local support team across Morocco.
          </span>
          <div className="support-hero-actions">
            <a href="#contact">Contact support <ArrowRight size={18} /></a>
            <a href="#faqs">Browse FAQs</a>
          </div>
        </div>
        <div className="support-hero-visual" aria-hidden="true">
          <div className="support-orb" />
          <div className="support-hero-card">
            <Headphones size={32} />
            <strong>24/7</strong>
            <span>Self-service help center</span>
          </div>
          <div className="support-hero-card card-secondary">
            <MessageCircle size={24} />
            <strong>WhatsApp</strong>
            <span>Fast response</span>
          </div>
        </div>
      </section>

      <section className="support-topics" id="help">
        <div className="support-section-heading">
          <p>Help topics</p>
          <h2>Get support your way.</h2>
          <span>Choose the fastest path to the answer or service you need.</span>
        </div>
        <div className="support-cards-grid">
          {supportCards.map(({ icon: Icon, title, text, href }) => (
            <a className="support-card" href={href} key={title}>
              <div>
                <Icon size={25} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span>
                Learn more <ArrowRight size={15} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="support-faqs" id="faqs">
        <div className="support-section-heading">
          <p>Common questions</p>
          <h2>Frequently asked questions.</h2>
        </div>
        <div className="support-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`support-faq-item ${isOpen ? "open" : ""}`} key={index}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} />
                </button>
                {isOpen && <p>{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="support-contact" id="contact">
        <div className="support-contact-layout">
          <div className="support-contact-copy">
            <p>Contact us</p>
            <h2>Talk to a real person.</h2>
            <span>
              Whether you need pre-sales advice, order help, or technical support, our team is ready to assist.
            </span>
            <div className="support-contact-methods">
              {contactMethods.map(({ icon: Icon, title, detail, note }) => (
                <div className="support-contact-method" key={title}>
                  <div>
                    <Icon size={22} />
                  </div>
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                    <small>{note}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="support-form-wrap">
            {sent ? (
              <div className="support-form-success">
                <div className="support-success-icon">
                  <ShieldCheck size={32} />
                </div>
                <h3>Message sent</h3>
                <p>Thanks for reaching out. Our support team will get back to you shortly.</p>
                <button type="button" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="support-form" onSubmit={handleSubmit}>
                <div className="support-form-row">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label>
                  <span>Subject</span>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order & delivery</option>
                    <option value="warranty">Warranty & repairs</option>
                    <option value="returns">Returns & exchanges</option>
                    <option value="technical">Technical support</option>
                    <option value="business">Business quote</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                  />
                </label>
                <button type="submit">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="support-whatsapp">
        <div>
          <h2>Prefer WhatsApp?</h2>
          <p>Message us for quick replies on orders, stock, and support.</p>
        </div>
        <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">
          <MessageCircle size={20} />
          Chat on WhatsApp
        </a>
      </section>

      <footer className="support-footer">
        <a href="/">
          <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
        </a>
        <p>Powerful hardware, expert-built systems, and dependable local support across Morocco.</p>
        <span>&#169; 2026 MarocGPU</span>
      </footer>
    </motion.main>
  );
}
