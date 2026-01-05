import "./globals.css"
import { CartProvider } from "./components/CartProvider"

export const metadata = {
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
