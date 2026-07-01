import "./api-interceptor.js";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { SiteProvider } from "./context/SiteContext";
import CartDrawer from "./components/CartDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CURATED BY MAROCGPU - Shop These Must Haves</title>
        <meta name="description" content="Powerful hardware, expert-built systems, and dependable local support across Morocco." />
      </head>
      <body>
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
