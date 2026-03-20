import React from 'react';
import styles from './ShopToolbar.module.css';

export default function ShopToolbar({ count, sort, onSortChange, gridCols, onGridColsChange }) {
  return (
    <div className={styles.shopToolbar}>
      <p className={styles.resultsCount}>
        Showing <strong>{count}</strong> results
      </p>

      <div className={styles.toolbarRight}>
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="rating">Best Rating</option>
        </select>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${gridCols === 4 ? styles.active : ''}`}
            onClick={() => onGridColsChange(4)}
            title="4 columns"
            aria-label="4 column grid"
          >
            <svg width="14" height="14" viewBox="0 0 16 16">
              <rect x="0" y="0" width="6" height="6" fill="currentColor" />
              <rect x="10" y="0" width="6" height="6" fill="currentColor" />
              <rect x="0" y="10" width="6" height="6" fill="currentColor" />
              <rect x="10" y="10" width="6" height="6" fill="currentColor" />
            </svg>
          </button>
          <button
            className={`${styles.viewBtn} ${gridCols === 3 ? styles.active : ''}`}
            onClick={() => onGridColsChange(3)}
            title="3 columns"
            aria-label="3 column grid"
          >
            <svg width="14" height="14" viewBox="0 0 16 16">
              <rect x="0" y="0" width="4" height="16" fill="currentColor" />
              <rect x="6" y="0" width="4" height="16" fill="currentColor" />
              <rect x="12" y="0" width="4" height="16" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
