"use client"

import { createContext, useContext, useState } from "react"

type CartItem = {
  title: string
  price: number
  qty: number
}

type CartContextType = {
  cart: CartItem[]
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  addToCart: (item: Omit<CartItem, "qty">) => void
  updateQty: (title: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.title === item.title)
      if (existing) {
        return prev.map((p) =>
          p.title === item.title ? { ...p, qty: p.qty + 1 } : p
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (title: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.title === title ? { ...p, qty: Math.max(1, qty) } : p
        )
        .filter((p) => p.qty > 0)
    )
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, setCartOpen, addToCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
