import React from 'react';
import styles from './Sidebar.module.css';

const CATEGORIES = ['Women', 'Men', 'Accessories', 'Footwear'];
const BRANDS = ['Atelier Co.', 'Noir Studio', 'Lumière', 'Crestwood', 'Velour House'];
const BRAND_COUNTS = { 'Atelier Co.': 48, 'Noir Studio': 36, 'Lumière': 29, 'Crestwood': 22, 'Velour House': 18 };
const CAT_COUNTS = { Women: 218, Men: 142, Accessories: 96, Footwear: 74 };

export default function Sidebar({ filters, onFilterChange }) {
  const { categories, brands, maxPrice, ratings } = filters;

  const toggleCategory = (cat) => {
    const updated = categories.includes(cat)
      ? categories.filter((c) => c !== cat)
      : [...categories, cat];
    onFilterChange({ ...filters, categories: updated });
  };

  const toggleBrand = (brand) => {
    const updated = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const toggleRating = (rating) => {
    const updated = ratings.includes(rating)
      ? ratings.filter((r) => r !== rating)
      : [...ratings, rating];
    onFilterChange({ ...filters, ratings: updated });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterGroup}>
        <div className={styles.filterTitle}>Category</div>
        {CATEGORIES.map((cat) => (
          <label key={cat} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            <span className={styles.filterLabel}>
              {cat}
              <span className={styles.filterCount}>{CAT_COUNTS[cat]}</span>
            </span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.filterTitle}>Price Range</div>
        <div className={styles.priceRange}>
          <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={handlePriceChange}
            className={styles.rangeSlider}
          />
          <div className={styles.rangeInputs}>
            <input className={styles.rangeInput} type="text" value="$0" readOnly />
            <input
              className={styles.rangeInput}
              type="text"
              value={`$${maxPrice}`}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.filterTitle}>Brand</div>
        {BRANDS.map((brand) => (
          <label key={brand} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            <span className={styles.filterLabel}>
              {brand}
              <span className={styles.filterCount}>{BRAND_COUNTS[brand]}</span>
            </span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.filterTitle}>Rating</div>
        {[5, 4, 3].map((rating) => (
          <label key={rating} className={styles.filterOption}>
            <input
              type="checkbox"
              checked={ratings.includes(rating)}
              onChange={() => toggleRating(rating)}
            />
            <span className={styles.filterLabel}>
              <span className={styles.ratingStars}>
                {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
              </span>
              {rating < 5 ? ' & Up' : ' Only'}
              <span className={styles.filterCount}>
                {rating === 5 ? 64 : rating === 4 ? 180 : 290}
              </span>
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
