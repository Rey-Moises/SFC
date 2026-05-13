import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <motion.div
        className="about-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p className="section-eyebrow" variants={fadeUp}>
          Our Story
        </motion.p>

        <motion.h2 className="section-title" variants={fadeUp}>
          A perfect blend<br />
          just <em>for you.</em>
        </motion.h2>

        <motion.div className="about-grid" variants={fadeUp}>
          <div className="about-image-stack">
            <div className="about-image-wrapper about-image-main">
              <img
                src="/images/interior.jpg"
                alt="Sydney's Fudgy Collection interior — hand-painted murals, warm cafe ambiance"
                className="about-image"
              />
            </div>
            <div className="about-image-wrapper about-image-accent">
              <img
                src="/images/croffles-takoyaki-icedcoffee.jpg"
                alt="Croffles, takoyaki, and iced coffee — the SFC trio"
                className="about-image"
              />
            </div>
          </div>

          <div className="about-text">
            <p>
              Born in the heart of Cavite City, Sydney's Fudgy Collection started
              as a small passion project — a love letter to great coffee and comfort food.
            </p>
            <p>
              What began with espresso-based drinks quickly grew into something more:
              crispy takoyaki, golden croffles drizzled with chocolate, hearty rice meals,
              loaded club sandwiches, and colorful iced drinks that brighten your day.
            </p>
            <p>
              We believe every cup and every plate should feel like a warm hug.
              That's why we craft each item with care and pour our heart into every order.
            </p>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5.0★</span>
                <span className="stat-label">Google Rated</span>
              </div>
              <div className="stat">
                <span className="stat-number">2 – 3</span>
                <span className="stat-label">PM to AM Daily</span>
              </div>
              <div className="stat">
                <span className="stat-number">Cavite</span>
                <span className="stat-label">Born & Brewed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}