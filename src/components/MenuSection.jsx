import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  {
    title: 'Espresso & Latte Art',
    description: 'Carefully pulled shots, creamy steamed milk, and intricate latte art — each cup is a small masterpiece.',
    image: '/images/latteart.jpg',
    tag: 'Signature',
    category: 'drinks',
  },
  {
    title: 'Iced Drinks',
    description: 'From brown sugar lattes to matcha strawberry fusions — colorful, refreshing, and always Instagrammable.',
    image: '/images/3-different-coffees.jpg',
    tag: 'Refreshing',
    category: 'drinks',
  },
  {
    title: 'Frappes',
    description: 'Blended to perfection with whipped cream, chocolate drizzle, and a dose of indulgence in every sip.',
    image: '/images/frappe.jpg',
    tag: 'Indulgent',
    category: 'drinks',
  },
  {
    title: 'Takoyaki & Fries',
    description: 'Golden takoyaki loaded with bonito flakes and drizzle, paired with crispy seasoned fries on the side.',
    image: '/images/takoyakiandfries.jpg',
    tag: 'Best Seller',
    category: 'food',
  },
  {
    title: 'Croffles',
    description: 'Buttery croissant dough pressed into a golden waffle, topped with cream, chocolate drizzle, and cookies.',
    image: '/images/croffles-2.jpg',
    tag: 'Fan Favorite',
    category: 'food',
  },
  {
    title: 'Rice Meals',
    description: 'Hearty plates with tender beef tapa, fried chicken, garlic rice, egg, and fresh vegetables.',
    image: '/images/ricemeal-1.jpg',
    tag: 'Comfort',
    category: 'food',
  },
  {
    title: 'Pasta',
    description: 'Creamy carbonara served with toasted bread — rich, comforting, and generously portioned.',
    image: '/images/pasta.jpg',
    tag: 'Hearty',
    category: 'food',
  },
  {
    title: 'Croissant Sandwich',
    description: 'Flaky golden croissant stuffed with fresh vegetables, ham, and cheese — a savory morning delight.',
    image: '/images/croissant-sub.jpg',
    tag: 'Fresh',
    category: 'food',
  },
  {
    title: 'Club Sandwich',
    description: 'Stacked with layers of meat, egg, and fresh lettuce on toasted bread — served with crispy fries and dipping sauce.',
    image: '/images/clubsandwitch.jpg',
    tag: 'Loaded',
    category: 'food',
  },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'food', label: 'Food' },
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
    transition: { staggerChildren: 0.08 },
  },
}

export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter)

  return (
    <section className="menu-section" id="menu">
      <motion.div
        className="menu-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p className="section-eyebrow" variants={fadeUp}>
          The Menu
        </motion.p>
        <motion.h2 className="section-title" variants={fadeUp}>
          Something for<br />
          every <em>craving.</em>
        </motion.h2>
        <motion.p className="section-subtitle" variants={fadeUp}>
          Each item is prepared fresh, with ingredients we trust and flavors we love.
        </motion.p>

        <motion.div className="menu-filters" variants={fadeUp}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`menu-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
              data-clickable
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="menu-grid"
        layout
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              className="menu-card"
              variants={fadeUp}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="menu-card-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="menu-card-image"
                  loading="lazy"
                />
                <span className="menu-card-tag">{item.tag}</span>
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-title">{item.title}</h3>
                <p className="menu-card-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}