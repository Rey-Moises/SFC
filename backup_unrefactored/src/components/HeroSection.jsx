import React from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.5 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroSection() {
  const handleScroll = (e) => {
    e.preventDefault()
    const target = document.querySelector('#menu')
    const container = document.querySelector('.scroll-container')
    if (target && container) {
      container.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section" id="hero">
      <motion.div
        className="hero-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-eyebrow" variants={childVariants}>
          Sydney's Fudgy Collection
        </motion.p>

        <motion.h1 className="hero-title" variants={childVariants}>
          Your cozy<br />
          <em>one-stop shop</em><br />
          in Cavite City.
        </motion.h1>

        <motion.div className="hero-divider" variants={childVariants} />

        <motion.p className="hero-description" variants={childVariants}>
          Espresso-based coffee, crispy takoyaki, golden croffles,
          and hearty rice meals — crafted with warmth, served with love.
        </motion.p>

        <motion.div className="hero-tags" variants={childVariants}>
          <span className="hero-tag">Coffee</span>
          <span className="hero-tag-dot">·</span>
          <span className="hero-tag">Takoyaki</span>
          <span className="hero-tag-dot">·</span>
          <span className="hero-tag">Croffles</span>
          <span className="hero-tag-dot">·</span>
          <span className="hero-tag">Rice Meals</span>
        </motion.div>

        <motion.div variants={childVariants}>
          <motion.a
            className="cta-button"
            data-clickable
            href="#menu"
            onClick={handleScroll}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="explore-menu-btn"
          >
            Explore the Menu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="scroll-hint-line"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
