import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => setScrollY(el.scrollTop)
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Loading curtain — fades out once the canvas is mounted */}
      <div className={`loading-curtain ${loaded ? 'loading-curtain--hidden' : ''}`} aria-hidden={loaded}>
        <img src="/images/logo.jpg" alt="" className="loading-logo" />
        <div className="loading-bar" />
        <p className="loading-label">Brewing</p>
      </div>

      {/* Noise / grain overlay */}
      <div className="noise-overlay" />

      {/* 3D Canvas — fixed full-screen background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: '#FAF6F0' }}
          onCreated={() => {
            // Give the first frame a beat so the pop is the first thing the user sees
            requestAnimationFrame(() => setTimeout(() => setLoaded(true), 200))
          }}
        >
          <Scene mouse={mouse} scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Floating navigation */}
      <Navbar />

      {/* Scrollable content layer */}
      <div className="scroll-container" ref={scrollRef}>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}
