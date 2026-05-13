import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Visit', href: '#contact' },
]

const FB_ORDER_URL = 'https://www.facebook.com/profile.php?id=100082959350732'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.scroll-container')
    if (!container) return
    const handleScroll = () => setScrolled(container.scrollTop > 60)
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    const container = document.querySelector('.scroll-container')
    if (target && container) {
      container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#hero" className="navbar-brand" onClick={(e) => handleClick(e, '#hero')}>
          <img src="/images/logo.jpg" alt="SFC Logo" className="navbar-logo" />
          <span className="navbar-brand-text-wrapper">
            <motion.span
              className="navbar-brand-name navbar-brand-name--full"
              animate={{
                opacity: scrolled ? 0 : 1,
                y: scrolled ? -6 : 0,
                scale: scrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Sydney's Fudgy Collection
            </motion.span>
            <motion.span
              className="navbar-brand-name navbar-brand-name--short"
              animate={{
                opacity: scrolled ? 1 : 0,
                y: scrolled ? 0 : 6,
                scale: scrolled ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              SFC
            </motion.span>
          </span>
        </a>

        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href={FB_ORDER_URL} target="_blank" rel="noopener noreferrer" className="navbar-cta">
          Order Now
        </a>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="navbar-menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              className="cta-button mobile-menu-cta"
              href={FB_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.4 }}
              onClick={() => setMobileOpen(false)}
            >
              Order Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}