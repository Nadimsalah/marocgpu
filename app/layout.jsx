import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { SiteProvider } from "./context/SiteContext";
import CartDrawer from "./components/CartDrawer";

export const metadata = {
  title: "MarocGPU",
  description: "Powerful hardware, expert-built systems, and dependable local support across Morocco.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
