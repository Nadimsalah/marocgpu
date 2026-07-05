"use client";

import { createContext, useContext, useEffect, useState } from "react";

const frTranslations = {
  // Navigation & Headers
  "Consumer": "Grand Public",
  "Professional": "Professionnel",
  "Data Center Solutions": "Solutions Data Center",
  "Support": "Support",
  "Featured": "En vedette",
  "AI PCs": "PC IA",
  "Top Rated Laptops": "Laptops Mieux Notés",
  "Gaming Laptops": "Laptops de Jeu",
  "Mechanical Keyboards": "Claviers Mécaniques",
  "Precision Mice": "Souris de Précision",
  "Studio Audio": "Audio de Studio",
  "Gaming Displays": "Écrans de Jeu",
  "Equipment": "Équipements",
  "Delivery": "Méthodologie",
  "Contact": "Contact",
  "Explore Products": "Explorer les produits",
  "Plan your AI Data Center": "Planifier votre Data Center IA",
  "Back to home": "Retour à l'accueil",
  "MarocGPU catalog": "Catalogue MarocGPU",
  "Find your next machine.": "Trouvez votre prochaine machine.",
  "Purpose-built hardware for work, play, and everything you are creating next.": "Matériel conçu pour le travail, le jeu et tout ce que vous créerez ensuite.",
  "Search products": "Rechercher des produits",
  "products": "produits",
  "Sort": "Trier",
  "Price: low to high": "Prix : croissant",
  "Price: high to low": "Prix : décroissant",
  "Name": "Nom",
  "No products found": "Aucun produit trouvé",
  "Try another category or a shorter search.": "Essayez une autre catégorie ou une recherche plus courte.",
  "Clear filters": "Réinitialiser les filtres",
  "All": "Tout",
  "Home": "Accueil",
  "Products": "Produits",
  "All products": "Tous les produits",
  "Quantity": "Quantité",
  "Inquire Availability": "Demander la disponibilité",
  "Datasheet PDF": "Fiche technique PDF",
  "Free delivery across Morocco": "Livraison gratuite partout au Maroc",
  "2-year official warranty": "Garantie officielle de 2 ans",
  "30-day returns": "Retour sous 30 jours",
  "Related products": "Produits connexes",
  "Casablanca, Morocco": "Casablanca, Maroc",
  "Availability Inquiry": "Demande de disponibilité",
  "For:": "Pour :",
  "Inquiry Submitted!": "Demande soumise !",
  "Done": "Terminé",
  "Full Name": "Nom complet",
  "Email Address": "Adresse e-mail",
  "WhatsApp or Phone Number": "Numéro WhatsApp ou de téléphone",
  "Message": "Message",
  "Submitting...": "Envoi en cours...",
  "Send Inquiry Request": "Envoyer la demande",
  "Search products, categories, brands...": "Rechercher des produits, catégories, marques...",
  "Start typing to search our catalog": "Commencez à saisir pour rechercher dans notre catalogue",
  "No results for": "Aucun résultat pour",
  "Try a different search term or browse categories": "Essayez un autre mot-clé ou parcourez les catégories",
  "result": "résultat",
  "results": "résultats",
  "View all products": "Voir tous les produits",
  "item": "article",
  "items": "articles",
  "Your cart is empty": "Votre panier est vide",
  "Shipping": "Livraison",
  "Free": "Gratuit",
  "Go to checkout": "Passer à la caisse",
  "View full cart": "Voir le panier complet",
  "Help topics": "Sujets d'aide",
  "Get help": "Obtenir de l'aide",
  "MarocGPU support": "Support MarocGPU",
  "We're here to help.": "Nous sommes là pour vous aider.",
  "Find answers, manage your order, or reach out to our local support team across Morocco.": "Trouvez des réponses, gérez votre commande ou contactez notre équipe d'assistance locale partout au Maroc.",
  "Contact support": "Contacter le support",
  "Browse FAQs": "Parcourir la FAQ",
  "24/7": "24h/24 & 7j/7",
  "Self-service help center": "Centre d'aide en libre-service",
  "WhatsApp": "WhatsApp",
  "Fast response": "Réponse rapide",
  "Get support your way.": "Obtenez de l'aide à votre façon.",
  "Choose the fastest path to the answer or service you need.": "Choisissez le chemin le plus rapide pour obtenir la réponse ou le service dont vous avez besoin.",
  "Learn more": "En savoir plus",
  "Common questions": "Questions courantes",
  "Frequently asked questions.": "Questions fréquemment posées.",
  "Talk to a real person.": "Parler à un conseiller.",
  "Whether you need pre-sales advice, order help, or technical support, our team is ready to assist.": "Que vous ayez besoin de conseils avant-vente, d'aide pour une commande ou d'assistance technique, notre équipe est prête à vous aider.",
  "Message sent": "Message envoyé",
  "Thanks for reaching out. Our support team will get back to you shortly.": "Merci de nous avoir contactés. Notre équipe d'assistance vous répondra sous peu.",
  "Send another message": "Envoyer un autre message",
  "Name": "Nom",
  "Your name": "Votre nom",
  "Email": "E-mail",
  "Subject": "Sujet",
  "Select a topic": "Sélectionnez un sujet",
  "Order & delivery": "Commande & livraison",
  "Technical support": "Assistance technique",
  "Business quote": "Devis professionnel",
  "Other": "Autre",
  "Tell us how we can help...": "Dites-nous comment nous pouvons vous aider...",
  "Send message": "Envoyer le message",
  "Prefer WhatsApp?": "Vous préférez WhatsApp ?",
  "Message us for quick replies on orders, stock, and support.": "Écrivez-nous pour des réponses rapides sur les commandes, le stock et l'assistance.",
  "Chat on WhatsApp": "Discuter sur WhatsApp",
  "FAQs": "FAQ",
  "Quick answers to ordering, shipping, returns, and account questions.": "Réponses rapides aux questions sur les commandes, les livraisons, les retours et les comptes.",
  "Warranty & repairs": "Garantie & réparations",
  "Check coverage, start a claim, or arrange service for your hardware.": "Vérifiez la couverture, lancez une réclamation ou organisez un entretien pour votre matériel.",
  "Returns & exchanges": "Retours & échanges",
  "Simple steps to return or exchange a product within policy windows.": "Étapes simples pour retourner ou échanger un produit dans les délais de politique.",
  "Track an order": "Suivre une commande",
  "Follow your shipment status and estimated delivery date.": "Suivez le statut de votre colis et la date de livraison estimée.",
  "Phone support": "Assistance téléphonique",
  "Mon–Sat, 9am–7pm": "Lun–Sam, 9h–19h",
  "Email us": "Écrivez-nous",
  "Reply within 24 hours": "Réponse sous 24 heures",
  "Visit us": "Nous rendre visite",
  "Showroom & service center": "Showroom & centre de service",
  "What payment methods do you accept?": "Quels modes de paiement acceptez-vous ?",
  "We accept cash on delivery, bank transfer, and major credit cards. Business customers can also request invoice-based payment with approved credit terms.": "Nous acceptons le paiement à la livraison, le virement bancaire et les cartes de crédit principales. Les clients professionnels peuvent également demander un paiement sur facture sous réserve d'approbation.",
  "How long does delivery take?": "Combien de temps prend la livraison ?",
  "Most orders in Casablanca, Rabat, and Marrakech arrive within 1–2 business days. Other Moroccan cities typically receive deliveries within 2–5 business days.": "La plupart des commandes à Casablanca, Rabat et Marrakech arrivent sous 1 à 2 jours ouvrables. Les autres villes marocaines reçoivent généralement leurs livraisons sous 2 à 5 jours ouvrables.",
  "Do your products come with a warranty?": "Vos produits sont-ils sous garantie ?",
  "Yes. All new products include the manufacturer's warranty, and custom builds from MarocGPU include a hardware warranty plus technical support.": "Oui. Tous les nouveaux produits incluent la garantie du fabricant, et les configurations sur mesure MarocGPU incluent une garantie matérielle plus l'assistance technique.",
  "Can I return or exchange a product?": "Puis-je retourner ou échanger un produit ?",
  "You can return unused products in original packaging within 14 days of delivery. Custom-built systems and opened software are non-refundable unless defective.": "Vous pouvez retourner les produits non utilisés dans leur emballage d'origine sous 14 jours après livraison. Les systèmes sur mesure et les logiciels ouverts ne sont pas remboursables, sauf s'ils sont défectueux.",
  "Do you offer setup or installation support?": "Proposez-vous une assistance pour l'installation ?",
  "Yes. We provide setup guidance, remote support, and on-site installation options for workstations, servers, and data center equipment.": "Oui. Nous fournissons des conseils de configuration, une assistance à distance et des options d'installation sur site pour les stations de travail, les serveurs et les équipements de centres de données.",
  "How do I track my order?": "Comment puis-je suivre ma commande ?",
  "Once your order ships, you will receive an email or WhatsApp message with a tracking number and estimated delivery window.": "Dès l'expédition de votre commande, vous recevrez un e-mail ou un message WhatsApp contenant un numéro de suivi et une estimation du délai de livraison.",
  "Loading cart...": "Chargement du panier...",
  "Add some products before checking out.": "Ajoutez des produits avant de commander.",
  "Browse products": "Parcourir les produits",
  "Order confirmed!": "Commande confirmée !",
  "Back to cart": "Retour au panier",
  "Complete your order": "Finaliser votre commande",
  "Shipping information": "Informations de livraison",
  "First name": "Prénom",
  "Last name": "Nom de famille",
  "Address": "Adresse",
  "Postal code": "Code postal",
  "Review order": "Vérifier la commande",
  "Review your order": "Vérifier votre commande",
  "Shipping to": "Livraison à",
  "Place order": "Passer la commande",
  "Order summary": "Résumé de la commande",
  "Free delivery over 5,000 MAD": "Livraison gratuite dès 5 000 MAD",
  "Secure checkout": "Paiement sécurisé",
  "Order number": "Numéro de commande",
  "Continue shopping": "Continuer vos achats",
  "Looks like you haven't added anything yet. Browse our catalog and find your next machine.": "Il semble que vous n'ayez encore rien ajouté. Parcourez notre catalogue pour trouver votre prochaine machine.",
  "Your cart": "Votre panier",
  "in your cart": "dans votre panier",
  "Promo code (try MAROC10)": "Code promo (essayez MAROC10)",
  "Applied": "Appliqué",
  "Apply": "Appliquer",
  "Proceed to checkout": "Passer la commande",
  "each": "l'unité",

  // Hero Section
  "Morocco's AI & Data Center Revolution": "La révolution de l'IA & des Data Centers au Maroc",
  "We engineer, supply, and support NVIDIA AI GPU clusters, enterprise data center solutions, and high-performance computers backed by MicroIntégral.": "Nous concevons, fournissons et supportons des clusters GPU d'IA NVIDIA, des solutions de centres de données d'entreprise et des ordinateurs haute performance, soutenus par MicroIntégral.",
  "Explore AI & PC Solutions": "Découvrir nos solutions IA & PC",
  "High-performance computing and data center infrastructure, engineered in partnership with NVIDIA by MicroIntégral in Morocco.": "Infrastructure de calcul haute performance et de centres de données, conçue en partenariat avec NVIDIA par MicroIntégral au Maroc.",

  // Product List (Must Haves)
  "CURATED BY MAROCGPU": "SÉLECTIONNÉ PAR MAROCGPU",
  "Shop These Must Haves": "Nos produits incontournables",
  "essentials for your setup": "essentiels pour votre configuration",
  "In stock": "En stock",
  "Out of stock": "Rupture de stock",
  "Inquire": "Demande d'info",
  "Add to cart": "Ajouter au panier",
  "In cart": "Dans le panier",
  "Load more products": "Charger plus de produits",
  "What are you looking for?": "Que recherchez-vous ?",

  // Feature Story Section
  "AI & DEEP LEARNING SYSTEMS": "SYSTÈMES D'IA & DEEP LEARNING",
  "Accelerate your workloads with NVIDIA partnership.": "Accélérez vos charges de travail avec le partenariat NVIDIA.",
  "As a division of MicroIntégral, MarocGPU brings state-of-the-art AI workstations, GPUs, and high-performance computers directly to Morocco's engineers, researchers, and enterprises.": "En tant que division de MicroIntégral, MarocGPU apporte des stations de travail d'IA, des GPU et des ordinateurs haute performance de pointe directement aux ingénieurs, chercheurs et entreprises du Maroc.",
  "Explore AI Workstations": "Explorer les stations IA",
  "Built smarter": "Conçu plus intelligemment",
  "Expert guidance from first part to final setup.": "Conseils d'experts de la première pièce à la configuration finale.",

  // Solutions Section
  "ENTERPRISE DATA CENTER SOLUTIONS": "SOLUTIONS DATA CENTER D'ENTREPRISE",
  "End-to-End Infrastructure by MicroIntégral & NVIDIA": "Infrastructure de bout en bout par MicroIntégral & NVIDIA",
  "From scalable server racks to customized AI clusters, we design, deploy, and maintain robust data center infrastructures with local expert support and guaranteed performance.": "Des baies de serveurs évolutives aux clusters d'IA sur mesure, nous concevons, déployons et maintenons des infrastructures de centres de données robustes avec un support d'experts locaux.",
  "Inquire Data Center Solutions": "Solutions Data Center",
  "Consult an Expert": "Consulter un expert",
  "Performance": "Performance",
  "System health": "Santé système",
  "Support status": "Statut du support",
  "Live": "En ligne",
  "All systems running smoothly": "Tous les systèmes fonctionnent correctement",
  "Live overview": "Aperçu en direct",

  // Data Center Page
  "MarocGPU & MicroIntégral in partnership with NVIDIA": "MarocGPU & MicroIntégral en partenariat avec NVIDIA",
  "Next-Generation AI & Data Center Infrastructure.": "Infrastructure IA & Data Center de nouvelle génération.",
  "We engineer, supply, deploy, and support complete enterprise data center environments, GPU computing clusters, and high-performance AI networks backed by MicroIntégral's leading expertise.": "Nous concevons, fournissons, déployons et supportons des environnements complets de centres de données d'entreprise, des clusters GPU d'IA et des réseaux IA haute performance.",
  "Start your AI project": "Démarrer votre projet IA",
  "Explore solutions": "Explorer les solutions",
  "NVIDIA Partner": "Partenaire NVIDIA",
  "Advanced GPU computing": "Calcul GPU avancé",
  "MicroIntégral": "MicroIntégral",
  "Leading local support": "Support local de premier plan",
  "End-to-End": "De bout en bout",
  "Design, deploy & operate": "Concevoir, déployer & exploiter",
  "Built for AI & Enterprise Workloads": "Conçu pour l'IA & les charges d'entreprise",
  "Infrastructure that arrives ready for deep learning.": "Une infrastructure prête pour le deep learning.",
  "We provide every major equipment layer required to build or modernize a secure, efficient data center optimized for high-density NVIDIA GPUs and heavy compute operations.": "Nous fournissons chaque couche d'équipement requise pour construire ou moderniser un centre de données sécurisé et optimisé pour les GPU NVIDIA haute densité.",
  "Official NVIDIA GPU & server systems": "Systèmes officiels de serveurs & GPU NVIDIA",
  "Complete installation and thermal optimization": "Installation complète et optimisation thermique",
  "Full maintenance, warranty, and MicroIntégral support": "Maintenance complète, garantie et support MicroIntégral",
  "Complete computing portfolio": "Portefeuille informatique complet",
  "AI, Compute & Power. Engineered together.": "IA, Calcul & Énergie. Conçus ensemble.",
  "One cohesive architecture across IT servers, GPU nodes, high-speed InfiniBand switches, and backup cooling systems.": "Une architecture cohérente sur les serveurs, les nœuds GPU, les commutateurs InfiniBand et les systèmes de refroidissement.",
  "MicroIntégral AI Orchestration": "Orchestration IA par MicroIntégral",
  "Optimized for NVIDIA AI & HPC Workloads.": "Optimisé pour les charges d'IA & HPC NVIDIA.",
  "We integrate advanced cooling infrastructure with GPU cluster monitoring, ensuring your AI training models and high-performance server clusters operate at peak efficiency.": "Nous intégrons une infrastructure de refroidissement avancée avec un suivi des clusters GPU pour une efficacité maximale de vos modèles d'IA.",
  "Design the compute layer": "Concevoir la couche de calcul",
  "Deployment methodology": "Méthodologie de déploiement",
  "Let’s design your NVIDIA AI Data Center.": "Concevons votre Data Center d'IA NVIDIA.",
  "Tell us your computing capacity, location, and timeline. Our infrastructure engineering team will shape the equipment and delivery plan.": "Indiquez-nous votre capacité de calcul, emplacement et calendrier. Notre équipe d'ingénierie concevra votre plan d'équipement.",
  "Contact infrastructure team": "Contacter l'équipe d'infrastructure",
  "Designed uptime": "Disponibilité conçue",
  "Compute & storage": "Calcul & Stockage",
  "Network fabric": "Réseau & Switchs",
  "Power continuity": "Énergie & Onduleurs",
  "Precision cooling": "Refroidissement de précision",
  "Racks & cabling": "Baies & Câblage",
  "Physical security": "Sécurité physique",

  // Cart & Checkout
  "Cart": "Panier",
  "Your Cart": "Votre Panier",
  "Subtotal": "Sous-total",
  "Checkout": "Passer commande",
  "Order Summary": "Résumé de la commande",
  "Shipping Details": "Détails de livraison",
  "Full Name": "Nom complet",
  "Email Address": "Adresse e-mail",
  "Phone Number": "Numéro de téléphone",
  "City": "Ville",
  "Shipping Address": "Adresse de livraison",
  "Place Order": "Passer la commande",
  "Order Status": "Statut de la commande",
  "Payment Method": "Mode de paiement",
  "Cash on Delivery": "Paiement à la livraison",
  "Success": "Succès",

  // Footer & General
  "Products": "Produits",
  "Resources": "Ressources",
  "Company": "Société",
  "About us": "À propos",
  "Careers": "Carrières",
  "Contact us": "Contactez-nous",
  "Support center": "Centre de support",
  "Warranty": "Garantie",
  "Delivery & returns": "Livraison & retours",
  "All rights reserved.": "Tous droits réservés."
};

const defaults = {
  logo: "/marocgpu-logo.svg",
  siteName: "MarocGPU",
  tagline: "High-performance computing and data center infrastructure, engineered in partnership with NVIDIA by MicroIntégral in Morocco.",
  heroTitle: "Morocco's AI & Data Center Revolution",
  heroSubtitle: "We engineer, supply, and support NVIDIA AI GPU clusters, enterprise data center solutions, and high-performance computers backed by MicroIntégral.",
  heroCta: "Explore AI & PC Solutions",
  navItems: ["Consumer", "Professional", "Data Center Solutions", "Support"],
  footerColumns: [
    { title: "Products", links: ["Gaming PCs", "Workstations", "Laptops", "Components", "Accessories"] },
    { title: "Resources", links: ["Build guides", "Support center", "Warranty", "Delivery & returns", "Community"] },
    { title: "Company", links: ["About us", "Careers", "Data Center Solutions", "Contact", "Our showroom"] },
  ],
  footerBottom: "© 2026 MarocGPU. All rights reserved.",
  heroIcons: ["google", "apple", "microsoft", "figma", "github", "slack", "notion", "vercel", "stripe", "discord", "x", "spotify"],
  customIcons: {},
  megaMenus: {
    Consumer: {
      label: "Consumer PCs",
      links: ["Featured", "AI PCs", "Top Rated Laptops", "Gaming Laptops"],
      cards: [
        { title: "Laptops for Home", image: "" },
        { title: "Laptops for Work", image: "" },
        { title: "Mobile Workstations", image: "" },
        { title: "Laptops for Gaming", image: "" },
      ],
    },
    Professional: {
      label: "Professional Systems",
      links: ["Featured", "Custom Builds", "Gaming PCs", "Workstations"],
      cards: [
        { title: "Creator Workstations", image: "" },
        { title: "Gaming Desktops", image: "" },
        { title: "Office PCs", image: "" },
        { title: "Compact Systems", image: "" },
      ],
    },
  },
  featureKicker: "AI & DEEP LEARNING SYSTEMS",
  featureTitle: "Accelerate your workloads with NVIDIA partnership.",
  featureDescription: "As a division of MicroIntégral, MarocGPU brings state-of-the-art AI workstations, GPUs, and high-performance computers directly to Morocco's engineers, researchers, and enterprises.",
  featureCta: "Explore AI Workstations",
  featureImage: "",
  featureCtaLink: "#collections",
  solutionsKicker: "ENTERPRISE DATA CENTER SOLUTIONS",
  solutionsTitle: "End-to-End Infrastructure by MicroIntégral & NVIDIA",
  solutionsDescription: "From scalable server racks to customized AI clusters, we design, deploy, and maintain robust data center infrastructures with local expert support and guaranteed performance.",
  solutionsCtaPrimary: "Inquire Data Center Solutions",
  solutionsCtaSecondary: "Consult an Expert",
  solutionsImage: "",
  solutionsCtaPrimaryLink: "#collections",
  solutionsCtaSecondaryLink: "#collections",
};

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaults);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("marocgpu_lang");
      if (savedLang) {
        setLanguage(savedLang);
      }
    } catch {}

    const loadSettings = async () => {
      let localData = null;
      try {
        const stored = localStorage.getItem("marocgpu_settings");
        if (stored) {
          localData = JSON.parse(stored);
          const nextLocal = { ...defaults, ...localData };
          if (
            !nextLocal.tagline ||
            nextLocal.tagline.includes("Powerful hardware, expert-built") ||
            nextLocal.tagline.includes("Powerfull hardware") ||
            (nextLocal.heroTitle && nextLocal.heroTitle.includes("New Era of Performance"))
          ) {
            nextLocal.tagline = defaults.tagline;
            nextLocal.heroTitle = defaults.heroTitle;
            nextLocal.heroSubtitle = defaults.heroSubtitle;
            nextLocal.heroCta = defaults.heroCta;
            nextLocal.featureKicker = defaults.featureKicker;
            nextLocal.featureTitle = defaults.featureTitle;
            nextLocal.featureDescription = defaults.featureDescription;
            nextLocal.featureCta = defaults.featureCta;
            nextLocal.solutionsKicker = defaults.solutionsKicker;
            nextLocal.solutionsTitle = defaults.solutionsTitle;
            nextLocal.solutionsDescription = defaults.solutionsDescription;
            nextLocal.solutionsCtaPrimary = defaults.solutionsCtaPrimary;
            nextLocal.solutionsCtaSecondary = defaults.solutionsCtaSecondary;
            localStorage.setItem("marocgpu_settings", JSON.stringify(nextLocal));
          }
          setSettings(nextLocal);
        }
      } catch (e) {
        console.error("Local storage read error:", e);
      }

      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const dbSettings = await res.json();
          if (dbSettings && Object.keys(dbSettings).length > 0) {
            const next = { ...defaults, ...dbSettings };
            let updated = false;

            // Auto-migrate old Unsplash images
            if (next.megaMenus) {
              Object.keys(next.megaMenus).forEach(k => {
                if (next.megaMenus[k]?.cards) {
                  next.megaMenus[k].cards = next.megaMenus[k].cards.map(c => {
                    if (c.image && c.image.includes("unsplash.com")) {
                      updated = true;
                      return { ...c, image: "" };
                    }
                    return c;
                  });
                }
              });
            }

            // Auto-migrate old text copies
            if (
              !next.tagline ||
              next.tagline.includes("Powerful hardware, expert-built") ||
              next.tagline.includes("Powerfull hardware")
            ) {
              next.tagline = defaults.tagline;
              updated = true;
            }
            if (!next.heroTitle || next.heroTitle.includes("New Era of Performance")) {
              next.heroTitle = defaults.heroTitle;
              updated = true;
            }
            if (!next.heroSubtitle || next.heroSubtitle.includes("shaping Morocco's digital future")) {
              next.heroSubtitle = defaults.heroSubtitle;
              updated = true;
            }
            if (!next.heroCta || next.heroCta.includes("Explore MarocGPU")) {
              next.heroCta = defaults.heroCta;
              updated = true;
            }
            if (!next.featureTitle || next.featureTitle.includes("When performance stops")) {
              next.featureKicker = defaults.featureKicker;
              next.featureTitle = defaults.featureTitle;
              next.featureDescription = defaults.featureDescription;
              next.featureCta = defaults.featureCta;
              updated = true;
            }
            if (!next.solutionsTitle || next.solutionsTitle.includes("Shift IT from")) {
              next.solutionsKicker = defaults.solutionsKicker;
              next.solutionsTitle = defaults.solutionsTitle;
              next.solutionsDescription = defaults.solutionsDescription;
              next.solutionsCtaPrimary = defaults.solutionsCtaPrimary;
              next.solutionsCtaSecondary = defaults.solutionsCtaSecondary;
              updated = true;
            }

            if (updated) {
              fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(next)
              }).catch(() => {});
            }
            
            setSettings(next);
            try {
              localStorage.setItem("marocgpu_settings", JSON.stringify(next));
            } catch {}
          }
        }
      } catch (err) {
        console.error("Failed to load settings from Supabase, using localStorage cache:", err);
      }
    };

    loadSettings();
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem("marocgpu_lang", lang);
    } catch {}
  };

  const t = (text) => {
    if (language === "en" || !text) return text;
    const tr = frTranslations[text];
    if (tr) return tr;
    const trimmed = text.trim();
    const trTrimmed = frTranslations[trimmed];
    if (trTrimmed) return text.replace(trimmed, trTrimmed);
    return text;
  };

  const updateSettings = (updates) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("marocgpu_settings", JSON.stringify(next));
      } catch {}

      // Persist to Supabase database in the background
      fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next)
      }).catch(err => console.error("Error saving settings to Supabase:", err));

      return next;
    });
  };

  return (
    <SiteContext.Provider value={{ settings, updateSettings, defaults, language, changeLanguage, t }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
