import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart.js';
import { useToast } from '../../../hooks/useToast.js';
import { formatPrice, renderStars } from '../../../utils/formatters.js';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(product, product.sizes?.[0] || null, product.colors?.[0] || null, 1);
    showToast(`${product.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    showToast('Added to wishlist');
  };

  const badgeClass = product.badge
    ? `${styles.productBadge} ${styles[product.badge.toLowerCase()]}`
    : null;

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <div className={styles.productImgWrap}>
        <img src={product.img} alt={product.name} loading="lazy" />
        {product.badge && (
          <div className={badgeClass}>{product.badge}</div>
        )}
        <div className={styles.productActionsHover}>
          <button className={styles.quickAdd} onClick={handleQuickAdd}>
            Add to Cart
          </button>
          <button className={styles.wishlistBtn} onClick={handleWishlist}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.productBrand}>{product.brand}</div>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productRating}>
          <span className={styles.stars}>{renderStars(product.rating)}</span>
          <span className={styles.ratingCount}>({product.reviews})</span>
        </div>
        <div className={styles.productPrice}>
          <span className={styles.priceCurrent}>{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className={styles.priceOld}>{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
