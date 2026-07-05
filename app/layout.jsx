import { Inter } from "next/font/google";
import InterceptorLoader from "./api-interceptor.js";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { SiteProvider } from "./context/SiteContext";
import CartDrawer from "./components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "MarocGPU | AI Computers & Data Center Infrastructure - MicroIntégral & NVIDIA Partner",
  description: "MarocGPU (division of MicroIntégral in partnership with NVIDIA) is Morocco's leading provider of AI hardware, data center infrastructure, and high-performance computing.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MarocGPU | AI Computers & Data Center Infrastructure",
    description: "Morocco's leading provider of AI hardware, data center infrastructure, and high-performance computing in partnership with NVIDIA by MicroIntégral.",
    url: "https://marocgpu.ma",
    siteName: "MarocGPU",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <InterceptorLoader />
        <SiteProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="floating-whatsapp"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="34" height="34">
                <circle cx="12" cy="12" r="12" fill="#25d366" />
                <path fill="#fff" d="M12.012 5.5c-3.58 0-6.5 2.92-6.5 6.51 0 1.25.36 2.43 1 3.44l-.66 2.41 2.47-.65c.97.56 2.09.87 3.25.87 3.58 0 6.5-2.92 6.5-6.51s-2.92-6.57-6.5-6.57zm3.74 9.15c-.16.44-.93.82-1.3 1.07-.33.22-.67.04-2.1-.51-1.83-.71-2.97-2.58-3.06-2.71-.09-.12-.75-.98-.75-1.88 0-.9.47-1.34.63-1.52.16-.18.45-.22.63-.22.14 0 .27 0 .39.01.13.01.3-.05.46.34.16.39.55 1.34.6 1.44.05.1.08.21.02.34-.06.13-.14.27-.28.42-.14.15-.29.26-.41.39-.13.14-.26.28-.11.54.15.26.67 1.11 1.44 1.8.99.89 1.82 1.16 2.08 1.29.26.13.41.11.56-.06.15-.17.65-.76.83-1.02.18-.26.35-.22.59-.14.24.09 1.53.72 1.79.85.26.13.44.19.5.3.06.11.06.66-.1.11z" />
              </svg>
            </a>
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
