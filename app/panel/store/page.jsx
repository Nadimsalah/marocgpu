"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Globe,
  Image,
  Layout,
  Menu,
  Save,
  Text,
  Type,
  Upload,
  X,
  Link2,
} from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { brandIcons } from "../../components/BrandIcons";

const allIconsList = [
  { name: "google", label: "Google" },
  { name: "apple", label: "Apple" },
  { name: "microsoft", label: "Microsoft" },
  { name: "figma", label: "Figma" },
  { name: "github", label: "GitHub" },
  { name: "slack", label: "Slack" },
  { name: "notion", label: "Notion" },
  { name: "vercel", label: "Vercel" },
  { name: "stripe", label: "Stripe" },
  { name: "discord", label: "Discord" },
  { name: "x", label: "X (Twitter)" },
  { name: "spotify", label: "Spotify" },
];

const sections = [
  { id: "general", label: "General", icon: Globe },
  { id: "header", label: "Header & Navigation", icon: Menu },
  { id: "hero", label: "Hero Section", icon: Layout },
  { id: "heroIcons", label: "Hero Icons", icon: Layout },
  { id: "feature", label: "Feature Story", icon: Text },
  { id: "solutions", label: "Business Solutions", icon: Layout },
  { id: "footer", label: "Footer", icon: Text },
];

export default function StorePage() {
  const { settings, updateSettings } = useSite();
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sec = params.get("section");
    if (sec && sections.some((s) => s.id === sec)) {
      setActiveSection(sec);
    }
    const timer = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const update = (key, value) => {
    updateSettings({ [key]: value });
    setSaved(false);
  };

  const updateNested = (parent, index, key, value) => {
    const arr = [...settings[parent]];
    arr[index] = { ...arr[index], [key]: value };
    updateSettings({ [parent]: arr });
    setSaved(false);
  };

  const addNavItem = () => {
    updateSettings({ navItems: [...settings.navItems, "New Page"] });
    setSaved(false);
  };

  const removeNavItem = (index) => {
    updateSettings({ navItems: settings.navItems.filter((_, i) => i !== index) });
    setSaved(false);
  };

  const updateNavItem = (index, value) => {
    const items = [...settings.navItems];
    items[index] = value;
    updateSettings({ navItems: items });
    setSaved(false);
  };

  const addFooterLink = (colIndex) => {
    const cols = [...settings.footerColumns];
    cols[colIndex] = { ...cols[colIndex], links: [...cols[colIndex].links, "New link"] };
    updateSettings({ footerColumns: cols });
    setSaved(false);
  };

  const updateFooterLink = (colIndex, linkIndex, value) => {
    const cols = [...settings.footerColumns];
    const links = [...cols[colIndex].links];
    links[linkIndex] = value;
    cols[colIndex] = { ...cols[colIndex], links };
    updateSettings({ footerColumns: cols });
    setSaved(false);
  };

  const removeFooterLink = (colIndex, linkIndex) => {
    const cols = [...settings.footerColumns];
    cols[colIndex] = { ...cols[colIndex], links: cols[colIndex].links.filter((_, i) => i !== linkIndex) };
    updateSettings({ footerColumns: cols });
    setSaved(false);
  };

  const addFooterColumn = () => {
    updateSettings({ footerColumns: [...settings.footerColumns, { title: "New Column", links: ["Link 1"] }] });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => update("logo", event.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (!ready) {
    return (
      <div className="panel-content">
        <div className="panel-header">
          <div>
            <div className="shimmer" style={{ width: 120, height: 28, borderRadius: 8, marginBottom: 8 }} />
            <div className="shimmer" style={{ width: 200, height: 14, borderRadius: 6 }} />
          </div>
        </div>
        <div className="shimmer" style={{ width: "100%", height: 500, borderRadius: 18 }} />
      </div>
    );
  }

  return (
    <motion.div
      className="panel-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="panel-header">
        <div>
          <h1>Store</h1>
          <p>Edit your website content in real time.</p>
        </div>
        <button className="store-save-btn" onClick={handleSave}>
          <Save size={17} />
          {saved ? "Saved!" : "Save changes"}
        </button>
      </div>

      <div className="store-layout">
        <div className="store-sidebar">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`store-section-btn ${activeSection === id ? "active" : ""}`}
              onClick={() => setActiveSection(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="store-editor">
          {activeSection === "general" && (
            <div className="store-form">
              <div className="store-form-group">
                <label>
                  <span><Image size={16} /> Site Logo</span>
                  <div className="store-logo-row">
                    <img src={settings.logo} alt="Logo preview" className="store-logo-preview" />
                    <input type="file" accept="image/*" onChange={handleLogoChange} />
                  </div>
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Type size={16} /> Site Name</span>
                  <input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Tagline</span>
                  <textarea rows={3} value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} />
                </label>
              </div>
            </div>
          )}

          {activeSection === "header" && (
            <div className="store-form">
              <div className="store-form-group">
                <div className="store-group-header">
                  <span><Menu size={16} /> Navigation Items</span>
                  <button className="store-add-btn" onClick={addNavItem}>+ Add item</button>
                </div>
                {settings.navItems.map((item, i) => (
                  <div key={i} className="store-list-item">
                    <input value={item} onChange={(e) => updateNavItem(i, e.target.value)} />
                    <button className="store-remove-btn" onClick={() => removeNavItem(i)}>&times;</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "hero" && (
            <div className="store-form">
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Hero Title</span>
                  <input value={settings.heroTitle} onChange={(e) => update("heroTitle", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Hero Subtitle</span>
                  <textarea rows={3} value={settings.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> CTA Button Text</span>
                  <input value={settings.heroCta} onChange={(e) => update("heroCta", e.target.value)} />
                </label>
              </div>
            </div>
          )}

          {activeSection === "heroIcons" && (
            <div className="store-form">
              <div className="store-form-group">
                <span style={{ fontSize: "0.82rem", fontWeight: 680, color: "#4e5560", display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Layout size={16} /> Floating Icons (max 12)
                </span>
                <p style={{ fontSize: "0.82rem", color: "#777b83", margin: "0 0 12px", lineHeight: 1.5 }}>
                  Toggle visibility, upload custom images to replace any icon.
                </p>
                <div className="store-icons-grid">
                  {allIconsList.map(({ name, label }) => {
                    const active = settings.heroIcons.includes(name);
                    const IconSvg = brandIcons[name];
                    const customUrl = settings.customIcons?.[name];
                    return (
                      <div key={name} className="store-icon-card">
                        <button
                          className={`store-icon-toggle ${active ? "active" : ""}`}
                          onClick={() => {
                            if (active) {
                              if (settings.heroIcons.length <= 1) return;
                              update("heroIcons", settings.heroIcons.filter((n) => n !== name));
                            } else {
                              if (settings.heroIcons.length >= 12) return;
                              update("heroIcons", [...settings.heroIcons, name]);
                            }
                          }}
                        >
                          {active ? "✓" : "+"}
                        </button>
                        <div className="store-icon-preview">
                          {customUrl ? (
                            <img src={customUrl} alt={label} />
                          ) : IconSvg ? (
                            <IconSvg width={32} height={32} />
                          ) : (
                            <span>{label[0]}</span>
                          )}
                        </div>
                        <span className="store-icon-label">{label}</span>
                        <div className="store-icon-actions">
                          <label className="store-icon-upload">
                            <Upload size={13} />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    update("customIcons", { ...settings.customIcons, [name]: ev.target.result });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {customUrl && (
                            <button
                              className="store-icon-remove"
                              onClick={() => {
                                const copy = { ...settings.customIcons };
                                delete copy[name];
                                update("customIcons", copy);
                              }}
                            >
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span style={{ fontSize: "0.76rem", color: "#a0a5ad", marginTop: 8 }}>
                  {settings.heroIcons.length}/12 icons active
                </span>
              </div>
            </div>
          )}

          {activeSection === "feature" && (
            <div className="store-form">
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Kicker</span>
                  <input value={settings.featureKicker} onChange={(e) => update("featureKicker", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Title</span>
                  <textarea rows={3} value={settings.featureTitle} onChange={(e) => update("featureTitle", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Description</span>
                  <textarea rows={4} value={settings.featureDescription} onChange={(e) => update("featureDescription", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> CTA Button Text</span>
                  <input value={settings.featureCta} onChange={(e) => update("featureCta", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Link2 size={16} /> CTA Button Link (Redirect URL)</span>
                  <input value={settings.featureCtaLink || ""} onChange={(e) => update("featureCtaLink", e.target.value)} placeholder="#collections or /products" />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Image size={16} /> Section Image</span>
                  <div
                    className="products-image-upload"
                    onPaste={(e) => {
                      const text = e.clipboardData.getData("text");
                      if (text.match(/^https?:\/\/\S+/i)) {
                        update("featureImage", text);
                      }
                    }}
                    style={{ width: "100%", height: 180, position: "relative", borderRadius: 12, border: "2px dashed #dcdde1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer", background: "#f8f9fa", marginTop: 8 }}
                  >
                    {settings.featureImage ? (
                      <img src={settings.featureImage} alt="Feature Story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#7f8c8d" }}>
                        <Upload size={24} />
                        <span style={{ fontSize: "0.85rem" }}>Upload photo or paste URL</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => update("featureImage", ev.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeSection === "solutions" && (
            <div className="store-form">
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Kicker</span>
                  <input value={settings.solutionsKicker} onChange={(e) => update("solutionsKicker", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Title</span>
                  <textarea rows={3} value={settings.solutionsTitle} onChange={(e) => update("solutionsTitle", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Description</span>
                  <textarea rows={4} value={settings.solutionsDescription} onChange={(e) => update("solutionsDescription", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Primary CTA</span>
                  <input value={settings.solutionsCtaPrimary} onChange={(e) => update("solutionsCtaPrimary", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Secondary CTA</span>
                  <input value={settings.solutionsCtaSecondary} onChange={(e) => update("solutionsCtaSecondary", e.target.value)} />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Link2 size={16} /> Primary CTA Button Link</span>
                  <input value={settings.solutionsCtaPrimaryLink || ""} onChange={(e) => update("solutionsCtaPrimaryLink", e.target.value)} placeholder="#collections or /products" />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Link2 size={16} /> Secondary CTA Button Link</span>
                  <input value={settings.solutionsCtaSecondaryLink || ""} onChange={(e) => update("solutionsCtaSecondaryLink", e.target.value)} placeholder="#collections or /products" />
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Image size={16} /> Section Image (Replaces dashboard device)</span>
                  <div
                    className="products-image-upload"
                    onPaste={(e) => {
                      const text = e.clipboardData.getData("text");
                      if (text.match(/^https?:\/\/\S+/i)) {
                        update("solutionsImage", text);
                      }
                    }}
                    style={{ width: "100%", height: 180, position: "relative", borderRadius: 12, border: "2px dashed #dcdde1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer", background: "#f8f9fa", marginTop: 8 }}
                  >
                    {settings.solutionsImage ? (
                      <img src={settings.solutionsImage} alt="Solutions showcase" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#7f8c8d" }}>
                        <Upload size={24} />
                        <span style={{ fontSize: "0.85rem" }}>Upload photo or paste URL (or leave blank to use dashboard preview)</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => update("solutionsImage", ev.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeSection === "footer" && (
            <div className="store-form">
              <div className="store-form-group">
                <div className="store-group-header">
                  <span><Text size={16} /> Footer Columns</span>
                  <button className="store-add-btn" onClick={addFooterColumn}>+ Add column</button>
                </div>
                {settings.footerColumns.map((col, ci) => (
                  <div key={ci} className="store-footer-col">
                    <div className="store-list-item">
                      <input
                        value={col.title}
                        onChange={(e) => updateNested("footerColumns", ci, "title", e.target.value)}
                        placeholder="Column title"
                      />
                    </div>
                    <div className="store-sublist">
                      {col.links.map((link, li) => (
                        <div key={li} className="store-list-item store-sublist-item">
                          <input value={link} onChange={(e) => updateFooterLink(ci, li, e.target.value)} />
                          <button className="store-remove-btn" onClick={() => removeFooterLink(ci, li)}>&times;</button>
                        </div>
                      ))}
                      <button className="store-add-sublink" onClick={() => addFooterLink(ci)}>+ Add link</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="store-form-group">
                <label>
                  <span><Text size={16} /> Footer Bottom Text</span>
                  <input value={settings.footerBottom} onChange={(e) => update("footerBottom", e.target.value)} />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="store-preview">
          <div className="store-preview-header">
            <Eye size={16} />
            <span>Preview</span>
          </div>
          <div className="store-preview-content">
            <div className="store-preview-logo">
              <img src={settings.logo} alt="" />
            </div>
            <div className="store-preview-hero">
              <small>MarocGPU</small>
              <h3>{settings.heroTitle || "Hero Title"}</h3>
              <p>{settings.heroSubtitle || "Hero subtitle"}</p>
            </div>
            <div className="store-preview-nav">
              {settings.navItems.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
            <div className="store-preview-tagline">
              <p>{settings.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
