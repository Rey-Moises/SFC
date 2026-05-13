import React from 'react'

const FB_URL =
  'https://www.facebook.com/profile.php?id=100082959350732'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Visit', href: '#contact' },
  { label: 'Facebook', href: FB_URL, external: true },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/images/logo.jpg" alt="SFC Logo" className="footer-logo" />
          <div>
            <p className="footer-brand-name">Sydney's Fudgy Collection</p>
            <p className="footer-brand-sub">A perfect blend just for you</p>
          </div>
        </div>

        <div className="footer-links">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            )
          )}
        </div>

        <p className="footer-hours">Open daily &middot; 2 PM &ndash; 3 AM</p>

        <p className="footer-copy">
          &copy; {year} Sydney's Fudgy Collection. All rights reserved.
        </p>
      </div>
    </footer>
  )
}