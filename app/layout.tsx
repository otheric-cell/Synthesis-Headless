import "./globals.css"
import { CartProvider } from "./components/CartProvider"
import type { Viewport } from "next"

export const generateViewport = (): Viewport => ({
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
})

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
