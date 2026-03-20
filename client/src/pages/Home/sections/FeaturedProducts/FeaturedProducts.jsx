import React, { useState, useEffect } from 'react';
import SectionHeader from '../../../../components/ui/SectionHeader/SectionHeader.jsx';
import ProductCard from '../../../../components/ui/ProductCard/ProductCard.jsx';
import { getFeaturedProducts } from '../../../../services/api.js';
import styles from './FeaturedProducts.module.css';

const TABS = ['All', 'New Arrivals', 'Best Sellers', 'On Sale'];

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    getFeaturedProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load featured products', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'New Arrivals') return p.badge === 'New';
    if (activeTab === 'Best Sellers') return p.reviews >= 40;
    if (activeTab === 'On Sale') return p.badge === 'Sale';
    return true;
  });

  return (
    <section className={styles.productsSection}>
      <SectionHeader
        eyebrow="Curated Selection"
        title="Trending <em>Now</em>"
      />

      <div className={styles.productsTabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <p className={styles.noProducts}>No products found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
}
