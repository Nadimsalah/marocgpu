"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Lock,
  MapPin,
  Package,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSite } from "../context/SiteContext";

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir", "Meknes",
  "Oujda", "Kenitra", "Tetouan", "Safi", "Mohammedia", "El Jadida", "Beni Mellal",
  "Nador", "Taza", "Settat", "Larache", "Khouribga", "Berrechid", "Errachidia",
  "Ouarzazate", "Dakhla", "Laayoune", "Guelmim", "Tan-Tan", "Sidi Ifni",
];

const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Review", icon: Package },
];

function CheckoutSkeleton() {
  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <div className="shimmer" style={{ width: 110, height: 42, borderRadius: 8 }} />
        <div className="shimmer" style={{ width: 130, height: 42, borderRadius: 999 }} />
      </header>

      <div className="checkout-breadcrumb" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="shimmer" style={{ width: i < 3 ? 50 : 70, height: 14, borderRadius: 6 }} />
            {i < 3 && <div className="shimmer" style={{ width: 14, height: 14, borderRadius: "50%" }} />}
          </div>
        ))}
      </div>

      <section className="checkout-hero">
        <div className="shimmer" style={{ width: 80, height: 14, borderRadius: 6, marginBottom: 12 }} />
        <div className="shimmer" style={{ width: "35%", height: 40, borderRadius: 10 }} />
      </section>

      <div className="checkout-steps" style={{ display: "flex", justifyContent: "center", gap: 80, marginBottom: 40 }}>
        {[1, 2].map((i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div className="shimmer" style={{ width: 36, height: 36, borderRadius: "50%" }} />
            <div className="shimmer" style={{ width: 70, height: 14, borderRadius: 6 }} />
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-step" style={{ padding: 36 }}>
          <div className="shimmer" style={{ width: "50%", height: 24, borderRadius: 8, marginBottom: 28 }} />
          <div className="form-grid">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className={i <= 2 ? "form-field" : "form-field form-full"}>
                <div className="shimmer" style={{ width: "40%", height: 12, borderRadius: 6, marginBottom: 7 }} />
                <div className="shimmer" style={{ width: "100%", height: 50, borderRadius: 13 }} />
              </div>
            ))}
          </div>
          <div className="shimmer" style={{ width: 160, height: 52, borderRadius: 14, marginTop: 32 }} />
        </div>

        <aside className="checkout-summary" style={{ padding: 32 }}>
          <div className="shimmer" style={{ width: "50%", height: 20, borderRadius: 8, marginBottom: 22 }} />
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
              <div className="shimmer" style={{ width: 60, height: 60, borderRadius: 12, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="shimmer" style={{ width: "80%", height: 16, borderRadius: 6, marginBottom: 6 }} />
                <div className="shimmer" style={{ width: "50%", height: 12, borderRadius: 6 }} />
              </div>
              <div className="shimmer" style={{ width: 80, height: 16, borderRadius: 6 }} />
            </div>
          ))}
          <div className="shimmer" style={{ width: "100%", height: 1, borderRadius: 0, margin: "14px 0" }} />
          {[1, 2].map((i) => (
            <div key={i} className="shimmer" style={{ width: "100%", height: 18, borderRadius: 6, marginBottom: 7 }} />
          ))}
          <div className="shimmer" style={{ width: "100%", height: 1, borderRadius: 0, margin: "14px 0" }} />
          <div className="shimmer" style={{ width: "100%", height: 22, borderRadius: 8, marginBottom: 20 }} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer" style={{ width: "60%", height: 14, borderRadius: 6, marginBottom: 8 }} />
          ))}
        </aside>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const { t, language, changeLanguage } = useSite();
  const [ready, setReady] = useState(false);
  const { items, subtotal, shipping, total, count, clearCart, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "Casablanca", zip: "",
  });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <CheckoutSkeleton />;

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.city) errs.city = "Required";
    if (!form.zip.trim()) errs.zip = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const placeOrder = async () => {
    const orderNum = `MG-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(orderNum);

    const orderData = {
      id: orderNum,
      customer: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      product: items.map(i => `${i.name} (x${i.qty})`).join(", "),
      category: items[0]?.category || "General",
      amount: total,
      quantity: count,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      address: `${form.address}, ${form.city} ${form.zip}`,
      shipping: shipping === 0 ? "Free" : "Standard",
      payment: "Unpaid"
    };

    try {
      // 1. Post order to Supabase API
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      // 2. Post customer profile to Supabase API
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          city: form.city,
          spent: total,
          orders: 1,
          joined: new Date().toISOString().split('T')[0]
        })
      });
    } catch (e) {
      console.error("Error placing order in Supabase:", e);
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (!ready) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo.svg" alt="MarocGPU" />
          </Link>
        </header>
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <ShoppingCart size={48} />
          </div>
          <h2>{t("Loading cart...")}</h2>
        </section>
      </main>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo.svg" alt="MarocGPU" />
          </Link>
        </header>
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <ShoppingCart size={48} />
          </div>
          <h2>{t("Your cart is empty")}</h2>
          <p>{t("Add some products before checking out.")}</p>
          <Link className="checkout-empty-cta" href="/products">{t("Browse products")}</Link>
        </section>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo.svg" alt="MarocGPU" />
          </Link>
        </header>
        <section className="checkout-success">
          <motion.div
            className="checkout-success-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="checkout-success-icon">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2>{t("Order confirmed!")}</h2>
            <p>
              {language === "fr"
                ? `Merci pour votre achat. Nous enverrons une confirmation à ${form.email} avec les détails de suivi.`
                : `Thank you for your purchase. We'll send a confirmation to ${form.email} with tracking details.`}
            </p>
            <div className="checkout-success-order">
              <span>{t("Order number")}</span>
              <strong>#{orderId}</strong>
            </div>
            <Link className="checkout-success-cta" href="/">{t("Back to home")}</Link>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <motion.main
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <header className="checkout-header">
        <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
          <img src="/marocgpu-logo.svg" alt="MarocGPU" />
        </Link>
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

          <Link className="checkout-back" href="/cart" style={{ margin: 0 }}>
            <ArrowLeft size={17} /> {t("Back to cart")}
          </Link>
        </div>
      </header>

      <div className="checkout-breadcrumb">
        <Link href="/">{t("Home")}</Link>
        <ChevronRight size={14} />
        <Link href="/cart">{t("Cart")}</Link>
        <ChevronRight size={14} />
        <span>{t("Checkout")}</span>
      </div>

      <section className="checkout-hero">
        <p>{t("Checkout")}</p>
        <h1>{t("Complete your order")}</h1>
      </section>

      <div className="checkout-steps" style={{ "--step-progress": step }}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            className={step >= s.id ? "active" : ""}
            onClick={() => step > s.id && setStep(s.id)}
          >
            <span className="step-num">
              {step > s.id ? <Check size={16} /> : s.id}
            </span>
            <span className="step-label">{t(s.label)}</span>
          </button>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="shipping"
                className="checkout-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2><MapPin size={20} /> {t("Shipping information")}</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t("First name")}</label>
                    <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Ahmed" />
                    {errors.firstName && <span className="form-error">{t(errors.firstName)}</span>}
                  </div>
                  <div className="form-field">
                    <label>{t("Last name")}</label>
                    <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="El Amrani" />
                    {errors.lastName && <span className="form-error">{t(errors.lastName)}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>{t("Email Address")}</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ahmed@example.com" />
                    {errors.email && <span className="form-error">{t(errors.email)}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>{t("Phone Number")}</label>
                    <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="06 12 34 56 78" />
                    {errors.phone && <span className="form-error">{t(errors.phone)}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>{t("Address")}</label>
                    <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Rue Mohammed V" />
                    {errors.address && <span className="form-error">{t(errors.address)}</span>}
                  </div>
                  <div className="form-field">
                    <label>{t("City")}</label>
                    <select value={form.city} onChange={(e) => update("city", e.target.value)}>
                      {moroccanCities.map((c) => <option key={c} value={c}>{t(c)}</option>)}
                    </select>
                    {errors.city && <span className="form-error">{t(errors.city)}</span>}
                  </div>
                  <div className="form-field">
                    <label>{t("Postal code")}</label>
                    <input value={form.zip} onChange={(e) => update("zip", e.target.value)} placeholder="20000" />
                    {errors.zip && <span className="form-error">{t(errors.zip)}</span>}
                  </div>
                </div>
                <button className="checkout-next" onClick={nextStep}>
                  {t("Review order")} <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="review"
                className="checkout-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2><Package size={20} /> {t("Review your order")}</h2>
                <div className="review-section">
                  <h3>{t("Shipping to")}</h3>
                  <p>{form.firstName} {form.lastName}</p>
                  <p>{form.address}, {t(form.city)} {form.zip}</p>
                  <p>{form.email} · {form.phone}</p>
                </div>
                <div className="review-section">
                  <h3>{t("Items")} ({count})</h3>
                  {items.map((item) => (
                    <div key={item.id} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{t("Qty:")} {item.qty}</span>
                      </div>
                      <strong>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-form-actions">
                  <button className="checkout-prev" onClick={() => setStep(1)}>
                    <ArrowLeft size={17} /> {t("Back")}
                  </button>
                  <button className="checkout-place" onClick={placeOrder}>
                    <Lock size={16} /> {t("Place order")} · {(total).toLocaleString("en-US")} MAD
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="checkout-summary">
          <h2>{t("Order summary")}</h2>
          <div className="checkout-summary-items">
            {items.map((item) => (
              <div key={item.id} className="checkout-summary-item">
                <div className="checkout-summary-item-img">
                  <img src={item.image} alt={item.name} />
                  <span className="checkout-summary-item-qty">{item.qty}</span>
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{t(item.category)}</span>
                </div>
                <strong>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
              </div>
            ))}
          </div>
          <div className="checkout-summary-divider" />
          <div className="checkout-summary-row">
            <span>{t("Subtotal")}</span>
            <strong>{subtotal.toLocaleString("en-US")} MAD</strong>
          </div>
          <div className="checkout-summary-row">
            <span>{t("Shipping")}</span>
            <strong>{shipping === 0 ? t("Free") : `${shipping.toLocaleString("en-US")} MAD`}</strong>
          </div>
          <div className="checkout-summary-divider" />
          <div className="checkout-summary-row checkout-summary-total">
            <span>{t("Total")}</span>
            <strong>{total.toLocaleString("en-US")} MAD</strong>
          </div>
          <div className="checkout-summary-perks">
            <div><Truck size={15} /><span>{t("Free delivery over 5,000 MAD")}</span></div>
            <div><Shield size={15} /><span>{t("2-year official warranty")}</span></div>
            <div><Lock size={15} /><span>{t("Secure checkout")}</span></div>
          </div>
        </aside>
      </div>
    </motion.main>
  );
}
