import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../../../components/ui/SectionHeader/SectionHeader.jsx';
import styles from './CategoriesSection.module.css';

const CATEGORIES = [
  {
    name: 'Women',
    count: '218 pieces',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    query: 'Women',
  },
  {
    name: 'Men',
    count: '142 pieces',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    query: 'Men',
  },
  {
    name: 'Accessories',
    count: '96 pieces',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    query: 'Accessories',
  },
  {
    name: 'Footwear',
    count: '74 pieces',
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    query: 'Footwear',
  },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className={styles.categoriesSection}>
      <SectionHeader
        eyebrow="Shop by Category"
        title="Find Your <em>Signature</em>"
      />
      <div className={styles.categoriesGrid}>
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className={styles.catCard}
            onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.query)}`)}
          >
            <img src={cat.img} alt={cat.name} loading="lazy" />
            <div className={styles.catOverlay}>
              <div className={styles.catName}>{cat.name}</div>
              <div className={styles.catCount}>{cat.count}</div>
            </div>
            <div className={styles.catArrow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
