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

const presetLinks = ["#collections", "/products/", "/data-center-solutions", "/support"];

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxDim = 800; // Resize to a max dimension of 800px to keep it small (under 100kb)
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG with 0.7 quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressedBase64);
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

export default function StorePage() {
  const { settings, updateSettings } = useSite();
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [activeSubcategoryEdit, setActiveSubcategoryEdit] = useState(null);
  const [ready, setReady] = useState(false);

  const isCustomLink = (val) => val && !presetLinks.includes(val);

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
      compressImage(file, (base64) => update("logo", base64));
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
                <div className="store-group-header" style={{ marginBottom: 16 }}>
                  <span><Menu size={16} /> Navigation Items</span>
                  <button className="store-add-btn" onClick={addNavItem}>+ Add item</button>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {settings.navItems.map((item, i) => {
                    const isEditingSubs = activeSubcategoryEdit === item;
                    const currentMegaMenu = settings.megaMenus?.[item] || { label: `${item} Systems`, links: [], cards: [] };

                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12, background: "#fbfbfc", border: "1px solid #eceef1", borderRadius: 12, padding: 14 }}>
                        <div className="store-list-item" style={{ borderBottom: isEditingSubs ? "1px solid #eceef1" : "none", paddingBottom: isEditingSubs ? 12 : 0, marginBottom: 0 }}>
                          <input value={item} onChange={(e) => {
                            const oldName = item;
                            const newName = e.target.value;
                            updateNavItem(i, newName);
                            // Rename key in megaMenus
                            if (settings.megaMenus?.[oldName]) {
                              const nextMenus = { ...settings.megaMenus };
                              nextMenus[newName] = nextMenus[oldName];
                              delete nextMenus[oldName];
                              update("megaMenus", nextMenus);
                            }
                          }} />
                          <button
                            className="store-save-btn"
                            type="button"
                            onClick={() => setActiveSubcategoryEdit(isEditingSubs ? null : item)}
                            style={{ padding: "6px 12px", background: isEditingSubs ? "#0a4bd9" : "#f1f3f5", color: isEditingSubs ? "#fff" : "#333", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: 6 }}
                          >
                            <Menu size={14} /> Subcategories
                          </button>
                          <button className="store-remove-btn" onClick={() => removeNavItem(i)}>&times;</button>
                        </div>

                        {isEditingSubs && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "4px 8px" }}>
                            {/* Dropdown label */}
                            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#555" }}>Dropdown Group Label</span>
                              <input
                                value={currentMegaMenu.label || ""}
                                onChange={(e) => {
                                  const menus = { ...settings.megaMenus };
                                  if (!menus[item]) menus[item] = { label: "", links: [], cards: [] };
                                  menus[item].label = e.target.value;
                                  update("megaMenus", menus);
                                }}
                                placeholder={`e.g. ${item} PCs`}
                                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #dcdde1", fontSize: "0.85rem" }}
                              />
                            </label>

                            {/* Subcategories list */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#333" }}>Subcategories ({currentMegaMenu.cards?.length || 0})</span>
                                <button
                                  className="store-add-btn"
                                  type="button"
                                  style={{ padding: "4px 10px", fontSize: "0.78rem" }}
                                  onClick={() => {
                                    const menus = { ...settings.megaMenus };
                                    if (!menus[item]) menus[item] = { label: `${item} Systems`, links: ["Shop all"], cards: [] };
                                    if (!menus[item].cards) menus[item].cards = [];
                                    menus[item].cards.push({
                                      title: "New Subcategory",
                                      image: ""
                                    });
                                    update("megaMenus", menus);
                                  }}
                                >
                                  + Add Subcategory
                                </button>
                              </div>

                              {/* Subcategory Cards */}
                              {(currentMegaMenu.cards || []).map((card, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: "flex",
                                    gap: 12,
                                    background: "#fff",
                                    border: "1px solid #eceef1",
                                    borderRadius: 8,
                                    padding: 12,
                                    alignItems: "center"
                                  }}
                                >
                                  {/* Image preview (static thumbnail) */}
                                  <div style={{ width: 80, height: 56, borderRadius: 6, border: "1px solid #dcdde1", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                    {card.image ? (
                                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                      <Upload size={14} style={{ color: "#aaa" }} />
                                    )}
                                  </div>

                                  {/* Inputs */}
                                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                      <input
                                        value={card.title}
                                        onChange={(e) => {
                                          const menus = { ...settings.megaMenus };
                                          const cards = [...menus[item].cards];
                                          cards[idx] = { ...cards[idx], title: e.target.value };
                                          menus[item].cards = cards;
                                          update("megaMenus", menus);
                                        }}
                                        placeholder="Subcategory Title"
                                        style={{ flex: 1, padding: "6px 10px", borderRadius: 6, border: "1px solid #dcdde1", fontSize: "0.82rem" }}
                                      />
                                      <button
                                        className="store-remove-btn"
                                        type="button"
                                        onClick={() => {
                                          const menus = { ...settings.megaMenus };
                                          menus[item].cards = menus[item].cards.filter((_, idx2) => idx2 !== idx);
                                          update("megaMenus", menus);
                                        }}
                                        style={{ margin: 0, padding: 6 }}
                                      >
                                        &times;
                                      </button>
                                    </div>

                                    {/* Action buttons */}
                                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#0a4bd9", borderRadius: 6, fontSize: "0.78rem", fontWeight: 600, color: "#fff", cursor: "pointer", width: "fit-content", transition: "background 0.15s" }}>
                                        <Upload size={13} /> Upload image
                                        <input
                                          type="file"
                                          accept="image/*"
                                          style={{ display: "none" }}
                                          onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                              compressImage(file, (base64) => {
                                                const menus = { ...settings.megaMenus };
                                                const cards = [...menus[item].cards];
                                                cards[idx] = { ...cards[idx], image: base64 };
                                                menus[item].cards = cards;
                                                update("megaMenus", menus);
                                              });
                                            }
                                          }}
                                        />
                                      </label>

                                      <input
                                        value={card.image || ""}
                                        onChange={(e) => {
                                          const menus = { ...settings.megaMenus };
                                          const cards = [...menus[item].cards];
                                          cards[idx] = { ...cards[idx], image: e.target.value };
                                          menus[item].cards = cards;
                                          update("megaMenus", menus);
                                        }}
                                        placeholder="Or paste image URL here..."
                                        style={{ flex: 1, padding: "5px 10px", borderRadius: 6, border: "1px solid #e2e8f0", fontSize: "0.72rem", color: "#555" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {(!currentMegaMenu.cards || currentMegaMenu.cards.length === 0) && (
                                <div style={{ textAlign: "center", padding: "16px 0", color: "#888", fontSize: "0.78rem", background: "#f8f9fa", borderRadius: 8, border: "1px dashed #dcdde1" }}>
                                  No subcategories. Click "+ Add Subcategory" to create one!
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
                                  compressImage(file, (base64) => {
                                    update("customIcons", { ...settings.customIcons, [name]: base64 });
                                  });
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
                  <select 
                    value={isCustomLink(settings.featureCtaLink) ? "custom" : (settings.featureCtaLink || "#collections")} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "custom") {
                        update("featureCtaLink", "");
                      } else {
                        update("featureCtaLink", val);
                      }
                    }}
                    style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #dcdde1", marginBottom: (isCustomLink(settings.featureCtaLink) || settings.featureCtaLink === "") ? 8 : 0 }}
                  >
                    <option value="#collections">Homepage Must Haves Section (#collections)</option>
                    <option value="/products/">All Products Catalog (/products)</option>
                    <option value="/data-center-solutions">Data Center Solutions (/data-center-solutions)</option>
                    <option value="/support">Support Page (/support)</option>
                    <option value="custom">Custom URL...</option>
                  </select>
                  {(isCustomLink(settings.featureCtaLink) || settings.featureCtaLink === "") && (
                    <input value={settings.featureCtaLink || ""} onChange={(e) => update("featureCtaLink", e.target.value)} placeholder="Enter custom URL (e.g. https://...)" />
                  )}
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
                          compressImage(file, (base64) => update("featureImage", base64));
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
                  <select 
                    value={isCustomLink(settings.solutionsCtaPrimaryLink) ? "custom" : (settings.solutionsCtaPrimaryLink || "#collections")} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "custom") {
                        update("solutionsCtaPrimaryLink", "");
                      } else {
                        update("solutionsCtaPrimaryLink", val);
                      }
                    }}
                    style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #dcdde1", marginBottom: (isCustomLink(settings.solutionsCtaPrimaryLink) || settings.solutionsCtaPrimaryLink === "") ? 8 : 0 }}
                  >
                    <option value="#collections">Homepage Must Haves Section (#collections)</option>
                    <option value="/products/">All Products Catalog (/products)</option>
                    <option value="/data-center-solutions">Data Center Solutions (/data-center-solutions)</option>
                    <option value="/support">Support Page (/support)</option>
                    <option value="custom">Custom URL...</option>
                  </select>
                  {(isCustomLink(settings.solutionsCtaPrimaryLink) || settings.solutionsCtaPrimaryLink === "") && (
                    <input value={settings.solutionsCtaPrimaryLink || ""} onChange={(e) => update("solutionsCtaPrimaryLink", e.target.value)} placeholder="Enter custom URL (e.g. https://...)" />
                  )}
                </label>
              </div>
              <div className="store-form-group">
                <label>
                  <span><Link2 size={16} /> Secondary CTA Button Link</span>
                  <select 
                    value={isCustomLink(settings.solutionsCtaSecondaryLink) ? "custom" : (settings.solutionsCtaSecondaryLink || "#collections")} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "custom") {
                        update("solutionsCtaSecondaryLink", "");
                      } else {
                        update("solutionsCtaSecondaryLink", val);
                      }
                    }}
                    style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #dcdde1", marginBottom: (isCustomLink(settings.solutionsCtaSecondaryLink) || settings.solutionsCtaSecondaryLink === "") ? 8 : 0 }}
                  >
                    <option value="#collections">Homepage Must Haves Section (#collections)</option>
                    <option value="/products/">All Products Catalog (/products)</option>
                    <option value="/data-center-solutions">Data Center Solutions (/data-center-solutions)</option>
                    <option value="/support">Support Page (/support)</option>
                    <option value="custom">Custom URL...</option>
                  </select>
                  {(isCustomLink(settings.solutionsCtaSecondaryLink) || settings.solutionsCtaSecondaryLink === "") && (
                    <input value={settings.solutionsCtaSecondaryLink || ""} onChange={(e) => update("solutionsCtaSecondaryLink", e.target.value)} placeholder="Enter custom URL (e.g. https://...)" />
                  )}
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
                          compressImage(file, (base64) => update("solutionsImage", base64));
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
