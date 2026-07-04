"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function InquiryModal({ open, onClose, product }) {
  const { t, language } = useSite();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && product) {
      const defaultMsg = language === "fr"
        ? `Bonjour, je souhaite me renseigner sur la disponibilité du produit "${product.name}". Merci de m'indiquer s'il est actuellement en stock ou quand il le sera.`
        : `Hello, I would like to inquire about the availability of the "${product.name}". Please let me know if it is currently in stock or when it will become available.`;

      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        message: defaultMsg,
      });
      setSuccess(false);
      setError("");
    }
  }, [open, product, language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          product_name: product.name,
          ...formData,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const errData = await res.json();
        setError(errData?.error || t("Failed to submit inquiry."));
      }
    } catch (e) {
      setError(t("A network error occurred. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="orders-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={onClose}
        >
          <motion.div
            className="orders-detail-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              width: "min(500px, 100%)",
              margin: "auto",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orders-detail-header" style={{ padding: "20px 24px 16px" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", color: "#111", margin: 0 }}>{t("Availability Inquiry")}</h2>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{t("For:")} {product.name}</span>
              </div>
              <button
                className="orders-close-btn"
                type="button"
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  color: "#999",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="orders-detail-body" style={{ padding: "0 24px 24px" }}>
              {success ? (
                <div style={{ textAlign: "center", padding: "40px 10px" }}>
                  <div style={{ color: "#25D366", marginBottom: "16px" }}>
                    <CheckCircle2 size={54} style={{ margin: "0 auto" }} />
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#111", margin: "0 0 10px" }}>
                    {t("Inquiry Submitted!")}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.5, margin: 0 }}>
                    {language === "fr"
                      ? `Merci. Nous avons bien reçu votre demande pour le produit "${product.name}". Notre équipe prendra contact avec vous très prochainement par email ou par téléphone pour vous informer de sa disponibilité.`
                      : `Thank you. We have received your inquiry for the "${product.name}". Our team will contact you shortly via email or phone regarding stock availability.`}
                  </p>
                  <button
                    className="store-save-btn"
                    onClick={onClose}
                    style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
                  >
                    {t("Done")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#444" }}>{t("Full Name")}</label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. John Doe"
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #dcdde1",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#444" }}>{t("Email Address")}</label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #dcdde1",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#444" }}>{t("WhatsApp or Phone Number")}</label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="e.g. +212 600-000000"
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #dcdde1",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#444" }}>{t("Message")}</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #dcdde1",
                        fontSize: "0.92rem",
                        outline: "none",
                        resize: "vertical",
                        lineHeight: 1.4,
                      }}
                    />
                  </div>

                  {error && <div style={{ color: "#e53e3e", fontSize: "0.85rem", fontWeight: "600" }}>{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="store-save-btn"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      height: "46px",
                      marginTop: "8px",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    <Send size={16} />
                    {loading ? t("Submitting...") : t("Send Inquiry Request")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
