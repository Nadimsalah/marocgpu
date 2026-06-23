"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck, Shield, Tag } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal, shipping, total, count, hydrated } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "MAROC10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    }
  };

  if (!hydrated) {
    return (
      <main className="cart-page">
        <header className="cart-header">
          <Link className="cart-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
          <Link className="cart-back" href="/products"><ArrowLeft size={17} /> Continue shopping</Link>
        </header>
        <section className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={48} />
          </div>
          <h2>Loading cart...</h2>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <header className="cart-header">
          <Link className="cart-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
          <Link className="cart-back" href="/products"><ArrowLeft size={17} /> Continue shopping</Link>
        </header>
        <section className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={48} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Browse our catalog and find your next machine.</p>
          <Link className="cart-empty-cta" href="/products">
            Browse products <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
        <header className="cart-header">
          <Link className="cart-logo" href="/" aria-label="MarocGPU home">
            <img src="/marocgpu-logo-transparent.png" alt="MarocGPU" />
          </Link>
          <Link className="cart-back" href="/products"><ArrowLeft size={17} /> Continue shopping</Link>
        </header>

      <div className="cart-breadcrumb">
        <Link href="/">Home</Link>
        <span>·</span>
        <Link href="/products">Products</Link>
        <span>·</span>
        <span>Cart</span>
      </div>

      <section className="cart-hero">
        <p>Your cart</p>
        <h1>{count} {count === 1 ? "item" : "items"} in your cart</h1>
      </section>

      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {items.map((item) => (
              <motion.article
                key={item.id}
                className="cart-item"
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Link className="cart-item-image" href={`/products/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                  {item.badge && <span>{item.badge}</span>}
                </Link>
                <div className="cart-item-info">
                  <p>{item.category}</p>
                  <Link href={`/products/${item.id}`}><h3>{item.name}</h3></Link>
                  <span>{item.spec}</span>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                    <Minus size={15} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                    <Plus size={15} />
                  </button>
                </div>
                <div className="cart-item-price">
                  <strong>{(item.price * item.qty).toLocaleString("en-US")} MAD</strong>
                  {item.qty > 1 && <small>{item.price.toLocaleString("en-US")} MAD each</small>}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>

          <div className="cart-promo">
            <label>
              <Tag size={16} />
              <input
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoApplied(false); }}
                placeholder="Promo code (try MAROC10)"
              />
            </label>
            <button onClick={applyPromo} disabled={promoApplied || !promoCode.trim()}>
              {promoApplied ? "Applied" : "Apply"}
            </button>
          </div>
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>{subtotal.toLocaleString("en-US")} MAD</strong>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? "Free" : `${shipping.toLocaleString("en-US")} MAD`}</strong>
          </div>
          {shipping > 0 && (
            <p className="cart-shipping-hint">
              <Truck size={14} /> Add {(5000 - subtotal).toLocaleString("en-US")} MAD more for free shipping
            </p>
          )}
          {discount > 0 && (
            <div className="cart-summary-row cart-discount">
              <span>Promo (MAROC10)</span>
              <strong>−{discount.toLocaleString("en-US")} MAD</strong>
            </div>
          )}
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-total">
            <span>Total</span>
            <strong>{(total - discount).toLocaleString("en-US")} MAD</strong>
          </div>
          <Link className="cart-checkout-btn" href="/checkout">
            Proceed to checkout <ArrowRight size={18} />
          </Link>
          <div className="cart-perks">
            <div><Truck size={16} /><span>Free delivery over 5,000 MAD</span></div>
            <div><Shield size={16} /><span>2-year official warranty</span></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
