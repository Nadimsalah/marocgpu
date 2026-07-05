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
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.875-6.959-1.856-1.859-4.331-2.88-6.967-2.882-5.439 0-9.865 4.42-9.867 9.865-.001 1.73.454 3.42 1.32 4.933l-.994 3.635 3.718-.974zm12.015-6.721c-.33-.165-1.951-.963-2.253-1.073-.303-.11-.522-.165-.742.165-.22.33-.852 1.073-1.045 1.293-.193.22-.385.247-.715.082-1.393-.698-2.42-1.22-3.39-2.879-.258-.44.258-.41.74-.1.432-.823.165-1.539.082-1.705-.082-.165-.742-1.786-1.018-2.446-.268-.645-.544-.558-.742-.568l-.632-.01c-.22 0-.577.082-.88.411-.303.33-1.155 1.127-1.155 2.748 0 1.62 1.182 3.19 1.346 3.41.165.22 2.327 3.553 5.637 4.982.787.34 1.4.544 1.88.7.79.25 1.512.215 2.08.13.634-.095 1.951-.798 2.227-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z" />
              </svg>
            </a>
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
