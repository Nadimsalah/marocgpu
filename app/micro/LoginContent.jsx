"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  Lock,
  ShieldCheck,
} from "lucide-react";

const CORRECT_PIN = "07077777";

export default function LoginContent() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    setPin(digits);
    setError(false);
  };

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      setSuccess(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
      inputRef.current?.focus();
    }
  };

  const allFilled = pin.length === 8;

  if (!ready) {
    return (
      <div className="micro-page">
        <div className="micro-card">
          <div className="shimmer" style={{ width: 150, height: 44, borderRadius: 8, margin: "0 auto 28px" }} />
          <div className="shimmer" style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 24px" }} />
          <div className="shimmer" style={{ width: "50%", height: 28, borderRadius: 8, margin: "0 auto 12px" }} />
          <div className="shimmer" style={{ width: "70%", height: 14, borderRadius: 6, margin: "0 auto 40px" }} />
          <div className="shimmer" style={{ width: "100%", height: 56, borderRadius: 14, marginBottom: 36 }} />
          <div className="shimmer" style={{ width: "100%", height: 52, borderRadius: 12 }} />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="micro-page">
        <motion.div
          className="micro-card micro-success"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
        >
          <a href="/" className="micro-logo"><img src="/marocgpu-logo-transparent.png" alt="MarocGPU" /></a>
          <motion.div
            className="micro-success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 20 }}
          >
            <CheckCircle size={40} strokeWidth={2.5} />
          </motion.div>
          <h2>Access granted</h2>
          <p>Welcome to MarocGPU Micro.</p>
          <a className="micro-cta" href="/">
            Enter dashboard <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="micro-page">
      <motion.div
        className="micro-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/" className="micro-logo"><img src="/marocgpu-logo-transparent.png" alt="MarocGPU" /></a>
        <div className="micro-lock">
          <Lock size={24} />
        </div>
        <h1>Secure Access</h1>
        <p className="micro-subtitle">Enter your PIN to continue</p>

        <div className="micro-pin-wrap">
          <div className="micro-input-group">
            <input
              ref={inputRef}
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              maxLength={8}
              value={pin}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={error ? "shake" : ""}
              placeholder="Enter 8-digit PIN"
              autoComplete="off"
            />
            <span className="micro-digit-count">{pin.length}/8</span>
          </div>
          <label className="micro-toggle-pin">
            <input type="checkbox" checked={showPin} onChange={() => setShowPin(!showPin)} />
            <Eye size={15} />
            <span>Show PIN</span>
          </label>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="micro-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              Incorrect PIN. Try again.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          className={`micro-submit ${allFilled ? "filled" : ""}`}
          type="button"
          onClick={handleSubmit}
          disabled={!allFilled}
        >
          <ShieldCheck size={18} />
          Unlock
        </button>

        <p className="micro-hint">Use the PIN provided by your administrator</p>
      </motion.div>
    </div>
  );
}
