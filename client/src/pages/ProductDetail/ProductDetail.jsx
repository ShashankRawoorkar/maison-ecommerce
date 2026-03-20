import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../../services/api.js';
import Gallery from './components/Gallery/Gallery.jsx';
import ProductInfo from './components/ProductInfo/ProductInfo.jsx';
import ProductTabs from './components/ProductTabs/ProductTabs.jsx';
import ProductCard from '../../components/ui/ProductCard/ProductCard.jsx';
import SectionHeader from '../../components/ui/SectionHeader/SectionHeader.jsx';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    Promise.all([getProductById(id), getProducts()])
      .then(([productData, allProducts]) => {
        setProduct(productData);
        const relatedProducts = allProducts
          .filter((p) => p.id !== productData.id)
          .slice(0, 4);
        setRelated(relatedProducts);
      })
      .catch(() => navigate('/shop'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className={styles.backLink}>
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className={styles.productDetailPage}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className={styles.productDetail}>
        <Gallery product={product} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <SectionHeader
            eyebrow="You May Also Like"
            title="Related <em>Pieces</em>"
            align="left"
          />
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
