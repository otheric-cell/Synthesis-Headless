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
    stock: 10,
  },
  {
    title: "AirPods Pro",
    price: 161.22,
    description:
      "Immersive sound sculpted for presence. Noise disappears. Atmosphere remains.",
    image: "/airpods-pro.jpg",
    stock: 10,
  },
  {
    title: "Max Headphones",
    price: 349.30,
    description:
      "Designed for long-form listening — weightless, balanced, intentional.",
    image: "/max-headphones.jpg",
    stock: 10,
  },
]

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart")
      if (saved) setCart(JSON.parse(saved))
    } catch {
      localStorage.removeItem("cart")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (p: typeof PRODUCTS[number]) => {
    if (p.stock === 0) return

    setCart((prev) => {
      const found = prev.find((i) => i.title === p.title)
      if (found)
        return prev.map((i) =>
          i.title === p.title ? { ...i, qty: i.qty + 1 } : i
        )
      return [...prev, { title: p.title, price: p.price, qty: 1 }]
    })

    setCartOpen(true)
    setClosing(false)
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

  const closeCart = () => {
    setClosing(true)
    setTimeout(() => setCartOpen(false), 300)
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const itemCount = cart.reduce((s, i) => s + i.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return

    const VARIANT_MAP: Record<string, string> = {
      "17 Pro Max": "43818119364668",
      "AirPods Pro": "43817073770556",
      "Max Headphones": "43816270626876",
    }

    const lineItems = cart
      .map((item) => {
        const variantId = VARIANT_MAP[item.title]
        return variantId ? `${variantId}:${item.qty}` : null
      })
      .filter(Boolean)
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

        body {
          background: radial-gradient(
            circle at top,
            #1a1a1a 0%,
            #0d0d0d 40%,
            #000000 100%
          );
          color: white;
          font-family: serif;
        }

        header {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .brand {
          position: absolute;
          left: 40px;
        }

        nav {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          padding: 10px 22px;
          display: flex;
          gap: 18px;
          font-size: 14px;
        }

        nav span:not(:last-child)::after {
          content: "|";
          margin-left: 18px;
          opacity: 0.3;
        }

        .cartIcon {
          position: absolute;
          right: 40px;
          cursor: pointer;
        }

        /* ✅ ONLY CHANGE IS HERE */
        .site-title {
  margin-top: 160px; /* keep this as-is */
  text-align: center;
  font-size: 36px;
  letter-spacing: 1.5px;

  position: relative;
  top: 40px; /* 👈 moves ONLY the title down */
}
        .products {
          margin: 120px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 320px);
          gap: 60px;
          justify-content: center;
        }

        .card {
          text-align: center;
          transition: transform 0.4s ease;
        }

        .card:hover {
          transform: translateY(-6px);
        }

        .imageWrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .button {
          margin-top: 18px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.85;
        }

        .button:hover {
          opacity: 1;
        }

        footer {
          position: fixed;
          bottom: 20px;
          right: 30px;
          font-size: 12px;
          opacity: 0.6;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 30;
        }

        .cartPanel {
          position: fixed;
          right: 0;
          top: 0;
          width: 320px;
          height: 100vh;
          background: rgba(0, 0, 0, 0.96);
          padding: 28px;
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .products {
            grid-template-columns: 1fr;
            gap: 48px;
            margin-top: 80px;
            padding: 0 20px;
          }

          footer {
            display: none;
          }
        }
      `}</style>

      <header>
        <div className="brand">
          <Image src="/logo.png" alt="Logo" width={44} height={44} />
        </div>

        <nav>
          <span>Home</span>
          <span>Products</span>
          <span>Contact</span>
        </nav>

        <div className="cartIcon" onClick={() => setCartOpen(true)}>
          🛒 {itemCount}
        </div>
      </header>

      <h1 className="site-title">Synthesis Two</h1>

      <main className="products">
        {PRODUCTS.map((p) => (
          <div className="card" key={p.title}>
            <div className="imageWrap">
              <Image src={p.image} alt={p.title} width={320} height={320} />
            </div>

            <h3>{p.title}</h3>
            <p style={{ opacity: 0.75, marginTop: 8 }}>{p.description}</p>
            <p style={{ marginTop: 10, fontWeight: 500 }}>
              ${p.price.toFixed(2)}
            </p>

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
            <h3>Cart</h3>

            {cart.map((i) => (
              <div key={i.title}>
                {i.title}
                <button onClick={() => updateQty(i.title, -1)}>−</button>
                {i.qty}
                <button onClick={() => updateQty(i.title, 1)}>+</button>
              </div>
            ))}

            <p>Total: ${total.toFixed(2)}</p>

            <button onClick={handleCheckout}>Checkout →</button>
          </div>
        </>
      )}
    </>
  )
}
