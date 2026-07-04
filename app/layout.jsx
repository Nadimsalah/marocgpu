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
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
