import React, { useState } from 'react';
import styles from './ProductTabs.module.css';

const REVIEWS = [
  {
    name: 'Alexandra M.',
    date: 'March 2026',
    rating: 5,
    text: "Absolutely stunning quality. The fabric is incredibly luxurious and the fit is perfect. I've received so many compliments. Worth every penny — this is investment dressing at its finest.",
  },
  {
    name: 'James R.',
    date: 'February 2026',
    rating: 5,
    text: "I was skeptical ordering online but the piece arrived in impeccable condition. The craftsmanship is evident in every detail. Shipping was swift, packaging was beautiful. A true luxury experience end to end.",
  },
  {
    name: 'Sophie K.',
    date: 'January 2026',
    rating: 4,
    text: "Beautiful piece. Sizing runs slightly large so I'd recommend sizing down. The color in person is even more gorgeous than the photos. Will definitely be ordering again.",
  },
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={styles.productTabsSection}>
      <div className={styles.ptabs}>
        <button
          className={`${styles.ptab} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${styles.ptab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({product.reviews})
        </button>
        <button
          className={`${styles.ptab} ${activeTab === 'specifications' ? styles.active : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          Specifications
        </button>
      </div>

      {activeTab === 'description' && (
        <div className={`${styles.ptabContent} ${styles.active}`}>
          <div className={styles.tabDesc}>
            <p>{product.description}</p>
            <p>
              Every Maison piece is individually quality-checked before dispatch and arrives in our signature packaging — ready to gift, or to treat yourself.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className={`${styles.ptabContent} ${styles.active}`}>
          <div className={styles.reviewsList}>
            {REVIEWS.map((review, i) => (
              <div key={i} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewName}>{review.name}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.reviewStars}>
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'specifications' && (
        <div className={`${styles.ptabContent} ${styles.active}`}>
          <table className={styles.specsTable}>
            <tbody>
              <tr>
                <td>Material</td>
                <td>{product.material}</td>
              </tr>
              <tr>
                <td>Origin</td>
                <td>Made in Italy</td>
              </tr>
              <tr>
                <td>Care</td>
                <td>Dry clean only</td>
              </tr>
              <tr>
                <td>Fit</td>
                <td>{product.fit}</td>
              </tr>
              <tr>
                <td>SKU</td>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <td>Season</td>
                <td>Spring / Summer 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
