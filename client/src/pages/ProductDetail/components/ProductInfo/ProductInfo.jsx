import React, { useState } from 'react';
import { useCart } from '../../../../hooks/useCart.js';
import { useToast } from '../../../../hooks/useToast.js';
import { formatPrice, renderStars } from '../../../../utils/formatters.js';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, qty);
    setAdded(true);
    showToast(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    showToast('Added to wishlist ♡');
  };

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => q + 1);

  return (
    <div className={styles.pdInfo}>
      <p className={styles.pdBreadcrumb}>
        Home / Shop / {product.category}
      </p>
      <div className={styles.pdBrand}>{product.brand}</div>
      <h1 className={styles.pdTitle}>{product.name}</h1>

      <div className={styles.pdRating}>
        <span className={styles.pdRatingStars}>{renderStars(product.rating)}</span>
        <span className={styles.pdRatingText}>
          {product.rating}.0 — {product.reviews} reviews
        </span>
      </div>

      <div className={styles.pdPrice}>
        <span className={styles.pdPriceCurrent}>
          {formatPrice(product.price)}
          {product.oldPrice && (
            <span className={styles.pdPriceOld}>{formatPrice(product.oldPrice)}</span>
          )}
        </span>
        {product.oldPrice && (
          <span className={styles.pdSavings}>
            You save {formatPrice(product.oldPrice - product.price)}
          </span>
        )}
      </div>

      {product.sizes && product.sizes.length > 0 && (
        <div className={styles.pdVariants}>
          <div className={styles.pdVariantLabel}>
            Size{' '}
            <span className={styles.pdVariantSelected}>{selectedSize}</span>
          </div>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div className={`${styles.pdVariants} ${styles.pdVariantsColor}`}>
          <div className={styles.pdVariantLabel}>
            Colour{' '}
            <span className={styles.pdVariantSelected}>{selectedColor}</span>
          </div>
          <div className={styles.colorOptions}>
            {product.colors.map((color) => (
              <button
                key={color}
                className={`${styles.colorBtn} ${selectedColor === color ? styles.active : ''}`}
                style={{ background: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
                aria-label={`Color: ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.quantityRow}>
        <div className={styles.qtyControl}>
          <button className={styles.qtyBtn} onClick={decreaseQty} aria-label="Decrease quantity">
            −
          </button>
          <input
            className={styles.qtyNum}
            type="text"
            value={qty}
            readOnly
            aria-label="Quantity"
          />
          <button className={styles.qtyBtn} onClick={increaseQty} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button
          className={`${styles.addToCartBtn} ${added ? styles.added : ''}`}
          onClick={handleAddToCart}
        >
          {added ? 'Added!' : 'Add to Cart'}
        </button>
        <button className={styles.wishlistFullBtn} onClick={handleWishlist} aria-label="Add to wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles.pdMeta}>
        <div className={styles.pdMetaItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          Free shipping on orders over $150
        </div>
        <div className={styles.pdMetaItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Free returns within 30 days
        </div>
        <div className={styles.pdMetaItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure checkout — SSL encrypted
        </div>
      </div>
    </div>
  );
}
