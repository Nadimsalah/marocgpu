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
  const [ready, setReady] = useState(false);
  const { items, subtotal, shipping, total, count, clearCart, hydrated } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "Casablanca", zip: "",
  });
  const [errors, setErrors] = useState({});

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

  const placeOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (!hydrated) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
        </header>
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <ShoppingCart size={48} />
          </div>
          <h2>Loading cart...</h2>
        </section>
      </main>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
        </header>
        <section className="checkout-empty">
          <div className="checkout-empty-icon">
            <ShoppingCart size={48} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some products before checking out.</p>
          <Link className="checkout-empty-cta" href="/products">Browse products</Link>
        </section>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <header className="checkout-header">
          <Link className="checkout-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
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
            <h2>Order confirmed!</h2>
            <p>Thank you for your purchase. We'll send a confirmation to <strong>{form.email}</strong> with tracking details.</p>
            <div className="checkout-success-order">
              <span>Order number</span>
              <strong>#MG-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <Link className="checkout-success-cta" href="/">Back to home</Link>
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
          <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
        </Link>
        <Link className="checkout-back" href="/cart"><ArrowLeft size={17} /> Back to cart</Link>
      </header>

      <div className="checkout-breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/cart">Cart</Link>
        <ChevronRight size={14} />
        <span>Checkout</span>
      </div>

      <section className="checkout-hero">
        <p>Checkout</p>
        <h1>Complete your order</h1>
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
            <span className="step-label">{s.label}</span>
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
                <h2><MapPin size={20} /> Shipping information</h2>
                <div className="form-grid">
                  <div className="form-field">
                    <label>First name</label>
                    <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Ahmed" />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </div>
                  <div className="form-field">
                    <label>Last name</label>
                    <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="El Amrani" />
                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ahmed@example.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>Phone number</label>
                    <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="06 12 34 56 78" />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                  <div className="form-field form-full">
                    <label>Address</label>
                    <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Rue Mohammed V" />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>
                  <div className="form-field">
                    <label>City</label>
                    <select value={form.city} onChange={(e) => update("city", e.target.value)}>
                      {moroccanCities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-field">
                    <label>Postal code</label>
                    <input value={form.zip} onChange={(e) => update("zip", e.target.value)} placeholder="20000" />
                    {errors.zip && <span className="form-error">{errors.zip}</span>}
                  </div>
                </div>
                <button className="checkout-next" onClick={nextStep}>
                  Review order <ChevronRight size={18} />
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
                <h2><Package size={20} /> Review your order</h2>
                <div className="review-section">
                  <h3>Shipping to</h3>
                  <p>{form.firstName} {form.lastName}</p>
                  <p>{form.address}, {form.city} {form.zip}</p>
                  <p>{form.email} · {form.phone}</p>
                </div>
                <div className="review-section">
                  <h3>Items ({count})</h3>
                  {items.map((item) => (
                    <div key={item.id} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>Qty: {item.qty}</span>
                      </div>
                      <strong>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-form-actions">
                  <button className="checkout-prev" onClick={() => setStep(1)}>
                    <ArrowLeft size={17} /> Back
                  </button>
                  <button className="checkout-place" onClick={placeOrder}>
                    <Lock size={16} /> Place order · {(total).toLocaleString("en-US")} MAD
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <div className="checkout-summary-items">
            {items.map((item) => (
              <div key={item.id} className="checkout-summary-item">
                <div className="checkout-summary-item-img">
                  <img src={item.image} alt={item.name} />
                  <span className="checkout-summary-item-qty">{item.qty}</span>
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
                <strong>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
              </div>
            ))}
          </div>
          <div className="checkout-summary-divider" />
          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <strong>{subtotal.toLocaleString("en-US")} MAD</strong>
          </div>
          <div className="checkout-summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? "Free" : `${shipping.toLocaleString("en-US")} MAD`}</strong>
          </div>
          <div className="checkout-summary-divider" />
          <div className="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <strong>{total.toLocaleString("en-US")} MAD</strong>
          </div>
          <div className="checkout-summary-perks">
            <div><Truck size={15} /><span>Free delivery over 5,000 MAD</span></div>
            <div><Shield size={15} /><span>2-year official warranty</span></div>
            <div><Lock size={15} /><span>Secure checkout</span></div>
          </div>
        </aside>
      </div>
    </motion.main>
  );
}
