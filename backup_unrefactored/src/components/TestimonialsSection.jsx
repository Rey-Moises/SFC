import React from 'react'
import { motion } from 'framer-motion'

const FB_URL = 'https://www.facebook.com/profile.php?id=100082959350732'
const MAPS_URL = 'https://www.google.com/maps?q=132+Kadiwa+Street+San+Antonio+Cavite+Philippines'

const proofCards = [
  {
    key: 'google',
    valueNode: (
      <span className="proof-stars" aria-label="5.0 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.8l-6.4 3.9 1.7-7.3L1.7 9.5l7.4-.6L12 2z" />
          </svg>
        ))}
      </span>
    ),
    headline: '5.0',
    label: 'Google rated',
    note: 'Every review, all five stars.',
  },
  {
    key: 'community',
    valueNode: <span className="proof-stat">1,700+</span>,
    headline: 'Strong community',
    label: 'Facebook family',
    note: 'Regulars and friends keep growing the family.',
  },
  {
    key: 'hours',
    valueNode: <span className="proof-stat proof-stat--time">2 PM &ndash; 3 AM</span>,
    headline: 'Open every day',
    label: 'Late-night staple',
    note: 'From afternoon coffee to 3 AM cravings.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export default function TestimonialsSection() {
  return (
    <section className="social-proof-section" id="testimonials">
      <motion.div
        className="social-proof-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.p className="section-eyebrow" variants={fadeUp}>
          Word of Mouth
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Loved by the<br />
          <em>locals.</em>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          We don&rsquo;t run flashy ads. Our regulars bring their friends &mdash; and their friends bring theirs.
          That&rsquo;s how a real neighborhood cafe earns its place.
        </motion.p>

        <motion.div className="social-proof-grid" variants={stagger}>
          {proofCards.map((card) => (
            <motion.div
              className="proof-card"
              key={card.key}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="proof-card-value">{card.valueNode}</div>
              <h3 className="proof-card-headline">{card.headline}</h3>
              <p className="proof-card-label">{card.label}</p>
              <p className="proof-card-note">{card.note}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="social-proof-ctas" variants={fadeUp}>
          <a
            className="proof-link"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-clickable
          >
            See us on Google Maps
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <span className="proof-link-divider" aria-hidden="true">&middot;</span>
          <a
            className="proof-link"
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-clickable
          >
            Follow on Facebook
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
