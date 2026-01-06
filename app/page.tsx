"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type CartItem = {
  title: string
  price: number
  qty: number
}

const PRODUCTS = [
  {
    title: "17 Pro Max",
    price: 445.62,
    description:
      "A refined daily instrument — precision engineered for clarity, speed, and restraint.",
    image: "/17-pro-max.jpg",
  },
  {
    title: "AirPods Pro",
    price: 161.22,
    description:
      "Immersive sound sculpted for presence. Noise disappears. Atmosphere remains.",
    image: "/airpods-pro.jpg",
  },
  {
    title: "Max Headphones",
    price: 349.3,
    description:
      "Designed for long-form listening — weightless, balanced, intentional.",
    image: "/max-headphones.jpg",
  },
]

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const openCart = () => {
    setClosing(false)
    setCartOpen(true)
  }

  const closeCart = () => {
    setClosing(true)
    setTimeout(() => setCartOpen(false), 320)
  }

  const addToCart = (p: typeof PRODUCTS[number]) => {
    setCart((prev) => {
      const found = prev.find((i) => i.title === p.title)
      if (found)
        return prev.map((i) =>
          i.title === p.title ? { ...i, qty: i.qty + 1 } : i
        )
      return [...prev, { title: p.title, price: p.price, qty: 1 }]
    })
    openCart()
  }

  const updateQty = (title: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.title === title ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    )
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  const handleCheckout = () => {
    const VARIANT_MAP: Record<string, string> = {
      "17 Pro Max": "43818119364668",
      "AirPods Pro": "43817073770556",
      "Max Headphones": "43816270626876",
    }

    const lineItems = cart
      .map((i) => `${VARIANT_MAP[i.title]}:${i.qty}`)
      .join(",")

    window.location.href = `https://axiomchurch.myshopify.com/cart/${lineItems}`
  }

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          background: #000;
          color: white;
          font-family: serif;
        }

        .title-bar {
          background: #141414;
          padding: 40px 64px 60px;
          position: relative;
          margin-top: 28px;
        }

        .title-nav {
          position: absolute;
          top: 10px;
          left: 16px;
          display: flex;
          font-size: 13px;
          opacity: 0.85;
        }

        .title-nav span:not(:last-child)::after {
          content: "|";
          margin: 0 14px;
          opacity: 0.35;
        }

        .cart-link {
          position: absolute;
          top: 10px;
          right: 16px;
          font-size: 13px;
          cursor: pointer;
        }

        .cart-count {
          font-size: 10px;
          vertical-align: super;
          margin-left: 2px;
          opacity: 0.75;
        }

        .logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 6px;
        }

        .logo-spin {
          animation: spinY 6s linear infinite;
        }

        @keyframes spinY {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        .title-bar h1 {
          text-align: center;
          font-size: 44px;
          letter-spacing: 4px;
          font-weight: 500;
          margin-top: 6px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 340px);
          gap: 64px;
          justify-content: center;
          padding: 56px 0 120px;
        }

        .card {
          text-align: center;
          transition: transform 0.35s ease;
        }

        .card:hover {
          transform: translateY(-8px);
        }

        .card img {
          border-radius: 18px;
          width: 100%;
          height: auto;
        }

        .button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.75;
          margin-top: 16px;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 30;
          opacity: ${closing ? 0 : 1};
          transition: opacity 0.32s ease;
        }

        .cartPanel {
          position: fixed;
          right: 0;
          top: 0;
          width: 320px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.96);
          padding: 32px;
          z-index: 40;
          transform: translateX(${closing ? "100%" : "0"});
          transition: transform 0.32s ease;
        }

        .cart-close {
          display: none;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.7;
          margin-bottom: 8px;
          text-align: right;
        }

        footer {
          position: fixed;
          bottom: 20px;
          right: 24px;
          font-size: 12px;
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .products {
            grid-template-columns: 1fr;
            padding: 40px 20px 140px;
          }

          .cartPanel {
            width: 100%;
          }

          .cart-close {
            display: block;
          }
        }
      `}</style>

      <section className="title-bar">
        <nav className="title-nav">
          <span>Home</span>
          <span>Products</span>
          <span>Contact</span>
        </nav>

        <div className="cart-link" onClick={openCart}>
          Cart{itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </div>

        <div className="logo-wrap">
          <div className="logo-spin">
            <Image src="/logo.png" alt="Logo" width={52} height={52} />
          </div>
        </div>

        <h1>𝕾𝖞𝖓𝖙𝖍𝖊𝖘𝖎𝖘 𝕿𝖜𝖔</h1>
      </section>

      <main className="products">
        {PRODUCTS.map((p) => (
          <div className="card" key={p.title}>
            <Image src={p.image} alt={p.title} width={340} height={340} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>${p.price.toFixed(2)}</p>
            <button className="button" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      <footer>
        For any questions or inquiries email axiomsynthesis@gmail.com
      </footer>

      {cartOpen && (
        <>
          <div className="overlay" onClick={closeCart} />
          <div className="cartPanel">
            <div className="cart-close" onClick={closeCart}>
              ✕
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Cart</h3>
              {cart.length > 0 && (
                <span
                  onClick={() => setCart([])}
                  style={{ cursor: "pointer", opacity: 0.6 }}
                >
                  Clear
                </span>
              )}
            </div>

            {cart.map((i) => (
              <div key={i.title} style={{ marginTop: 18 }}>
                <div>{i.title}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 14,
                    marginTop: 6,
                  }}
                >
                  <span onClick={() => updateQty(i.title, -1)}>−</span>
                  <span>{i.qty}</span>
                  <span onClick={() => updateQty(i.title, 1)}>+</span>
                </div>
              </div>
            ))}

            {cart.length > 0 && (
              <>
                <p style={{ marginTop: 24 }}>
                  Total: ${total.toFixed(2)}
                </p>
                <button
                  onClick={handleCheckout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    marginTop: 14,
                    opacity: 0.85,
                  }}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
