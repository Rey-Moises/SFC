import React from 'react'

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
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Visit</a>
          <a
            href="https://www.facebook.com/profile.php?id=100082959350732"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>

        <p className="footer-hours">Open daily &middot; 2 PM &ndash; 3 AM</p>

        <p className="footer-copy">
          © {year} Sydney's Fudgy Collection. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
