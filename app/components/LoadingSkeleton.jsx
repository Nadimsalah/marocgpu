export default function LoadingSkeleton() {
  return (
    <main className="hp-page">
      <header className="top-shell">
        <div className="site-bar">
          <div className="site-brand">
            <div className="shimmer" style={{ width: 150, height: 48, borderRadius: 8 }} />
          </div>
          <nav className="site-nav">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shimmer" style={{ width: 100, height: 18, borderRadius: 6 }} />
            ))}
          </nav>
          <div className="site-actions">
            <div className="shimmer" style={{ width: 260, height: 48, borderRadius: 999 }} />
            <div className="shimmer" style={{ width: 42, height: 42, borderRadius: 999 }} />
          </div>
        </div>
      </header>

      <section className="floating-section" style={{ background: "#f8f9fb" }}>
        <div className="floating-content" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className="shimmer" style={{ width: 120, height: 14, borderRadius: 6, marginBottom: 24 }} />
          <div className="shimmer" style={{ width: "70%", maxWidth: 580, height: 72, borderRadius: 12, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "50%", maxWidth: 420, height: 20, borderRadius: 8, marginBottom: 36 }} />
          <div className="shimmer" style={{ width: 220, height: 54, borderRadius: 12 }} />
        </div>
      </section>

      <section className="must-haves" style={{ background: "#f5f6f8" }}>
        <div className="must-haves-heading" style={{ marginBottom: 44 }}>
          <div style={{ width: "100%" }}>
            <div className="shimmer" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 12 }} />
            <div className="shimmer" style={{ width: "50%", maxWidth: 420, height: 44, borderRadius: 10 }} />
          </div>
          <div className="shimmer" style={{ width: 160, height: 18, borderRadius: 6 }} />
        </div>
        <div className="must-haves-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="shimmer" style={{ width: "100%", aspectRatio: "1.2", borderRadius: 20, marginBottom: 18 }} />
              <div className="shimmer" style={{ width: 80, height: 13, borderRadius: 6, marginBottom: 10 }} />
              <div className="shimmer" style={{ width: "80%", height: 22, borderRadius: 8, marginBottom: 10 }} />
              <div className="shimmer" style={{ width: "60%", height: 16, borderRadius: 6, marginBottom: 18 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="shimmer" style={{ width: 100, height: 22, borderRadius: 8 }} />
                <div className="shimmer" style={{ width: 110, height: 42, borderRadius: 10 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-story" style={{ background: "#f5f6f8" }}>
        <div className="feature-story-card" style={{ background: "#e8eaee", minHeight: 460 }}>
          <div style={{ padding: "clamp(48px, 5vw, 78px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div className="shimmer" style={{ width: 120, height: 14, borderRadius: 6 }} />
            <div className="shimmer" style={{ width: "90%", height: 52, borderRadius: 10 }} />
            <div className="shimmer" style={{ width: "80%", height: 20, borderRadius: 8, marginTop: 8 }} />
            <div className="shimmer" style={{ width: 180, height: 50, borderRadius: 10, marginTop: 20 }} />
          </div>
          <div style={{ background: "#dce0e6" }} />
        </div>
      </section>

      <section className="solutions-showcase">
        <div className="solutions-visual">
          <div className="shimmer" style={{ width: "90%", aspectRatio: "1.2", borderRadius: 24 }} />
        </div>
        <div className="solutions-copy">
          <div className="shimmer" style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 18 }} />
          <div className="shimmer" style={{ width: "85%", height: 64, borderRadius: 12, marginBottom: 20 }} />
          <div className="shimmer" style={{ width: "75%", height: 18, borderRadius: 8, marginBottom: 34 }} />
          <div style={{ display: "flex", gap: 14 }}>
            <div className="shimmer" style={{ width: 170, height: 54, borderRadius: 10 }} />
            <div className="shimmer" style={{ width: 170, height: 54, borderRadius: 10 }} />
          </div>
        </div>
      </section>

      <section className="business-products" style={{ background: "#f4f5f7" }}>
        <div className="business-products-heading" style={{ marginBottom: 42 }}>
          <div>
            <div className="shimmer" style={{ width: 120, height: 14, borderRadius: 6, marginBottom: 14 }} />
            <div className="shimmer" style={{ width: "55%", maxWidth: 500, height: 48, borderRadius: 10 }} />
          </div>
          <div className="shimmer" style={{ width: 140, height: 18, borderRadius: 6 }} />
        </div>
        <div className="business-products-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="business-product-card">
              <div className="shimmer" style={{ width: "100%", height: 280, borderRadius: "20px 20px 0 0" }} />
              <div style={{ padding: 22 }}>
                <div className="shimmer" style={{ width: 100, height: 13, borderRadius: 6, marginBottom: 10 }} />
                <div className="shimmer" style={{ width: "85%", height: 22, borderRadius: 8, marginBottom: 10 }} />
                <div className="shimmer" style={{ width: "65%", height: 16, borderRadius: 6, marginBottom: 22 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 18, borderTop: "1px solid #eceef1" }}>
                  <div className="shimmer" style={{ width: 100, height: 22, borderRadius: 8 }} />
                  <div className="shimmer" style={{ width: 110, height: 42, borderRadius: 9 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-footer" style={{ background: "#fbfbfa" }}>
        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <div className="shimmer" style={{ width: 120, height: 14, borderRadius: 6, marginBottom: 18 }} />
            <div className="shimmer" style={{ width: "70%", height: 52, borderRadius: 10, marginBottom: 16 }} />
            <div className="shimmer" style={{ width: "85%", height: 18, borderRadius: 8, marginBottom: 30 }} />
            <div style={{ display: "flex", gap: 12 }}>
              <div className="shimmer" style={{ flex: 1, height: 56, borderRadius: 11 }} />
              <div className="shimmer" style={{ width: 150, height: 56, borderRadius: 11 }} />
            </div>
          </div>
          <div className="footer-image-stack">
            <div className="shimmer" style={{ width: "88%", height: 220, borderRadius: 22, position: "absolute", right: "4%", top: 16 }} />
          </div>
        </div>
      </section>
    </main>
  );
}
