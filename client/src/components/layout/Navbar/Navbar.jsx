import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart.js';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLogo}>
        Maison
      </Link>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={isActive('/') && location.pathname === '/' ? styles.active : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className={isActive('/shop') ? styles.active : ''}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/shop?filter=new" className={styles.navLink}>
            New Arrivals
          </Link>
        </li>
        <li>
          <Link to="/shop?filter=sale" className={styles.navLink}>
            Sale
          </Link>
        </li>
        <li>
          <Link to="/shop" className={styles.navLink}>
            Collections
          </Link>
        </li>
      </ul>

      <div className={styles.navActions}>
        <form className={styles.navSearch} onSubmit={handleSearchSubmit}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <button className={styles.navIcon} title="Account">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>

        <button className={styles.navIcon} title="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button className={styles.navIcon} title="Cart" onClick={openCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </button>
      </div>
    </nav>
  );
}
