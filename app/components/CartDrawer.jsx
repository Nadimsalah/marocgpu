"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSite } from "../context/SiteContext";

export default function CartDrawer() {
  const { items, updateQty, removeFromCart, subtotal, shipping, total, count, drawerOpen, setDrawerOpen } = useCart();
  const { t } = useSite();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setDrawerOpen(false)}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="drawer-header">
              <div>
                <h2>{t("Your Cart")}</h2>
                <span>{count} {count === 1 ? t("item") : t("items")}</span>
              </div>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="drawer-empty">
                <ShoppingBag size={40} />
                <p>{t("Your cart is empty")}</p>
              </div>
            ) : (
              <>
                <div className="drawer-items">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="drawer-item"
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 60, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link className="drawer-item-img" href={`/products/${item.id}`} onClick={() => setDrawerOpen(false)}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                      <div className="drawer-item-info">
                        <Link href={`/products/${item.id}`} onClick={() => setDrawerOpen(false)}><h4>{item.name}</h4></Link>
                        <span>{item.price.toLocaleString("en-US")} MAD</span>
                        <div className="drawer-item-qty">
                          <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={13} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={13} /></button>
                        </div>
                      </div>
                      <button className="drawer-item-remove" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="drawer-footer">
                  <div className="drawer-row">
                    <span>{t("Subtotal")}</span>
                    <strong>{subtotal.toLocaleString("en-US")} MAD</strong>
                  </div>
                  <div className="drawer-row">
                    <span>{t("Shipping")}</span>
                    <strong>{shipping === 0 ? t("Free") : `${shipping.toLocaleString("en-US")} MAD`}</strong>
                  </div>
                  <div className="drawer-divider" />
                  <div className="drawer-row drawer-total">
                    <span>{t("Total")}</span>
                    <strong>{total.toLocaleString("en-US")} MAD</strong>
                  </div>
                  <Link className="drawer-checkout-btn" href="/checkout" onClick={() => setDrawerOpen(false)}>
                    {t("Go to checkout")} <ArrowRight size={17} />
                  </Link>
                  <Link className="drawer-view-cart" href="/cart" onClick={() => setDrawerOpen(false)}>
                    {t("View full cart")}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
