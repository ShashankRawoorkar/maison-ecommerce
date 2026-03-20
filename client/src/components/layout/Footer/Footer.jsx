import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <span className={styles.logo}>Maison</span>
          <p>
            Where craftsmanship meets contemporary elegance. Luxury fashion curated for those who appreciate the finest things in life.
          </p>
          <div className={styles.footerSocial}>
            <a className={styles.socialBtn} title="Instagram" href="#" aria-label="Instagram">
              IG
            </a>
            <a className={styles.socialBtn} title="Pinterest" href="#" aria-label="Pinterest">
              PT
            </a>
            <a className={styles.socialBtn} title="Twitter" href="#" aria-label="Twitter">
              TW
            </a>
            <a className={styles.socialBtn} title="Facebook" href="#" aria-label="Facebook">
              FB
            </a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?filter=new">New Arrivals</Link></li>
            <li><Link to="/shop?category=Women">Women</Link></li>
            <li><Link to="/shop?category=Men">Men</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
            <li><Link to="/shop?filter=sale">Sale</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4>Info</h4>
          <ul>
            <li><a href="#">About Maison</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Stores</a></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping &amp; Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>© 2026 Maison. All rights reserved.</p>
        <div className={styles.paymentIcons}>
          <span className={styles.paymentIcon}>VISA</span>
          <span className={styles.paymentIcon}>MC</span>
          <span className={styles.paymentIcon}>AMEX</span>
          <span className={styles.paymentIcon}>PAYPAL</span>
          <span className={styles.paymentIcon}>APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
}
