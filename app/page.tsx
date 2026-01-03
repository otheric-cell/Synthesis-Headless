'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, RoundedBox } from '@react-three/drei'

function ProductModel() {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <RoundedBox
        args={[1.6, 0.45, 1]}
        radius={0.15}
        smoothness={6}
        rotation={[0.1, 0.3, 0]}
      >
        <meshPhysicalMaterial
          color="#e5e5e5"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
    </Float>
  )
}



export default function Page() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
<Canvas camera={{ position: [0, 1.6, 3.8], fov: 42 }}>
  <ambientLight intensity={0.5} />
  <directionalLight position={[4, 6, 4]} intensity={1} />
  <directionalLight position={[-4, -2, -4]} intensity={0.4} />
  <ProductModel />
  <OrbitControls
    enableZoom={false}
    enablePan={false}
    minPolarAngle={Math.PI / 2.3}
    maxPolarAngle={Math.PI / 2.1}
  />
</Canvas>


        <div style={styles.heroText}>
          <h1 style={styles.title}>Designed. Powerful. Simple.</h1>
          <p style={styles.subtitle}>
            Premium tech. Minimal experience.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={styles.products}>
        {products.map((p) => (
          <div key={p.name} style={styles.card}>
            <h2 style={styles.cardTitle}>{p.name}</h2>
            <p style={styles.cardDesc}>{p.desc}</p>
            <p style={styles.price}>{p.price}</p>
<button
  style={styles.button}
  onClick={() => window.open(p.url, '_blank')}
>
  Buy
</button>
          </div>
        ))}
      </section>
    </main>
  )
}

const products = [
  {
    name: 'Pro Max Smartphone',
    desc: 'Premium smartphone featuring a large display and advanced performance.',
    price: '$1,299',
    url: 'https://axiomchurch.myshopify.com/products/17-pro-max',
  },
  {
    name: 'Wireless Over-Ear Headphones',
    desc: 'Immersive sound with a comfortable over-ear design.',
    price: '$549',
    url: 'https://axiomchurch.myshopify.com/products/wireless-sport-bluetooth-headphones-with-in-ear-detect-function',
  },
  {
    name: 'Wireless Earbuds',
    desc: 'Compact wireless earbuds with active noise cancellation.',
    price: '$199',
    url: 'https://axiomchurch.myshopify.com/products/bestpods-third-generation-bluetooth-earphones-with-anc',
  },
]

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    background: '#000',
    color: '#fff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
  },
  hero: {
    height: '70vh',
    position: 'relative',
  },
  heroText: {
    position: 'absolute',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    maxWidth: '600px',
  },
title: {
  fontSize: '3.2rem',
  fontWeight: 500,
  letterSpacing: '-0.03em',
  marginBottom: '16px',
},

subtitle: {
  fontSize: '1.05rem',
  color: '#9a9a9a',
  lineHeight: 1.6,
},

 products: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '40px',
  padding: '100px 12vw',
},

card: {
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '28px',
  padding: '36px',
  backdropFilter: 'blur(16px)',
},

  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 500,
    marginBottom: '8px',
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#aaa',
    marginBottom: '16px',
  },
  price: {
    fontSize: '1.1rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 18px',
    borderRadius: '999px',
    border: 'none',
    background: '#fff',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 500,
  },
}
