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

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p className="section-eyebrow" variants={fadeUp}>
          Visit Us
        </motion.p>

        <motion.h2 className="section-title" variants={fadeUp}>
          Come say <em>hello.</em>
        </motion.h2>

        <motion.p className="section-subtitle" variants={fadeUp}>
          We'd love to see you. Swing by for a coffee, stay for the croffles.
        </motion.p>

        <motion.div className="contact-grid" variants={fadeUp}>
          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <h3>Location</h3>
            <p>
              132 Kadiwa Street<br />
              San Antonio, Cavite 4100<br />
              Philippines
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">🕐</div>
            <h3>Hours</h3>
            <p>
              <strong className="contact-hours">2 PM &ndash; 3 AM</strong><br />
              Open daily
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">💬</div>
            <h3>Get in Touch</h3>
            <p>
              <a
                href="https://www.facebook.com/profile.php?id=100082959350732"
                target="_blank"
                rel="noopener noreferrer"
                data-clickable
                className="contact-link"
              >
                Message us on Facebook →
              </a>
            </p>
          </div>
        </motion.div>

        <motion.div className="contact-map" variants={fadeUp}>
          <iframe
            title="Sydney's Fudgy Collection — 132 Kadiwa Street, San Antonio, Cavite"
            src="https://www.google.com/maps?q=132+Kadiwa+Street+San+Antonio+Cavite+Philippines&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        {/* Big CTA */}
        <motion.div className="contact-cta-wrapper" variants={fadeUp}>
          <motion.a
            className="cta-button cta-button--large"
            href="https://www.facebook.com/profile.php?id=100082959350732"
            target="_blank"
            rel="noopener noreferrer"
            data-clickable
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Follow Us on Facebook
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
